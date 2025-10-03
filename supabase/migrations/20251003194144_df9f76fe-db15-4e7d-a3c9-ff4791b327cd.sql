-- Add highlights and faqs columns to destinations table
ALTER TABLE public.destinations 
ADD COLUMN highlights text[] DEFAULT '{}',
ADD COLUMN faqs jsonb DEFAULT '[]'::jsonb,
ADD COLUMN rating numeric(2,1) DEFAULT 4.5,
ADD COLUMN bookings integer DEFAULT 0;