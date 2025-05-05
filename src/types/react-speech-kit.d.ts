declare module 'react-speech-kit' {
  export interface SpeechSynthesisVoice {
    default: boolean;
    lang: string;
    localService: boolean;
    name: string;
    voiceURI: string;
  }

  export interface UseSpeechSynthesisProps {
    onEnd?: () => void;
    onError?: (error: any) => void;
    onPause?: () => void;
    onResume?: () => void;
    onStart?: () => void;
    onBoundary?: (event: any) => void;
    onMark?: (event: any) => void;
  }

  export interface UseSpeechSynthesisReturn {
    speak: (args: { text: string; voice?: SpeechSynthesisVoice; rate?: number; pitch?: number; volume?: number }) => void;
    cancel: () => void;
    speaking: boolean;
    supported: boolean;
    voices: SpeechSynthesisVoice[];
    pause: () => void;
    resume: () => void;
  }

  export function useSpeechSynthesis(props?: UseSpeechSynthesisProps): UseSpeechSynthesisReturn;

  export interface UseSpeechRecognitionProps {
    onEnd?: () => void;
    onError?: (error: any) => void;
    onResult?: (result: string) => void;
  }

  export interface UseSpeechRecognitionReturn {
    listen: (args?: { interimResults?: boolean; lang?: string }) => void;
    listening: boolean;
    stop: () => void;
    supported: boolean;
  }

  export function useSpeechRecognition(props?: UseSpeechRecognitionProps): UseSpeechRecognitionReturn;
} 