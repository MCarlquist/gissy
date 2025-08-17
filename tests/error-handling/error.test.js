import { handleError } from '../../src/git-operations';

describe('Error Handling Tests', () => {
    test('should handle missing API key error', () => {
        const error = new Error('API key is required');
        const result = handleError(error);
        expect(result.message).toContain('API key is required');
    });

    test('should handle network timeout error', () => {
        const error = new Error('Network timeout');
        const result = handleError(error);
        expect(result.message).toContain('Network timeout');
    });

    test('should handle invalid repository path error', () => {
        const error = new Error('Invalid repository path');
        const result = handleError(error);
        expect(result.message).toContain('Invalid repository path');
    });

    test('should handle AI service unavailable error', () => {
        const error = new Error('AI service unavailable');
        const result = handleError(error);
        expect(result.message).toContain('AI service unavailable');
    });
});
