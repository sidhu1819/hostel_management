// Comprehensive setup verification script
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Verifying Complete Project Setup...\n');
console.log('='.repeat(60));

let allGood = true;
const issues = [];

// Backend Checks
console.log('\n📦 BACKEND VERIFICATION');
console.log('-'.repeat(60));

// Check backend package.json
const backendPackage = join(__dirname, 'backend', 'package.json');
if (existsSync(backendPackage)) {
  console.log('✅ backend/package.json exists');
  try {
    const pkg = JSON.parse(readFileSync(backendPackage, 'utf8'));
    const requiredDeps = ['express', 'mongoose', 'bcrypt', 'jsonwebtoken', 'cors', 'dotenv'];
    const missingDeps = requiredDeps.filter(dep => !pkg.dependencies[dep]);
    if (missingDeps.length === 0) {
      console.log('✅ All required dependencies in package.json');
    } else {
      console.log('❌ Missing dependencies:', missingDeps.join(', '));
      issues.push('Backend missing dependencies');
      allGood = false;
    }
  } catch (err) {
    console.log('❌ Error reading package.json');
    issues.push('Backend package.json error');
    allGood = false;
  }
} else {
  console.log('❌ backend/package.json NOT FOUND');
  issues.push('Backend package.json missing');
  allGood = false;
}

// Check backend files
const backendFiles = [
  'server.js',
  'controllers/authController.js',
  'controllers/roomController.js',
  'controllers/ticketController.js',
  'controllers/aiController.js',
  'models/Student.js',
  'models/Room.js',
  'models/Ticket.js',
  'routes/authRoutes.js',
  'routes/roomRoutes.js',
  'routes/ticketRoutes.js',
  'routes/aiRoutes.js',
  'middleware/authMiddleware.js'
];

console.log('\nChecking backend files...');
backendFiles.forEach(file => {
  const filePath = join(__dirname, 'backend', file);
  if (existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} MISSING`);
    issues.push(`Backend file missing: ${file}`);
    allGood = false;
  }
});

// Check backend .env
const backendEnv = join(__dirname, 'backend', '.env');
if (existsSync(backendEnv)) {
  console.log('✅ backend/.env exists');
  try {
    const envContent = readFileSync(backendEnv, 'utf8');
    if (!envContent.includes('MONGO_URI=') || envContent.includes('MONGO_URI=your_mongodb')) {
      console.log('⚠️  MONGO_URI may not be properly configured');
      issues.push('Backend MONGO_URI needs configuration');
    } else {
      console.log('✅ MONGO_URI appears to be set');
    }
    if (!envContent.includes('JWT_SECRET=') || envContent.includes('JWT_SECRET=your_super_secret')) {
      console.log('⚠️  JWT_SECRET may not be properly configured');
      issues.push('Backend JWT_SECRET needs configuration');
    } else {
      console.log('✅ JWT_SECRET appears to be set');
    }
  } catch (err) {
    console.log('⚠️  Could not read .env file');
  }
} else {
  console.log('❌ backend/.env NOT FOUND');
  issues.push('Backend .env file missing');
  allGood = false;
}

// Check backend node_modules
const backendNodeModules = join(__dirname, 'backend', 'node_modules');
if (existsSync(backendNodeModules)) {
  console.log('✅ backend/node_modules exists');
} else {
  console.log('⚠️  backend/node_modules NOT FOUND - Run: npm install');
  issues.push('Backend dependencies not installed');
}

// Frontend Checks
console.log('\n\n🌐 FRONTEND VERIFICATION');
console.log('-'.repeat(60));

// Check frontend package.json
const frontendPackage = join(__dirname, 'frontend', 'package.json');
if (existsSync(frontendPackage)) {
  console.log('✅ frontend/package.json exists');
  try {
    const pkg = JSON.parse(readFileSync(frontendPackage, 'utf8'));
    const requiredDeps = ['react', 'react-dom', 'react-router-dom', 'axios'];
    const missingDeps = requiredDeps.filter(dep => !pkg.dependencies[dep]);
    if (missingDeps.length === 0) {
      console.log('✅ All required dependencies in package.json');
    } else {
      console.log('❌ Missing dependencies:', missingDeps.join(', '));
      issues.push('Frontend missing dependencies');
      allGood = false;
    }
  } catch (err) {
    console.log('❌ Error reading package.json');
    issues.push('Frontend package.json error');
    allGood = false;
  }
} else {
  console.log('❌ frontend/package.json NOT FOUND');
  issues.push('Frontend package.json missing');
  allGood = false;
}

// Check frontend files
const frontendFiles = [
  'src/App.jsx',
  'src/main.jsx',
  'src/index.css',
  'src/api/axiosConfig.js',
  'src/components/Navbar.jsx',
  'src/components/ProtectedRoute.jsx',
  'src/components/Loader.jsx',
  'src/pages/Login.jsx',
  'src/pages/Register.jsx',
  'src/pages/Dashboard.jsx',
  'src/pages/Rooms.jsx',
  'src/pages/Tickets.jsx',
  'src/pages/AI.jsx',
  'vite.config.js',
  'tailwind.config.js',
  'index.html'
];

console.log('\nChecking frontend files...');
frontendFiles.forEach(file => {
  const filePath = join(__dirname, 'frontend', file);
  if (existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} MISSING`);
    issues.push(`Frontend file missing: ${file}`);
    allGood = false;
  }
});

// Check frontend .env
const frontendEnv = join(__dirname, 'frontend', '.env');
if (existsSync(frontendEnv)) {
  console.log('✅ frontend/.env exists');
  try {
    const envContent = readFileSync(frontendEnv, 'utf8');
    if (!envContent.includes('VITE_API_BASE_URL=')) {
      console.log('⚠️  VITE_API_BASE_URL may not be set');
      issues.push('Frontend VITE_API_BASE_URL needs configuration');
    } else {
      console.log('✅ VITE_API_BASE_URL appears to be set');
    }
  } catch (err) {
    console.log('⚠️  Could not read .env file');
  }
} else {
  console.log('⚠️  frontend/.env NOT FOUND (optional, but recommended)');
}

// Check frontend node_modules
const frontendNodeModules = join(__dirname, 'frontend', 'node_modules');
if (existsSync(frontendNodeModules)) {
  console.log('✅ frontend/node_modules exists');
} else {
  console.log('⚠️  frontend/node_modules NOT FOUND - Run: npm install');
  issues.push('Frontend dependencies not installed');
}

// Summary
console.log('\n\n' + '='.repeat(60));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(60));

if (allGood && issues.length === 0) {
  console.log('\n✅ ALL CHECKS PASSED!');
  console.log('\nYour project is ready to run!');
  console.log('\nNext steps:');
  console.log('1. Make sure backend/.env has MONGO_URI and JWT_SECRET configured');
  console.log('2. Run backend: cd backend && npm run dev');
  console.log('3. Run frontend: cd frontend && npm run dev');
  console.log('4. Open browser: http://localhost:3000');
} else {
  console.log('\n⚠️  ISSUES FOUND:');
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });
  console.log('\nPlease fix the issues above before running the application.');
}

console.log('\n' + '='.repeat(60));

