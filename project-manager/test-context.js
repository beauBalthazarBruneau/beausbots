#!/usr/bin/env node

// Simple test to verify the MCP server can read project context
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testProjectContext() {
  console.log('🧪 Testing BeausBots project context...\n');

  const projectsDir = path.join(__dirname, 'projects');
  const beausbotsProjDir = path.join(projectsDir, 'beausbots');
  const configPath = path.join(beausbotsProjDir, 'config.json');
  const contextPath = path.join(beausbotsProjDir, 'context.md');

  try {
    // Check if beausbots project exists
    console.log('📁 Checking beausbots project...');
    
    const configExists = await fs.access(configPath).then(() => true).catch(() => false);
    const contextExists = await fs.access(contextPath).then(() => true).catch(() => false);
    
    console.log(`✅ config.json: ${configExists ? 'Found' : 'Missing'}`);
    console.log(`✅ context.md: ${contextExists ? 'Found' : 'Missing'}`);

    if (configExists && contextExists) {
      // Read and display content
      const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
      const context = await fs.readFile(contextPath, 'utf-8');
      
      console.log('\n📋 Project Configuration:');
      console.log(`- Name: ${config.name}`);
      console.log(`- Description: ${config.description}`);
      console.log(`- Tech Stack: ${config.tech_stack.join(', ') || 'Not specified'}`);
      
      console.log('\n📝 Context Preview:');
      const contextPreview = context.split('\n').slice(0, 5).join('\n');
      console.log(contextPreview + '...');
      
      console.log('\n🎉 BeausBots project context is ready!');
      console.log('\nNext: Configure Claude Desktop and test with:');
      console.log('"Let\'s add a new feature to beausbots"');
    } else {
      console.log('\n❌ BeausBots project files missing');
      console.log('Run the build script to set up the project structure');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testProjectContext();
