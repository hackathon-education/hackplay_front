interface FeatureCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, desc, icon }: FeatureCardProps) => (
  <div className="flex-1 bg-card-bg-glass px-6 py-7 lg:px-[37px] rounded-20 border border-card-border shadow-2 flex flex-col gap-[13px] items-start transition-transform hover:-translate-y-1">
    <div className="w-9 h-9 flex items-center justify-center text-text-title -mt-0.5">{icon}</div>
    <h4 className="text-xl lg:text-2xl font-bold text-text-title leading-tight">{title}</h4>
    <p className="text-text-base text-base lg:text-xl leading-[1.2]">{desc}</p>
  </div>
);

export default FeatureCard;
