interface ProducerStoryProps {
  story: string;
}

export function ProducerStory({ story }: ProducerStoryProps) {
  if (!story) return null;
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-heading text-2xl font-normal">Producer Story</h3>
      <p className="text-base text-text-mid leading-relaxed">{story}</p>
    </div>
  );
}
