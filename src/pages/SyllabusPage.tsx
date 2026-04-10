import { type FormEvent, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CourseResultsTable } from '../components/CourseResultsTable';
import { Layout } from '../components/Layout';
import { PageTitle } from '../components/PageTitle';
import { SectionCard } from '../components/SectionCard';
import { StatusMessage } from '../components/StatusMessage';
import { SyllabusSearchForm } from '../components/SyllabusSearchForm';
import { syllabusLead } from '../data/portalContent';
import { fetchGatewayMatches } from '../lib/api';
import { filterPublicCourses, toPublicCourseListItem } from '../lib/courseSearch';
import type { CatalogMode, CourseListItem, CourseSearchFields } from '../types/course';

const emptyFilters: CourseSearchFields = {
  courseCode: '',
  title: '',
  instructor: '',
  description: '',
  requirements: '',
};

const defaultResults = filterPublicCourses(emptyFilters).map(toPublicCourseListItem);

export function SyllabusPage() {
  const [filters, setFilters] = useState<CourseSearchFields>(emptyFilters);
  const [results, setResults] = useState<CourseListItem[]>(defaultResults);
  const [mode, setMode] = useState<CatalogMode>('public');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (field: keyof CourseSearchFields, value: string) => {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters(emptyFilters);
    setResults(defaultResults);
    setMode('public');
    setLookupError('');
    setHasSearched(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setLookupError('');

    const publicResults = filterPublicCourses(filters).map(toPublicCourseListItem);

    try {
      // サーバー側の完全一致判定は授業内容フィールドだけを見ます。
      // 仕様は NFKC 正規化 + trim 後の完全一致で、部分一致には反応しません。
      const gatewayResults = await fetchGatewayMatches(filters);

      if (gatewayResults.length > 0) {
        setResults(gatewayResults);
        setMode('gateway');
      } else {
        setResults(publicResults);
        setMode('public');
      }
    } catch {
      setResults(publicResults);
      setMode('public');
      setLookupError('一部の照会処理で応答を取得できませんでした。公開科目の検索結果のみ表示しています。');
    } finally {
      setHasSearched(true);
      setIsSubmitting(false);
    }
  };

  const resultsTitle = hasSearched ? '検索結果一覧' : '登録科目一覧';
  const resultsDescription =
    mode === 'gateway'
      ? '入力内容に一致する講義情報を表示しています。'
      : '公開中のシラバスから条件に一致した科目を表示しています。';

  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: 'SCOPE', to: '/' },
          { label: 'Webシラバス' },
        ]}
      />
      <PageTitle eyebrow="Webシラバス" title="講義検索" description={syllabusLead} />

      <SectionCard title="検索条件" description="各項目は部分一致で検索できます。">
        <SyllabusSearchForm
          value={filters}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
          isSubmitting={isSubmitting}
        />
      </SectionCard>

      {lookupError ? <StatusMessage title="照会案内" body={lookupError} tone="error" /> : null}

      {results.length > 0 ? (
        <CourseResultsTable
          title={resultsTitle}
          description={resultsDescription}
          courses={results}
          mode={mode}
        />
      ) : (
        <StatusMessage
          title="検索結果 0件"
          body="入力条件に一致する授業は見つかりませんでした。条件を変更して再度検索してください。"
        />
      )}
    </Layout>
  );
}

