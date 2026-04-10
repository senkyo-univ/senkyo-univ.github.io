import { Breadcrumbs } from '../components/Breadcrumbs';
import { Layout } from '../components/Layout';
import { LoginPanel } from '../components/LoginPanel';
import { PageTitle } from '../components/PageTitle';
import { supportContent } from '../data/portalContent';

export function SupportPage() {
  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: 'SCOPE', to: '/' },
          { label: '学修支援システム' },
        ]}
      />
      <PageTitle
        eyebrow="学修支援システム"
        title="ログイン"
        description="授業資料、課題提出、休講補講連絡などを確認するための入口です。"
      />
      {/* 将来ここで認証ロジックに差し替え、ダッシュボード画面へ遷移できます。 */}
      <LoginPanel content={supportContent} />
    </Layout>
  );
}

