import { useRef, useState } from "react";

export function useSpeechDownload() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    setAudioURL(null);
    setIsRecording(true);
    const audioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
    const dest = audioContext.createMediaStreamDestination();

    // Set up speech synthesis
    const utter = new SpeechSynthesisUtterance();
    // We'll set utter props later

    // Try to get system audio (best effort, limited support)
    let stream: MediaStream;
    try {
      // @ts-ignore
      stream = dest.stream;
    } catch {
      if ("captureStream" in (document.querySelector("audio") || {})) {
        stream = (document.querySelector("audio") as any).captureStream();
      } else {
        throw new Error("Recording audio from Speech Synthesis is not supported in this browser.");
      }
    }

    mediaRecorderRef.current = new MediaRecorder(stream);
    chunksRef.current = [];
    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioURL(URL.createObjectURL(blob));
      setIsRecording(false);
    };
    mediaRecorderRef.current.start();
    return {
      utter,
      stopRecording: () => mediaRecorderRef.current?.stop(),
      setIsRecording,
    };
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  return {
    audioURL,
    isRecording,
    startRecording,
    stopRecording,
    setAudioURL,
  };
}

