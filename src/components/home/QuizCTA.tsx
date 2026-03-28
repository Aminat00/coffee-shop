import { Button } from "@/components/ui/Button";

export function QuizCTA() {
  return (
    <section id="quiz" className="section-padding bg-cream">
      <div className="relative bg-gradient-to-br from-navy-dark to-navy-deeper rounded-4xl overflow-hidden">
        <div className="absolute w-96 h-96 bg-navy/30 rounded-full blur-3xl -top-24 -right-24" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 p-10 md:p-16 lg:p-20">
          <div className="flex flex-col gap-5 flex-1 text-center lg:text-left">
            <span className="text-xs font-semibold uppercase tracking-[4px] text-gold-light">Not Sure Where to Start?</span>
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-white leading-tight">
              Find your perfect<br />coffee match.
            </h2>
            <p className="text-base text-white/70 leading-relaxed max-w-md mx-auto lg:mx-0">
              Take our 60-second coffee quiz and we&apos;ll recommend the ideal roast, origin, and grind for your taste and brewing method.
            </p>
            <div>
              <Button variant="gold" href="#">Take the Coffee Quiz</Button>
            </div>
          </div>
          <div className="flex items-end gap-4 lg:gap-6 flex-1 justify-center">
            {[
              { label: "LIGHT", offset: "" },
              { label: "MEDIUM", offset: "-mt-5" },
              { label: "DARK", offset: "" },
            ].map((bag) => (
              <div key={bag.label} className={`flex flex-col items-center gap-3 w-24 h-36 lg:w-32 lg:h-44 bg-white/[0.08] border border-white/[0.12] rounded-xl hover:bg-white/[0.15] hover:-translate-y-2 transition-all duration-300 cursor-pointer justify-center ${bag.offset}`}>
                <div className="w-11 h-11 border-[1.5px] border-gold rounded-full" />
                <span className="text-[10px] tracking-[1.5px] text-white/70">{bag.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
