"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Star, ChevronDown, MessageSquare, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TableCell, TableRow } from "@/components/ui/table";

interface CallRecordProps {
  rating: number;
  duration: string;
  transcription: string;
  insights: string[];
  date: string;
  time: string;
  audioUrl: string | null;
}

interface AudioFile {
  name: string;
  url: string;
}

export function CallRecord({ rating, duration, transcription, insights, date, time, audioUrl }: CallRecordProps) {
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const rowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (rowRef.current) {
      rowRef.current.style.transition = "all 0.3s ease";
    }

    // Fetch audio files
    const fetchAudioFiles = async () => {
      try {
        const response = await axios.get("/api/audio");
        setAudioFiles(response.data);
      } catch (error) {
        console.error("Error fetching audio files:", error);
      }
    };

    fetchAudioFiles();
  }, []); // Added missing dependency array

  const toggleTranscript = () => {
    setIsTranscriptOpen(!isTranscriptOpen);
    if (rowRef.current) {
      rowRef.current.style.height = isTranscriptOpen ? "auto" : `${rowRef.current.scrollHeight}px`;
    }
  };

  const toggleInsights = () => {
    setIsInsightsOpen(!isInsightsOpen);
    if (rowRef.current) {
      rowRef.current.style.height = isInsightsOpen ? "auto" : `${rowRef.current.scrollHeight}px`;
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <TableRow ref={rowRef} className="border-b">
      <TableCell className="border-r">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.round(rating / 2) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
              }`}
            />
          ))}
          <span className="ml-2 text-sm">({rating}/10)</span>
        </div>
      </TableCell>
      <TableCell className="border-r">{duration}</TableCell>
      <TableCell className="border-r">
        <audio ref={audioRef} controls src={audioUrl || undefined} className="w-full h-12" onPlay={playAudio}>
            Your browser does not support the audio element.
        </audio>
      </TableCell>
      <TableCell className="border-r">
        <Collapsible open={isTranscriptOpen} onOpenChange={toggleTranscript}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>View Transcription</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isTranscriptOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground whitespace-pre-line">{transcription}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </TableCell>
      <TableCell className="border-r">
        <Collapsible open={isInsightsOpen} onOpenChange={toggleInsights}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span>View Insights</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isInsightsOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="rounded-lg bg-muted/50 p-4">
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                {insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </TableCell>
      <TableCell className="border-r">{date}</TableCell>
      <TableCell>{time}</TableCell>
    </TableRow>
  );
}
