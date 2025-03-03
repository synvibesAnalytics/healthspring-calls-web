"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Loader } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface CallLog {
  id: string;
  project_name: string;
  from_number: string;
  from_alias?: string;
  to_alias: string;
  answer_duration: number;
  recorded: boolean;
  start_time_datetime: string;
  answer_time_datetime: string;
  stop_time_datetime: string;
}

interface LocationCallsPageProps {
  params: {
    name: string;
  };
}

const hardcodedData = [
  {
    id: "call-vn-1-0B53Y88XNO-1738648581602",
    transcription:
      "I just needed to do a booking on high speed. How do I do that? Let's go through the point of view now. You see from that and just follow the steps. Yes, that is that. Alright, thank you for your support. Thank you. If you have any query please contact us or you can call on this number. Thank you.",
    insights:
      "The customer's query regarding booking high-speed internet was addressed. The representative guided the customer through the process. While the interaction was brief, the customer expressed gratitude for the support. There is no evidence of frustration or confusion. However, the explanation of the booking process lacks detail, potentially leaving room for further questions. The overall interaction was efficient but could benefit from more comprehensive instructions. The customer seemed satisfied with the immediate assistance.",
    rating: 7,
  },
  {
    id: "call-vn-1-0B53Y88XNO-1738648480078",
    transcription: "Hello, hello. Hello. Hello. This is Katharuna Kulwara.",
    insights:
      "The recording begins with repeated instances of Hello, indicating a potential connectivity or audio issue at the start of the call. There is no interaction beyond the customer stating their name. The lack of a response from the representative suggests poor responsiveness and a failure to establish communication. The customers query is completely unresolved. This resulted in a highly negative customer experience. There is no indication of customer satisfaction, only implied frustration due to the inability to connect with a representative. Service quality is extremely poor.",
    rating: 1,
  },
  {
    id: "call-vn-1-0B53Y88XNO-1738648479171",
    transcription:
      "I'm sorry. You're supposed to be there. No. I'm not. Right. I'm going to show you how to do it. I'm going to show you how to do it. I'm going to show you how to do it. I'm going to show you how to do it. I'm going to show you how to do it. I'm not sure if you can hear me. I'm not sure if you can hear me. I'm not sure if you can hear me. I'm not sure if you can hear me. I'm not sure if you can hear me. I'm not sure if you can hear me. I'm not sure if you can hear me. I'm not sure if you can hear me. I'm not sure if you can hear me. I'm not sure if you can hear me. I'm not sure if you can hear me. I'm not sure if you can hear me. I'm not sure if you can hear me. I'm not sure if you can hear me.",
    insights:
      "The representative demonstrated a complete lack of effective communication and problem-solving skills. The call transcript shows excessive repetition of phrases like I'm going to show you how to do it and I'm not sure if you can see this, indicating a failure to understand or address the customers needs. The customer expressed significant frustration through implied statements. There is no evidence the customer issue was resolved. The interaction was unprofessional and ineffective. The customer likely left feeling unheard and unsupported. Significant improvements in communication training and customer service protocol are required.",
    rating: 1,
  },
];

const LocationCallsPage: React.FC<LocationCallsPageProps> = ({ params }) => {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [audioFiles, setAudioFiles] = useState<Record<string, string>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTranscription, setSelectedTranscription] = useState<
    (typeof hardcodedData)[0] | null
  >(null);
  // const [transcriptionData, setTranscriptionData] = useState({
  //   transcription: "",
  //   insights: "",
  //   rating: "",
  // });
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCallLogs = async () => {
      try {
        const response = await fetch("/api/call-log");
        const data = await response.json();
        setCallLogs(Array.isArray(data?.data?.calls) ? data.data.calls : []);
      } catch (error) {
        console.error("Error fetching call logs:", error);
      }
    };

    const fetchAudioFiles = async () => {
      try {
        const response = await fetch("/api/audio");
        const data = await response.json();

        if (Array.isArray(data?.audioFiles)) {
          const audioMap: Record<string, string> = {};
          data.audioFiles.forEach((filePath: string) => {
            const match = filePath.match(/(call-vn-1-\w+-\d+)\.mp3$/);
            if (match && match[1]) {
              audioMap[
                match[1]
              ] = `https://springcalls.vercel.app/audio_files/${filePath}`;
            }
          });
          setAudioFiles(audioMap);
        }
      } catch (error) {
        console.error("Error fetching audio files:", error);
      }
    };

    fetchCallLogs();
    fetchAudioFiles();
  }, []);

  const handleShowDetails = async (call: CallLog) => {
    setIsDialogOpen(true);
    // setLoading(true);
    const matchedData = hardcodedData.find((item) => item.id === call.id);
    if (matchedData) {
      setSelectedTranscription(matchedData);
      setIsDialogOpen(true);
    }

    // try {
    //   const audioUrl = audioFiles[call.id];
    //   if (!audioUrl) {
    //     console.error("No audio file available for this call.");
    //     setLoading(false);
    //     return;
    //   }

    //   const response = await fetch(
    //     "https://your-django-api.com/analyze-audio",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ audio_url: audioUrl }),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Failed to fetch transcription data");
    //   }

    //   const data = await response.json();
    //   setTranscriptionData({
    //     transcription: data.transcription,
    //     insights: data.insights,
    //     rating: data.rating,
    //   });
    // } catch (error) {
    //   console.error("Error fetching transcription data:", error);
    // }
    // setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 mb-4"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {params.name.charAt(0).toUpperCase() + params.name.slice(1)} Call
            Logs
          </h1>
          <p className="text-muted-foreground">
            View and analyze call recordings
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            Call Recordings
          </h2>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r">Date</TableHead>
                  <TableHead className="border-r">From</TableHead>
                  <TableHead className="border-r">To</TableHead>
                  <TableHead className="border-r">Start Time</TableHead>
                  <TableHead className="border-r">Answer Time</TableHead>
                  <TableHead className="border-r">Stop Time</TableHead>
                  <TableHead className="border-r">Duration</TableHead>
                  <TableHead className="border-r">Recorded</TableHead>
                  <TableHead className="border-r">Audio</TableHead>
                  <TableHead className="border-r">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {callLogs.length > 0 ? (
                  callLogs
                    .filter(
                      (log) =>
                        log.answer_duration > 0 &&
                        log.from_alias &&
                        log.to_alias
                    )
                    .map((log) => {
                      const callDate = log.start_time_datetime.split(", ")[0];
                      const startTime = log.start_time_datetime.split(", ")[1];
                      const answerTime =
                        log.answer_time_datetime.split(", ")[1];
                      const stopTime = log.stop_time_datetime.split(", ")[1];

                      return (
                        <TableRow key={log.id} className="border-b">
                          <td className="border-r p-2">{callDate}</td>
                          <td className="border-r p-2">{log.from_number}</td>
                          <td className="border-r p-2">{log.to_alias}</td>
                          <td className="border-r p-2">{startTime}</td>
                          <td className="border-r p-2">{answerTime}</td>
                          <td className="border-r p-2">{stopTime}</td>
                          <td className="border-r p-2">
                            {log.answer_duration}-s
                          </td>
                          <td className="border-r p-2">
                            {log.recorded ? "Yes" : "No"}
                          </td>
                          <td className="border-r p-2">
                            {audioFiles[log.id] ? (
                              <audio controls>
                                <source
                                  src={audioFiles[log.id]}
                                  type="audio/mpeg"
                                />
                              </audio>
                            ) : (
                              "No Audio"
                            )}
                          </td>
                          <td className="border-r p-2">
                            <button
                              onClick={() => handleShowDetails(log)}
                              className="flex items-center text-primary hover:text-primary/80 hover:underline"
                            >
                              Show Details
                            </button>
                          </td>
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <td colSpan={9} className="p-10 text-center align-middle">
                      <Loader className="animate-spin mx-auto text-gray-500" />
                    </td>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      {/* Dialog for Transcription Details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {selectedTranscription ? (
            <div className="space-y-4">
              <p>
                <strong>Transcription:</strong>{" "}
                {selectedTranscription.transcription}
              </p>
              <p>
                <strong>Insights:</strong> {selectedTranscription.insights}
              </p>
              <p>
                <strong>Rating:</strong>{" "}
                <Badge
                  className={
                    selectedTranscription.rating < 5
                      ? "bg-red-600 text-white"
                      : "bg-green-600 text-white"
                  }
                >
                  {selectedTranscription.rating} / 10
                </Badge>
              </p>
            </div>
          ) : (
            <Loader className="animate-spin mx-auto text-gray-500" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocationCallsPage;
