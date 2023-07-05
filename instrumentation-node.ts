// instrumentation.node.ts
import { trace, context, diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NodeSDK } from '@opentelemetry/sdk-node'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { TraceExporter } from "@google-cloud/opentelemetry-cloud-trace-exporter";

const sdk = new NodeSDK({
    // sampler: new AlwaysOnSampler(),
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'next-app',
    }),
    instrumentations: [getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-http': {},
    })],
    spanProcessor: new BatchSpanProcessor(new TraceExporter()),
})

sdk.start()

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR)

export const tracer = trace.getTracer('next-app-tracer');
export { context, diag as log };