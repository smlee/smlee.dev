type SkillsProps = {
  items: Record<string, string[]> | undefined;
};

export default function Skills({ items }: SkillsProps) {
  if (!items || Object.keys(items).length === 0) return null;

  return (
    <section className="py-2">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      <div className="space-y-6">
        {Object.entries(items).map(([category, skills]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={`${category}:${s}`}
                  className="rounded-full border px-3 py-1 text-sm glass hover:-translate-y-0.5 transition-transform"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
