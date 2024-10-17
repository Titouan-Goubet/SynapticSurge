-- DropForeignKey
ALTER TABLE `Quiz` DROP FOREIGN KEY `Quiz_authorId_fkey`;

-- AlterTable
ALTER TABLE `Quiz` ADD COLUMN `userId` VARCHAR(191) NULL,
    MODIFY `authorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
