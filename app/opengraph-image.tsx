import { ImageResponse } from 'next/og'

export const alt = 'Shivansh Kalra · Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          background: '#0D0D0D', color: '#F2F2F2', padding: '72px 80px',
          backgroundImage: 'linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '3px solid #00E5FF', fontSize: 28, fontWeight: 700,
            }}
          >
            SK
          </div>
          <div style={{ fontSize: 28, color: '#8A8A8A' }}>shivanshkalra.cv</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3 }}>Shivansh Kalra</div>
          <div style={{ fontSize: 36, color: '#B5B5B5' }}>
            Software engineer. AI agents, production systems, research.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, fontSize: 24 }}>
          <div style={{ display: 'flex', padding: '8px 16px', border: '2px solid #E8B84A', color: '#E8B84A' }}>
            Winner · GitLab Transcend hackathon
          </div>
          <div style={{ display: 'flex', padding: '8px 16px', border: '2px solid #333', color: '#B5B5B5' }}>
            projects · research · ventures
          </div>
        </div>
      </div>
    ),
    size,
  )
}
