-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PENGGUNA', 'KOMUNITAS');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PENGGUNA';
