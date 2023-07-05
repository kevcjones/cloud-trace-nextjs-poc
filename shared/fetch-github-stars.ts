import { diag as log, trace } from '@opentelemetry/api'

export async function fetchGithubStars() {
    const span = trace.getTracer('next-app-tracer').startSpan('fetchGithubStars-span-other')
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