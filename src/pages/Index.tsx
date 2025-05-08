
import React, { useState } from 'react';
import { Pizza, MapPin, Bike, Walk, List } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

import Header from '@/components/Header';
import ActivityCard from '@/components/ActivityCard';
import BookingForm, { BookingData } from '@/components/BookingForm';
import ConfirmationModal from '@/components/ConfirmationModal';

const activities = [
  {
    id: 1,
    title: 'Margherita with Olives',
    description: 'Share a delicious pizza with the perfect crispy crust and talk about life.',
    color: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)',
    icon: <Pizza className="h-6 w-6 text-white" />
  },
  {
    id: 2,
    title: 'Hike',
    description: 'Explore nature trails and enjoy fresh air while getting some exercise.',
    color: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
    icon: <MapPin className="h-6 w-6 text-white" />
  },
  {
    id: 3,
    title: 'Bike',
    description: 'Cycle through scenic routes and discover hidden spots in the city.',
    color: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    icon: <Bike className="h-6 w-6 text-white" />
  },
  {
    id: 4,
    title: 'Walk n talk',
    description: 'A casual stroll with great conversation, no pressure, just vibes.',
    color: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
    icon: <Walk className="h-6 w-6 text-white" />
  },
  {
    id: 5,
    title: 'Choose your own',
    description: 'Have something else in mind? Suggest your own activity!',
    color: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
    icon: <List className="h-6 w-6 text-white" />
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
