-- CreateTable
CREATE TABLE IF NOT EXISTS "integration_errors" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "source" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "details" JSONB,
    "lead_id" UUID,
    "order_id" UUID,
    "phone" TEXT,
    "path" TEXT,
    "method" TEXT,
    "http_status" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "integration_errors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "idx_integration_errors_source_code_created_at" ON "integration_errors"("source", "code", "created_at");
CREATE INDEX IF NOT EXISTS "idx_integration_errors_lead_id_created_at" ON "integration_errors"("lead_id", "created_at");
CREATE INDEX IF NOT EXISTS "idx_integration_errors_order_id_created_at" ON "integration_errors"("order_id", "created_at");
