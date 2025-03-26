/*
  Warnings:

  - You are about to drop the column `barSeating` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `brunchHours` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `outdoorSeating` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `parking` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `rooftopSeating` on the `Restaurant` table. All the data in the column will be lost.
  - The `indoorSeating` column on the `Restaurant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SeatingArea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "SeatingArea" DROP CONSTRAINT "SeatingArea_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "barSeating",
DROP COLUMN "brunchHours",
DROP COLUMN "features",
DROP COLUMN "outdoorSeating",
DROP COLUMN "parking",
DROP COLUMN "rooftopSeating",
ALTER COLUMN "capacity" SET DEFAULT 0,
DROP COLUMN "indoorSeating",
ADD COLUMN     "indoorSeating" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "SeatingArea";

-- DropEnum
DROP TYPE "EventType";

-- DropEnum
DROP TYPE "ParkingOptions";

-- DropEnum
DROP TYPE "SeatingType";

-- DropEnum
DROP TYPE "VenueFeatures";
