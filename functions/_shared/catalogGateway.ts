import type { CourseListItem, GatewayCourseRecord } from '../../src/types/course';
import { normalizeExactLookupText } from '../../src/lib/text';

type AppEnv = {
  COURSE_GATEWAY_JSON?: string;
};

type StoredGatewayCourse = Omit<GatewayCourseRecord, 'route'>;

type GatewayRule = {
  matchText: string;
  courses: StoredGatewayCourse[];
};

// Add more server-only lookup rules in COURSE_GATEWAY_JSON.
// Add more server-only courses inside each rule's `courses` array.

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isStoredGatewayCourse(value: unknown): value is StoredGatewayCourse {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.token === 'string' &&
    typeof candidate.code === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.instructor === 'string' &&
    typeof candidate.faculty === 'string' &&
    typeof candidate.division === 'string' &&
    typeof candidate.yearLevel === 'string' &&
    typeof candidate.credits === 'string' &&
    typeof candidate.schedule === 'string' &&
    typeof candidate.summary === 'string' &&
    isStringArray(candidate.objectives) &&
    isStringArray(candidate.weeklyPlan) &&
    typeof candidate.assessment === 'string' &&
    typeof candidate.materials === 'string' &&
    typeof candidate.requirements === 'string' &&
    typeof candidate.notes === 'string'
  );
}

function isGatewayRule(value: unknown): value is GatewayRule {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.matchText === 'string' &&
    Array.isArray(candidate.courses) &&
    candidate.courses.every((course) => isStoredGatewayCourse(course))
  );
}

function toCourseListItem(course: StoredGatewayCourse): CourseListItem {
  return {
    route: `/syllabus/entry/${course.token}`,
    code: course.code,
    title: course.title,
    instructor: course.instructor,
    faculty: course.faculty,
    schedule: course.schedule,
    credits: course.credits,
  };
}

function toGatewayCourseRecord(course: StoredGatewayCourse): GatewayCourseRecord {
  return {
    ...course,
    route: `/syllabus/entry/${course.token}`,
  };
}

export function readGatewayRules(env: AppEnv): GatewayRule[] {
  const raw = env.COURSE_GATEWAY_JSON;

  if (!raw) {
    return [];
  }

  const parsed: unknown = JSON.parse(raw);

  if (!Array.isArray(parsed) || !parsed.every((rule) => isGatewayRule(rule))) {
    throw new Error('COURSE_GATEWAY_JSON has an invalid schema.');
  }

  return parsed;
}

export function findGatewayMatches(description: string, env: AppEnv): CourseListItem[] {
  const normalizedInput = normalizeExactLookupText(description);

  if (!normalizedInput) {
    return [];
  }

  const rules = readGatewayRules(env);

  return rules
    .filter((rule) => normalizeExactLookupText(rule.matchText) === normalizedInput)
    .flatMap((rule) => rule.courses.map(toCourseListItem));
}

export function findGatewayCourseByToken(token: string, env: AppEnv): GatewayCourseRecord | null {
  const normalizedToken = token.trim();

  if (!normalizedToken) {
    return null;
  }

  const rules = readGatewayRules(env);

  for (const rule of rules) {
    const matched = rule.courses.find((course) => course.token === normalizedToken);

    if (matched) {
      return toGatewayCourseRecord(matched);
    }
  }

  return null;
}
