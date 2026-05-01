-- AlterTable
ALTER TABLE "leads"
ADD COLUMN IF NOT EXISTS "birth_date" TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS "address_street" TEXT,
ADD COLUMN IF NOT EXISTS "address_number" TEXT,
ADD COLUMN IF NOT EXISTS "address_complement" TEXT,
ADD COLUMN IF NOT EXISTS "address_neighborhood" TEXT,
ADD COLUMN IF NOT EXISTS "address_city" TEXT,
ADD COLUMN IF NOT EXISTS "address_state" TEXT,
ADD COLUMN IF NOT EXISTS "address_zip" TEXT,
ADD COLUMN IF NOT EXISTS "civil_status" TEXT,
ADD COLUMN IF NOT EXISTS "profession" TEXT,
ADD COLUMN IF NOT EXISTS "identity_document" TEXT,
ADD COLUMN IF NOT EXISTS "responsible_name" TEXT,
ADD COLUMN IF NOT EXISTS "responsible_cpf" TEXT;

-- CreateTable
CREATE TABLE IF NOT EXISTS "onboarding_documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "item_key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "storage_path" TEXT,
    "file_url" TEXT,
    "received_at" TIMESTAMPTZ,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "onboarding_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "idx_onboarding_documents_order_id" ON "onboarding_documents"("order_id");
CREATE INDEX IF NOT EXISTS "idx_onboarding_documents_status" ON "onboarding_documents"("status");

-- AddForeignKey
ALTER TABLE "onboarding_documents"
ADD CONSTRAINT "onboarding_documents_order_id_fkey"
FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
