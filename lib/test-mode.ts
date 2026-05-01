export function isTestMode(): boolean {
  return process.env.TEST_MODE === 'true';
}

export function requireTestToken(request: Request): boolean {
  if (!isTestMode()) {
    throw new Error('Test mode is not enabled');
  }
  const token = request.headers.get('X-Test-Token');
  const expected = process.env.TEST_BYPASS_TOKEN;
  if (!expected) {
    throw new Error('TEST_BYPASS_TOKEN is not configured');
  }
  if (token !== expected) {
    throw new Error('Invalid or missing X-Test-Token header');
  }
  return true;
}

export function getTestClinicEmail(): string {
  return process.env.TEST_DEFAULT_EMAIL || 'test@revsparkmedia.com';
}
