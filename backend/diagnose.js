// Diagnostic script to check backend setup
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Diagnosing Backend Setup...\n');

let hasErrors = false;

// Check 1: .env file
console.log('1. Checking .env file...');
const envPath = join(__dirname, '.env');
if (!existsSync(envPath)) {
  console.error('   ❌ .env file NOT FOUND');
  console.error('   → Create a .env file in the backend folder');
  hasErrors = true;
} else {
  console.log('   ✅ .env file exists');
  
  // Check content
  try {
    const envContent = readFileSync(envPath, 'utf8');
    if (!envContent.includes('MONGO_URI=') || envContent.includes('MONGO_URI=your_mongodb')) {
      console.error('   ❌ MONGO_URI not properly set');
      hasErrors = true;
    } else {
      console.log('   ✅ MONGO_URI is set');
    }
    
    if (!envContent.includes('JWT_SECRET=') || envContent.includes('JWT_SECRET=your_super_secret')) {
      console.error('   ❌ JWT_SECRET not properly set');
      hasErrors = true;
    } else {
      console.log('   ✅ JWT_SECRET is set');
    }
  } catch (err) {
    console.error('   ❌ Error reading .env:', err.message);
    hasErrors = true;
  }
}

// Check 2: node_modules
console.log('\n2. Checking dependencies...');
const nodeModulesPath = join(__dirname, 'node_modules');
if (!existsSync(nodeModulesPath)) {
  console.error('   ❌ node_modules NOT FOUND');
  console.error('   → Run: npm install');
  hasErrors = true;
} else {
  console.log('   ✅ node_modules exists');
}

// Check 3: nodemon
console.log('\n3. Checking nodemon...');
const nodemonPath = join(__dirname, 'node_modules', 'nodemon');
if (!existsSync(nodemonPath)) {
  console.error('   ❌ nodemon NOT FOUND');
  console.error('   → Run: npm install');
  hasErrors = true;
} else {
  console.log('   ✅ nodemon is installed');
}

// Check 4: package.json
console.log('\n4. Checking package.json...');
const packagePath = join(__dirname, 'package.json');
if (!existsSync(packagePath)) {
  console.error('   ❌ package.json NOT FOUND');
  hasErrors = true;
} else {
  console.log('   ✅ package.json exists');
  try {
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
    if (!packageJson.scripts || !packageJson.scripts.dev) {
      console.error('   ❌ "dev" script not found in package.json');
      hasErrors = true;
    } else {
      console.log('   ✅ "dev" script exists');
    }
  } catch (err) {
    console.error('   ❌ Error reading package.json:', err.message);
    hasErrors = true;
  }
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.error('❌ Setup issues found. Please fix the errors above.');
  console.log('\nQuick fixes:');
  console.log('1. Create .env file with MONGO_URI and JWT_SECRET');
  console.log('2. Run: npm install');
  process.exit(1);
} else {
  console.log('✅ All checks passed!');
  console.log('\nYou can now run: npm run dev');
  process.exit(0);
}

