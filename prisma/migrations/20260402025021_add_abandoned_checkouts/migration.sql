-- CreateTable
CREATE TABLE "abandoned_checkouts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "document" TEXT,
    "document_type" TEXT,
    "product" TEXT,
    "payment_method" TEXT,
    "installments" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "abandoned_checkouts_pkey" PRIMARY KEY ("id")
);
