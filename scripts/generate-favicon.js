const favicons = require('favicons');
const fs = require('fs');
const path = require('path');

const SOURCE = path.resolve(__dirname, '../public/ai-icon.svg');
const TARGET = path.resolve(__dirname, '../src/app');

const configuration = {
  path: '/',
  appName: 'AI Assistant',
  appShortName: 'AI Assistant',
  appDescription: 'AI Services and Assistance',
  background: '#4F46E5',
  theme_color: '#4F46E5',
  appleStatusBarStyle: 'black-translucent',
  display: 'standalone',
  scope: '/',
  start_url: '/',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    favicons: true,
    windows: true,
  }
};

console.log('Generating favicon...');
console.log(`Source: ${SOURCE}`);
console.log(`Target: ${TARGET}`);

favicons(SOURCE, configuration)
  .then((response) => {
    // Create files
    console.log('Saving favicon files...');
    
    // Find the favicon.ico in the images list
    const faviconFile = response.images.find(image => image.name === 'favicon.ico');
    
    if (faviconFile) {
      fs.writeFileSync(path.join(TARGET, 'favicon.ico'), faviconFile.contents);
      console.log(`Favicon saved to ${path.join(TARGET, 'favicon.ico')}`);
    } else {
      console.error('favicon.ico not found in generated files');
    }
    
    // Save the rest of the icons to a public/icons directory
    if (!fs.existsSync(path.join(__dirname, '../public/icons'))) {
      fs.mkdirSync(path.join(__dirname, '../public/icons'), { recursive: true });
    }
    
    response.images.forEach(image => {
      if (image.name !== 'favicon.ico') {
        fs.writeFileSync(path.join(__dirname, '../public/icons', image.name), image.contents);
        console.log(`Saved ${image.name}`);
      }
    });
    
    // Save HTML files with meta tags
    response.files.forEach(file => {
      fs.writeFileSync(path.join(__dirname, '../public/icons', file.name), file.contents);
      console.log(`Saved ${file.name}`);
    });
    
    console.log('Favicon generation complete!');
  })
  .catch((error) => {
    console.error(error);
  }); 