"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchTranscriptionData } from "@/utils/api";

interface CallLog {
  id: string;
  project_name: string;
  from_number: string;
  to_alias: string;
  answer_duration: number;
  recorded: boolean;
  start_time_datetime: string;
}

interface LocationCallsPageProps {
  params: {
    id: string;
  };
}

interface Transcription {
  text: string;
  insights?: {
    insights: string;
  };
}


const LocationCallsPage: React.FC<LocationCallsPageProps> = ({ params }) => {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [audioFiles, setAudioFiles] = useState<Record<string, string>>({});
  const [transcriptionData, setTranscriptionData] = useState<Record<string, Transcription>>({});
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCallLogs = async () => {
      try {
        const response = await fetch("/api/call-log");
        const data = await response.json();
        setCallLogs(Array.isArray(data?.data?.calls) ? data.data.calls : []);
        console.log("call logs: ", data);
      } catch (error) {
        console.error("Error fetching call logs:", error);
      }
    };

    const fetchAudioFiles = async () => {
      try {
        const response = await fetch("/api/audio");
        const data = await response.json();
        console.log("audiodata", data);
    
        if (Array.isArray(data?.audioFiles)) {
          const audioMap: Record<string, string> = {};
    
          data.audioFiles.forEach((filePath: string) => {
            // Extract call ID from filename
            const match = filePath.match(/(call-vn-1-\w+-\d+)\.mp3$/);
            if (match && match[1]) {
              const callId = match[1];
    
              // Use absolute URL in production, relative in development
              // const baseUrl =
              //   process.env.NODE_ENV === "production"
              //     ? "https://springcalls.vercel.app"
              //     : "";
              // const baseUrl = process.env.FRONTEND_BASE; //doesnt work for production somehow
    
              audioMap[callId] = `https://springcalls.vercel.app/audio_files/${filePath}`;
            }
          });
    
          setAudioFiles(audioMap);
        } else {
          console.error("Invalid audio file response format:", data);
        }
      } catch (error) {
        console.error("Error fetching audio files:", error);
      }
    };
    

    fetchCallLogs();
    fetchAudioFiles();
  }, []);

  const toggleRow = async (callId: string) => {
    setExpandedRows((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(callId)) {
        newExpanded.delete(callId);
      } else {
        newExpanded.add(callId);
      }
      return newExpanded;
    });
  
    if (!transcriptionData[callId] && audioFiles[callId]) {
      const audioUrl = audioFiles[callId];
  
      // Ensure absolute URL in production
      // const baseUrl =
      //   process.env.NODE_ENV === "production"
      //     ? "https://springcalls.vercel.app"
      //     : "";
      // const baseUrl = process.env.FRONTEND_BASE;
      // const fullAudioUrl = audioUrl.startsWith("http") ? audioUrl : `${baseUrl}${audioUrl}`;
  
      console.log("Fetching transcription for:", audioUrl);
  
      const data = await fetchTranscriptionData(audioUrl);
      setTranscriptionData((prev) => ({ ...prev, [callId]: data }));
    }
  };
  

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Location {params.id} Calls</h1>
          <p className="text-muted-foreground">View and analyze call recordings</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">Call Recordings</h2>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r">Call ID</TableHead>
                  <TableHead className="border-r">Project</TableHead>
                  <TableHead className="border-r">From</TableHead>
                  <TableHead className="border-r">To</TableHead>
                  <TableHead className="border-r">Duration</TableHead>
                  <TableHead className="border-r">Recorded</TableHead>
                  <TableHead className="border-r">Start Time</TableHead>
                  <TableHead className="border-r">Audio</TableHead>
                  <TableHead className="border-r">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {callLogs.length > 0 ? (
                  callLogs.map((log) => (
                    <>
                      <TableRow key={log.id} className="border-b">
                        <td className="border-r p-2">{log.id}</td>
                        <td className="border-r p-2">{log.project_name}</td>
                        <td className="border-r p-2">
                          {(() => {
                            const fromnumber = log.from_number.startsWith("00") ? log.from_number.slice(2) : log.from_number;
                            return fromnumber.length === 12 ? `${fromnumber.slice(0, 2)}-${fromnumber.slice(2)}` : fromnumber;
                          })()}
                        </td>
                        <td className="border-r p-2">{log.to_alias}</td>
                        <td className="border-r p-2">{log.answer_duration}-s</td>
                        <td className="border-r p-2">{log.recorded ? "Yes" : "No"}</td>
                        <td className="border-r p-2">{log.start_time_datetime}</td>
                        <td className="border-r p-2">
                          {audioFiles[log.id] ? (
                            <audio controls>
                              <source src={audioFiles[log.id]} type="audio/mpeg" />
                              Your browser does not support the audio element.
                            </audio>
                          ) : (
                            "No Audio"
                          )}
                        </td>
                        <td className="border-r p-2">
                          <button onClick={() => toggleRow(log.id)} className="flex items-center text-primary hover:text-primary/80">
                            {expandedRows.has(log.id) ? "Hide" : "Show"} Details
                            <ChevronDown className="ml-2 w-4 h-4" />
                          </button>
                        </td>
                      </TableRow>
                      {expandedRows.has(log.id) && transcriptionData[log.id] && (
                        <TableRow>
                          <td colSpan={9} className="p-3 bg-gray-100">
                            <div>
                              <h3 className="font-semibold">Transcription</h3>
                              <p>{transcriptionData[log.id]?.text || "No transcription available."}</p>
                              <h3 className="font-semibold mt-2">Insights</h3>
                              <p>{transcriptionData[log.id]?.insights?.insights || "No insights available."}</p>
                            </div>
                          </td>
                        </TableRow>
                      )}
                    </>
                  ))
                ) : (
                  <TableRow>
                    <td colSpan={9} className="p-4 text-center">Loading...</td>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocationCallsPage;
