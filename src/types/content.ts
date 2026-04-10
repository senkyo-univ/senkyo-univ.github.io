export type NavigationItem = {
  label: string;
  path: string;
};

export type SystemCard = {
  title: string;
  path: string;
  description: string;
  note: string;
};

export type NoticeItem = {
  date: string;
  title: string;
  body: string;
};

export type GuideItem = {
  title: string;
  body: string;
};

export type LoginPageContent = {
  title: string;
  lead: string;
  userLabel: string;
  passwordLabel: string;
  userPlaceholder: string;
  passwordPlaceholder: string;
  buttonLabel: string;
  noticeTitle: string;
  notices: string[];
  helpTitle: string;
  helpLines: string[];
};

export type WebsiteSection = {
  title: string;
  description: string;
  links: string[];
};

