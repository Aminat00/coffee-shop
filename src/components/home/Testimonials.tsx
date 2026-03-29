import { SectionHeader } from "@/components/ui/SectionHeader";

const reviews = [
  { text: "The coffee was smooth but robust. Great tasting to the end of the cup.", name: "BS (Big Sarge)", city: "Google Reviewer", initials: "BS" },
  { text: "The breakfast blend was perfect. Even my not so coffee lover wife liked it.", name: "Shawn", city: "Google Reviewer", initials: "S" },
  { text: "Colipse coffee is delicious! I love that it's organic and also water process decaffeinated. The taste is smooth and flavorful — much better than other brands I have tried. I already placed and received my second order.", name: "Donna Schoenberger", city: "Google Reviewer", initials: "DS" },
  { text: "Site is easy. Delivery is quick. Product is fresh. What more could someone want?", name: "Douglas Koszalka", city: "Google Reviewer", initials: "DK" },
  { text: "I switched from a big-name subscription and the difference is night and day. You can smell the freshness when you open the bag.", name: "Lisa M.", city: "Denver, CO", initials: "LM" },
  { text: "The French Roast is bold without being bitter. And free shipping? No brainer. Colipse is my go-to now.", name: "Ryan J.", city: "Brooklyn, NY", initials: "RJ" },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-navy-deeper">
      <div className="flex flex-col gap-12 lg:gap-16">
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
      </div>
    </section>
  );
}
