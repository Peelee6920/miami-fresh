/*
  Warnings:

  - Added the required column `capacity` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indoorSeating` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ParkingOptions" AS ENUM ('VALET', 'SELF_PARKING', 'STREET_PARKING', 'GARAGE', 'NO_PARKING');

-- CreateEnum
CREATE TYPE "VenueFeatures" AS ENUM ('ROOFTOP', 'LIVE_MUSIC', 'OUTDOOR_PATIO', 'WATERFRONT', 'PRIVATE_ROOMS', 'FULL_BAR', 'WINE_BAR', 'CRAFT_COCKTAILS', 'TV_SCREENS', 'WHEELCHAIR_ACCESSIBLE', 'PET_FRIENDLY', 'HAPPY_HOUR', 'BYOB');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('LIVE_MUSIC', 'HAPPY_HOUR', 'WINE_TASTING', 'FOOD_TASTING', 'HOLIDAY', 'PRIVATE_PARTY', 'SPECIAL_MENU', 'BRUNCH', 'KARAOKE', 'TRIVIA_NIGHT');

-- CreateEnum
CREATE TYPE "SeatingType" AS ENUM ('INDOOR_MAIN', 'INDOOR_PRIVATE', 'BAR', 'OUTDOOR_PATIO', 'ROOFTOP', 'LOUNGE');

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "barSeating" INTEGER,
ADD COLUMN     "brunchHours" JSONB,
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "features" "VenueFeatures"[],
ADD COLUMN     "indoorSeating" INTEGER NOT NULL,
ADD COLUMN     "outdoorSeating" INTEGER,
ADD COLUMN     "parking" "ParkingOptions"[],
ADD COLUMN     "rooftopSeating" INTEGER;

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "eventType" "EventType" NOT NULL,
    "price" DOUBLE PRECISION,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrence" JSONB,
    "restaurantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeatingArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SeatingType" NOT NULL,
    "capacity" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "currentOccupancy" INTEGER NOT NULL DEFAULT 0,
    "restaurantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeatingArea_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatingArea" ADD CONSTRAINT "SeatingArea_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
