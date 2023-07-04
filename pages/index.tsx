import useSWR from 'swr'
import PersonComponent from '../components/Person'
import type { Person } from '../interfaces'
import { trace } from '@opentelemetry/api'

const fetcher = async (url: string) => {
  return await trace
    .getTracer('nextjs-poc-example')
    .startActiveSpan('fetchPerson', async (span) => {
      try {
        const res =  await fetch(url)
        return res.json()
      } finally {
        span.end()
      }
    })
}

export default function Index() {
  const { data, error, isLoading } = useSWR<Person[]>('/api/people', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  return (
    <ul>
      {data.map((p) => (
        <PersonComponent key={p.id} person={p} />
      ))}
    </ul>
  )
}
