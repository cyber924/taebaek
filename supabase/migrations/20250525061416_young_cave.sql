/*
  # Create initial schema for Taebaek Heritage Map

  1. New Tables
    - `dong_heritage` - Stores information about administrative districts
      - `id` (serial, primary key)
      - `dong_id` (text, unique) - Unique identifier for the district
      - `dong_name` (text) - Name of the district
      - `origin` (text) - Origin/etymology of the district name
      - `history` (text) - Historical background of the district
      - `summary` (text) - Brief summary about the district
      - `image_url` (text) - URL to an image representing the district
    
    - `places` - Stores information about local places
      - `id` (serial, primary key)
      - `place_name` (text) - Name of the place
      - `type` (text) - Type of place (cafe, restaurant, attraction, recommendation)
      - `address` (text) - Address of the place
      - `description` (text) - Description of the place
      - `image_url` (text) - URL to an image of the place
      - `tags` (text[]) - Array of tags associated with the place
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage content
    - Add policies for anonymous users to read content
*/

-- Create dong_heritage table
CREATE TABLE IF NOT EXISTS dong_heritage (
  id SERIAL PRIMARY KEY,
  dong_id TEXT UNIQUE NOT NULL,
  dong_name TEXT NOT NULL,
  origin TEXT,
  history TEXT,
  summary TEXT,
  image_url TEXT
);

-- Create places table
CREATE TABLE IF NOT EXISTS places (
  id SERIAL PRIMARY KEY,
  place_name TEXT NOT NULL,
  type TEXT CHECK (type IN ('cafe', 'restaurant', 'attraction', 'recommendation')),
  address TEXT,
  description TEXT,
  image_url TEXT,
  tags TEXT[]
);

-- Enable Row Level Security
ALTER TABLE dong_heritage ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;

-- Create policies for dong_heritage
CREATE POLICY "Allow anonymous users to read dong_heritage"
  ON dong_heritage
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated users to read dong_heritage"
  ON dong_heritage
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert dong_heritage"
  ON dong_heritage
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update dong_heritage"
  ON dong_heritage
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for places
CREATE POLICY "Allow anonymous users to read places"
  ON places
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated users to read places"
  ON places
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert places"
  ON places
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update places"
  ON places
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);