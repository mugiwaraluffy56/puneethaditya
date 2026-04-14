import { useState } from 'react';

export default function DesktopIcon({ label, icon: Icon, onOpen }) {
  const [selected, setSelected] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setSelected(true);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setSelected(false);
    onOpen();
  };

  return (
    <div
      className="no-select"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: 72,
        padding: 4,
        cursor: 'default',
        background: selected ? 'rgba(0, 0, 128, 0.6)' : 'transparent',
      }}
    >
      <Icon variant="32x32_4" style={{ width: 32, height: 32 }} />
      <span
        style={{
          color: '#ffffff',
          fontSize: 11,
          textAlign: 'center',
          textShadow: '1px 1px 1px #000000',
          background: selected ? '#000080' : 'transparent',
          padding: '1px 2px',
          wordBreak: 'break-word',
          lineHeight: '1.2',
        }}
      >
        {label}
      </span>
    </div>
  );
}
