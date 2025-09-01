#!/usr/bin/env node

// Test script to verify Telegram bot setup
const { config } = require('dotenv');

console.log('🧪 Testing ScoreHouse AI Dev Team Bot Setup...\n');

// Load environment variables
config();

// Check required environment variables
const requiredVars = [
  'TELEGRAM_BOT_TOKEN',
  'LINEAR_API_KEY', 
  'GITHUB_TOKEN'
];

let allGood = true;

console.log('📋 Environment Variables Check:');
console.log('================================');

for (const varName of requiredVars) {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 10)}...`);
  } else {
    console.log(`❌ ${varName}: MISSING`);
    allGood = false;
  }
}

console.log('\n📦 Dependencies Check:');
console.log('=====================');

try {
  require('node-telegram-bot-api');
  console.log('✅ node-telegram-bot-api: OK');
} catch (e) {
  console.log('❌ node-telegram-bot-api: MISSING');
  allGood = false;
}

try {
  require('node-fetch');
  console.log('✅ node-fetch: OK');
} catch (e) {
  console.log('❌ node-fetch: MISSING');
  allGood = false;
}

try {
  require('dotenv');
  console.log('✅ dotenv: OK');
} catch (e) {
  console.log('❌ dotenv: MISSING');
  allGood = false;
}

console.log('\n🔨 TypeScript Build Check:');
console.log('=========================');

const fs = require('fs');
const path = require('path');

if (fs.existsSync(path.join(__dirname, 'dist', 'index.js'))) {
  console.log('✅ Compiled JavaScript exists');
} else {
  console.log('❌ Compiled JavaScript missing - run: npm run build');
  allGood = false;
}

console.log('\n📊 Summary:');
console.log('===========');

if (allGood) {
  console.log('🎉 All checks passed! Your bot is ready to run.');
  console.log('🚀 Start with: npm start');
} else {
  console.log('❌ Some checks failed. Please fix the issues above.');
  console.log('📖 See README.md for setup instructions.');
}

process.exit(allGood ? 0 : 1);
