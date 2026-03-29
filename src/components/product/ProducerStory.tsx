interface ProducerStoryProps {
  story: string;
}

export function ProducerStory({ story }: ProducerStoryProps) {
  if (!story) return null;
  return (
    <div className="bg-warm-gray rounded-2xl p-6 md:p-8">
      <div className="flex flex-col gap-4">
        <h3 className="font-heading text-2xl font-normal">Producer Story</h3>
        <p className="text-base text-text-mid leading-relaxed">{story}</p>
      </div>
    </div>
  );
}
