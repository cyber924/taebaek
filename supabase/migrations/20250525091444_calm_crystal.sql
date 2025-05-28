/*
  # Normalize spot type values

  1. Changes
    - Update type values to match the expected values in the application
    - Convert 'Restaurant' to 'restaurant'
    - Convert 'Cafe' to 'cafe'
    - Convert 'Attraction' to 'attraction'
    - Convert 'Recommendation' to 'recommendation'
*/

-- Update type values to match the application's expected values
UPDATE spot 
SET type = LOWER(TRIM(type))
WHERE type != LOWER(TRIM(type));

-- Update any specific mismatched values
UPDATE spot 
SET type = 'restaurant' 
WHERE type IN ('Restaurant', '맛집', 'restaurants');

UPDATE spot 
SET type = 'cafe' 
WHERE type IN ('Cafe', '카페', 'cafes');

UPDATE spot 
SET type = 'attraction' 
WHERE type IN ('Attraction', '관광지', 'attractions');

UPDATE spot 
SET type = 'recommendation' 
WHERE type IN ('Recommendation', '추천', 'recommendations');