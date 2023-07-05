import { tracer } from "../instrumentation-node"

export async function fetchGithubStars() {
    const span = tracer.startSpan('fetchGithubStars')
    return fetch('https://api.github.com/repos/vercel/next.js', {
        next: {
            revalidate: 0,
        },
    })
        .then((res) => res.json())
        .then((data) => data.stargazers_count)
        .finally(() => {
            console.log('hello world log')
            span.end()
        })
}