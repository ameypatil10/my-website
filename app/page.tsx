import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import { SectionDivider } from "@/components/ui/SectionDivider"

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <SectionDivider />
      <main id="main-content" className="min-h-screen" />
    </>
  )
}
