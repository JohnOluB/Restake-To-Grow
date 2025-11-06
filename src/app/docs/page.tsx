'use client';

import { AppHeader } from "@/components/dashboard/header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is RestakeToGrow?",
    answer: "RestakeToGrow is a decentralized finance (DeFi) platform that allows users to stake their assets to earn yield. A portion of the yield generated is allocated to a community-managed GrowthPool to fund new projects and ecosystem initiatives."
  },
  {
    question: "How does the yield split work?",
    answer: "The yield generated from staked assets is split 70/30. 70% of the yield is returned to the treasury for operations and growth, while 30% is directed to the GrowthPool for community-driven funding."
  },
  {
    question: "What is the GrowthPool?",
    answer: "The GrowthPool is a fund capitalized by a portion of the platform's yield. The community can create and vote on funding proposals to allocate these funds to projects that benefit the RestakeToGrow ecosystem."
  },
  {
    question: "How can I participate?",
    answer: "You can participate by depositing assets into the main vault to start earning yield. You can also browse and fund proposals in the GrowthPool Dashboard."
  },
  {
    question: "Is it safe?",
    answer: "While we prioritize security and our contracts are audited, all DeFi investments carry inherent risks. Please do your own research and never invest more than you are willing to lose."
  }
];

const FAQ = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger className="text-lg font-semibold">{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};


export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto grid gap-8">
          <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <FAQ />
        </div>
      </main>
    </div>
  );
}
