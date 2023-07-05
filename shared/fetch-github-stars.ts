import { tracer, log } from "../instrumentation-node"

export async function fetchGithubStars() {
    const span = tracer.startSpan('fetchGithubStars-span')
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
            log.info('test-log-with-obj',{ foo: 'bar', arr: [1,2,3,4] })
            span.end()
        })
}