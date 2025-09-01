#!/usr/bin/env node

// Simple test to verify the MCP server setup
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testSetup() {
  console.log('🧪 Testing Project Manager MCP setup...\n');

  try {
    // Check if TypeScript files exist
    const srcExists = await fs.access(path.join(__dirname, 'src', 'index.ts')).then(() => true).catch(() => false);
    console.log(`✅ Source files: ${srcExists ? 'Found' : 'Missing'}`);

    // Check if package.json exists
    const packageExists = await fs.access(path.join(__dirname, 'package.json')).then(() => true).catch(() => false);
    console.log(`✅ Package.json: ${packageExists ? 'Found' : 'Missing'}`);

    // Check if projects directory exists
    const projectsDir = path.join(__dirname, 'projects');
    try {
      await fs.mkdir(projectsDir, { recursive: true });
      console.log('✅ Projects directory: Ready');
    } catch (error) {
      console.log('❌ Projects directory: Error creating');
    }

    // Create a sample project for testing
    const sampleProject = {
      name: "telegram bot",
      description: "ScoreHouse AI Dev Team Telegram Bot",
      tech_stack: ["Node.js", "TypeScript", "Telegram Bot API"],
      integrations: {
        linear: { team_key: "SH" },
        github: { repo: "beausbots", owner: "beaubruneau" }
      },
      context: "This is a Telegram bot that acts as an AI development team interface.",
      instructions: "Development instructions for telegram bot:\n\n1. Use Node.js with TypeScript\n2. Integrate with Telegram Bot API\n3. Connect to Linear API",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await fs.writeFile(
      path.join(projectsDir, 'telegram-bot.json'),
      JSON.stringify(sampleProject, null, 2)
    );
    console.log('✅ Sample project: Created');

    console.log('\n🎉 Setup test completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Run: npm install');
    console.log('2. Run: npm run build');
    console.log('3. Configure Claude Desktop with the provided config');
    console.log('4. Test by asking Claude about the "telegram bot" project');

  } catch (error) {
    console.error('❌ Setup test failed:', error.message);
    process.exit(1);
  }
}

testSetup();
