/*
  Warnings:

  - The primary key for the `Split` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Split" DROP CONSTRAINT "Split_pkey",
ADD CONSTRAINT "Split_pkey" PRIMARY KEY ("expenseId", "userId");
