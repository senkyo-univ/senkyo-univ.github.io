import { Layout } from '../components/Layout';
import { PageTitle } from '../components/PageTitle';
import { SectionCard } from '../components/SectionCard';
import { SystemCardGrid } from '../components/SystemCardGrid';
import { portalGuides, portalNotices, systemCards } from '../data/portalContent';

export function HomePortalPage() {
  return (
    <Layout>
      <PageTitle
        eyebrow="仟教大学 学内ポータル"
        title="SCOPE"
        description="学内各種システムへの入口です。授業、履修、大学からのお知らせをこちらから確認してください。"
        aside={
          <div className="page-title-note">
            <strong>利用時間</strong>
            <span>原則 6:00 - 26:00</span>
          </div>
        }
      />

      <SystemCardGrid cards={systemCards} />

      <div className="two-column-grid">
        <SectionCard title="お知らせ">
          <ul className="notice-list">
            {portalNotices.map((notice) => (
              <li key={notice.title}>
                <p className="notice-date">{notice.date}</p>
                <h3>{notice.title}</h3>
                <p>{notice.body}</p>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="利用案内">
          <ul className="guide-list">
            {portalGuides.map((guide) => (
              <li key={guide.title}>
                <h3>{guide.title}</h3>
                <p>{guide.body}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </Layout>
  );
}

