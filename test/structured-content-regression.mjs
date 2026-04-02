#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERVER_ROOT = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
function check(file, needle) {
  const content = fs.readFileSync(path.resolve(SERVER_ROOT, file), 'utf8');
  if (content.includes(needle)) { console.log(`\u2713 ${file} has ${needle}`); pass++; }
  else { console.error(`\u2717 ${file} missing ${needle}`); fail++; }
}
// structuredContent in both tools
check('src/tools/search.ts', 'structuredContent');
check('src/tools/lookup.ts', 'structuredContent');
// Dual name registration
check('src/tools/search.ts', '"nucc_search"');
check('src/tools/search.ts', '"mcp_nucc_search"');
check('src/tools/lookup.ts', '"nucc_lookup"');
check('src/tools/lookup.ts', '"mcp_nucc_lookup"');
// content field in both tools
check('src/tools/search.ts', 'content:');
check('src/tools/lookup.ts', 'content:');
// error handling
check('src/tools/search.ts', 'isError');
check('src/tools/lookup.ts', 'isError');
// taxonomy data file exists and has codes
check('src/lib/data/taxonomy-codes.ts', 'TAXONOMY_CODES');
check('src/lib/data/taxonomy-codes.ts', '207RC0000X');
check('src/lib/data/taxonomy-codes.ts', '282N00000X');
check('src/lib/data/taxonomy-codes.ts', '363L00000X');
console.log(`\nPassed: ${pass}, Failed: ${fail}`);
if (fail > 0) process.exit(1);
