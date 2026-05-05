export default function AboutContent() {
  return (
    <div style={{
      fontFamily: '"MS Sans Serif", Arial, sans-serif',
      fontSize: 13,
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      {/* top row: avatar + name card */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <img
          src="/avatar.png"
          alt="Puneeth Aditya"
          style={{
            width: 80, height: 80, flexShrink: 0,
            border: '2px solid', borderColor: '#808080 #ffffff #ffffff #808080',
            imageRendering: 'pixelated',
          }}
        />
        <div>
          <div style={{ fontWeight: 'bold', fontSize: 15 }}>Puneeth Aditya Myakam</div>
          <div style={{ color: '#444', fontSize: 12, marginTop: 2 }}>
            Deep in learning mode · Systems-first engineer · Open source contributor
          </div>
          <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Rust', 'Kubernetes', 'eBPF', 'LLVM', 'ML + Infra', 'React'].map(t => (
              <span key={t} style={{
                background: '#c0c0c0', border: '1px solid #808080',
                padding: '0 5px', fontSize: 10,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* divider */}
      <div style={{ borderTop: '2px solid', borderColor: '#808080 transparent transparent', borderBottom: '1px solid #ffffff' }} />

      {/* bio */}
      <div style={{
        background: '#ffffff',
        border: '2px solid', borderColor: '#808080 #ffffff #ffffff #808080',
        padding: '8px 10px', fontSize: 12, lineHeight: 1.7,
      }}>
        I'm Puneeth Aditya, deep in learning mode and building systems-heavy software across Rust,
        cloud-native infrastructure, compilers, eBPF, and ML infrastructure.
        <br /><br />
        Currently building <strong>Klyna</strong>, making APIs observable, debuggable, and self healing.
        I'm also maintaining <strong>mohu-org</strong>, <strong>nova-editor</strong>, and <strong>aathoos</strong>.
        <br /><br />
        Open source work includes <strong>mofa</strong>, <strong>LLVM</strong>, <strong>inspektor-gadget</strong>,
        <strong> microcks</strong>, <strong>kuadrant</strong>, and <strong>litmuschaos</strong>.
      </div>

      {/* education row */}
      <div style={{
        background: '#ffffff',
        border: '2px solid', borderColor: '#808080 #ffffff #ffffff #808080',
        padding: '6px 10px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <img src="/icons/skills.png" width={20} height={20} style={{ imageRendering: 'pixelated' }} alt="" />
        <div>
          <div style={{ fontWeight: 'bold', fontSize: 12 }}>B.Tech Computer Science</div>
          <div style={{ fontSize: 11, color: '#808080' }}>1st Year · India · 2025-2029</div>
        </div>
      </div>

      {/* CTA buttons */}
      <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
        <a
          href="https://github.com/mugiwaraluffy56"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <button style={{
            height: 26, padding: '0 12px',
            background: '#c0c0c0',
            border: '2px solid', borderColor: '#ffffff #404040 #404040 #ffffff',
            boxShadow: 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080',
            fontFamily: 'inherit', fontSize: 12, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <img src="/icons/opensource.png" width={14} height={14} style={{ imageRendering: 'pixelated' }} alt="" />
            GitHub
          </button>
        </a>

        <a
          href="https://linkedin.com/in/puneethaditya"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <button style={{
            height: 26, padding: '0 12px',
            background: '#c0c0c0',
            border: '2px solid', borderColor: '#ffffff #404040 #404040 #ffffff',
            boxShadow: 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080',
            fontFamily: 'inherit', fontSize: 12, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <img src="/icons/projects.png" width={14} height={14} style={{ imageRendering: 'pixelated' }} alt="" />
            LinkedIn
          </button>
        </a>

        <a
          href="mailto:myakampuneeth@gmail.com"
          style={{ textDecoration: 'none' }}
        >
          <button style={{
            height: 26, padding: '0 12px',
            background: '#000080', color: '#ffffff',
            border: '2px solid', borderColor: '#ffffff #404040 #404040 #ffffff',
            boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.2)',
            fontFamily: 'inherit', fontSize: 12, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6, fontWeight: 'bold',
          }}>
            Email
          </button>
        </a>
      </div>

      {/* footer */}
      <div style={{ fontSize: 10, color: '#808080', marginTop: 2 }}>
        Portfolio OS v2.0  ·  puneethaditya.vercel.app  ·  © 2026 Puneeth Aditya
      </div>
    </div>
  );
}
