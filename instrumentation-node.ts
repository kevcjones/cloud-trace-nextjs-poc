// instrumentation.node.ts
import { trace, context, diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NodeSDK } from '@opentelemetry/sdk-node'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { TraceExporter, TraceExporterOptions } from "@google-cloud/opentelemetry-cloud-trace-exporter";

const sdk = new NodeSDK({
    // sampler: new AlwaysOnSampler(),
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'next-app',
    }),
    instrumentations: [
    getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-http': {
            applyCustomAttributesOnSpan: (span, _, response) => {
                if(response.statusCode >= 400) {
                    span.setAttribute('error.status', response.statusCode)
                    span.setAttribute('error.message', response.statusMessage)
                }
            } 
        },
    })],
    spanProcessor: new BatchSpanProcessor(new TraceExporter({
        stringifyArrayAttributes: true,
    })),
})

sdk.start()

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR)

export const tracer = trace.getTracer('next-app-tracer');
export { context, diag as log };