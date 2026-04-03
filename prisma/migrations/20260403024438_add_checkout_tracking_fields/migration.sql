-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "checkout_step" INTEGER,
ADD COLUMN     "company_name" TEXT,
ADD COLUMN     "lead_type" TEXT;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "remote_ip" TEXT;
