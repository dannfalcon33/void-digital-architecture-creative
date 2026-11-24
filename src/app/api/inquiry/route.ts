import { NextResponse } from 'next/server';

interface InquiryPayload {
  name?: unknown;
  email?: unknown;
  scopes?: unknown;
  budget?: unknown;
  brief?: unknown;
  companyWebsite?: unknown; // Honeypot field
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON payload.' },
      { status: 400 },
    );
  }

  // Silently accept honeypot bot submissions without processing
  if (
    typeof payload.companyWebsite === 'string' &&
    payload.companyWebsite.trim().length > 0
  ) {
    return NextResponse.json(
      { ok: true, referenceId: 'VOID-2026-0000' },
      { status: 201 },
    );
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const budget = typeof payload.budget === 'string' ? payload.budget.trim() : '';
  const brief = typeof payload.brief === 'string' ? payload.brief.trim() : '';
  const scopes = Array.isArray(payload.scopes)
    ? payload.scopes.filter((s): s is string => typeof s === 'string' && s.trim().length > 0)
    : [];

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json(
      { ok: false, error: 'Please provide your name (2–120 characters).' },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 180) {
    return NextResponse.json(
      { ok: false, error: 'Please provide a valid work email address.' },
      { status: 400 },
    );
  }

  if (scopes.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'Select at least one project scope.' },
      { status: 400 },
    );
  }

  if (brief.length > 3000) {
    return NextResponse.json(
      { ok: false, error: 'Project context must be under 3,000 characters.' },
      { status: 400 },
    );
  }

  const suffix = Math.floor(1000 + Math.random() * 9000);
  const referenceId = `VOID-2026-${suffix}`;

  return NextResponse.json(
    {
      ok: true,
      referenceId,
      receivedAt: new Date().toISOString(),
      summary: {
        name,
        email,
        scopes,
        budget,
      },
    },
    { status: 201 },
  );
}
