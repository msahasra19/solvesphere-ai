#!/usr/bin/env node

/**
 * SolveSphere AI - Setup Test Script
 * This script checks if your environment is ready for testing
 */

const fs = require('fs');
const path = require('path');

console.log('\n🚀 SolveSphere AI - Setup Verification\n');
console.log('=' .repeat(50));

let allGood = true;

// Check 1: Node.js version
console.log('\n✓ Checking Node.js version...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
if (majorVersion >= 18) {
  console.log(`  ✅ Node.js ${nodeVersion} (Required: 18+)`);
} else {
  console.log(`  ❌ Node.js ${nodeVersion} (Required: 18+)`);
  console.log('     Please upgrade Node.js: https://nodejs.org/');
  allGood = false;
}

// Check 2: package.json exists
console.log('\n✓ Checking package.json...');
if (fs.existsSync('package.json')) {
  console.log('  ✅ package.json found');
} else {
  console.log('  ❌ package.json not found');
  allGood = false;
}

// Check 3: node_modules exists
console.log('\n✓ Checking dependencies...');
if (fs.existsSync('node_modules')) {
  console.log('  ✅ node_modules found');
} else {
  console.log('  ⚠️  node_modules not found');
  console.log('     Run: npm install');
  allGood = false;
}

// Check 4: .env file exists
console.log('\n✓ Checking environment configuration...');
if (fs.existsSync('.env')) {
  console.log('  ✅ .env file found');
  
  // Read .env and check for required variables
  const envContent = fs.readFileSync('.env', 'utf8');
  
  const hasMongoURI = envContent.includes('MONGODB_URI=') && 
                      !envContent.includes('MONGODB_URI=mongodb://localhost:27017/solvesphere-ai');
  const hasOpenAI = envContent.includes('OPENAI_API_KEY=') && 
                    !envContent.includes('OPENAI_API_KEY=sk-your');
  
  if (hasMongoURI) {
    console.log('  ✅ MongoDB URI configured');
  } else {
    console.log('  ⚠️  MongoDB URI not configured (optional for UI testing)');
  }
  
  if (hasOpenAI) {
    console.log('  ✅ OpenAI API key configured');
  } else {
    console.log('  ⚠️  OpenAI API key not configured (optional for UI testing)');
  }
} else {
  console.log('  ⚠️  .env file not found');
  console.log('     Copy .env.example to .env and configure');
}

// Check 5: Required directories
console.log('\n✓ Checking project structure...');
const requiredDirs = ['app', 'components', 'models', 'lib', 'public'];
let dirsOk = true;
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`  ✅ ${dir}/ directory found`);
  } else {
    console.log(`  ❌ ${dir}/ directory missing`);
    dirsOk = false;
  }
});
if (!dirsOk) allGood = false;

// Check 6: Key files
console.log('\n✓ Checking key files...');
const keyFiles = [
  'app/page.tsx',
  'app/layout.tsx',
  'tailwind.config.ts',
  'next.config.ts'
];
let filesOk = true;
keyFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file} found`);
  } else {
    console.log(`  ❌ ${file} missing`);
    filesOk = false;
  }
});
if (!filesOk) allGood = false;

// Summary
console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('\n✅ All checks passed! You\'re ready to start testing.\n');
  console.log('Next steps:');
  console.log('  1. Configure .env file (if not done)');
  console.log('  2. Run: npm run dev');
  console.log('  3. Open: http://localhost:3000');
  console.log('\nFor detailed testing guide, see: TESTING_GUIDE.md\n');
} else {
  console.log('\n⚠️  Some checks failed. Please fix the issues above.\n');
  console.log('Quick fixes:');
  console.log('  - Run: npm install');
  console.log('  - Copy .env.example to .env');
  console.log('  - Check Node.js version\n');
}

console.log('=' .repeat(50) + '\n');

// Made with Bob
