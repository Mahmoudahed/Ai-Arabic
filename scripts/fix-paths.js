const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Function to get all files recursively
async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = path.resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.flat();
}

// Function to fix imports in a file
async function fixImportsInFile(filePath) {
  try {
    // Skip node_modules
    if (filePath.includes('node_modules')) {
      return false;
    }

    // Only process TypeScript and JavaScript files
    if (!filePath.match(/\.(tsx?|jsx?)$/)) {
      return false;
    }

    const content = await readFile(filePath, 'utf8');
    const srcDir = path.resolve('./src');
    
    // Regex patterns to match different import patterns with @/
    const importPatterns = [
      // Standard import statement: import X from '@/path'
      /import\s+(?:(?:\{[^}]*\})|(?:[^{}\s]+))\s+from\s+['"]@\/([^'"]+)['"]/g,
      
      // Dynamic import: import('@/path')
      /import\s*\(\s*['"]@\/([^'"]+)['"]\s*\)/g,

      // Simple string paths: '@/path'
      /['"]@\/([^'"]+)['"]/g
    ];
    
    let modified = false;
    let newContent = content;
    
    // For each pattern, replace with a relative path
    for (const pattern of importPatterns) {
      const matches = Array.from(content.matchAll(pattern));
      
      for (const match of matches) {
        const importPath = match[1];
        const targetPath = path.resolve(srcDir, importPath);
        
        // Calculate relative path from current file to target file
        const fileDir = path.dirname(filePath);
        let relativeDirPath = path.relative(fileDir, path.dirname(targetPath));
        
        // Ensure path starts with ./ or ../
        if (!relativeDirPath.startsWith('.')) {
          relativeDirPath = './' + relativeDirPath;
        }
        
        // Complete the path with the file name
        let relativePath = path.join(relativeDirPath, path.basename(targetPath));
        
        // Replace \ with / for Windows file paths
        relativePath = relativePath.replace(/\\/g, '/');
        
        // Replace the import statement
        const oldImport = match[0];
        const newImport = oldImport.replace(`@/${importPath}`, relativePath);
        
        if (oldImport !== newImport) {
          newContent = newContent.replace(oldImport, newImport);
          console.log(`  ${filePath}: ${oldImport} -> ${newImport}`);
          modified = true;
        }
      }
    }
    
    if (modified) {
      await writeFile(filePath, newContent, 'utf8');
      console.log(`Fixed imports in: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return false;
  }
}

// Special manual fixes for problematic files
async function applyManualFixes() {
  const providersPath = path.resolve('./src/app/providers.tsx');
  const registerPath = path.resolve('./src/app/register/page.tsx');
  
  try {
    // Fix providers.tsx
    if (fs.existsSync(providersPath)) {
      let content = await readFile(providersPath, 'utf8');
      content = content.replace("@/components/ui/tooltip", "../components/ui/tooltip");
      content = content.replace("@/components/ui/toasters", "../components/ui/toasters");
      content = content.replace("@/components/ui/sonner", "../components/ui/sonner");
      await writeFile(providersPath, content, 'utf8');
      console.log('Applied manual fix to providers.tsx');
    }
    
    // Fix register/page.tsx
    if (fs.existsSync(registerPath)) {
      let content = await readFile(registerPath, 'utf8');
      content = content.replace("@/lib/auth", "../../lib/auth");
      content = content.replace("@/app/i18n/client", "../i18n/client");
      await writeFile(registerPath, content, 'utf8');
      console.log('Applied manual fix to register/page.tsx');
    }
  } catch (error) {
    console.error('Error applying manual fixes:', error);
  }
}

async function main() {
  try {
    console.log('Applying manual fixes for known problematic files...');
    await applyManualFixes();
    
    console.log('Scanning all files for @/ import paths...');
    const srcPath = path.resolve('./src');
    const files = await getFiles(srcPath);
    
    let fixedCount = 0;
    
    for (const file of files) {
      const fixed = await fixImportsInFile(file);
      if (fixed) fixedCount++;
    }
    
    console.log(`\nSummary: Fixed imports in ${fixedCount} files.`);
  } catch (error) {
    console.error('Error fixing imports:', error);
  }
}

main(); 