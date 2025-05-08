
import React from 'react';
import { BookingData } from './BookingForm';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  activity: string;
  bookingData: BookingData | null;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  activity,
  bookingData,
  onClose
}) => {
  if (!isOpen || !bookingData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="vibe-card relative z-10 w-full max-w-md animate-float">
        <div className="absolute inset-0 bg-gradient-to-br from-tech-purple/5 to-tech-cyan/5 rounded-xl"></div>
        
        {/* Tech-inspired decorative elements */}
        <div className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-tech-purple animate-pulse-glow opacity-70"></div>
        <div className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-tech-cyan animate-pulse-glow opacity-70 delay-300"></div>
        
        <div className="relative">
          <div className="w-full h-1 bg-gradient-to-r from-tech-purple via-tech-cyan to-tech-blue rounded-t-lg absolute -top-6 left-0"></div>
          
          <div className="flex items-center mb-6 pb-3 border-b">
            <Terminal className="h-5 w-5 mr-2 text-tech-purple" />
            <h2 className="text-xl font-bold">Vibe Confirmed!</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm mb-1 text-muted-foreground">Activity</p>
              <p className="font-medium text-tech-purple">{activity}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm mb-1 text-muted-foreground">Date</p>
                <p className="font-medium">{format(bookingData.date, 'MMMM d, yyyy')}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm mb-1 text-muted-foreground">Name</p>
                <p className="font-medium">{bookingData.name}</p>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-tech-blue/10 border border-tech-blue/20">
              <p className="text-sm text-center">
                I'll get back to you soon to confirm the details!
              </p>
            </div>
          </div>
          
          <Button onClick={onClose} className="vibe-button w-full glow">
            Awesome! Can't wait
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
