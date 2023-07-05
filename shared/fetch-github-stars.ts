import { tracer, log } from "../instrumentation-node"

export async function fetchGithubStars() {
    const span = tracer.startSpan('fetchGithubStars')
    return fetch('https://api.github.com/repos/vercel/next.js', {
        next: {
            revalidate: 0,
        },
    })
        .then((res) => res.json())
        .then((data) => data.stargazers_count)
        .catch((err) => {
            log.error(err)
            return 0
        })
        .finally(() => {
            log.info('hello world log')
            span.end()
        })
}