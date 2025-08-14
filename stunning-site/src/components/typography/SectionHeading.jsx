// src/components/typography/SectionHeading.jsx
export default function SectionHeading({ eyebrow, title, desc, align = "center" }) {
  const alignCls = align === "left" ? "text-left" : "text-center";
  return (
    <div className={`max-w-3xl mx-auto ${alignCls}`}>
      {eyebrow && (
        <div className="inline-block px-3 py-1 rounded-full text-sm font-medium
                        bg-secondary/60 text-navy border border-navy/10">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">{title}</h2>
      {desc && <p className="mt-3 text-navy/80">{desc}</p>}
    </div>
  );
}
