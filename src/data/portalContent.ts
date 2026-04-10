import type {
  GuideItem,
  LoginPageContent,
  NavigationItem,
  NoticeItem,
  SystemCard,
  WebsiteSection,
} from '../types/content';

export const mainNavigation: NavigationItem[] = [
  { label: 'SCOPE', path: '/' },
  { label: '学修支援システム', path: '/support' },
  { label: 'Webシラバス', path: '/syllabus' },
  { label: '教務システム', path: '/academic' },
  { label: 'ホームページ', path: '/home' },
];

export const systemCards: SystemCard[] = [
  {
    title: '学修支援システム',
    path: '/support',
    description: '授業資料・課題提出・休講補講情報を確認する学内システムです。',
    note: '学生・教職員向け',
  },
  {
    title: 'Webシラバス',
    path: '/syllabus',
    description: '授業概要、履修条件、授業計画などを検索・照会できます。',
    note: '学内外から閲覧可能',
  },
  {
    title: '教務システム',
    path: '/academic',
    description: '履修登録、成績照会、各種申請の入口となる教務系システムです。',
    note: '学籍番号でログイン',
  },
  {
    title: 'ホームページ',
    path: '/home',
    description: '仟教大学の概要、学部案内、入試情報などを掲載する公式サイトです。',
    note: '公式情報',
  },
];

export const portalNotices: NoticeItem[] = [
  {
    date: '2026.04.08',
    title: '前期授業開始に伴うシステム利用案内',
    body: '授業資料配信、休講補講連絡、履修登録確認は各システムから行ってください。',
  },
  {
    date: '2026.04.05',
    title: '学内ネットワーク保守のお知らせ',
    body: '4月18日（土）9:00から12:00まで、一部サービスで瞬断が発生する場合があります。',
  },
  {
    date: '2026.04.01',
    title: '新入生向け初期設定手順の公開',
    body: '学修支援システム利用開始前に、大学発行アカウントの初期設定を完了してください。',
  },
];

export const portalGuides: GuideItem[] = [
  {
    title: '利用案内',
    body: 'ブラウザは最新版の Microsoft Edge または Google Chrome を推奨しています。',
  },
  {
    title: 'ログイン時の注意',
    body: '共有端末利用後は、必ずログアウトとブラウザ終了を行ってください。',
  },
  {
    title: '問合せ先',
    body: '情報基盤センターまたは所属学部の教務担当までお問い合わせください。',
  },
];

export const syllabusLead =
  '授業コード、科目名、教員名、授業内容、履修条件で講義を検索できます。公開対象の科目のみ一覧表示しています。';

export const supportContent: LoginPageContent = {
  title: '学修支援システム',
  lead: '授業資料、課題提出、出欠連絡、休講補講案内を確認するための学内システムです。',
  userLabel: 'ユーザーID',
  passwordLabel: 'パスワード',
  userPlaceholder: '例) s24a0123',
  passwordPlaceholder: '半角英数字で入力',
  buttonLabel: 'ログイン',
  noticeTitle: '利用上の注意',
  notices: [
    '学内アカウントをお持ちの学生・教職員が利用できます。',
    '共用PCを利用した場合は、操作終了後にログアウトしてください。',
    '多要素認証を導入する場合は、この画面から認証APIへ接続する構成に差し替えできます。',
  ],
  helpTitle: '案内',
  helpLines: [
    '初回利用時はパスワード変更を行ってください。',
    '授業資料の閲覧にはJavaScriptを有効にしてください。',
  ],
};

export const academicContent: LoginPageContent = {
  title: '教務システム',
  lead: '履修登録、成績照会、各種教務申請を扱うための教務系システムです。',
  userLabel: '学籍番号',
  passwordLabel: 'パスワード',
  userPlaceholder: '例) 20261234',
  passwordPlaceholder: 'パスワードを入力',
  buttonLabel: 'ログイン',
  noticeTitle: '教務関連のお知らせ',
  notices: [
    '履修登録期間中はアクセス集中により応答が遅くなる場合があります。',
    '登録内容は確定前に必ず確認画面で再確認してください。',
    '将来的にここで認証ロジックと申請ワークフローへ接続できます。',
  ],
  helpTitle: '利用案内',
  helpLines: [
    '登録締切後の変更は所属学部教務担当へ申し出てください。',
    '成績公開日は学年暦および教務掲示で確認してください。',
  ],
};

export const websiteSections: WebsiteSection[] = [
  {
    title: '大学概要',
    description: '教育理念、学長メッセージ、沿革などを掲載する想定の導線です。',
    links: ['大学紹介', '教育理念', '沿革', '情報公開'],
  },
  {
    title: '学部案内',
    description: '各学部・研究科の特色、カリキュラム、教員紹介への導線を配置しています。',
    links: ['学部一覧', '研究科一覧', '教員紹介', '研究活動'],
  },
  {
    title: 'キャンパス案内',
    description: '交通アクセス、施設案内、学生生活情報へ拡張しやすい構成です。',
    links: ['アクセス', '施設案内', '学生支援', '国際交流'],
  },
  {
    title: '入試情報',
    description: '学部入試、大学院入試、オープンキャンパス情報を追加できる枠です。',
    links: ['募集要項', '入試日程', 'オープンキャンパス', '資料請求'],
  },
];

export const footerText = '© Senkyo University. All Rights Reserved.';

