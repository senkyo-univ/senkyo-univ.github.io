import { Link } from 'react-router-dom';
import type { CatalogMode, CourseListItem } from '../types/course';

type CourseResultsTableProps = {
  title: string;
  description: string;
  courses: CourseListItem[];
  mode: CatalogMode;
};

export function CourseResultsTable({
  title,
  description,
  courses,
  mode,
}: CourseResultsTableProps) {
  return (
    <section className="section-card">
      <div className="section-card-header">
        <div className="results-summary">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <p className="results-count">
          {courses.length}件
          <span>{mode === 'gateway' ? ' 専用照会' : ' 検索結果'}</span>
        </p>
      </div>
      <div className="results-table-wrap">
        <table className="results-table">
          <thead>
            <tr>
              <th scope="col">授業コード</th>
              <th scope="col">科目名</th>
              <th scope="col">担当教員</th>
              <th scope="col">開講学部</th>
              <th scope="col">曜日・時限</th>
              <th scope="col">単位数</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={`${course.route}-${course.code}`}>
                <td>{course.code}</td>
                <td>
                  <Link to={course.route}>{course.title}</Link>
                </td>
                <td>{course.instructor}</td>
                <td>{course.faculty}</td>
                <td>{course.schedule}</td>
                <td>{course.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

