import { SectionHeader } from "@/components/ui/SectionHeader";

const reviews = [
  { text: "The freshness is unreal. You can taste the difference — knowing it was roasted days ago makes it even better.", name: "Jess L.", city: "Portland, OR", initials: "JL" },
  { text: "I've tried countless subscriptions, but Colipse is different. The Colombia Tolima is my daily ritual now — smooth, rich, and perfectly balanced.", name: "Marco R.", city: "Chicago, IL", initials: "MR" },
  { text: "Finally, coffee that lives up to the hype. The eco-packaging is a huge plus — great coffee without the guilt.", name: "Sarah A.", city: "Austin, TX", initials: "SA" },
  { text: "The Ethiopia Sidama blew my mind. Floral notes I've never tasted in coffee before. This is what specialty means.", name: "David K.", city: "Seattle, WA", initials: "DK" },
  { text: "I switched from a big-name subscription and the difference is night and day. You can smell the freshness when you open the bag.", name: "Lisa M.", city: "Denver, CO", initials: "LM" },
  { text: "The French Roast is bold without being bitter. And free shipping? No brainer. Colipse is my go-to now.", name: "Ryan J.", city: "Brooklyn, NY", initials: "RJ" },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-navy-deeper">
      <SectionHeader tag="Reviews" title="People who start their mornings with Colipse" tagColor="text-gold-light" titleColor="text-white" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.initials} className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm hover:bg-white/[0.10] hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col gap-5">
              <div className="text-gold text-sm tracking-[2px]">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="text-[15px] text-white/80 leading-relaxed italic">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-sm font-semibold text-white">{review.initials}</div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">{review.name}</span>
                  <span className="text-xs text-white/50">{review.city}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
