// Quick setup checker script
import { existsSync } from 'fs';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Checking backend setup...\n');

// Check .env file
const envPath = join(__dirname, '.env');
if (!existsSync(envPath)) {
  console.error('❌ .env file not found!');
  console.error('   Please create a .env file in the backend folder.');
  process.exit(1);
} else {
  console.log('✅ .env file exists');
  
  // Check .env content
  try {
    const envContent = readFileSync(envPath, 'utf8');
    const hasMongoUri = envContent.includes('MONGO_URI=') && !envContent.includes('MONGO_URI=your_mongodb');
    const hasJwtSecret = envContent.includes('JWT_SECRET=') && !envContent.includes('JWT_SECRET=your_super_secret');
    
    if (!hasMongoUri) {
      console.error('❌ MONGO_URI not set or still has placeholder value');
    } else {
      console.log('✅ MONGO_URI is set');
    }
    
    if (!hasJwtSecret) {
      console.error('❌ JWT_SECRET not set or still has placeholder value');
    } else {
      console.log('✅ JWT_SECRET is set');
    }
  } catch (err) {
    console.error('❌ Error reading .env file:', err.message);
  }
}

// Check node_modules
const nodeModulesPath = join(__dirname, 'node_modules');
if (!existsSync(nodeModulesPath)) {
  console.error('❌ node_modules not found!');
  console.error('   Run: npm install');
  process.exit(1);
} else {
  console.log('✅ node_modules exists');
}

// Check nodemon
const nodemonPath = join(nodeModulesPath, 'nodemon');
if (!existsSync(nodemonPath)) {
  console.error('❌ nodemon not found in node_modules!');
  console.error('   Run: npm install');
  process.exit(1);
} else {
  console.log('✅ nodemon is installed');
}

console.log('\n✅ Setup check complete!');
console.log('   You can now run: npm run dev');

