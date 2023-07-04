import { NextApiRequest, NextApiResponse } from 'next'
import { people } from '../../../data'
import type { Person, ResponseError } from '../../../interfaces'
import { trace } from '@opentelemetry/api'

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const fakePromiseWithTrace = async () => {
  return await trace
    .getTracer('next-app')
    .startActiveSpan('fakePause', async (span) => {
      try {
        await pause(1000)
        console.log('fakePause')
        return true
      } finally {
        span.end()
      }
    })
  }
    

export default async function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<Person | ResponseError>
) {
  const { query } = req
  const { id } = query
  const person = people.find((p) => p.id === id)

  await fakePromiseWithTrace()

  // User with id exists
  return person
    ? res.status(200).json(person)
    : res.status(404).json({ message: `User with id: ${id} not found.` })
}
