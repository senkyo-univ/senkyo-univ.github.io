import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CourseDetailView } from '../components/CourseDetailView';
import { Layout } from '../components/Layout';
import { PageTitle } from '../components/PageTitle';
import { StatusMessage } from '../components/StatusMessage';
import { fetchGatewayCourse } from '../lib/api';
import type { GatewayCourseRecord } from '../types/course';

export function SpecialCoursePage() {
  const { token = '' } = useParams();
  const [course, setCourse] = useState<GatewayCourseRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const nextCourse = await fetchGatewayCourse(token);

        if (isMounted) {
          setCourse(nextCourse);
          setHasError(false);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: 'SCOPE', to: '/' },
          { label: 'Webシラバス', to: '/syllabus' },
          { label: '講義詳細' },
        ]}
      />

      {isLoading ? (
        <>
          <PageTitle
            eyebrow="Webシラバス"
            title="講義詳細"
            description="講義情報を読み込んでいます。"
          />
          <StatusMessage title="読込中" body="講義情報を取得しています。しばらくお待ちください。" />
        </>
      ) : hasError ? (
        <>
          <PageTitle
            eyebrow="Webシラバス"
            title="講義詳細"
            description="指定された講義情報を表示します。"
          />
          <StatusMessage
            title="講義情報を取得できませんでした"
            body="時間をおいて再度アクセスしてください。"
            tone="error"
          />
        </>
      ) : course ? (
        <>
          <PageTitle
            eyebrow="Webシラバス"
            title={course.title}
            description={`${course.code} / ${course.instructor}`}
          />
          <CourseDetailView course={course} />
        </>
      ) : (
        <>
          <PageTitle
            eyebrow="Webシラバス"
            title="講義詳細"
            description="指定された講義情報を表示します。"
          />
          <StatusMessage
            title="講義情報が見つかりませんでした"
            body="URLをご確認いただくか、検索画面から再度照会してください。"
            tone="error"
          />
        </>
      )}
    </Layout>
  );
}

