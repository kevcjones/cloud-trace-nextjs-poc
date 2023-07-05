import { NodeSDK } from '@opentelemetry/sdk-node'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { SimpleSpanProcessor, AlwaysOnSampler } from '@opentelemetry/sdk-trace-node'
import { TraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter'
 
const sdk = new NodeSDK({
  traceExporter: new TraceExporter(),
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'next-app',
  }),
  spanProcessor: new SimpleSpanProcessor(new TraceExporter()),
})
sdk.start()