-- CreateEnum
CREATE TYPE "VenueFeatures" AS ENUM ('BAR', 'LIVE_MUSIC', 'OUTDOOR_SEATING', 'PRIVATE_ROOM', 'WHEELCHAIR_ACCESSIBLE', 'WIFI', 'TV', 'PARKING');

-- CreateEnum
CREATE TYPE "ParkingOptions" AS ENUM ('STREET', 'VALET', 'PRIVATE_LOT', 'GARAGE');

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "barSeating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "features" "VenueFeatures"[] DEFAULT ARRAY[]::"VenueFeatures"[],
ADD COLUMN     "outdoorSeating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "parking" "ParkingOptions"[] DEFAULT ARRAY[]::"ParkingOptions"[];
