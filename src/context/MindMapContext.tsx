'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { NodeType, ConnectionType, Position } from '../types';
import { useToast } from '../components/ui/Toaster';

interface MindMapState {
  nodes: NodeType[];
  connections: ConnectionType[];
  selectedNodeId: string | null;
  mindMapName: string;
}

interface MindMapContextType {
  nodes: NodeType[];
  connections: ConnectionType[];
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  updateNodePosition: (id: string, position: Position) => void;
  updateNodeText: (id: string, text: string) => void;
  updateNodeImage: (id: string, imageData: string) => void;
  addChildNode: (parentId: string) => void;
  deleteNode: (id: string) => void;
  createNewMindMap: () => void;
  saveMindMap: () => void;
  loadMindMap: (data: MindMapState) => void;
  exportMindMap: () => void;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  mindMapName: string;
  setMindMapName: (name: string) => void;
}

const MindMapContext = createContext<MindMapContextType>({} as MindMapContextType);

export const useMindMap = () => useContext(MindMapContext);

const initialRoot: NodeType = {
  id: '1',
  text: 'Central Idea',
  x: window.innerWidth / 2 - 75,
  y: window.innerHeight / 2 - 30,
  isRoot: true,
  level: 0,
};

const initialState: MindMapState = {
  nodes: [initialRoot],
  connections: [],
  selectedNodeId: null,
  mindMapName: 'Untitled Mind Map',
};

const MAX_HISTORY = 50;

export const MindMapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<MindMapState>(initialState);
  const [history, setHistory] = useState<MindMapState[]>([initialState]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const { showToast } = useToast();

  const saveToHistory = useCallback((newState: MindMapState) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, newState].slice(-MAX_HISTORY);
    });
    setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [historyIndex]);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const updateNodePosition = useCallback((id: string, position: Position) => {
    setState(prev => {
      const newNodes = prev.nodes.map(node => 
        node.id === id ? { ...node, x: position.x, y: position.y } : node
      );
      return { ...prev, nodes: newNodes };
    });
  }, []);

  const updateNodeText = useCallback((id: string, text: string) => {
    setState(prev => {
      const newNodes = prev.nodes.map(node => 
        node.id === id ? { ...node, text } : node
      );
      const newState = { ...prev, nodes: newNodes };
      saveToHistory(newState);
      return newState;
    });
  }, [saveToHistory]);

  const updateNodeImage = useCallback((id: string, imageData: string) => {
    setState(prev => {
      const newNodes = prev.nodes.map(node => 
        node.id === id ? { ...node, image: imageData } : node
      );
      const newState = { ...prev, nodes: newNodes };
      saveToHistory(newState);
      return newState;
    });
  }, [saveToHistory]);

  const addChildNode = useCallback((parentId: string) => {
    setState(prev => {
      const parentNode = prev.nodes.find(node => node.id === parentId);
      
      if (!parentNode) return prev;
      
      const newId = generateId();
      
      const offset = Math.floor(Math.random() * 60) - 30;
      const xOffset = 180 + offset;
      const yOffset = (Math.random() > 0.5 ? 1 : -1) * (80 + offset);
      
      const newNode: NodeType = {
        id: newId,
        text: 'New Idea',
        x: parentNode.x + xOffset,
        y: parentNode.y + yOffset,
        isRoot: false,
        level: parentNode.level + 1,
      };
      
      const newConnection: ConnectionType = {
        fromId: parentId,
        toId: newId,
        isDashed: false,
      };
      
      const newState = {
        ...prev,
        nodes: [...prev.nodes, newNode],
        connections: [...prev.connections, newConnection],
        selectedNodeId: newId,
      };
      
      saveToHistory(newState);
      return newState;
    });
  }, [saveToHistory]);

  const deleteNode = useCallback((id: string) => {
    setState(prev => {
      const nodeToDelete = prev.nodes.find(node => node.id === id);
      if (!nodeToDelete || nodeToDelete.isRoot) return prev;
      
      const collectNodesToDelete = (nodeId: string, collected: Set<string> = new Set()): Set<string> => {
        collected.add(nodeId);
        
        const childConnections = prev.connections.filter(conn => conn.fromId === nodeId);
        
        childConnections.forEach(conn => {
          collectNodesToDelete(conn.toId, collected);
        });
        
        return collected;
      };
      
      const nodesToDelete = collectNodesToDelete(id);
      
      const newNodes = prev.nodes.filter(node => !nodesToDelete.has(node.id));
      const newConnections = prev.connections.filter(
        conn => !nodesToDelete.has(conn.fromId) && !nodesToDelete.has(conn.toId)
      );
      
      const newState = {
        ...prev,
        nodes: newNodes,
        connections: newConnections,
        selectedNodeId: null,
      };
      
      saveToHistory(newState);
      return newState;
    });
  }, [saveToHistory]);

  const createNewMindMap = useCallback(() => {
    if (state.nodes.length > 1 && !confirm('Create a new mind map? Unsaved changes will be lost.')) {
      return;
    }
    
    const newRoot: NodeType = {
      id: generateId(),
      text: 'Central Idea',
      x: window.innerWidth / 2 - 75,
      y: window.innerHeight / 2 - 30,
      isRoot: true,
      level: 0,
    };
    
    const newState = {
      nodes: [newRoot],
      connections: [],
      selectedNodeId: newRoot.id,
      mindMapName: 'Untitled Mind Map',
    };
    
    setState(newState);
    setHistory([newState]);
    setHistoryIndex(0);
    
    showToast('Created new mind map', 'success');
  }, [state.nodes.length, showToast]);

  const saveMindMap = useCallback(() => {
    try {
      const key = `mindmap_${Date.now()}`;
      localStorage.setItem(key, JSON.stringify(state));
      showToast('Mind map saved successfully', 'success');
    } catch (error) {
      console.error('Failed to save mind map:', error);
      showToast('Failed to save mind map', 'error');
    }
  }, [state, showToast]);

  const loadMindMap = useCallback((data: MindMapState) => {
    try {
      setState(data);
      setHistory([data]);
      setHistoryIndex(0);
      showToast('Mind map loaded successfully', 'success');
    } catch (error) {
      console.error('Failed to load mind map:', error);
      showToast('Failed to load mind map', 'error');
    }
  }, [showToast]);

  const exportMindMap = useCallback(() => {
    try {
      const dataStr = JSON.stringify(state, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportName = `${state.mindMapName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportName);
      linkElement.click();
      
      showToast('Mind map exported successfully', 'success');
    } catch (error) {
      console.error('Failed to export mind map:', error);
      showToast('Failed to export mind map', 'error');
    }
  }, [state, showToast]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setState(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setState(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const setSelectedNodeId = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, selectedNodeId: id }));
  }, []);

  const setMindMapName = useCallback((name: string) => {
    setState(prev => ({ ...prev, mindMapName: name }));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (
        (e.key === 'Delete' || e.key === 'Backspace') && 
        state.selectedNodeId && 
        !state.nodes.find(n => n.id === state.selectedNodeId)?.isRoot
      ) {
        deleteNode(state.selectedNodeId);
      }

      if (e.key === 'Tab' && state.selectedNodeId) {
        e.preventDefault();
        addChildNode(state.selectedNodeId);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) {
        e.preventDefault();
        redo();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveMindMap();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        createNewMindMap();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, undo, redo, saveMindMap, createNewMindMap, deleteNode, addChildNode]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (state !== history[historyIndex]) {
        saveToHistory(state);
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [state, history, historyIndex, saveToHistory]);

  return (
    <MindMapContext.Provider
      value={{
        nodes: state.nodes,
        connections: state.connections,
        selectedNodeId: state.selectedNodeId,
        setSelectedNodeId,
        updateNodePosition,
        updateNodeText,
        updateNodeImage,
        addChildNode,
        deleteNode,
        createNewMindMap,
        saveMindMap,
        loadMindMap,
        exportMindMap,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
        undo,
        redo,
        mindMapName: state.mindMapName,
        setMindMapName,
      }}
    >
      {children}
    </MindMapContext.Provider>
  );
};