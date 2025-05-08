import React, { useState, useRef, useEffect } from 'react';
import { Pizza, MapPin, Bike, FootprintsIcon, List, Terminal } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

import Header from '@/components/Header';
import ActivityCard from '@/components/ActivityCard';
import BookingForm, { BookingData } from '@/components/BookingForm';
import ConfirmationModal from '@/components/ConfirmationModal';

const activities = [
  {
    id: 'pizza',
    title: 'Margherita with Olives',
    description: 'Crunchy crusts meet energizing moods.',
    color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)',
    icon: <Pizza className="h-6 w-6 text-white" />,
    fullWidth: false
  },
  {
    id: 'hike',
    title: 'Hike 🥾',
    description: 'Stretch your legs, clear your head, climb something — physically or metaphorically.',
    color: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
    icon: <MapPin className="h-6 w-6 text-white" />,
    fullWidth: false
  },
  {
    id: 'bike',
    title: 'Bike 🚴‍♀️',
    description: 'Real sweat, baby.',
    color: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    icon: <Bike className="h-6 w-6 text-white" />,
    fullWidth: false
  },
  {
    id: 'walk',
    title: 'Walk n talk 👣',
    description: 'Walk. Talk. Or don\'t. Depends on the mood. Either way, we\'re moving through something 🥴',
    color: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
    icon: <FootprintsIcon className="h-6 w-6 text-white" />,
    fullWidth: false
  },
  {
    id: 'custom',
    title: 'Choose your own 🪄',
    description: 'Got a weird idea or a better one? Good. Surprise me.✨',
    color: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
    icon: <List className="h-6 w-6 text-white" />,
    fullWidth: true
  }
];

const Index = () => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formPosition, setFormPosition] = useState({ top: 0, left: 0, width: 0 });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(id);
    setIsFormVisible(true);
    
    // Scroll to form after a small delay to allow for animation
    setTimeout(() => {
      const formElement = document.getElementById('booking-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);

    toast("Activity selected!", {
      description: `You've selected ${activities.find(a => a.id === id)?.title}`,
    });
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setTimeout(() => {
      setSelectedActivity(null);
    }, 500); // Match the transition duration
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
            Book a <span className="text-tech-purple">Vibe for you</span> <span className="text-2xl align-sub">(and me) 🥸</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose an activity and vibe.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {activities.map(activity => (
            <ActivityCard
              key={activity.id}
              id={`activity-${activity.id}`}
              title={activity.title}
              description={activity.description}
              color={activity.color}
              icon={activity.icon}
              selected={selectedActivity === activity.id}
              onClick={() => handleSelectActivity(activity.id)}
              fullWidth={activity.fullWidth}
            />
          ))}
        </div>
        
        {selectedActivity !== null && (
          <div 
            id="booking-form"
            ref={formRef}
            className={`transition-all duration-500 ease-in-out max-w-md mx-auto ${
              isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <BookingForm 
              activity={selectedActivityData?.title || ''} 
              activityId={selectedActivity}
              onSubmit={handleBookingSubmit}
              onClose={handleCloseForm}
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
            <Terminal className="h-3 w-3" /> Powered by <span className="text-tech-purple">vibes</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
