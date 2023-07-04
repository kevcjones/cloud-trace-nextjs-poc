import { context, propagation } from '@opentelemetry/api'

const headers = {}
propagation.inject(context.active(), headers)

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      await import('./instrumentation.node')
    }
  }