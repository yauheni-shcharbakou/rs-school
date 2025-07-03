-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_artistId_fkey";

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
