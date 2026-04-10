import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PageTitle } from '../components/PageTitle';
import { StatusMessage } from '../components/StatusMessage';

export function NotFoundPage() {
  return (
    <Layout>
      <PageTitle
        eyebrow="SCOPE"
        title="ページが見つかりません"
        description="指定されたページへアクセスできませんでした。"
      />
      <StatusMessage title="404 Not Found" body="トップページから目的のページを選択してください。" />
      <p className="back-link">
        <Link to="/">SCOPEトップへ戻る</Link>
      </p>
    </Layout>
  );
}

