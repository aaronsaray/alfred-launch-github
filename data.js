import { Cache } from "file-system-cache";
import { Octokit } from "octokit";
import fetch from "node-fetch";

export default async function () {
    const cacheKey = 'repos';

    const cache = new Cache({
        basePath: "./.cache",
        ttl: 3600
    });

    let repos = await cache.get(cacheKey);

    if (!repos) {
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

    return repos;
}