/*
  Warnings:

  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `retailer_product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phone` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `OrderedItems` DROP FOREIGN KEY `OrderedItems_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `OrderedItems` DROP FOREIGN KEY `OrderedItems_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_retailer_id_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_retailer_id_fkey`;

-- DropForeignKey
ALTER TABLE `retailer_product` DROP FOREIGN KEY `retailer_product_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `retailer_product` DROP FOREIGN KEY `retailer_product_retailer_id_fkey`;

-- DropIndex
DROP INDEX `OrderedItems_order_id_fkey` ON `OrderedItems`;

-- DropIndex
DROP INDEX `OrderedItems_product_id_fkey` ON `OrderedItems`;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `orders`;

-- DropTable
DROP TABLE `products`;

-- DropTable
DROP TABLE `retailer_product`;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `formula` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `consumption` VARCHAR(191) NOT NULL,
    `sideeffects` VARCHAR(191) NOT NULL,
    `other` VARCHAR(191) NOT NULL,
    `retailer_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RetailerProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stock` INTEGER NOT NULL,
    `wholesaleprice` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `retailer_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `retailer_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_retailer_id_fkey` FOREIGN KEY (`retailer_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RetailerProduct` ADD CONSTRAINT `RetailerProduct_retailer_id_fkey` FOREIGN KEY (`retailer_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RetailerProduct` ADD CONSTRAINT `RetailerProduct_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_retailer_id_fkey` FOREIGN KEY (`retailer_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderedItems` ADD CONSTRAINT `OrderedItems_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderedItems` ADD CONSTRAINT `OrderedItems_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
