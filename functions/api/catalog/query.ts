import type { CourseSearchFields } from '../../../src/types/course';
import { findGatewayMatches } from '../../_shared/catalogGateway';

type Env = {
  COURSE_GATEWAY_JSON?: string;
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const payload = (await context.request.json()) as Partial<CourseSearchFields>;

    // The server-side lookup only inspects the description field.
    // Matching is exact after NFKC normalization and trim, never partial.
    const description = typeof payload.description === 'string' ? payload.description : '';
    const results = findGatewayMatches(description, context.env);

    return json({ results });
  } catch {
    return json({ message: 'Failed to query gateway catalog.' }, 500);
  }
};

export const onRequestGet: PagesFunction<Env> = async () => {
  return json({ results: [] });
};
