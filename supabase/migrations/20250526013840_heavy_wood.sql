/*
  # Add visitor statistics table

  1. New Table
    - `visit` - Stores visitor statistics information
      - `id` (uuid, primary key)
      - `title` (text) - Title of the visit entry
      - `slug` (text, unique) - URL-friendly identifier
      - `content` (text) - HTML content of the visit entry
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      - `published` (boolean) - Publication status
  
  2. Security
    - Enable RLS
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS visit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE visit ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read"
  ON visit
  FOR SELECT
  USING (true);