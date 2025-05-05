import { Formation } from '../types';

export const formations: Record<string, Formation> = {
  "4-4-2": {
    id: "4-4-2",
    name: "4-4-2",
    description: "Classic formation with 4 defenders, 4 midfielders, and 2 forwards",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 20, y: 70, role: "LB" },
      { x: 40, y: 70, role: "CB" },
      { x: 60, y: 70, role: "CB" },
      { x: 80, y: 70, role: "RB" },
      { x: 20, y: 50, role: "LM" },
      { x: 40, y: 50, role: "CM" },
      { x: 60, y: 50, role: "CM" },
      { x: 80, y: 50, role: "RM" },
      { x: 40, y: 30, role: "ST" },
      { x: 60, y: 30, role: "ST" }
    ]
  },
  "4-3-3": {
    id: "4-3-3",
    name: "4-3-3",
    description: "Attacking formation with 4 defenders, 3 midfielders, and 3 forwards",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 20, y: 70, role: "LB" },
      { x: 40, y: 70, role: "CB" },
      { x: 60, y: 70, role: "CB" },
      { x: 80, y: 70, role: "RB" },
      { x: 30, y: 50, role: "CM" },
      { x: 50, y: 50, role: "CM" },
      { x: 70, y: 50, role: "CM" },
      { x: 20, y: 30, role: "LW" },
      { x: 50, y: 30, role: "ST" },
      { x: 80, y: 30, role: "RW" }
    ]
  },
  "3-5-2": {
    id: "3-5-2",
    name: "3-5-2",
    description: "Formation with 3 defenders, 5 midfielders, and 2 forwards",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 30, y: 70, role: "CB" },
      { x: 50, y: 70, role: "CB" },
      { x: 70, y: 70, role: "CB" },
      { x: 15, y: 50, role: "LWB" },
      { x: 35, y: 50, role: "CM" },
      { x: 50, y: 50, role: "CM" },
      { x: 65, y: 50, role: "CM" },
      { x: 85, y: 50, role: "RWB" },
      { x: 40, y: 30, role: "ST" },
      { x: 60, y: 30, role: "ST" }
    ]
  },
  "4-2-3-1": {
    id: "4-2-3-1",
    name: "4-2-3-1",
    description: "Modern formation with 4 defenders, 2 defensive midfielders, 3 attacking midfielders, and 1 striker",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 20, y: 70, role: "LB" },
      { x: 40, y: 70, role: "CB" },
      { x: 60, y: 70, role: "CB" },
      { x: 80, y: 70, role: "RB" },
      { x: 40, y: 55, role: "CDM" },
      { x: 60, y: 55, role: "CDM" },
      { x: 20, y: 40, role: "LAM" },
      { x: 50, y: 40, role: "CAM" },
      { x: 80, y: 40, role: "RAM" },
      { x: 50, y: 25, role: "ST" }
    ]
  }
};

export const defaultPlayers = [
  { id: 1, name: "Goalkeeper", position: { x: 50, y: 90, role: "GK" }, jerseyNumber: 1 },
  { id: 2, name: "Defender 1", position: { x: 20, y: 70, role: "LB" }, jerseyNumber: 2 },
  { id: 3, name: "Defender 2", position: { x: 40, y: 70, role: "CB" }, jerseyNumber: 3 },
  { id: 4, name: "Defender 3", position: { x: 60, y: 70, role: "CB" }, jerseyNumber: 4 },
  { id: 5, name: "Defender 4", position: { x: 80, y: 70, role: "RB" }, jerseyNumber: 5 },
  { id: 6, name: "Midfielder 1", position: { x: 20, y: 50, role: "LM" }, jerseyNumber: 6 },
  { id: 7, name: "Midfielder 2", position: { x: 40, y: 50, role: "CM" }, jerseyNumber: 7 },
  { id: 8, name: "Midfielder 3", position: { x: 60, y: 50, role: "CM" }, jerseyNumber: 8 },
  { id: 9, name: "Midfielder 4", position: { x: 80, y: 50, role: "RM" }, jerseyNumber: 9 },
  { id: 10, name: "Forward 1", position: { x: 40, y: 30, role: "ST" }, jerseyNumber: 10 },
  { id: 11, name: "Forward 2", position: { x: 60, y: 30, role: "ST" }, jerseyNumber: 11 }
];