-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "cuisines" TEXT[],
ADD COLUMN     "maxPrice" INTEGER,
ADD COLUMN     "minPrice" INTEGER,
ADD COLUMN     "ratings" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
