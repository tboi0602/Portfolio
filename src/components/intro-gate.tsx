"use client"

import { useState } from "react"
import { PageIntro } from "./page-intro"

export function IntroGate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  return (
    <>
      <PageIntro onFinish={() => setMounted(true)} />
      {mounted && children}
    </>
  )
}
