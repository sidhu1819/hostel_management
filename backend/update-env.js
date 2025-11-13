// Script to update .env file with MongoDB connection string
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('📝 MongoDB Connection String Setup\n');

rl.question('Enter your MongoDB connection string: ', (mongoUri) => {
  if (!mongoUri || mongoUri.trim() === '') {
    console.error('❌ Connection string cannot be empty!');
    process.exit(1);
  }

  // Generate a random JWT secret
  const jwtSecret = 'hostel_management_secret_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '_' + Date.now();

  const envContent = `PORT=5000
MONGO_URI=${mongoUri.trim()}
JWT_SECRET=${jwtSecret}
OPENAI_API_KEY=your_openai_api_key_here
`;

  const envPath = join(__dirname, '.env');
  
  try {
    writeFileSync(envPath, envContent, 'utf8');
    console.log('\n✅ .env file updated successfully!');
    console.log('\n📋 Your .env file:');
    console.log('-'.repeat(50));
    console.log(envContent);
    console.log('-'.repeat(50));
    console.log('\n🚀 You can now run: npm run dev');
    rl.close();
  } catch (error) {
    console.error('❌ Error writing .env file:', error.message);
    rl.close();
    process.exit(1);
  }
});

