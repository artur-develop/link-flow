'use client'
import dynamic from 'next/dynamic'

const ContentWithNoSSR = dynamic(
  () => import('@/templates').then((mod) => ({ default: mod.HomeTemplate })),
  { ssr: false }
)

export default function Home() {
  return <ContentWithNoSSR />
}