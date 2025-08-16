import { cosmiconfigSync } from 'cosmiconfig';
import chalk from 'chalk';

/**
 * Default configuration values
 */
const DEFAULT_CONFIG = {
  branch: 'main',
  runTests: true,
  runLint: true,
  useAI: false,
  autoCommit: false,
  autoPush: false,
  watchIgnore: [],
  testCommand: 'npm run test',
  lintCommand: 'npm run lint'
};

/**
 * Load configuration from .gitassistrc file or use defaults
 * @returns {Object} Configuration object
 */
export function loadConfig() {
  const explorer = cosmiconfigSync('gitassist');
  
  try {
    const result = explorer.search();
    
    if (result) {
      console.log(chalk.green(`📋 Config loaded from: ${result.filepath}`));
      return { ...DEFAULT_CONFIG, ...result.config };
    } else {
      console.log(chalk.yellow('📋 No config file found, using defaults'));
      return DEFAULT_CONFIG;
    }
  } catch (error) {
    console.error(chalk.red(`❌ Error loading config: ${error.message}`));
    console.log(chalk.yellow('📋 Using default configuration'));
    return DEFAULT_CONFIG;
  }
}

/**
 * Validate configuration values
 * @param {Object} config - Configuration to validate
 * @returns {Object} Validated configuration
 */
export function validateConfig(config) {
  const validated = { ...config };
  
  // Ensure boolean values
  validated.runTests = Boolean(validated.runTests);
  validated.runLint = Boolean(validated.runLint);
  validated.useAI = Boolean(validated.useAI);
  validated.autoCommit = Boolean(validated.autoCommit);
  validated.autoPush = Boolean(validated.autoPush);
  
  // Ensure arrays
  if (!Array.isArray(validated.watchIgnore)) {
    validated.watchIgnore = [];
  }
  
  // Ensure strings
  validated.branch = String(validated.branch || 'main');
  validated.testCommand = String(validated.testCommand || 'npm run test');
  validated.lintCommand = String(validated.lintCommand || 'npm run lint');
  
  return validated;
}

/**
 * Get the current configuration
 * @returns {Object} Current configuration
 */
export function getConfig() {
  const config = loadConfig();
  return validateConfig(config);
}

export { DEFAULT_CONFIG };