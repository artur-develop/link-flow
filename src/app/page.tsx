'use client'
import dynamic from 'next/dynamic'

const ContentWithNoSSR = dynamic(
  () => import('@/templates').then((mod) => ({ default: mod.Home })),
  { ssr: false }
)

export default function Home() {
  return <ContentWithNoSSR />
}