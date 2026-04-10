import type { FormEvent } from 'react';
import type { LoginPageContent } from '../types/content';

type LoginPanelProps = {
  content: LoginPageContent;
};

export function LoginPanel({ content }: LoginPanelProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="login-layout">
      <section className="section-card">
        <div className="section-card-header">
          <h2>{content.title}</h2>
          <p>{content.lead}</p>
        </div>
        <div className="section-card-body">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="userId">{content.userLabel}</label>
              <input id="userId" name="userId" type="text" placeholder={content.userPlaceholder} />
            </div>
            <div className="form-field">
              <label htmlFor="password">{content.passwordLabel}</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder={content.passwordPlaceholder}
              />
            </div>
            <button type="submit" className="button-primary">
              {content.buttonLabel}
            </button>
          </form>
        </div>
      </section>

      <section className="section-card">
        <div className="section-card-header">
          <h2>{content.noticeTitle}</h2>
        </div>
        <div className="section-card-body">
          <ul className="detail-list">
            {content.notices.map((notice) => (
              <li key={notice}>{notice}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-card">
        <div className="section-card-header">
          <h2>{content.helpTitle}</h2>
        </div>
        <div className="section-card-body">
          <ul className="detail-list">
            {content.helpLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

