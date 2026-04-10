import { Breadcrumbs } from '../components/Breadcrumbs';
import { Layout } from '../components/Layout';
import { LoginPanel } from '../components/LoginPanel';
import { PageTitle } from '../components/PageTitle';
import { academicContent } from '../data/portalContent';

export function AcademicPage() {
  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: 'SCOPE', to: '/' },
          { label: '教務システム' },
        ]}
      />
      <PageTitle
        eyebrow="教務システム"
        title="ログイン"
        description="履修登録、成績照会、各種申請の入口です。"
      />
      {/* 将来ここで認証APIや申請ワークフロー画面へ接続できます。 */}
      <LoginPanel content={academicContent} />
    </Layout>
  );
}

