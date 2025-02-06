"use client"

import dynamic from "next/dynamic"

const PrintButton = dynamic(() => import("./print-button"), { ssr: false })

export function DynamicPrintButton() {
  return <PrintButton />
}

