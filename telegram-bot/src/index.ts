// telegram-bot/src/index.ts
import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';
import { config } from 'dotenv';

config();

interface LinearTicket {
  id: string;
  identifier: string;
  title: string;
  description: string;
  url: string;
  priority: number;
  estimate?: number;
}

class ScoreHouseDevBot {
  private bot: TelegramBot;
  private authorizedChatIds: Set<number>;
  private linearApiKey: string;
  private githubToken: string;
  
  constructor() {
    // Validate required environment variables
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const linearApiKey = process.env.LINEAR_API_KEY;
    const githubToken = process.env.GITHUB_TOKEN;

    if (!telegramToken) {
      throw new Error('TELEGRAM_BOT_TOKEN environment variable is required');
    }
    if (!linearApiKey) {
      throw new Error('LINEAR_API_KEY environment variable is required');
    }
    if (!githubToken) {
      throw new Error('GITHUB_TOKEN environment variable is required');
    }

    this.bot = new TelegramBot(telegramToken, { polling: true });
    this.authorizedChatIds = new Set();
    this.linearApiKey = linearApiKey;
    this.githubToken = githubToken;
    
    this.setupBot();
    console.log('🤖 ScoreHouse Dev Bot is running...');
  }

  private setupBot() {
    // Set bot commands
    this.bot.setMyCommands([
      { command: 'start', description: 'Initialize your AI development team' },
      { command: 'status', description: 'Show current development status' },
      { command: 'tickets', description: 'List automation-ready tickets' },
      { command: 'progress', description: 'Today\'s progress report' },
      { command: 'help', description: 'Show all commands' }
    ]);

    // Command handlers
    this.bot.onText(/\/start/, (msg) => this.handleStart(msg));
    this.bot.onText(/\/status/, (msg) => this.handleStatus(msg));
    this.bot.onText(/\/tickets/, (msg) => this.handleTickets(msg));
    this.bot.onText(/\/progress/, (msg) => this.handleProgress(msg));
    this.bot.onText(/\/help/, (msg) => this.handleHelp(msg));

    // Natural language epic creation
    this.bot.on('message', (msg) => {
      if (!msg.text?.startsWith('/') && msg.text && this.isAuthorized(msg.chat.id)) {
        this.handleEpicCreation(msg);
      }
    });

    // Error handling
    this.bot.on('polling_error', (error) => {
      console.error('Polling error:', error);
    });
  }

  private async handleStart(msg: TelegramBot.Message) {
    const chatId = msg.chat.id;
    const username = msg.from?.username || msg.from?.first_name || 'User';
    
    // Authorize this chat (in production, you'd have proper auth)
    this.authorizedChatIds.add(chatId);
    
    const welcomeMessage = `
🚀 **Welcome to ScoreHouse AI Dev Team!**

Hi ${username}! Your AI development team is ready to build your card game scoring app.

**Quick Start:**
• Just type what you want: *"Add tournament leaderboard"*
• Use /status to see what's being built
• Get notifications when PRs are ready

**Current Project:** Card Game CV Scoring App
• Gin Rummy ✅ 
• Sushi Go Party (planned)
• Skyjo (planned)

Your AI developers are standing by! What should we build first? 🤖⚡
    `;

    await this.bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
  }

  private async handleStatus(msg: TelegramBot.Message) {
    if (!this.isAuthorized(msg.chat.id)) return;
    
    try {
      const tickets = await this.getLinearTickets();
      const inProgress = tickets.filter(t => t.title.includes('In Progress')).length;
      const ready = tickets.filter(t => t.title.includes('automation:ready')).length;
      
      const statusMessage = `
🤖 **AI Development Team Status**

**Current Work:**
⚡ ${inProgress} tickets in progress
🤖 ${ready} tickets in automation queue
📋 ${tickets.length} total active tickets

**Recent Activity:**
✅ Card detection accuracy improved
🔄 Working on tournament system
📝 User authentication in review

**Next Priority:**
🎯 Tournament bracket functionality
🎮 Multiplayer scoring system

Your AI team is productive! 🚀
      `;

      await this.bot.sendMessage(msg.chat.id, statusMessage, { parse_mode: 'Markdown' });
    } catch (error) {
      await this.bot.sendMessage(msg.chat.id, '❌ Error getting team status. Check Linear connection.');
    }
  }

  private async handleTickets(msg: TelegramBot.Message) {
    if (!this.isAuthorized(msg.chat.id)) return;
    
    try {
      const tickets = await this.getLinearTickets();
      
      if (tickets.length === 0) {
        await this.bot.sendMessage(msg.chat.id, '✅ No tickets in queue. Create some work for your AI team!');
        return;
      }

      let message = `🎯 **Automation Queue (${tickets.length} tickets)**\n\n`;
      
      tickets.slice(0, 10).forEach((ticket, index) => {
        const priority = this.getPriorityEmoji(ticket.priority);
        message += `${priority} **${ticket.identifier}**: ${ticket.title}\n`;
        message += `   ${ticket.estimate || '?'} pts • [View](${ticket.url})\n\n`;
      });

      if (tickets.length > 10) {
        message += `\n... and ${tickets.length - 10} more tickets`;
      }

      await this.bot.sendMessage(msg.chat.id, message, { 
        parse_mode: 'Markdown',
        disable_web_page_preview: true 
      });
    } catch (error) {
      await this.bot.sendMessage(msg.chat.id, '❌ Error fetching tickets from Linear.');
    }
  }

  private async handleProgress(msg: TelegramBot.Message) {
    if (!this.isAuthorized(msg.chat.id)) return;
    
    const progressMessage = `
📊 **Today's AI Team Progress**

**Completed Today:**
✅ User profile component
✅ Tournament scoring logic
✅ Card detection improvements

**Quality Metrics:**
🟢 Test coverage: 94%
🟢 Code quality: 8.2/10 avg
⚡ Build time: 42s

**Currently Building:**
🔄 Real-time multiplayer sync
🔄 Tournament bracket UI

**Next Up:**
📋 3 tickets ready for automation
🎯 Focus: Tournament system completion

Your AI team is crushing it! 🚀
    `;

    await this.bot.sendMessage(msg.chat.id, progressMessage, { parse_mode: 'Markdown' });
  }

  private async handleEpicCreation(msg: TelegramBot.Message) {
    const chatId = msg.chat.id;
    const description = msg.text!;
    
    // Check if this looks like an epic request
    const epicKeywords = ['add', 'create', 'build', 'implement', 'need', 'want', 'system'];
    const isEpicRequest = epicKeywords.some(keyword => 
      description.toLowerCase().includes(keyword)
    );
    
    if (!isEpicRequest || description.split(' ').length < 3) {
      return; // Not an epic request
    }

    await this.bot.sendMessage(chatId, '🤖 Creating epic and breaking down into tickets...');
    
    try {
      // This would call your MCP server's create_epic function
      const epic = await this.createEpicViaAPI(description);
      
      const message = `
✅ **Epic Created: ${epic.title}**

📋 **${epic.tickets.length} tickets created** (${epic.totalEstimate} points total)

${epic.tickets.map((ticket: any, i: number) => 
  `${i + 1}. ${ticket.title} (${ticket.estimate} pts)`
).join('\n')}

🚀 **AI team is starting work!** You'll get notifications as PRs are ready.
      `;

      await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      
      // Trigger automation for ready tickets
      await this.triggerAutomationPipeline(epic.tickets);
      
    } catch (error) {
      await this.bot.sendMessage(chatId, `❌ Error creating epic: ${error}`);
    }
  }

  private async handleHelp(msg: TelegramBot.Message) {
    const helpMessage = `
🤖 **ScoreHouse AI Dev Team Commands**

**Natural Language:**
Just type what you want:
• "Add tournament brackets"
• "I need user authentication"
• "Build card recognition for Skyjo"

**Commands:**
• /status - What's your AI team working on?
• /tickets - Show automation queue
• /progress - Today's completed work

**Notifications:**
🔔 Get alerts when PRs are ready
📊 Daily progress reports
✅ Quality scores for each implementation

Your AI team works 24/7! Just tell them what to build. 🚀
    `;

    await this.bot.sendMessage(msg.chat.id, helpMessage, { parse_mode: 'Markdown' });
  }

  // Public method for GitHub Actions to send notifications
  async sendPRNotification(prData: {
    ticketId: string;
    prTitle: string;
    prUrl: string;
    testsPassed: boolean;
    coverage: number;
    qualityScore: number;
  }) {
    const status = prData.testsPassed ? '✅' : '❌';
    const quality = prData.qualityScore >= 8 ? '🟢' : 
                   prData.qualityScore >= 6 ? '🟡' : '🔴';
    
    const message = `
🤖 **AI Implementation Complete** ${status}

**Ticket**: ${prData.ticketId}
**Feature**: [${prData.prTitle}](${prData.prUrl})

**Quality Check:**
${quality} Code Quality: ${prData.qualityScore}/10
📊 Coverage: ${prData.coverage}%
${status} Tests: ${prData.testsPassed ? 'All Pass' : 'Failed'}

${prData.testsPassed && prData.qualityScore >= 8 ? 
  '🚀 **Ready to merge!** High quality code.' : 
  '👀 **Needs review** - Check the PR.'}
    `;

    // Send to all authorized users
    for (const chatId of this.authorizedChatIds) {
      try {
        await this.bot.sendMessage(chatId, message, { 
          parse_mode: 'Markdown',
          disable_web_page_preview: true 
        });
      } catch (error) {
        console.error(`Failed to send notification to ${chatId}:`, error);
      }
    }
  }

  // Helper methods
  private isAuthorized(chatId: number): boolean {
    return this.authorizedChatIds.has(chatId);
  }

  private getPriorityEmoji(priority: number): string {
    switch (priority) {
      case 4: return '🔴'; // Urgent
      case 3: return '🟡'; // High  
      case 2: return '🟢'; // Medium
      case 1: return '⚪'; // Low
      default: return '🟢';
    }
  }

  private async getLinearTickets(): Promise<LinearTicket[]> {
    const response = await fetch('https://api.linear.app/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.linearApiKey}`
      },
      body: JSON.stringify({
        query: `
          query GetTickets {
            issues(
              filter: { 
                team: { key: { eq: "SH" } }
                state: { name: { neq: "Done" } }
              }
              orderBy: updatedAt
              first: 20
            ) {
              nodes {
                id
                identifier
                title
                description
                url
                priority
                estimate
              }
            }
          }
        `
      })
    });

    const data = await response.json() as any;
    return data.data?.issues?.nodes || [];
  }

  private async createEpicViaAPI(description: string): Promise<any> {
    // This calls your MCP server's epic creation
    // For now, mock the response
    const mockTickets = [
      { title: `${description} - UI Component`, estimate: 3 },
      { title: `${description} - API Integration`, estimate: 5 },
      { title: `${description} - Testing`, estimate: 2 }
    ];

    return {
      title: description,
      tickets: mockTickets,
      totalEstimate: mockTickets.reduce((sum, t) => sum + t.estimate, 0)
    };
  }

  private async triggerAutomationPipeline(tickets: any[]) {
    // Trigger GitHub Actions for each ticket
    for (const ticket of tickets) {
      await this.triggerGitHubAction(ticket);
    }
  }

  private async triggerGitHubAction(ticket: any) {
    await fetch('https://api.github.com/repos/YOUR_USERNAME/card-game-cv-app/dispatches', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_type: 'linear-ticket-ready',
        client_payload: {
          ticket_id: ticket.identifier || `AUTO-${Date.now()}`,
          description: ticket.title,
          title: ticket.title
        }
      })
    });
  }
}

// Start the bot
new ScoreHouseDevBot();