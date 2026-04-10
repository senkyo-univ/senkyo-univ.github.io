export type CourseSearchFields = {
  courseCode: string;
  title: string;
  instructor: string;
  description: string;
  requirements: string;
};

export type CourseRecord = {
  id: string;
  code: string;
  title: string;
  instructor: string;
  faculty: string;
  division: string;
  yearLevel: string;
  credits: string;
  schedule: string;
  summary: string;
  objectives: string[];
  weeklyPlan: string[];
  assessment: string;
  materials: string;
  requirements: string;
  notes: string;
};

export type CourseListItem = {
  route: string;
  code: string;
  title: string;
  instructor: string;
  faculty: string;
  schedule: string;
  credits: string;
};

export type CatalogMode = 'public' | 'gateway';

export type GatewayCourseRecord = Omit<CourseRecord, 'id'> & {
  token: string;
  route: string;
};

export type GatewayCourseResponse = {
  course: GatewayCourseRecord | null;
};

export type GatewaySearchResponse = {
  results: CourseListItem[];
};

