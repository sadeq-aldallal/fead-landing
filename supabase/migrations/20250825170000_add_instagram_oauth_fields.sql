/*
  # Add Instagram OAuth Fields to Businesses Table

  1. New Columns
    - `access_token` (text) - Instagram access token
    - `is_webhook_subscribed` (boolean) - Webhook subscription status (default: false)

  2. Purpose
    - Support Instagram OAuth integration via n8n workflow
    - Track access tokens and webhook subscription status
    - Required for Instagram Business API functionality

  3. Security
    - access_token contains sensitive data - ensure proper RLS policies
    - Existing RLS policies will apply to new columns
*/

-- Add access_token column for Instagram OAuth
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'access_token'
  ) THEN
    ALTER TABLE businesses ADD COLUMN access_token text;
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
  END IF;
END $$;

-- Update any existing businesses to have default webhook status
UPDATE businesses 
SET is_webhook_subscribed = false 
WHERE is_webhook_subscribed IS NULL;