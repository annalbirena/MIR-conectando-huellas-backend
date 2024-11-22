/*
  Warnings:

  - You are about to drop the column `breedId` on the `Pets` table. All the data in the column will be lost.
  - You are about to drop the `Breed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pets" DROP CONSTRAINT "Pets_breedId_fkey";

-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "breedId";

-- DropTable
DROP TABLE "Breed";
