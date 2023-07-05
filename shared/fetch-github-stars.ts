import { tracer, log, context } from "../instrumentation-node"

export async function fetchGithubStars() {
    const span = tracer.startSpan('fetchGithubStars-span',{},context.active())
    return fetch('https://api.github.com/repos/vercel/next.js', {
        next: {
            revalidate: 0,
        },
    })
        .then((res) => res.json())
        .then((data) => {
          span.setAttribute('github.stars', data.stargazers_count)
          data.stargazers_count
        })
        .catch((err) => {
            log.error(err)
            span.setAttribute('error', err.message)
            return 0
        })
        .finally(() => {
            log.info('test-log-with-obj',{ foo: 'bar', arr: [1,2,3,4] })
            span.end()
        })
}