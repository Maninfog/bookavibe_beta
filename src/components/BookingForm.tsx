
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Terminal } from 'lucide-react';

interface BookingFormProps {
  activity: string;
  onSubmit: (formData: BookingData) => void;
}

export interface BookingData {
  date: Date;
  name: string;
  email: string;
  message: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ activity, onSubmit }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    
    onSubmit({
      date,
      name,
      email,
      message
    });
  };

  return (
    <div className="vibe-card">
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
              placeholder="GiGi"
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
        
        <Button type="submit" className="vibe-button w-full glow">
          Book This Vibe
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
