import { MindMap } from '../types';

const STORAGE_KEY = 'mindmaps';

export const saveMindMap = (mindMap: MindMap): void => {
  const existingMaps = getMindMaps();
  const existingIndex = existingMaps.findIndex(map => map.id === mindMap.id);
  
  if (existingIndex >= 0) {
    existingMaps[existingIndex] = mindMap;
  } else {
    existingMaps.push(mindMap);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingMaps));
};

export const getMindMaps = (): MindMap[] => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return [];
  }
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse mind maps:', error);
    return [];
  }
};

export const getMindMapById = (id: string): MindMap | null => {
  try {
    const maps = getMindMaps();
    const foundMap = maps.find(map => map.id === id) || null;
    
    // Validate the mind map structure
    if (foundMap && (!foundMap.nodes || !Array.isArray(foundMap.nodes))) {
      console.error('Invalid mind map structure:', foundMap);
      return null;
    }
    
    return foundMap;
  } catch (error) {
    console.error('Error retrieving mind map:', error);
    return null;
  }
};

export const deleteMindMap = (id: string): void => {
  const maps = getMindMaps().filter(map => map.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(maps));
};