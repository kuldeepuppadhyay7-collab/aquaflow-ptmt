import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Capability from './components/Capability'
import Metrics from './components/Metrics'
import Products from './components/Products'
import Process from './components/Process'
import Services from './components/Services'
import Trust from './components/Trust'
import DealerEnquiry from './components/DealerEnquiry'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Legal from './components/Legal'

/**
 * Section order follows the reference funnel from structure.md --
 * claim -> demonstrate -> quantify -> enumerate -> method -> validate ->
 * capture -- with two sections added for this brief (Products, DealerEnquiry)
 * and the capture step split in two, because a dealer and a walk-in enquiry
 * are not the same buyer and should not share a form.
 *
 * Tonal rhythm, also from the reference: light, light, light, light, DARK,
 * light, DARK, light, DARK. Dark grounds used as punctuation.
 */
export default function App() {
  const [legalDoc, setLegalDoc] = useState(null)

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Capability />
        <Metrics />
        <Products />
        <Process />
        <Services />
        <Trust />
        <DealerEnquiry />
        <Contact />
      </main>
      <Footer onOpenLegal={setLegalDoc} />
      <Legal doc={legalDoc} onClose={() => setLegalDoc(null)} />
    </>
  )
}
