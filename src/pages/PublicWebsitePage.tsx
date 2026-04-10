import { Breadcrumbs } from '../components/Breadcrumbs';
import { Layout } from '../components/Layout';
import { PageTitle } from '../components/PageTitle';
import { SectionCard } from '../components/SectionCard';
import { websiteSections } from '../data/portalContent';

export function PublicWebsitePage() {
  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: 'SCOPE', to: '/' },
          { label: 'ホームページ' },
        ]}
      />
      <PageTitle
        eyebrow="仟教大学"
        title="公式ホームページ（仮）"
        description="大学概要、学部案内、キャンパス情報などを掲載する仮ページです。"
      />
      {/* 将来ここで大学公式サイトのページ群を追加し、ポータルとは別の見た目へ発展できます。 */}
      <div className="website-grid">
        {websiteSections.map((section) => (
          <SectionCard key={section.title} title={section.title} description={section.description}>
            <ul className="link-list">
              {section.links.map((link) => (
                <li key={link}>
                  <a href="/" onClick={(event) => event.preventDefault()}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </SectionCard>
        ))}
      </div>
    </Layout>
  );
}

