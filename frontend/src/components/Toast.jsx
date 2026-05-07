import { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  return (
    <div className={`toast ${type}`}>
      <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{icons[type]}</span>
      <span>{message}</span>
    </div>
  );
}
