import { ImageResponse } from 'next/og'
import projects from '@/app/data/projects.json'

export const alt = 'Project by Shivansh Kalra'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface P {
  slug: string
  name: string
  meta: string
  stack: string[]
  award?: boolean
  deepdive: { tagline: string; metrics: string[] } | null
}

export default async function ProjectImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = (projects as P[]).find((x) => x.slug === slug)
  const name = p?.name ?? 'Shivansh Kalra'
  const tagline = p?.deepdive?.tagline ?? ''
  const award = p?.award ? p.deepdive?.metrics[0] : null
  const accent = p?.award ? '#E8B84A' : '#00E5FF'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          background: '#0D0D0D', color: '#F2F2F2', padding: '64px 76px',
          border: `6px solid ${accent}`,
          backgroundImage: 'linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '3px solid #00E5FF', fontSize: 24, fontWeight: 700,
              }}
            >
              SK
            </div>
            <div style={{ fontSize: 26, color: '#8A8A8A' }}>shivanshkalra.cv/projects</div>
          </div>
          {award && (
            <div
              style={{
                display: 'flex', padding: '8px 18px', fontSize: 24, fontWeight: 700, letterSpacing: 3,
                border: '2px solid #E8B84A', color: '#E8B84A', background: '#E8B84A22',
              }}
            >
              WINNER
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, color: p?.award ? '#FFE7A3' : '#F2F2F2' }}>{name}</div>
          <div style={{ fontSize: 34, color: '#B5B5B5', lineHeight: 1.35, maxWidth: 1000 }}>{tagline}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 24 }}>
          <div style={{ display: 'flex', color: award ? '#E8B84A' : '#8A8A8A' }}>{award ?? p?.meta ?? ''}</div>
          <div style={{ display: 'flex', color: '#8A8A8A' }}>Shivansh Kalra</div>
        </div>
      </div>
    ),
    size,
  )
}
