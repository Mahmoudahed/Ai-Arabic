const fs = require('fs');
const path = require('path');
const svg2img = require('svg2img');

// Read the SVG file
const svgContent = fs.readFileSync(path.resolve(__dirname, '../public/ai-icon.svg'), 'utf8');

// Convert to different sizes for favicon
const sizes = [16, 32, 48, 64, 128, 256];

// Ensure the output directory exists
const outputDir = path.resolve(__dirname, '../public/icons');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create PNGs of different sizes
sizes.forEach(size => {
  svg2img(svgContent, { width: size, height: size }, (error, buffer) => {
    if (error) {
      console.error(`Error converting to ${size}x${size}:`, error);
      return;
    }
    
    const outputPath = path.join(outputDir, `favicon-${size}x${size}.png`);
    fs.writeFileSync(outputPath, buffer);
    console.log(`Created ${outputPath}`);
  });
});

console.log('Icon conversion started...'); 