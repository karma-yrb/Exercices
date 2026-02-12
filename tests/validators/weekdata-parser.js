/**
 * Shared safe parser for weekData literals embedded in mission HTML files.
 * Uses VM sandbox with timeout instead of eval.
 */

const vm = require('vm');

const WEEKDATA_REGEX = /(const|var|let)\s+weekData\s*=\s*(\[\s*\{[\s\S]*?\}\s*\]);/;

function evaluateLiteral(literal) {
    const script = new vm.Script(`(${literal})`);
    const context = vm.createContext(Object.create(null));
    return script.runInContext(context, { timeout: 100 });
}

function extractWeekDataFromContent(content) {
    const match = content.match(WEEKDATA_REGEX);
    if (!match) {
        return { error: 'weekData not found', steps: null, expectedSteps: null };
    }

    try {
        const data = evaluateLiteral(match[2]);
        if (Array.isArray(data) && data[0] && Array.isArray(data[0].steps)) {
            const expectedSteps = Number.isInteger(data[0].expectedSteps) ? data[0].expectedSteps : null;
            return { error: null, steps: data[0].steps, expectedSteps };
        }
        if (Array.isArray(data)) {
            return { error: null, steps: data, expectedSteps: null };
        }
        return { error: 'invalid weekData structure', steps: null, expectedSteps: null };
    } catch (error) {
        return { error: `weekData parse failed: ${error.message}`, steps: null, expectedSteps: null };
    }
}

module.exports = {
    extractWeekDataFromContent
};
