/*
  Warnings:

  - You are about to drop the column `booksId` on the `Character` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_booksId_fkey";

-- AlterTable
ALTER TABLE "BookSeries" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'COMPLETED';

-- AlterTable
ALTER TABLE "Books" ALTER COLUMN "status" SET DEFAULT 'COMPLETED';

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "booksId",
ADD COLUMN     "bookSeriesId" INTEGER;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_bookSeriesId_fkey" FOREIGN KEY ("bookSeriesId") REFERENCES "BookSeries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
