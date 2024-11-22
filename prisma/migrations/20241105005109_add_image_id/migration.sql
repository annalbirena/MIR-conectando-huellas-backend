/*
  Warnings:

  - You are about to drop the column `image` on the `Pets` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `Pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "image",
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
