#!/usr/bin/env node

import Fuse from 'fuse.js'
import getData from './data.js';
import alfredResultsFormatter from './alfred-results-formatter.js';

async function main(searchTerm) {
    const repos = await getData();

    let searchResults = null;

    if (searchTerm) {
        const fuse = new Fuse(repos, {
            useExtendedSearch: true
        });
        searchResults = fuse.search(searchTerm);
    }

    return searchResults;
}

const searchTerm = process.argv.slice(2).join(' ');

const results = await main(searchTerm);

process.stdout.write(JSON.stringify(alfredResultsFormatter(results)));
