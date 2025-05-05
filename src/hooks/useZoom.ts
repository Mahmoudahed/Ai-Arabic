import { useState, useCallback, useEffect, RefObject } from 'react';

export const useZoom = (containerRef: RefObject<SVGSVGElement | HTMLDivElement | null>) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  const handleZoomIn = useCallback(() => {
    setZoom(prevZoom => Math.min(prevZoom + 0.1, 2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const startPanning = useCallback((e: React.MouseEvent) => {
    if (e.button !== 1 && e.button !== 0) return; // Only middle mouse button or left click with spacebar
    setIsPanning(true);
    setStartPan({ x: e.clientX, y: e.clientY });
  }, []);

  const handlePanning = useCallback((e: MouseEvent) => {
    if (!isPanning) return;
    
    const deltaX = e.clientX - startPan.x;
    const deltaY = e.clientY - startPan.y;
    
    setPan(prevPan => ({
      x: prevPan.x + deltaX,
      y: prevPan.y + deltaY,
    }));
    
    setStartPan({ x: e.clientX, y: e.clientY });
  }, [isPanning, startPan]);

  const stopPanning = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Wheel event for zooming
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    const delta = e.deltaY < 0 ? 0.05 : -0.05;
    const newZoom = Math.max(0.5, Math.min(2, zoom + delta));
    
    if (newZoom !== zoom) {
      setZoom(newZoom);
    }
  }, [zoom]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener('mousemove', handlePanning);
    window.addEventListener('mouseup', stopPanning);
    
    return () => {
      container.removeEventListener('wheel', handleWheel as unknown as EventListener);
      window.removeEventListener('mousemove', handlePanning);
      window.removeEventListener('mouseup', stopPanning);
    };
  }, [containerRef, handleWheel, handlePanning, stopPanning]);

  const getTransformStyle = useCallback(() => {
    return `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;
  }, [pan, zoom]);

  return {
    zoom,
    pan,
    isPanning,
    startPanning,
    handleZoomIn,
    handleZoomOut,
    handleReset,
    getTransformStyle,
  };
};