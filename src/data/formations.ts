import { Player } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface FormationPositions {
  [key: string]: {
    positions: {
      x: number; // x coordinate (0-100)
      y: number; // y coordinate (0-100)
      role: string; // e.g. "GK", "CB", "ST", etc.
    }[];
  };
}

// Define the formations with player positions
export const formations: FormationPositions = {
  "4-4-2": {
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 20, y: 70, role: "LB" },
      { x: 40, y: 70, role: "CB" },
      { x: 60, y: 70, role: "CB" },
      { x: 80, y: 70, role: "RB" },
      { x: 20, y: 40, role: "LM" },
      { x: 40, y: 40, role: "CM" },
      { x: 60, y: 40, role: "CM" },
      { x: 80, y: 40, role: "RM" },
      { x: 35, y: 10, role: "ST" },
      { x: 65, y: 10, role: "ST" }
    ]
  },
  "4-3-3": {
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 20, y: 70, role: "LB" },
      { x: 40, y: 70, role: "CB" },
      { x: 60, y: 70, role: "CB" },
      { x: 80, y: 70, role: "RB" },
      { x: 30, y: 40, role: "CM" },
      { x: 50, y: 40, role: "CM" },
      { x: 70, y: 40, role: "CM" },
      { x: 20, y: 10, role: "LW" },
      { x: 50, y: 10, role: "ST" },
      { x: 80, y: 10, role: "RW" }
    ]
  },
  "3-5-2": {
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 30, y: 70, role: "CB" },
      { x: 50, y: 70, role: "CB" },
      { x: 70, y: 70, role: "CB" },
      { x: 15, y: 50, role: "LWB" },
      { x: 35, y: 40, role: "CM" },
      { x: 50, y: 40, role: "CM" },
      { x: 65, y: 40, role: "CM" },
      { x: 85, y: 50, role: "RWB" },
      { x: 35, y: 10, role: "ST" },
      { x: 65, y: 10, role: "ST" }
    ]
  },
  "4-2-3-1": {
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 20, y: 70, role: "LB" },
      { x: 40, y: 70, role: "CB" },
      { x: 60, y: 70, role: "CB" },
      { x: 80, y: 70, role: "RB" },
      { x: 35, y: 50, role: "CDM" },
      { x: 65, y: 50, role: "CDM" },
      { x: 20, y: 30, role: "LW" },
      { x: 50, y: 30, role: "CAM" },
      { x: 80, y: 30, role: "RW" },
      { x: 50, y: 10, role: "ST" }
    ]
  },
  "3-4-3": {
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 30, y: 70, role: "CB" },
      { x: 50, y: 70, role: "CB" },
      { x: 70, y: 70, role: "CB" },
      { x: 20, y: 50, role: "LM" },
      { x: 40, y: 50, role: "CM" },
      { x: 60, y: 50, role: "CM" },
      { x: 80, y: 50, role: "RM" },
      { x: 20, y: 10, role: "LW" },
      { x: 50, y: 10, role: "ST" },
      { x: 80, y: 10, role: "RW" }
    ]
  },
  "4-5-1": {
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 20, y: 70, role: "LB" },
      { x: 40, y: 70, role: "CB" },
      { x: 60, y: 70, role: "CB" },
      { x: 80, y: 70, role: "RB" },
      { x: 20, y: 40, role: "LM" },
      { x: 35, y: 40, role: "CM" },
      { x: 50, y: 40, role: "CM" },
      { x: 65, y: 40, role: "CM" },
      { x: 80, y: 40, role: "RM" },
      { x: 50, y: 10, role: "ST" }
    ]
  },
  "5-3-2": {
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 10, y: 70, role: "LWB" },
      { x: 30, y: 70, role: "CB" },
      { x: 50, y: 70, role: "CB" },
      { x: 70, y: 70, role: "CB" },
      { x: 90, y: 70, role: "RWB" },
      { x: 30, y: 40, role: "CM" },
      { x: 50, y: 40, role: "CM" },
      { x: 70, y: 40, role: "CM" },
      { x: 35, y: 10, role: "ST" },
      { x: 65, y: 10, role: "ST" }
    ]
  }
};

// Default players array with initial data
export const defaultPlayers: Player[] = Array.from({ length: 11 }, (_, index) => ({
  id: uuidv4(),
  name: index === 0 ? "Goalkeeper" : `Player ${index}`,
  number: index + 1,
  position: {
    x: formations["4-4-2"].positions[index].x,
    y: formations["4-4-2"].positions[index].y,
    role: formations["4-4-2"].positions[index].role
  },
  color: index === 0 ? "#FFC107" : "#2196F3" // Yellow for goalkeeper, blue for others
}));