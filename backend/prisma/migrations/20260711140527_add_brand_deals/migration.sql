-- CreateTable
CREATE TABLE "BrandDeal" (
    "id" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "campaign" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BrandDeal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BrandDeal" ADD CONSTRAINT "BrandDeal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
