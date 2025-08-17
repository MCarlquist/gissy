import { existsSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { loadConfig } from '../../src/config';

describe('Configuration Tests', () => {
    const testConfigPath = join(__dirname, 'test.gitassistrc');

    afterEach(() => {
        if (existsSync(testConfigPath)) {
            unlinkSync(testConfigPath);
        }
    });

    test('should load and validate .gitassistrc correctly', () => {
        const configContent = {
            apiKey: 'test-api-key',
            model: 'gpt-3.5-turbo',
            maxTokens: 100
        };
        writeFileSync(testConfigPath, JSON.stringify(configContent, null, 2));

        const config = loadConfig(testConfigPath);
        expect(config.apiKey).toBe('test-api-key');
        expect(config.model).toBe('gpt-3.5-turbo');
        expect(config.maxTokens).toBe(100);
    });

    test('should handle missing .gitassistrc gracefully', () => {
        expect(() => loadConfig('nonexistent-path')).toThrow();
    });
});
