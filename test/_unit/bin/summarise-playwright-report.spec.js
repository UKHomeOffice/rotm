'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

describe('Playwright nightly summary', () => {
  let directory;

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'rotm-playwright-summary-'));
  });

  afterEach(() => {
    fs.rmSync(directory, { recursive: true, force: true });
  });

  function runSummary(input) {
    const inputPath = path.join(directory, 'output.txt');
    const outputPath = path.join(directory, 'summary.txt');
    if (input !== null) {
      fs.writeFileSync(inputPath, input);
    }
    const result = spawnSync(process.execPath, [
      path.resolve('bin/summarise_playwright_report.js'),
      inputPath,
      outputPath
    ], { encoding: 'utf8' });
    return { result, summary: fs.readFileSync(outputPath, 'utf8') };
  }

  it('summarises passed, failed, flaky and skipped tests', () => {
    const { result, summary } = runSummary('  1 failed\n  2 flaky\n  3 skipped\n  4 passed (12.3s)\n');
    assert.equal(result.status, 0);
    assert.match(summary, /Total: 10\nPassed: 4\nFailed: 1\nFlaky: 2\nSkipped: 3\nDuration: 12\.3s/);
  });

  it('reports an error for output without test results', () => {
    const { result, summary } = runSummary('Error: No tests found\n');
    assert.equal(result.status, 1);
    assert.match(summary, /Unable to parse run output: No Playwright result counts found/);
  });

  it('reports an error when the input file is missing', () => {
    const { result, summary } = runSummary(null);
    assert.equal(result.status, 1);
    assert.match(summary, /Unable to parse run output:/);
  });
});
