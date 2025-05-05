const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Function to check for common issues in build output
async function checkBuildOutput() {
  console.log('Checking build output for common issues...');
  
  // 1. Check if the build directory exists
  if (!fs.existsSync(path.resolve('./out'))) {
    console.error('Build directory not found. Build may have failed.');
    return false;
  }
  
  // 2. Check for the main HTML file
  if (!fs.existsSync(path.resolve('./out/index.html'))) {
    console.error('index.html not found in build directory.');
    return false;
  }
  
  console.log('Build output seems valid.');
  return true;
}

// Function to check for missing dependencies
function checkDependencies() {
  console.log('Checking for missing dependencies...');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    // Check for common missing dependencies
    const recommendedDeps = {
      typescript: '^5.0.0',
      '@types/node': '^18.0.0',
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
    };
    
    const missingDeps = [];
    for (const [dep, version] of Object.entries(recommendedDeps)) {
      if (!dependencies[dep]) {
        missingDeps.push(`${dep}@${version}`);
      }
    }
    
    if (missingDeps.length > 0) {
      console.warn('Some recommended dependencies are missing:');
      missingDeps.forEach(dep => console.warn(`  - ${dep}`));
      console.warn('Consider installing them with:');
      console.warn(`  npm install --save-dev ${missingDeps.join(' ')}`);
    } else {
      console.log('All recommended dependencies are installed.');
    }
  } catch (error) {
    console.error('Error checking dependencies:', error);
  }
}

// Function to check for path alias issues
async function checkPathAliases() {
  console.log('Checking for path alias usage...');
  
  try {
    // Try using grep to find @/ imports
    try {
      const result = execSync('grep -r "import.*from.*@/" --include="*.{ts,tsx,js,jsx}" src').toString();
      console.error('Found potential path alias issues:');
      console.error(result);
      return false;
    } catch (error) {
      // If grep returns non-zero, it means no matches were found, which is good
      console.log('No path alias issues found.');
      return true;
    }
  } catch (error) {
    console.error('Error checking path aliases:', error);
    return false;
  }
}

// Function to create a deployment checklist
async function createDeploymentChecklist() {
  console.log('Creating deployment checklist...');
  
  const checklist = `# Deployment Checklist

## Pre-deployment
- [ ] Run \`npm run fix-paths\` to convert @/ imports to relative paths
- [ ] Make sure vercel.json is up to date
- [ ] Ensure .npmrc contains legacy-peer-deps=true
- [ ] Update build and install commands in Vercel dashboard

## Common issues
- Path aliases: Make sure all @/ imports are converted to relative paths
- Dependencies: Make sure all dependencies are installed, including types
- Module resolution: Check for correct import paths (starting with ./ for local files)
- Build output: Verify that the build produces an out directory with index.html

## Post-deployment
- [ ] Check build logs for errors
- [ ] Test all pages on the deployed site
- [ ] Verify API routes are working
- [ ] Test on mobile devices
`;

  await writeFile(path.resolve('./DEPLOYMENT.md'), checklist, 'utf8');
  console.log('Deployment checklist created at DEPLOYMENT.md');
}

async function main() {
  console.log('Running post-build checks...');
  
  // Run all checks
  const buildValid = await checkBuildOutput();
  checkDependencies();
  const pathAliasesValid = await checkPathAliases();
  await createDeploymentChecklist();
  
  // Summary
  console.log('\n=== Check Summary ===');
  console.log(`Build output: ${buildValid ? '✅ Valid' : '❌ Issues found'}`);
  console.log(`Path aliases: ${pathAliasesValid ? '✅ No issues' : '❌ Issues found'}`);
  
  if (!buildValid || !pathAliasesValid) {
    console.error('\n⚠️ Some issues were found. Please address them before deploying.');
    process.exit(1);
  } else {
    console.log('\n✅ All checks passed! Ready for deployment.');
  }
}

main().catch(error => {
  console.error('Error running post-build checks:', error);
  process.exit(1);
}); 