-- AlterTable
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "stage" TEXT DEFAULT 'lead';
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "last_interaction_at" TIMESTAMPTZ;
