type StatusMessageProps = {
  title: string;
  body: string;
  tone?: 'neutral' | 'error';
};

export function StatusMessage({ title, body, tone = 'neutral' }: StatusMessageProps) {
  return (
    <div className={`status-message ${tone === 'error' ? 'is-error' : ''}`} role="status">
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

