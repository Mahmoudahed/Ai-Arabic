export interface LogoConfig {
  text: string;
  abbreviation: string;
  backgroundColor: string;
  fontColor: string;
  fontSize: number;
  fontWeight: string;
  shape: string;
  shapeSize: number;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  shadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  rotation: number;
  symbol: string;
  symbolColor: string;
  symbolSize: number;
  symbolPosition: 'left' | 'right' | 'top' | 'bottom' | 'center';
}

export type ShapeType = 'circle' | 'square' | 'rectangle' | 'rounded' | 'pill' | 'diamond' | 'hexagon' | 'triangle';

export type SymbolType = 'star' | 'heart' | 'bolt' | 'check' | 'x' | 'dots' | 'lines' | 'waves' | 'none';

export interface ColorOption {
  name: string;
  value: string;
}

export interface Player {
  id: number;
  name: string;
  position: Position;
  imageUrl?: string;
  jerseyNumber: number;
}

export interface Position {
  x: number;
  y: number;
  role: string;
}

export interface Formation {
  id: string;
  name: string;
  description: string;
  positions: Position[];
}

export type FormationType = "4-4-2" | "4-3-3" | "3-5-2" | "5-3-2" | "4-2-3-1" | "3-4-3" | "Custom";