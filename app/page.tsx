import type { Metadata } from "next"
import { sharedMetadata } from "@/components/shared-metadata"
import { DynamicHomeSections } from "@/components/client/dynamic-home-sections"

export const metadata: Metadata = sharedMetadata()

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <DynamicHomeSections />
    </div>
  )
}

