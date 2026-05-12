import GNB from '@/components/GNB'
import Hero from '@/components/Hero'
import AboutDox, { CoachingPhilosophy } from '../components/AboutDox'
import Coaching from '@/components/Coaching'
import AiAgent from '@/components/AiAgent'
import Reviews from '@/components/Reviews'
import CTASection from '@/components/CTASection'
import FAQ from '@/components/FAQ'
import ChatbotBubble from '@/components/ChatbotBubble'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <GNB />
      <Hero />
      <AboutDox />
      <Reviews />
      <CoachingPhilosophy />
      <Coaching />
      <CTASection />
      <AiAgent />
      <FAQ />
      <ChatbotBubble />
    </main>
  )
}
