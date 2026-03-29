import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { Philosophy } from "@/components/about/Philosophy";
import { Values } from "@/components/about/Values";
import { AboutCTA } from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About — Colipse Coffee",
  description:
    "Founded in 2024, Colipse is a family-run roast-to-order coffee brand sourcing specialty-grade beans from 15+ countries.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Philosophy />
      <Values />
      <AboutCTA />
    </>
  );
}
