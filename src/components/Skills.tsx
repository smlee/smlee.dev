export default function Skills({ items }: { items: string[] }) {
  return (
    <section className="py-2">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {items?.map((s) => (
          <span
            key={s}
            className="rounded-full border px-3 py-1 text-sm glass hover:-translate-y-0.5 transition-transform"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
