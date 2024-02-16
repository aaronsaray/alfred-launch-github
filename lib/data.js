import { Cache } from "file-system-cache";
import { Octokit } from "octokit";
import fetch from "node-fetch";

const cacheKey = 'repos';
const cache = new Cache({
    basePath: "./.cache"
});

export async function refresh() {
    const octokit = new Octokit({
        auth: process.env.githubtoken,
        request: {
            fetch
        }
    });

    const data = await octokit.paginate('GET /user/repos', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    repos = data.map(d => d.full_name);

    await cache.set(cacheKey, repos);
}

// get's the cached repos. If empty, tries a refresh and gets the data
export async function repos() {
    let results = await cache.get(cacheKey);
    if (!results) {
        await refresh();
        results = await cache.get(cacheKey);
    }
    return results;
}
