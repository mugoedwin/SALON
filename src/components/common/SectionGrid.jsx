const gridVariants = {
  two: "grid gap-5 md:grid-cols-2",
  three: "grid gap-5 md:grid-cols-3",
  four: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
  split: "grid gap-5 lg:grid-cols-[1.2fr_0.8fr]",
};

function SectionGrid({ children, columns = "two", className = "" }) {
  const gridClassName = gridVariants[columns] ?? columns;

  return <div className={`${gridClassName} ${className}`.trim()}>{children}</div>;
}

export default SectionGrid;
