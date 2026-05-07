ALTER TABLE leads ADD COLUMN IF NOT EXISTS short_code TEXT;
ALTER TABLE processes ADD COLUMN IF NOT EXISTS judicial_number TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS leads_short_code_key ON leads(short_code);
