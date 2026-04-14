-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "converted_at" TIMESTAMPTZ,
ADD COLUMN     "cora_temperature" TEXT,
ADD COLUMN     "current_temperature" TEXT,
ADD COLUMN     "estagio_negociacao" TEXT,
ADD COLUMN     "loss_reason" TEXT,
ADD COLUMN     "objetivo" TEXT,
ADD COLUMN     "tempo_endividado" TEXT,
ADD COLUMN     "valor_divida" TEXT;

-- CreateTable
CREATE TABLE "lead_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lead_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkout_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lead_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "metadata" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkout_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_templates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "flow" TEXT NOT NULL,
    "step" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "variables" TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "message_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "message_templates_slug_key" ON "message_templates"("slug");

-- AddForeignKey
ALTER TABLE "lead_events" ADD CONSTRAINT "lead_events_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_events" ADD CONSTRAINT "checkout_events_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
