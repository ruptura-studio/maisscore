-- CreateTable
CREATE TABLE IF NOT EXISTS "onboarding_handoffs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lead_id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ready',
    "checklist_status" TEXT NOT NULL DEFAULT 'complete',
    "checklist_summary" TEXT,
    "missing_items" TEXT,
    "process_stage" TEXT,
    "crm_sync_status" TEXT,
    "routed_at" TIMESTAMPTZ,
    "handoff_sent_at" TIMESTAMPTZ,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "onboarding_handoffs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "onboarding_handoffs_order_id_key" ON "onboarding_handoffs"("order_id");
CREATE INDEX IF NOT EXISTS "idx_onboarding_handoffs_lead_id" ON "onboarding_handoffs"("lead_id");
CREATE INDEX IF NOT EXISTS "idx_onboarding_handoffs_status" ON "onboarding_handoffs"("status");

-- AddForeignKey
ALTER TABLE "onboarding_handoffs"
ADD CONSTRAINT "onboarding_handoffs_lead_id_fkey"
FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onboarding_handoffs"
ADD CONSTRAINT "onboarding_handoffs_order_id_fkey"
FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
