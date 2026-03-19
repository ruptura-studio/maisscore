/*
  Warnings:

  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_leadId_fkey";

-- DropTable
DROP TABLE "Lead";

-- DropTable
DROP TABLE "Payment";

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "channel" TEXT,
    "status" TEXT NOT NULL DEFAULT 'novo',
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "notion_id" TEXT,
    "crm_id" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lead_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "document" TEXT,
    "document_type" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "price_paid" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "asaas_id" TEXT,
    "method" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "amount" INTEGER NOT NULL,
    "pix_key" TEXT,
    "pix_expires_at" TIMESTAMPTZ,
    "boleto_url" TEXT,
    "boleto_expires_at" TIMESTAMPTZ,
    "confirmed_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'aguardando_inicio',
    "stage" TEXT,
    "started_at" TIMESTAMPTZ,
    "cleaned_at" TIMESTAMPTZ,
    "proof_url" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "processes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nurture_log" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lead_id" UUID NOT NULL,
    "channel" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT,
    "sent_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'sent',

    CONSTRAINT "nurture_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "leads_phone_key" ON "leads"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "payments_order_id_key" ON "payments"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_asaas_id_key" ON "payments"("asaas_id");

-- CreateIndex
CREATE UNIQUE INDEX "processes_order_id_key" ON "processes"("order_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processes" ADD CONSTRAINT "processes_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nurture_log" ADD CONSTRAINT "nurture_log_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
