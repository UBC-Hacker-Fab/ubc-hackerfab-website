import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqData = [
    {
      question: "What is HackerFab and what do you do?",
      answer:
        "We are developing open-source microfabrication machines and processes to build conventionally expensive and inaccessible hardware from scratch. We are a node of CMU's HackerFab, originally inspired by Sam Zeloof and his garage projects.",
    },
    {
      question: "Who can join the team and what qualifications do I need?",
      answer:
        "We're looking for a small number of passionate students across various disciplines including mechanical engineering, electrical engineering, physics, and software development. Since our team is small, you'll have significant control over what you work on. The work is divided into teams, which determine what specific project (i.e. tool for fabrication) you will work on. No specific qualifications are required - we value dedication and smart thinking over credentials. Because of the nature of our team, you will also end up getting hands on engineering experience, doing everything from designing the projects to actually building them out.",
    },
    {
      question: "What kind of projects will I work on?",
      answer:
        "You'll work on building chips from scratch using our open-source fabrication tools. This includes developing lithography stepper for projecting patterns of design onto silicon, tube furnace for heating up gases to +1000 degrees in order to dope silicon, reactive ion etcher. These are just a few of the projects we have active. Over time, more will be added as we move towards the goal of having a complete fabrication process with enough precision and tools to make everything from transistors to more complicated ICs.",
    },
    {
      question: "How does the application process work?",
      answer:
        "The application process starts with our interest form, which should take about 10 minutes to complete. Based on your responses, we'll reach out with next steps. The process is designed to understand your interests, skills, and how you'd like to contribute to our mission. When we reach out, we might set up an interview or ask further questions; depends on you individual answers and role.",
    },
    {
      question: "Are there any competitions?",
      answer:
        "While there are no competitions, we believe external deadlines are good forcing functions for making rapid progress. We will be participating in the Multidisciplinary Undergraduate Research Conference (MURC) at UBC every March to present our research and what we have built. Future plans with other HackerFab nodes around the world might include competitions, bounties, and/or inter-university research conferences.",
    },
  ];

  return (
    <div className="min-h-screen bg-ubc-blue">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-aldrich mb-6 text-ubc-mint glow">
            FAQ
          </h1>
          <p className="text-ubc-mint/80 text-lg">
            If you have more questions, you can reach us at contact@ubcfab.com
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-ubc-slate/30 rounded-lg bg-ubc-blue/30 backdrop-blur-sm px-6"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-ubc-mint hover:text-white transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-ubc-mint/90 pb-6 leading-relaxed text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
