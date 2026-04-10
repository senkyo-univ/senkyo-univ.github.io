import { findGatewayCourseByToken } from '../../../_shared/catalogGateway';

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

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const rawToken = context.params.token;
    const token = Array.isArray(rawToken) ? rawToken[0] ?? '' : rawToken;
    const course = findGatewayCourseByToken(token, context.env);

    if (!course) {
      return json({ course: null }, 404);
    }

    return json({ course });
  } catch {
    return json({ message: 'Failed to load catalog entry.' }, 500);
  }
};
