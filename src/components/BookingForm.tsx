import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Terminal, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface BookingFormProps {
  activity: string;
  activityId: string;
  onSubmit: (formData: BookingData) => void;
  onClose: () => void;
}

export interface BookingData {
  date: Date;
  name: string;
  email: string;
  message: string;
  activityId: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ activity, activityId, onSubmit, onClose }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !consent1 || !consent2) return;
    
    const formData = {
      date,
      name,
      email,
      message,
      activityId
    };

    try {
      const response = await fetch('https://formspree.io/f/movdwyad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSubmit(formData);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="vibe-card relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Close form"
      >
        <X className="h-5 w-5 text-white" />
      </button>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tech-blue via-tech-purple to-tech-cyan"></div>
      
      <div className="flex items-center mb-6 pb-4 border-b">
        <Terminal className="h-5 w-5 mr-2 text-tech-purple" />
        <h2 className="text-xl font-bold">Book "{activity}" vibe</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Pick a date</label>
          <div className="bg-white rounded-lg overflow-hidden border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="grid gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Your name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="vibe-input"
              placeholder="High Performance Vibe Coder"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="vibe-input"
              placeholder="gigi@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message (optional)</label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="vibe-input min-h-[100px]"
              placeholder="Any specific preferences or details about this activity?"
            />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent1"
              checked={consent1}
              onCheckedChange={(checked) => setConsent1(checked as boolean)}
              required
            />
            <label
              htmlFor="consent1"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I consent to the vibe and the data needed to make it real ✨
            </label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent2"
              checked={consent2}
              onCheckedChange={(checked) => setConsent2(checked as boolean)}
              required
            />
            <label
              htmlFor="consent2"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              By submitting, you're committing to generate immaculate Vibes ✨ — and agree that we store your details just long enough to make the magic happen. Read more in our <a href="#" className="text-tech-purple hover:underline">Privacy Policy</a>
            </label>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="vibe-button w-full glow"
          disabled={!consent1 || !consent2}
        >
          Book This Vibe
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
