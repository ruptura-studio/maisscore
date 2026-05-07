ALTER TABLE "payments"
ADD COLUMN IF NOT EXISTS "webhook_processed_at" TIMESTAMPTZ;

UPDATE "payments"
SET "webhook_processed_at" = COALESCE("confirmed_at", "created_at")
WHERE "webhook_processed_at" IS NULL
  AND "status" = 'confirmed';
