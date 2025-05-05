export interface Image {
  id: string;
  originalImage: string;
  createdAt: Date;
  title: string;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  transformedImages: string[];
}

export interface ProcessOptions {
  style: 'realistic' | 'cartoon' | 'painterly' | 'fantasy';
  enhanceDetails: boolean;
} 

export interface Node {
  id: string;
  text: string;
  parentId: string | null;
  level: number;
  x: number;
  y: number;
  color?: string;
  textColor?: string;
  withdrawn?: boolean;
}

export interface Connection {
  source: string;
  target: string;
}

export interface MindMapState {
  nodes: Node[];
  connections: Connection[];
  selectedNode: string | null;
  rootNode: string | null;
}