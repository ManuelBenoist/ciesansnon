export function safeJsonLd(obj: any): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c')
}
