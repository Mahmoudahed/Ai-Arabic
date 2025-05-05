export interface Position {
  x: number;
  y: number;
}

export interface NodeType {
  id: string;
  text: string;
  x: number;
  y: number;
  isRoot: boolean;
  level: number;
  image?: string; // Base64 encoded image data
}

export interface ConnectionType {
  fromId: string;
  toId: string;
  isDashed: boolean;
}