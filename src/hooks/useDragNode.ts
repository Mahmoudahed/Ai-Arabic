import { useState, useCallback, RefObject } from 'react';
import { MindMapNode } from '../types';

interface DragState {
  isDragging: boolean;
  nodeId: string | null;
  startX: number;
  startY: number;
  initialNodeX: number;
  initialNodeY: number;
}

export const useDragNode = (
  containerRef: RefObject<SVGSVGElement | HTMLDivElement | null>,
  updateNode: (id: string, updates: Partial<MindMapNode>) => void
) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    nodeId: null,
    startX: 0,
    startY: 0,
    initialNodeX: 0,
    initialNodeY: 0,
  });

  const startDrag = useCallback(
    (
      e: React.MouseEvent | React.TouchEvent,
      nodeId: string,
      initialX: number,
      initialY: number
    ) => {
      e.stopPropagation();
      
      let clientX = 0;
      let clientY = 0;
      
      if ('touches' in e) {
        // Touch event
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        // Mouse event
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      setDragState({
        isDragging: true,
        nodeId,
        startX: clientX,
        startY: clientY,
        initialNodeX: initialX,
        initialNodeY: initialY,
      });
    },
    []
  );

  const handleDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!dragState.isDragging || !dragState.nodeId) return;
      
      let clientX = 0;
      let clientY = 0;
      
      if ('touches' in e) {
        // Touch event
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        // Mouse event
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      const deltaX = clientX - dragState.startX;
      const deltaY = clientY - dragState.startY;
      
      const newX = dragState.initialNodeX + deltaX;
      const newY = dragState.initialNodeY + deltaY;
      
      updateNode(dragState.nodeId, { x: newX, y: newY });
    },
    [dragState, updateNode]
  );

  const endDrag = useCallback(() => {
    setDragState({
      isDragging: false,
      nodeId: null,
      startX: 0,
      startY: 0,
      initialNodeX: 0,
      initialNodeY: 0,
    });
  }, []);

  return {
    startDrag,
    handleDrag,
    endDrag,
    isDragging: dragState.isDragging,
  };
};