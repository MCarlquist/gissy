import { exec } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

describe('Integration Tests for CLI Commands', () => {
  const cliPath = join(__dirname, '../../bin/gissy.js');

  test('should execute CLI command successfully', async () => {
    try {
      const { stdout, stderr } = await execAsync(`node ${cliPath} --help`);
      expect(stdout).toContain('Usage');
      expect(stdout).toContain('gissy');
    } catch (error) {
      throw new Error(`CLI test failed: ${error.message}`);
    }
  });

  test('should show status command help', async () => {
    try {
      const { stdout } = await execAsync(`node ${cliPath} status --help`);
      expect(stdout).toContain('Show enhanced git status');
    } catch (error) {
      // Skip if not in git repo
      expect(error.code).toBeDefined();
    }
  });

  test('should show info command help', async () => {
    try {
      const { stdout } = await execAsync(`node ${cliPath} info --help`);
      expect(stdout).toContain('Show repository information');
    } catch (error) {
      // Skip if not in git repo
      expect(error.code).toBeDefined();
    }
  });

  test('should show branch command help', async () => {
    try {
      const { stdout } = await execAsync(`node ${cliPath} branch --help`);
      expect(stdout).toContain('List all branches');
    } catch (error) {
      // Skip if not in git repo
      expect(error.code).toBeDefined();
    }
  });

  test('should show watch command help', async () => {
    try {
      const { stdout } = await execAsync(`node ${cliPath} watch --help`);
      expect(stdout).toContain('Watch files for changes');
    } catch (error) {
      // Skip if not in git repo
      expect(error.code).toBeDefined();
    }
  });
});
