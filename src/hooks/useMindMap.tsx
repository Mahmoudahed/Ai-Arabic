import { useState, useCallback, useEffect } from "react";
import { Node, Connection, MindMapState } from "../types/indexs";
import { parseTextToMindMap, calculateLayout } from "../utils/parser";

const initialState: MindMapState = {
  nodes: [],
  connections: [],
  selectedNode: null,
  rootNode: null
};

export function useMindMap() {
  const [state, setState] = useState<MindMapState>(initialState);
  const [inputText, setInputText] = useState<string>("");
  const [history, setHistory] = useState<MindMapState[]>([initialState]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const parseInput = useCallback((text: string) => {
    const { nodes, connections } = parseTextToMindMap(text);
    
    if (nodes.length > 0) {
      const rootNode = nodes.find(node => node.parentId === null);
      const rootId = rootNode ? rootNode.id : null;
      
      const positionedNodes = calculateLayout(nodes, connections);
      
      const newState = {
        nodes: positionedNodes,
        connections,
        selectedNode: state.selectedNode,
        rootNode: rootId
      };
      
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newState);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      setState(newState);
    } else {
      setState(initialState);
    }
  }, [state.selectedNode, history, historyIndex]);

  const updateInputText = useCallback((text: string) => {
    setInputText(text);
    parseInput(text);
  }, [parseInput]);

  const selectNode = useCallback((nodeId: string | null) => {
    setState(prevState => ({
      ...prevState,
      selectedNode: nodeId
    }));
  }, []);

  const updateNodePosition = useCallback((nodeId: string, x: number, y: number) => {
    setState(prevState => {
      const updatedNodes = prevState.nodes.map(node => 
        node.id === nodeId ? { ...node, x, y } : node
      );
      
      return {
        ...prevState,
        nodes: updatedNodes
      };
    });
  }, []);

  const updateNodeText = useCallback((nodeId: string, newText: string) => {
    setState(prevState => {
      const updatedNodes = prevState.nodes.map(node => 
        node.id === nodeId ? { ...node, text: newText } : node
      );
      
      const newState = {
        ...prevState,
        nodes: updatedNodes
      };
      
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newState);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      return newState;
    });
    
    const generateTextFromNodes = () => {
      const lines: string[] = [];
      const nodeMap = new Map<string, Node>();
      
      state.nodes.forEach(node => nodeMap.set(node.id, node));
      
      const buildTextRecursive = (nodeId: string | null, level: number) => {
        if (nodeId === null) return;
        
        const node = nodeMap.get(nodeId);
        if (!node || node.withdrawn) return;
        
        const indentation = "  ".repeat(level);
        lines.push(`${indentation}${node.text}`);
        
        state.connections
          .filter(conn => conn.source === nodeId)
          .forEach(conn => buildTextRecursive(conn.target, level + 1));
      };
      
      if (state.rootNode) {
        buildTextRecursive(state.rootNode, 0);
      }
      
      return lines.join('\n');
    };
    
    setInputText(generateTextFromNodes());
  }, [state.nodes, state.connections, state.rootNode, history, historyIndex]);

  const addNode = useCallback((parentId: string, text: string) => {
    const nodeId = crypto.randomUUID();
    const parentNode = state.nodes.find(node => node.id === parentId);
    
    if (!parentNode) return;
    
    setState(prevState => {
      const newNode: Node = {
        id: nodeId,
        text,
        parentId,
        level: parentNode.level + 1,
        color: parentNode.color,
        x: parentNode.x + 100,
        y: parentNode.y + 50
      };
      
      const newConnection: Connection = {
        source: parentId,
        target: nodeId
      };
      
      const newState = {
        ...prevState,
        nodes: [...prevState.nodes, newNode],
        connections: [...prevState.connections, newConnection],
        selectedNode: nodeId
      };
      
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newState);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      return newState;
    });
  }, [state.nodes, history, historyIndex]);

  const deleteNode = useCallback((nodeId: string) => {
    if (nodeId === state.rootNode) return;
    
    setState(prevState => {
      const nodesToDelete = new Set<string>();
      
      const findDescendants = (id: string) => {
        nodesToDelete.add(id);
        prevState.connections
          .filter(conn => conn.source === id)
          .forEach(conn => findDescendants(conn.target));
      };
      
      findDescendants(nodeId);
      
      const updatedNodes = prevState.nodes.filter(node => !nodesToDelete.has(node.id));
      const updatedConnections = prevState.connections.filter(
        conn => !nodesToDelete.has(conn.source) && !nodesToDelete.has(conn.target)
      );
      
      const newState = {
        ...prevState,
        nodes: updatedNodes,
        connections: updatedConnections,
        selectedNode: null
      };
      
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newState);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      return newState;
    });
  }, [state.rootNode, history, historyIndex]);

  const withdrawNode = useCallback((nodeId: string) => {
    setState(prevState => {
      const updatedNodes = prevState.nodes.map(node => 
        node.id === nodeId ? { ...node, withdrawn: !node.withdrawn } : node
      );
      
      const newState = {
        ...prevState,
        nodes: updatedNodes
      };
      
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newState);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      return newState;
    });
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setState(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setState(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const exportAsPng = useCallback(() => {
    return true;
  }, []);

  const updateNodeColor = useCallback((nodeId: string, color: string) => {
    setState(prevState => {
      const updatedNodes = prevState.nodes.map(node => 
        node.id === nodeId ? { ...node, color } : node
      );
      
      const newState = {
        ...prevState,
        nodes: updatedNodes
      };
      
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newState);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      return newState;
    });
  }, [history, historyIndex]);

  const updateNodeTextColor = useCallback((nodeId: string, textColor: string) => {
    setState(prevState => {
      const updatedNodes = prevState.nodes.map(node => 
        node.id === nodeId ? { ...node, textColor } : node
      );
      
      const newState = {
        ...prevState,
        nodes: updatedNodes
      };
      
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newState);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      return newState;
    });
  }, [history, historyIndex]);

  return {
    state,
    inputText,
    updateInputText,
    selectNode,
    updateNodePosition,
    updateNodeText,
    addNode,
    deleteNode,
    withdrawNode,
    undo,
    redo,
    exportAsPng,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    updateNodeColor,
    updateNodeTextColor
  };
}