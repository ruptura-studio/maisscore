-- AddColumn: utm_content, utm_term, traffic_temperature to leads
ALTER TABLE "leads"
  ADD COLUMN IF NOT EXISTS "utm_content" TEXT,
  ADD COLUMN IF NOT EXISTS "utm_term" TEXT,
  ADD COLUMN IF NOT EXISTS "traffic_temperature" TEXT NOT NULL DEFAULT 'cold';
