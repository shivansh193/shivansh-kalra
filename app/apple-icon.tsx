import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#0D0D0D',
        }}
      >
        <div
          style={{
            width: 150, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '7px solid #00E5FF', borderRadius: 18,
            color: '#F2F2F2', fontSize: 70, fontWeight: 700, letterSpacing: -2,
          }}
        >
          SK
        </div>
      </div>
    ),
    size,
  )
}
