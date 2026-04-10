export function normalizeExactLookupText(value: string): string {
  return value.normalize('NFKC').trim();
}

export function normalizeLooseText(value: string): string {
  return normalizeExactLookupText(value).toLocaleLowerCase('ja-JP');
}

export function matchesPartial(source: string, query: string): boolean {
  if (!query.trim()) {
    return true;
  }

  return normalizeLooseText(source).includes(normalizeLooseText(query));
}

