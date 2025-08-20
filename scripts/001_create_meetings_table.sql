-- Create meetings table for storing meeting requests
CREATE TABLE IF NOT EXISTS public.meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_interest TEXT,
  message TEXT,
  meeting_date TIMESTAMPTZ,
  meeting_status TEXT DEFAULT 'pending' CHECK (meeting_status IN ('pending', 'scheduled', 'completed', 'cancelled')),
  jitsi_room_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;

-- Create policies for meetings table
-- Allow anyone to insert meeting requests (public form)
CREATE POLICY "Allow public meeting requests" ON public.meetings 
  FOR INSERT 
  WITH CHECK (true);

-- Allow reading own meeting requests by email
CREATE POLICY "Allow users to view their own meetings" ON public.meetings 
  FOR SELECT 
  USING (email = current_setting('request.jwt.claims', true)::json->>'email' OR auth.uid() IS NOT NULL);

-- Only authenticated users (admins) can update meetings
CREATE POLICY "Allow authenticated users to update meetings" ON public.meetings 
  FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

-- Only authenticated users (admins) can delete meetings
CREATE POLICY "Allow authenticated users to delete meetings" ON public.meetings 
  FOR DELETE 
  USING (auth.uid() IS NOT NULL);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_meetings_updated_at 
  BEFORE UPDATE ON public.meetings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_meetings_email ON public.meetings(email);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON public.meetings(meeting_status);
CREATE INDEX IF NOT EXISTS idx_meetings_created_at ON public.meetings(created_at);
