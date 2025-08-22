/*
  # Add business type to businesses table

  1. Changes
    - Add `type` column to `businesses` table
    - Set default value to 'service'
    - Add check constraint to ensure only 'retail' or 'service' values are allowed

  2. Business Types
    - retail: The core business is selling products
    - service: You are providing a service such as barber, personal trainer, fixing, renting a padel field
*/

-- Add business type column to businesses table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'type'
  ) THEN
    ALTER TABLE businesses ADD COLUMN type text DEFAULT 'service';
    
    -- Add check constraint to ensure only valid business types
    ALTER TABLE businesses ADD CONSTRAINT businesses_type_check 
    CHECK (type IN ('retail', 'service'));
  END IF;
END $$;