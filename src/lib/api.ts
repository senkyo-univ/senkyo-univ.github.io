import type {
  CourseSearchFields,
  GatewayCourseRecord,
  GatewayCourseResponse,
  GatewaySearchResponse,
} from '../types/course';

export async function fetchGatewayMatches(
  filters: CourseSearchFields,
): Promise<GatewaySearchResponse['results']> {
  const response = await fetch('/api/catalog/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });

  if (!response.ok) {
    throw new Error('検索照会に失敗しました。');
  }

  const data = (await response.json()) as GatewaySearchResponse;
  return data.results;
}

export async function fetchGatewayCourse(token: string): Promise<GatewayCourseRecord | null> {
  const response = await fetch(`/api/catalog/entry/${encodeURIComponent(token)}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('講義情報の取得に失敗しました。');
  }

  const data = (await response.json()) as GatewayCourseResponse;
  return data.course;
}

