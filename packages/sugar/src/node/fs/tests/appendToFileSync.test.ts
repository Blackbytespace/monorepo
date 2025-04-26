import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import __appendToFileSync from '../appendToFileSync';

describe('sugar.node.fs.appendToFileSync', () => {
  const testDir = path.join(process.cwd(), 'test-temp');
  const testFile = path.join(testDir, 'test.txt');

  // Setup: Create test directory and file
  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }
  });

  // Cleanup: Remove test directory and file
  afterAll(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('Should append content to an existing file', () => {
    // Create initial file
    fs.writeFileSync(testFile, 'Initial content');
    
    // Append new content
    __appendToFileSync(testFile, 'Appended content');
    
    // Read file and verify content
    const content = fs.readFileSync(testFile, 'utf-8');
    expect(content).toBe('Initial content\nAppended content');
  });

  it('Should create file and append content if file does not exist', () => {
    // Ensure file doesn't exist
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
    
    // Append content to non-existent file
    __appendToFileSync(testFile, 'New content');
    
    // Read file and verify content
    const content = fs.readFileSync(testFile, 'utf-8');
    expect(content).toBe('\nNew content');
  });

  it('Should handle multiple appends correctly', () => {
    // Create initial file
    fs.writeFileSync(testFile, 'First line');
    
    // Append multiple times
    __appendToFileSync(testFile, 'Second line');
    __appendToFileSync(testFile, 'Third line');
    
    // Read file and verify content
    const content = fs.readFileSync(testFile, 'utf-8');
    expect(content).toBe('First line\nSecond line\nThird line');
  });
}); 