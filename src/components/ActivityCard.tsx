
import React from 'react';

interface ActivityCardProps {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  fullWidth?: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  color,
  icon,
  selected,
  onClick,
  fullWidth = false
}) => {
  return (
    <div 
      className={`activity-card activity-shadow transition-all duration-300 ${selected ? 'ring-2 ring-white ring-offset-4 ring-offset-background scale-105' : ''} ${fullWidth ? 'md:col-span-2' : ''}`}
      style={{ background: color }}
      onClick={onClick}
    >
      {/* Tech circuit lines animation when selected */}
      {selected && (
        <>
          <div className="circuit w-3/4" style={{top: '20%'}}></div>
          <div className="circuit w-1/2" style={{bottom: '30%'}}></div>
        </>
      )}
      
      <div className="relative z-10">
        <div className="mb-4 inline-block p-3 bg-white/20 backdrop-blur-sm rounded-lg">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-white/90 text-sm">
          {description}
        </p>
      </div>
      
      {/* Tech dots in the background */}
      <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-white/40"></div>
      <div className="absolute bottom-8 right-8 h-1 w-1 rounded-full bg-white/30"></div>
      <div className="absolute top-1/2 right-6 h-1.5 w-1.5 rounded-full bg-white/30"></div>
    </div>
  );
};

export default ActivityCard;
