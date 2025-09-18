/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `area` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `person` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "area_name_key" ON "public"."area"("name");

-- CreateIndex
CREATE UNIQUE INDEX "person_name_key" ON "public"."person"("name");
