import { exec } from 'child_process';
import { join } from 'path';

describe('Integration Tests for CLI Commands', () => {
    test('should execute CLI command successfully', (done) => {
        const cliPath = join(__dirname, '../../bin/git-assist.js');
        exec(`node ${cliPath} --help`, (error, stdout, stderr) => {
            expect(error).toBeNull();
            expect(stdout).toContain('Usage');
            done();
        });
    });

    // Add more integration tests for other CLI commands
});
