import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Skills from "@/components/Skills"
import Publications from "@/components/Publications"
import Awards from "@/components/Awards"
import Education from "@/components/Education"
import GitHubSection from "@/components/GitHubSection"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import { SectionDivider } from "@/components/ui/SectionDivider"
import CustomCursor from "@/components/ui/CustomCursor"

export default function Home() {
  return (
    <>
      <CustomCursor />
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
        <Awards />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <GitHubSection />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
