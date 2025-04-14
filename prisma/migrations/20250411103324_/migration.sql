/*
  Warnings:

  - The `version` column on the `Update` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Update" DROP COLUMN "version",
ADD COLUMN     "version" INTEGER;
