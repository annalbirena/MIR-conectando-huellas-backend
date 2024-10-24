/*
  Warnings:

  - Added the required column `breed` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pets" ADD COLUMN     "breed" TEXT NOT NULL;
