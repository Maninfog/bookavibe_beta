
import React, { useState } from 'react';
import { Computer, Code, Settings, Terminal, Laptop } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

import Header from '@/components/Header';
import ActivityCard from '@/components/ActivityCard';
import BookingForm, { BookingData } from '@/components/BookingForm';
import ConfirmationModal from '@/components/ConfirmationModal';

const activities = [
  {
    id: 1,
    title: 'Code Together',
    description: 'Pair programming, project collaboration, or just helping each other debug.',
    color: 'linear-gradient(135deg, #6633FF 0%, #3366FF 100%)',
    icon: <Code className="h-6 w-6 text-white" />
  },
  {
    id: 2,
    title: 'Tech Coffee Chat',
    description: 'Grab coffee and discuss the latest tech trends, gadgets, or industry news.',
    color: 'linear-gradient(135deg, #33CCFF 0%, #3366FF 100%)',
    icon: <Computer className="h-6 w-6 text-white" />
  },
  {
    id: 3,
    title: 'Hackathon Prep',
    description: 'Prepare for an upcoming hackathon, brainstorm ideas, and strategize.',
    color: 'linear-gradient(135deg, #FF33CC 0%, #6633FF 100%)',
    icon: <Laptop className="h-6 w-6 text-white" />
  },
  {
    id: 4,
    title: 'Workshop Session',
    description: 'Teach each other a new tool, framework, or skill in an informal workshop.',
    color: 'linear-gradient(135deg, #3366FF 0%, #33CCFF 100%)',
    icon: <Settings className="h-6 w-6 text-white" />
  }
];

const Index = () => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const handleSelectActivity = (id: number) => {
    setSelectedActivity(id);
    toast("Activity selected!", {
      description: `You've selected ${activities.find(a => a.id === id)?.title}`,
    });
  };

  const handleBookingSubmit = (data: BookingData) => {
    setBookingData(data);
    setShowConfirmation(true);
  };

  const selectedActivityData = activities.find(a => a.id === selectedActivity);

  return (
    <div className="min-h-screen tech-grid">
      <Header />
      
      <main className="container px-4 py-8 mx-auto">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Book a <span className="text-tech-purple">Vibe</span> with Maxi
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose an activity and let's hang out! Tech edition.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {activities.map(activity => (
            <ActivityCard
              key={activity.id}
              title={activity.title}
              description={activity.description}
              color={activity.color}
              icon={activity.icon}
              selected={selectedActivity === activity.id}
              onClick={() => handleSelectActivity(activity.id)}
            />
          ))}
        </div>
        
        {selectedActivity !== null && (
          <div className="max-w-md mx-auto">
            <BookingForm 
              activity={selectedActivityData?.title || ''} 
              onSubmit={handleBookingSubmit}
            />
          </div>
        )}
      </main>
      
      <ConfirmationModal
        isOpen={showConfirmation}
        activity={selectedActivityData?.title || ''}
        bookingData={bookingData}
        onClose={() => setShowConfirmation(false)}
      />
      
      <footer className="py-6 mt-16 border-t">
        <div className="container px-4 mx-auto text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <Terminal className="h-3 w-3" /> Built with <span className="text-tech-purple">{'</>'}</span> energy
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
