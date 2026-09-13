// Complete visual preview without requiring a hosted backend. Explicit false opts out.
export function shouldShowDemoContent(flag: string | undefined, hasBackend: boolean) {
  return flag === 'true' || (!hasBackend && flag !== 'false');
}
