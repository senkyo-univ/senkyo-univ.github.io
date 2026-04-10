import type { ChangeEvent, FormEvent } from 'react';
import type { CourseSearchFields } from '../types/course';

type SyllabusSearchFormProps = {
  value: CourseSearchFields;
  onChange: (field: keyof CourseSearchFields, nextValue: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  isSubmitting: boolean;
};

const fields: Array<{
  key: keyof CourseSearchFields;
  label: string;
  placeholder: string;
}> = [
  { key: 'courseCode', label: '授業コード', placeholder: '例) GEA101' },
  { key: 'title', label: '科目名', placeholder: '例) 地域政策概論' },
  { key: 'instructor', label: '教員名', placeholder: '例) 佐伯 真紀' },
  { key: 'description', label: '授業内容', placeholder: '授業概要の語句で検索' },
  { key: 'requirements', label: '履修条件', placeholder: '例) 特になし' },
];

export function SyllabusSearchForm({
  value,
  onChange,
  onSubmit,
  onReset,
  isSubmitting,
}: SyllabusSearchFormProps) {
  const handleInput =
    (field: keyof CourseSearchFields) => (event: ChangeEvent<HTMLInputElement>) => {
      onChange(field, event.target.value);
    };

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="search-form-grid">
        {fields.map((field) => (
          <div className="form-field" key={field.key}>
            <label htmlFor={field.key}>{field.label}</label>
            <input
              id={field.key}
              name={field.key}
              type="text"
              value={value[field.key]}
              onChange={handleInput(field.key)}
              placeholder={field.placeholder}
              autoComplete="off"
            />
          </div>
        ))}
      </div>
      <div className="form-actions">
        <button type="submit" className="button-primary" disabled={isSubmitting}>
          {isSubmitting ? '検索中...' : '検索'}
        </button>
        <button type="button" className="button-secondary" onClick={onReset} disabled={isSubmitting}>
          リセット
        </button>
      </div>
    </form>
  );
}

