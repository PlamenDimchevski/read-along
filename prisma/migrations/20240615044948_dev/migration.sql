-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('COMPLETED', 'ONGOING', 'CANCELED');

-- CreateEnum
CREATE TYPE "ChapterProgress" AS ENUM ('ADDED', 'PROCESSING', 'READY', 'APPROVED');

-- CreateEnum
CREATE TYPE "ChapterStatus" AS ENUM ('OPEN', 'READING', 'READ');

-- CreateTable
CREATE TABLE "BookSeries" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'ONGOING',

    CONSTRAINT "BookSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'ONGOING',
    "bookSeriesId" INTEGER,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapters" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "ChapterStatus" NOT NULL DEFAULT 'OPEN',
    "progress" "ChapterProgress" NOT NULL DEFAULT 'ADDED',
    "aiProcessed" BOOLEAN NOT NULL DEFAULT false,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "Chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL,
    "imageUrl" TEXT,
    "booksId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BookSeries_name_id_idx" ON "BookSeries"("name", "id");

-- CreateIndex
CREATE UNIQUE INDEX "BookSeries_id_key" ON "BookSeries"("id");

-- CreateIndex
CREATE INDEX "Books_name_id_idx" ON "Books"("name", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Books_id_key" ON "Books"("id");

-- CreateIndex
CREATE INDEX "Chapters_title_id_idx" ON "Chapters"("title", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Chapters_id_key" ON "Chapters"("id");

-- CreateIndex
CREATE INDEX "Character_name_id_idx" ON "Character"("name", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Character_id_key" ON "Character"("id");

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_bookSeriesId_fkey" FOREIGN KEY ("bookSeriesId") REFERENCES "BookSeries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapters" ADD CONSTRAINT "Chapters_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
