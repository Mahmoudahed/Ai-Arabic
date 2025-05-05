export const exportAsPNG = (svgElement: SVGSVGElement, fileName: string = 'mindmap'): void => {
  const svg = svgElement.cloneNode(true) as SVGSVGElement;
  
  // Get the computed style of the original SVG and apply it to the clone
  const computedStyle = getComputedStyle(svgElement);
  svg.setAttribute('width', computedStyle.width);
  svg.setAttribute('height', computedStyle.height);
  
  // Convert SVG to a data URL
  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  
  // Create an image from the SVG data URL
  const img = new Image();
  img.onload = () => {
    // Create a canvas to draw the image
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Draw the image on the canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      // Convert the canvas to a data URL and trigger download
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${fileName}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
    
    // Clean up
    URL.revokeObjectURL(url);
  };
  
  img.src = url;
};