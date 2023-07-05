// instrumentation.node.ts
import { NodeSDK } from '@opentelemetry/sdk-node'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { AlwaysOnSampler, BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { TraceExporter } from "@google-cloud/opentelemetry-cloud-trace-exporter";

const sdk = new NodeSDK({
    sampler: new AlwaysOnSampler(),
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'next-app',
    }),
    spanProcessor: new BatchSpanProcessor(new TraceExporter()),
})
sdk.start()