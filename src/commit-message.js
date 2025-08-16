import OpenAI from 'openai';
import chalk from 'chalk';
import { getDiffStats } from './git-operations.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Generate a commit message based on git diff
 * @param {string} diff - Git diff output
 * @param {boolean} useAI - Whether to use AI for generation
 * @returns {Promise<string>} Generated commit message
 */
export async function generateCommitMessage(diff, useAI = false) {
  if (!diff || diff.trim() === '') {
    return 'Update files';
  }

  if (useAI) {
    return await generateAICommitMessage(diff);
  } else {
    return generateFallbackCommitMessage(diff);
  }
}

/**
 * Generate commit message using OpenAI
 * @param {string} diff - Git diff output
 * @returns {Promise<string>} AI-generated commit message
 */
async function generateAICommitMessage(diff) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.log(chalk.yellow('⚠️  OPENAI_API_KEY not found in environment, using fallback'));
      return generateFallbackCommitMessage(diff);
    }

    console.log(chalk.blue('🤖 Generating AI commit message...'));
    
    const openai = new OpenAI({
      apiKey: apiKey
    });

    const prompt = `Based on the following git diff, generate a concise, conventional commit message. 
The message should:
- Follow conventional commit format (type: description)
- Be under 50 characters for the subject line
- Clearly describe what changed
- Use present tense

Git diff:
${diff}

Generate only the commit message, nothing else.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates concise, conventional git commit messages based on code diffs.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 100,
      temperature: 0.3
    });

    const message = response.choices[0]?.message?.content?.trim();
    
    if (message) {
      console.log(chalk.green('✅ AI commit message generated'));
      return message;
    } else {
      console.log(chalk.yellow('⚠️  AI response was empty, using fallback'));
      return generateFallbackCommitMessage(diff);
    }

  } catch (error) {
    console.error(chalk.red(`❌ AI generation failed: ${error.message}`));
    console.log(chalk.yellow('🔄 Using fallback commit message'));
    return generateFallbackCommitMessage(diff);
  }
}

/**
 * Generate fallback commit message based on diff statistics
 * @param {string} diff - Git diff output
 * @returns {string} Fallback commit message
 */
function generateFallbackCommitMessage(diff) {
  const stats = getDiffStats(diff);
  
  if (stats.added === 0 && stats.removed === 0) {
    return 'Update files';
  }
  
  const parts = [];
  if (stats.added > 0) {
    parts.push(`${stats.added} lines added`);
  }
  if (stats.removed > 0) {
    parts.push(`${stats.removed} lines removed`);
  }
  
  return `Update files — ${parts.join(', ')}`;
}

/**
 * Validate commit message format
 * @param {string} message - Commit message to validate
 * @returns {boolean} True if message is valid
 */
export function validateCommitMessage(message) {
  if (!message || message.trim().length === 0) {
    return false;
  }
  
  // Basic validation - not empty and reasonable length
  const trimmed = message.trim();
  return trimmed.length > 0 && trimmed.length <= 200;
}

/**
 * Format commit message for display
 * @param {string} message - Commit message
 * @returns {string} Formatted message
 */
export function formatCommitMessage(message) {
  const lines = message.split('\n');
  const subject = lines[0];
  const body = lines.slice(1).join('\n').trim();
  
  let formatted = chalk.bold(subject);
  if (body) {
    formatted += '\n' + chalk.gray(body);
  }
  
  return formatted;
}