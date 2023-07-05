// instrumentation.node.ts
import { trace, context } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NodeSDK } from '@opentelemetry/sdk-node'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { AlwaysOnSampler, BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
    sampler: new AlwaysOnSampler(),
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'next-app',
    }),
    instrumentations: [getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-http': {
            applyCustomAttributesOnSpan: (span) => {
                span.setAttribute('foo2', 'bar2');
            },
        },
    })],
    spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter()),
})

sdk.start()

export const tracer = trace.getTracer('next-app-tracer');
export { context };