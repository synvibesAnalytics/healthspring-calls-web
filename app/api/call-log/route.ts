import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { NextResponse } from "next/server";
import crypto from "crypto";
import ffmpeg from 'fluent-ffmpeg';

const API_KEY_SID = process.env.STRINGEE_API_KEY_SID as string;
const API_KEY_SECRET = process.env.STRINGEE_API_KEY_SECRET as string;
const BASE_URL = 'https://asia-2.api.stringee.com';

function base64UrlEncode(obj: object): string {
    return Buffer.from(JSON.stringify(obj))
        .toString("base64")
        .replace(/=+$/, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

function generateJWT(): string {
    const header = {
        typ: "JWT",
        alg: "HS256",
        cty: "stringee-api;v=1",
    };
    const expTime = Math.floor(Date.now() / 1000) + 900
    const payload = {
        jti: `${API_KEY_SID}-${expTime}`,
        iss: API_KEY_SID,
        exp: expTime, // 1 hour expiry
        rest_api: true,
    };

    const encodedHeader = base64UrlEncode(header);
    const encodedPayload = base64UrlEncode(payload);

    const signature = crypto
        .createHmac("sha256", API_KEY_SECRET)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest("base64")
        .replace(/=+$/, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

interface Call {
    id: string;
    recorded: number;
}

interface CallLogResponse {
    data?: {
        calls: Call[];
    };
}

export async function GET() {
    try {
        if (!API_KEY_SID || !API_KEY_SECRET) {
            return NextResponse.json({ error: "API credentials missing" }, { status: 500 });
        }

        const token = generateJWT();

        const response = await fetch(`${BASE_URL}/v1/call/log`, {
            method: "GET",
            headers: {
                "X-STRINGEE-AUTH": token,
                "Content-Type": "application/json",
            },
        });

        // Assert the response type as CallLogResponse
        const data = await response.json() as CallLogResponse;


        const calls = Array.isArray(data?.data?.calls) ? data.data.calls : [];

        if (calls.length > 0) {
            // Download the recordings for each call where `recorded` is 1
            const downloadPromises = calls
                .filter((call: Call) => call.recorded === 1)
                .map(async (call: Call) => {
                    const callId = call.id;

                    // Request to download the recording
                    const recordingResponse = await fetch(`${BASE_URL}/v1/call/recording/${callId}`, {
                        headers: {
                            'X-STRINGEE-AUTH': token,
                        },
                    });

                    // Check if the recording exists
                    if (recordingResponse.ok) {
                        const fileBuffer = await recordingResponse.arrayBuffer();

                        // Convert ArrayBuffer to Buffer
                        const buffer = Buffer.from(fileBuffer);

                        // Save the file in the 'audio_files' directory
                        const binFilePath = path.join(process.cwd(), 'public', 'audio_files', `${callId}.bin`);
                        fs.writeFileSync(binFilePath, buffer);

                        // Check if the .bin file exists
                        if (!fs.existsSync(binFilePath)) {
                            console.error(`File not found: ${binFilePath}`);
                            return { success: false, callId, error: "File not found" };
                        }

                        // Convert the .bin file to .mp3 using ffmpeg
                        const mp3FilePath = path.join(process.cwd(), 'public', 'audio_files', `${callId}.mp3`);

                        await new Promise<void>((resolve, reject) => {
                            ffmpeg(binFilePath)
                                .audioFilter('afftdn') // Noise reduction filter
                                .audioCodec('libmp3lame') // Ensure MP3 encoding
                                .output(mp3FilePath)
                                .on('end', () => {
                                    resolve();
                                })
                                .on('error', (err) => {
                                    console.error(`Error during conversion: ${err.message}`);
                                    reject(err);
                                })
                                .run();
                        });

                        // Optionally delete the .bin file after conversion
                        fs.unlinkSync(binFilePath);

                        return { success: true, callId };
                    } else {
                        return { success: false, callId };
                    }
                });
            console.log (downloadPromises);
            return NextResponse.json(data)
            // return NextResponse.json({
            //     message: 'Download attempt complete',
            //     data: data,
            //     // Optionally you can return the download results here.
            //     // results: await Promise.all(downloadPromises),
            // });
        } else {
            return NextResponse.json({
                message: 'No recorded calls available',
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
    }
}
