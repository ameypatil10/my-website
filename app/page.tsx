import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Skills from "@/components/Skills"
import Publications from "@/components/Publications"
import { SectionDivider } from "@/components/ui/SectionDivider"

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <SectionDivider />
      <main id="main-content">
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Publications />
        <SectionDivider />
      </main>
    </>
  )
}
