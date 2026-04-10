import type { CourseRecord, GatewayCourseRecord } from '../types/course';

type CourseDetailViewProps = {
  course: CourseRecord | GatewayCourseRecord;
};

const labelValuePairs = (course: CourseRecord | GatewayCourseRecord) => [
  ['授業コード', course.code],
  ['科目名', course.title],
  ['担当教員', course.instructor],
  ['開講学部', course.faculty],
  ['開講区分', course.division],
  ['配当年次', course.yearLevel],
  ['単位数', course.credits],
  ['曜日・時限', course.schedule],
];

export function CourseDetailView({ course }: CourseDetailViewProps) {
  return (
    <div className="detail-layout">
      <section className="detail-meta">
        <h2>開講情報</h2>
        <dl className="detail-grid">
          {labelValuePairs(course).map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="detail-section">
        <h2>授業概要</h2>
        <p>{course.summary}</p>
      </section>

      <section className="detail-section">
        <h2>到達目標</h2>
        <ul className="detail-list">
          {course.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>

      <section className="detail-section">
        <h2>授業計画</h2>
        <ol className="detail-list detail-list-numbered">
          {course.weeklyPlan.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="detail-section">
        <h2>評価方法</h2>
        <p>{course.assessment}</p>
      </section>

      <section className="detail-section">
        <h2>教科書・参考書</h2>
        <p>{course.materials}</p>
      </section>

      <section className="detail-section">
        <h2>履修条件</h2>
        <p>{course.requirements}</p>
      </section>

      <section className="detail-section">
        <h2>備考</h2>
        <p>{course.notes}</p>
      </section>
    </div>
  );
}

