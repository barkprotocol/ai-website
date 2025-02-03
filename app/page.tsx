import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { sharedMetadata } from "@/components/shared-metadata";
import { Loading } from "@/components/ui/loading";

const DynamicHero = dynamic(() => import("@/components/home/hero"));
const DynamicFeatures = dynamic(() => import("@/components/home/features"));
const DynamicHowItWorks = dynamic(() => import("@/components/home/how-it-works"));
const DynamicCTA = dynamic(() => import("@/components/home/cta"));
const DynamicFAQ = dynamic(() => import("@/components/home/faq"));

export const metadata: Metadata = sharedMetadata();

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<Loading />}>
        <DynamicHero />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicFeatures />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicHowItWorks />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicCTA />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicFAQ />
      </Suspense>
    </div>
  );
}
