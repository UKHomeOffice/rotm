'use strict';

const fs = require('node:fs');

function parseCount(text, label) {
  const match = text.match(new RegExp(String.raw`(\d+)\s+${label}`, 'i'));
  return match ? Number(match[1]) : 0;
}

function buildSummary(outputText) {
  const passed = parseCount(outputText, 'passed');
  const failed = parseCount(outputText, 'failed');
  const flaky = parseCount(outputText, 'flaky');
  const skipped = parseCount(outputText, 'skipped');
  const total = passed + failed + flaky + skipped;
  const duration = outputText.match(/\(([^)]+)\)\s*$/m)?.[1] || 'unknown';
  return ['Playwright Nightly Summary', `Total: ${total}`, `Passed: ${passed}`, `Failed: ${failed}`, `Flaky: ${flaky}`, `Skipped: ${skipped}`, `Duration: ${duration}`].join('\n');
}

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  console.error('Usage: node bin/summarise_playwright_report.js <input-text> <output-txt>');
  process.exit(1);
}
let summary;
try { summary = buildSummary(fs.readFileSync(inputPath, 'utf8')); } catch (error) { summary = `Playwright Nightly Summary\nUnable to parse run output: ${error.message || error}`; }
fs.writeFileSync(outputPath, `${summary}\n`, 'utf8');
console.log(summary);