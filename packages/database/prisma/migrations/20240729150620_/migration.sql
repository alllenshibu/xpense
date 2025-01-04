-- CreateTable
CREATE TABLE "Split" (
    "expenseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "share" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Split_pkey" PRIMARY KEY ("expenseId")
);

-- AddForeignKey
ALTER TABLE "Split" ADD CONSTRAINT "Split_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Split" ADD CONSTRAINT "Split_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
