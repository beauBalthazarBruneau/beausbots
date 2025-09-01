#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
  CallToolResult,
  ListToolsResult,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProjectManagerMCP {
  private server: Server;
  private projectsDir: string;

  constructor() {
    this.server = new Server(
      {
        name: 'project-manager',
        version: '1.0.0',
        capabilities: {
          tools: {},
        },
      },
    );

    // Projects will be stored in a projects/ directory
    this.projectsDir = path.join(path.dirname(__dirname), 'projects');
    this.setupToolHandlers();
  }

  async initialize(): Promise<void> {
    try {
      // Ensure projects directory exists
      await fs.mkdir(this.projectsDir, { recursive: true });
      console.error('🤖 Project Manager MCP Server initialized');
      console.error(`📁 Projects directory: ${this.projectsDir}`);
    } catch (error) {
      console.error('Failed to initialize MCP server:', error);
      process.exit(1);
    }
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async (): Promise<ListToolsResult> => ({
      tools: [
        {
          name: 'get_project',
          description: 'Get all files and content from a project directory',
          inputSchema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Project name (folder name in projects/ directory)',
              },
            },
            required: ['name'],
            additionalProperties: false,
          },
        },
        {
          name: 'list_projects',
          description: 'List all project folders in the projects/ directory',
          inputSchema: {
            type: 'object',
            properties: {},
            additionalProperties: false,
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request): Promise<CallToolResult> => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'get_project':
            if (!args || typeof args.name !== 'string') {
              throw new McpError(ErrorCode.InvalidRequest, `Missing or invalid 'name' argument for tool 'get_project'`);
            }
            return await this.getProject(args.name);
          case 'list_projects':
            return await this.listProjects();
          default:
            throw new McpError(ErrorCode.MethodNotFound, `Tool ${name} not found`);
        }
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${errorMessage}`);
      }
    });
  }

  private async getProject(name: string): Promise<CallToolResult> {
    const projectPath = path.join(this.projectsDir, name);

    try {
      // Check if project directory exists
      const stats = await fs.stat(projectPath);
      if (!stats.isDirectory()) {
        throw new McpError(ErrorCode.InvalidRequest, `"${name}" is not a directory`);
      }

      // Read all files in the project directory recursively
      const files = await this.readDirectoryRecursively(projectPath, projectPath);
      
      return {
        isError: false, // Added to satisfy CallToolResult type
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              project: name,
              path: projectPath,
              files: files,
              message: `Found ${files.length} files in project: ${name}`,
            }, null, 2),
          },
        ],
      };
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        throw new McpError(ErrorCode.InvalidRequest, `Project "${name}" not found`);
      }
      throw error;
    }
  }

  private async readDirectoryRecursively(dirPath: string, basePath: string): Promise<Array<{path: string, content: string}>> {
    const files: Array<{path: string, content: string}> = [];
    
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        const relativePath = path.relative(basePath, fullPath);
        
        if (entry.isDirectory()) {
          // Recursively read subdirectories
          const subFiles = await this.readDirectoryRecursively(fullPath, basePath);
          files.push(...subFiles);
        } else if (entry.isFile()) {
          try {
            // Read file content (skip binary files)
            const content = await fs.readFile(fullPath, 'utf-8');
            files.push({
              path: relativePath,
              content: content
            });
          } catch (error) {
            // If we can't read as text, note it as binary
            files.push({
              path: relativePath,
              content: '[Binary file]'
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error);
    }
    
    return files;
  }

  private async listProjects(): Promise<CallToolResult> {
    try {
      const entries = await fs.readdir(this.projectsDir, { withFileTypes: true });
      const projects = entries
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name);

      return {
        isError: false,
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              projects: projects,
              count: projects.length,
              projectsDir: this.projectsDir,
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new McpError(ErrorCode.InternalError, `Failed to list projects: ${errorMessage}`);
    }
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('MCP Server running on stdio');
  }
}

// Initialize and run the server
(async () => {
  const server = new ProjectManagerMCP();
  await server.initialize();
  await server.run();
})().catch((error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});
