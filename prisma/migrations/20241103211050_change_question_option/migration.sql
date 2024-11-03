/*
  Warnings:

  - You are about to drop the column `correctOptionId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `correctOptionIndex` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_correctOptionId_fkey`;

-- DropIndex
DROP INDEX `Quiz_authorId_fkey` ON `Quiz`;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `correctOptionId`,
    ADD COLUMN `correctOptionIndex` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Quiz` DROP COLUMN `authorId`;
