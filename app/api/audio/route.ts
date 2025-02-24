
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    const audioDir = path.join(process.cwd(), "public", "audio_files");

    try {
        // Ensure directory exists
        if (!fs.existsSync(audioDir)) {
            console.warn(`Directory ${audioDir} does not exist.`);
            return NextResponse.json({ audioFiles: [] });
        }

        // Read files and filter for audio formats
        const audioFiles = fs.readdirSync(audioDir).filter((file) => /\.(mp3|wav|ogg)$/.test(file));

        if (audioFiles.length === 0) {
            console.warn("No audio files found.");
            return NextResponse.json({ audioFiles: [] });
        }

        // Convert filenames to public URLs
        const audioUrls = audioFiles.map((file) => `https://springcalls.vercel.app/audio_files/${file}`);
        return NextResponse.json({ audioFiles: audioUrls });
    } catch (error) {
        console.error("Error reading audio files:", error);
        return NextResponse.json({ audioFiles: [] }, { status: 500 });
    }
}
