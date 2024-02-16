#!/usr/bin/env node

import Fuse from 'fuse.js';
import { repos } from './lib/data.js';
import alfredResultsFormatter from './alfred-results-formatter.js';

async function main(searchTerm) {
    const allRepos = await repos();

    let searchResults = null;

    if (searchTerm) {
        const fuse = new Fuse(allRepos, {
            useExtendedSearch: true
        });
        searchResults = fuse.search(searchTerm);
    }

    return searchResults;
}

const searchTerm = process.argv.slice(2).join(' ');

const results = await main(searchTerm);

process.stdout.write(JSON.stringify(alfredResultsFormatter(results)));
