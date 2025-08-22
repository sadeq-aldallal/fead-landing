/*
  # Add Business Management Fields

  1. New Columns
    - `mode` (text) - Business mode: 'test' or 'production' (default: 'test')
    - `testers` (jsonb) - Array of Instagram usernames for test mode (default: empty array)
    - `is_deleted` (boolean) - Soft delete flag (default: false)
    - `deleted_at` (timestamp) - When the business was deleted

  2. Constraints
    - Check constraint for mode values
    - Default values for new columns

  3. Security
    - Existing RLS policies will apply to new columns
*/

-- Add mode column with default 'test'
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'mode'
  ) THEN
    ALTER TABLE businesses ADD COLUMN mode text DEFAULT 'test';
  END IF;
END $$;

-- Add testers column with default empty array
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'testers'
  ) THEN
    ALTER TABLE businesses ADD COLUMN testers jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Add is_deleted column with default false
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'is_deleted'
  ) THEN
    ALTER TABLE businesses ADD COLUMN is_deleted boolean DEFAULT false;
  END IF;
END $$;

-- Add deleted_at column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'deleted_at'
  ) THEN
    ALTER TABLE businesses ADD COLUMN deleted_at timestamptz;
  END IF;
END $$;

-- Add check constraint for mode
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'businesses_mode_check'
  ) THEN
    ALTER TABLE businesses ADD CONSTRAINT businesses_mode_check 
    CHECK (mode IN ('test', 'production'));
  END IF;
END $$;