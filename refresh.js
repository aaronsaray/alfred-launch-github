#!/usr/bin/env node

import { refresh } from './lib/data.js';

async function main() {
    await refresh();
    return true;
}

await main();

process.stdout.write('Refreshed');
