-- Add missing columns to businesses table for Instagram OAuth support

-- Add access_token column for Instagram OAuth
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'access_token'
  ) THEN
    ALTER TABLE businesses ADD COLUMN access_token text;
    RAISE NOTICE 'Added access_token column';
  ELSE
    RAISE NOTICE 'access_token column already exists';
  END IF;
END $$;

-- Add is_webhook_subscribed column to track webhook status
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'is_webhook_subscribed'
  ) THEN
    ALTER TABLE businesses ADD COLUMN is_webhook_subscribed boolean DEFAULT false;
    RAISE NOTICE 'Added is_webhook_subscribed column';
  ELSE
    RAISE NOTICE 'is_webhook_subscribed column already exists';
  END IF;
END $$;

-- Update any existing businesses to have default webhook status
UPDATE businesses 
SET is_webhook_subscribed = false 
WHERE is_webhook_subscribed IS NULL;