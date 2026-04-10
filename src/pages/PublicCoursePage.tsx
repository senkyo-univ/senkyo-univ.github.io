import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CourseDetailView } from '../components/CourseDetailView';
import { Layout } from '../components/Layout';
import { PageTitle } from '../components/PageTitle';
import { StatusMessage } from '../components/StatusMessage';
import { getPublicCourseById } from '../lib/courseSearch';

export function PublicCoursePage() {
  const { id = '' } = useParams();
  const course = getPublicCourseById(id);

  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: 'SCOPE', to: '/' },
          { label: 'Webシラバス', to: '/syllabus' },
          { label: '講義詳細' },
        ]}
      />

      {course ? (
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
            body="URLをご確認いただくか、Webシラバス一覧から再度お探しください。"
            tone="error"
          />
        </>
      )}
    </Layout>
  );
}

