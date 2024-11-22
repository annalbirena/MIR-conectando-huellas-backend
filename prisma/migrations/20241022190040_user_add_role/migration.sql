/*
  Warnings:

  - You are about to drop the `Asset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Asset";

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Breed" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Species" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pets" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "ageUnit" BOOLEAN NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "location_latitude" DOUBLE PRECISION NOT NULL,
    "location_longitude" DOUBLE PRECISION NOT NULL,
    "breedId" TEXT NOT NULL,
    "specieId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LostPets" (
    "id" TEXT NOT NULL,
    "lostDate" TIMESTAMP(3) NOT NULL,
    "statusLost" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LostPets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionPets" (
    "id" TEXT NOT NULL,
    "statusAdopt" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AdoptionPets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Breed_id_key" ON "Breed"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Breed_name_key" ON "Breed"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Species_id_key" ON "Species"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Species_name_key" ON "Species"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Contacts_id_key" ON "Contacts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Images_id_key" ON "Images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pets_id_key" ON "Pets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LostPets_id_key" ON "LostPets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AdoptionPets_id_key" ON "AdoptionPets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LostPets" ADD CONSTRAINT "LostPets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LostPets" ADD CONSTRAINT "LostPets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LostPets" ADD CONSTRAINT "LostPets_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionPets" ADD CONSTRAINT "AdoptionPets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionPets" ADD CONSTRAINT "AdoptionPets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionPets" ADD CONSTRAINT "AdoptionPets_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
