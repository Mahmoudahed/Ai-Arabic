export type Player = {
  id: string;
  name: string;
  number: number;
  position: {
    x: number;
    y: number;
    role: string;
  };
  color: string;
};

export type FormationType = 
  | "4-4-2" 
  | "4-3-3" 
  | "3-5-2" 
  | "5-3-2" 
  | "4-2-3-1" 
  | "3-4-3" 
  | "4-5-1" 
  | "Custom"; 