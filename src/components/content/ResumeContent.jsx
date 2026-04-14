export default function ResumeContent() {
  return (
    <div style={{ margin: '-6px', height: 'calc(100% + 12px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        background: '#c0c0c0',
        borderBottom: '2px solid #808080',
        padding: '4px 8px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: '"MS Sans Serif", Arial, sans-serif',
        fontSize: 11, flexShrink: 0,
      }}>
        <span>resume.pdf</span>
        <a
          href="/resume.pdf"
          download="puneeth_aditya_resume.pdf"
          style={{
            textDecoration: 'none',
            background: '#c0c0c0',
            border: '2px solid',
            borderColor: '#ffffff #404040 #404040 #ffffff',
            boxShadow: 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080',
            padding: '1px 10px',
            fontSize: 11,
            fontFamily: 'inherit',
            color: '#000000',
            cursor: 'pointer',
          }}
        >
          Download
        </a>
      </div>
      <iframe
        src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
        title="Resume"
        style={{ flex: 1, border: 'none', display: 'block', background: '#808080' }}
      />
    </div>
  );
}
