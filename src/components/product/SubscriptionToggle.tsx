"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { ProductSubscription, ProductSize } from "@/types";

interface SubscriptionToggleProps {
  subscription: ProductSubscription;
  selectedSize: ProductSize;
}

export function SubscriptionToggle({ subscription, selectedSize }: SubscriptionToggleProps) {
  const [mode, setMode] = useState<"one-time" | "subscribe">("one-time");
  const [frequency, setFrequency] = useState(subscription.frequencies[2]);
  const subscribePrice = selectedSize.price * (1 - subscription.discountPercent / 100);

  return (
    <div className="flex flex-col gap-3">
      {/* One-time option */}
      <button onClick={() => setMode("one-time")} className={`flex items-center justify-between w-full rounded-xl border-2 px-4 py-3 transition-all ${mode === "one-time" ? "border-navy bg-navy-pale/30" : "border-navy/10 hover:border-navy/30"}`}>
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${mode === "one-time" ? "border-navy bg-navy" : "border-navy/30"}`}>
            {mode === "one-time" && <div className="w-2 h-2 bg-white rounded-full" />}
          </div>
          <span className="text-sm font-medium">One time purchase / {selectedSize.weight}</span>
        </div>
        <span className="text-sm font-bold">${selectedSize.price.toFixed(2)}</span>
      </button>

      {/* Subscribe option */}
      <button onClick={() => setMode("subscribe")} className={`flex items-center justify-between w-full rounded-xl border-2 px-4 py-3 transition-all ${mode === "subscribe" ? "border-navy bg-navy-pale/30" : "border-navy/10 hover:border-navy/30"}`}>
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${mode === "subscribe" ? "border-navy bg-navy" : "border-navy/30"}`}>
            {mode === "subscribe" && <div className="w-2 h-2 bg-white rounded-full" />}
          </div>
          <span className="text-sm font-medium">Subscribe / {selectedSize.weight}</span>
          <span className="text-[10px] font-bold uppercase tracking-wide bg-navy text-white rounded-full px-2 py-0.5">Save {subscription.discountPercent}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-light line-through">${selectedSize.price.toFixed(2)}</span>
          <span className="text-sm font-bold text-navy">${subscribePrice.toFixed(2)}</span>
        </div>
      </button>

      {/* Frequency + benefits when subscribe selected */}
      {mode === "subscribe" && (
        <div className="flex flex-col gap-4 pl-8">
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full rounded-xl border-2 border-navy/10 bg-white px-4 pr-8 py-3 text-sm focus:outline-none focus:border-navy transition-colors appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23555566%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]">
            {subscription.frequencies.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <div className="flex flex-wrap gap-4">
            {["Free shipping on", `Save ${subscription.discountPercent}%`, "Cancel or skip anytime"].map((benefit) => (
              <div key={benefit} className="flex items-center gap-1.5 text-xs text-text-mid">
                <Check size={14} className="text-navy" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
