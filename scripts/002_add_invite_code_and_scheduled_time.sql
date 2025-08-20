-- Add invite code and scheduled time columns to meetings table
ALTER TABLE public.meetings 
ADD COLUMN IF NOT EXISTS invite_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS scheduled_time TIMESTAMPTZ;

-- Create index for invite code lookups
CREATE INDEX IF NOT EXISTS idx_meetings_invite_code ON public.meetings(invite_code);
