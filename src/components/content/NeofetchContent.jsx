const INFO = [
  ['OS',           'Portfolio v2.0 x86_64'],
  ['Host',         'puneeth.dev'],
  ['Kernel',       'React 19.0 + Vite 7'],
  ['Uptime',       '3 years, always building'],
  ['Packages',     '10+ shipped projects'],
  ['Shell',        'zsh 5.9'],
  ['Resolution',   '1920x1080'],
  ['WM',           'Win95Desktop'],
  ['WM Theme',     'Classic Silver'],
  ['Theme',        'Win95 [Gray]'],
  ['Terminal',     'Win95Terminal'],
  ['CPU',          'Apple M-Series @ 3.2GHz'],
  ['GPU',          'Apple Integrated GPU'],
  ['Languages',    'Python · Rust · JS/TS · C++'],
  ['ML',           'PyTorch · HuggingFace · Dora'],
  ['GitHub',       'github.com/mugiwaraluffy56'],
  ['Email',        'myakampuneeth@gmail.com'],
  ['Memory',       '∞ MiB / ∞ MiB'],
];

const PALETTE  = ['#282828','#cc241d','#98971a','#d79921','#458588','#b16286','#689d6a','#a89984'];
const PALETTE2 = ['#928374','#fb4934','#b8bb26','#fabd2f','#83a598','#d3869b','#8ec07c','#ebdbb2'];

export default function NeofetchContent() {
  return (
    <div style={{
      background: '#1e1e2e',
      color: '#cdd6f4',
      fontFamily: '"Courier New", Courier, monospace',
      fontSize: '12px',
      lineHeight: '1.5',
      padding: '16px 20px',
      height: '100%',
      margin: '-6px',
      display: 'flex',
      gap: '28px',
      alignItems: 'flex-start',
      boxSizing: 'border-box',
      overflow: 'auto',
    }}>
      {/* Left: GitHub profile photo + swatches */}
      <div style={{ flexShrink: 0 }}>
        <img
          src="/avatar.png"
          alt="puneeth"
          style={{
            width: 200,
            height: 200,
            display: 'block',
            imageRendering: 'auto',
            border: '2px solid #313244',
            borderRadius: 4,
          }}
        />
        <div style={{ display: 'flex', marginTop: 10 }}>
          {PALETTE.map(c => (
            <div key={c} style={{ width: 20, height: 12, background: c }} />
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          {PALETTE2.map(c => (
            <div key={c} style={{ width: 20, height: 12, background: c }} />
          ))}
        </div>
      </div>

      {/* Right: info */}
      <div style={{ paddingTop: 2 }}>
        <div style={{ marginBottom: 2 }}>
          <span style={{ color: '#89dceb', fontWeight: 'bold' }}>puneeth</span>
          <span style={{ color: '#6c7086' }}>@</span>
          <span style={{ color: '#89dceb', fontWeight: 'bold' }}>portfolio</span>
        </div>
        <div style={{ color: '#6c7086', marginBottom: 8, letterSpacing: 1 }}>
          {'─'.repeat(22)}
        </div>

        {INFO.map(([key, val]) => (
          <div key={key} style={{ marginBottom: 1 }}>
            <span style={{ color: '#89b4fa', fontWeight: 'bold' }}>{key}:</span>
            {key === 'GitHub' ? (
              <a
                href={`https://${val}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#a6e3a1', textDecoration: 'underline', marginLeft: 4 }}
              >{val}</a>
            ) : (
              <span style={{ color: '#cdd6f4' }}> {val}</span>
            )}
          </div>
        ))}

        <div style={{ marginTop: 14, color: '#6c7086', fontSize: 11 }}>
          <span style={{ color: '#a6e3a1' }}>puneeth</span>
          <span style={{ color: '#6c7086' }}> ~/projects/portfolio </span>
          <span style={{ color: '#cba6f7' }}>❯</span>
          <span style={{
            display: 'inline-block',
            width: 8, height: 13,
            background: '#cdd6f4',
            marginLeft: 4,
            verticalAlign: 'middle',
            animation: 'blink 1s step-end infinite',
          }} />
        </div>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}
