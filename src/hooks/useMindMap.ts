import { useState, useCallback } from 'react';
import { MindMap, MindMapNode } from '../types';
import { saveMindMap } from '../utils/storage';

const DEFAULT_NODE_DISTANCE = 150;

export const useMindMap = (initialMap?: MindMap) => {
  // Validate initialMap has the required structure
  const validInitialMap = initialMap && 
    initialMap.nodes && 
    Array.isArray(initialMap.nodes) ? 
    initialMap : null;
    
  console.log("useMindMap hook - initialMap:", initialMap);
  console.log("useMindMap hook - validInitialMap:", validInitialMap);
    
  const [mindMap, setMindMap] = useState<MindMap>(() => {
    try {
      if (validInitialMap) {
        console.log("Using valid initial map:", validInitialMap);
        return validInitialMap;
      }
      
      console.log("Creating default mind map");
      return {
        id: crypto.randomUUID(),
        name: 'Untitled Mind Map',
        nodes: [
          {
            id: crypto.randomUUID(),
            text: 'Main Concept',
            parentId: null,
            x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
            y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300,
            color: '#3B82F6', // Primary blue
          },
        ],
      };
    } catch (error) {
      console.error("Error initializing mind map:", error);
      // Return a safe default
      return {
        id: crypto.randomUUID(),
        name: 'Error Recovery Map',
        nodes: [
          {
            id: crypto.randomUUID(),
            text: 'Main Concept',
            parentId: null,
            x: 300,
            y: 300,
            color: '#3B82F6',
          },
        ],
      };
    }
  });

  const addNode = useCallback(
    (parentId: string, text: string = 'New Node') => {
      const parentNode = mindMap.nodes.find((node) => node.id === parentId);
      if (!parentNode) return;

      // Count existing children to determine position
      const childrenCount = mindMap.nodes.filter(
        (node) => node.parentId === parentId
      ).length;

      // Calculate position based on number of children
      const angle = (Math.PI * 2 * childrenCount) / 5 + Math.PI / 2;
      const x = parentNode.x + Math.cos(angle) * DEFAULT_NODE_DISTANCE;
      const y = parentNode.y + Math.sin(angle) * DEFAULT_NODE_DISTANCE;

      const newNode: MindMapNode = {
        id: crypto.randomUUID(),
        text,
        parentId,
        x,
        y,
        color: '#8B5CF6', // Accent purple
      };

      const newMindMap = {
        ...mindMap,
        nodes: [...mindMap.nodes, newNode],
      };
      
      setMindMap(newMindMap);
      saveMindMap(newMindMap);
      return newNode;
    },
    [mindMap]
  );

  const updateNode = useCallback(
    (id: string, updates: Partial<MindMapNode>) => {
      const updatedNodes = mindMap.nodes.map((node) =>
        node.id === id ? { ...node, ...updates } : node
      );
      
      const newMindMap = {
        ...mindMap,
        nodes: updatedNodes,
      };
      
      setMindMap(newMindMap);
      saveMindMap(newMindMap);
    },
    [mindMap]
  );

  const deleteNode = useCallback(
    (id: string) => {
      // Find all descendants of the node to be deleted
      const nodesToDelete = new Set<string>([id]);
      
      // Recursively find all descendants
      const findDescendants = (nodeId: string) => {
        mindMap.nodes.forEach(node => {
          if (node.parentId === nodeId) {
            nodesToDelete.add(node.id);
            findDescendants(node.id);
          }
        });
      };
      
      findDescendants(id);
      
      // Filter out the node and all its descendants
      const updatedNodes = mindMap.nodes.filter(
        node => !nodesToDelete.has(node.id)
      );
      
      const newMindMap = {
        ...mindMap,
        nodes: updatedNodes,
      };
      
      setMindMap(newMindMap);
      saveMindMap(newMindMap);
    },
    [mindMap]
  );

  const updateMapName = useCallback(
    (name: string) => {
      const newMindMap = {
        ...mindMap,
        name,
      };
      
      setMindMap(newMindMap);
      saveMindMap(newMindMap);
    },
    [mindMap]
  );

  return {
    mindMap,
    setMindMap,
    addNode,
    updateNode,
    deleteNode,
    updateMapName,
  };
};