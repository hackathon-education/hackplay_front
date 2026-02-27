interface CategoryBadgeProps {
  children: React.ReactNode;
}

const CategoryBadge = ({ children }: CategoryBadgeProps) => (
  <span className="px-2.5 py-[6.5px] bg-badge-bg text-text-accent text-[15px] rounded-50 font-semibold uppercase">
    {children}
  </span>
);

export default CategoryBadge;
