import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCategories1742566673607 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "productCategories" ("id", "name", "imageUrl") VALUES
            (1, 'Consumer Electronics', 'https://ae01.alicdn.com/kf/S1509b6cd14fd472f86fc4dabc310985eg.png'),
            (2, 'Home Improvement & Lights', 'https://ae01.alicdn.com/kf/S608363f8a6b34a858ee02f2a0a3cfc51j.png'),
            (3, 'Jewelry & Watches', 'https://ae01.alicdn.com/kf/Sd99fa45b0c1c47e69f64f10e43157b09W.png'),
            (4, 'Toys & Games', 'https://ae01.alicdn.com/kf/S959a6b38b9c047198e0a72357be91135x.png'),
            (5, 'Fashion & Apparel', 'https://images.unsplash.com/photo-1561053720-76cd73ff22c3'),
            (6, 'Beauty & Health', 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd'),
            (7, 'Automobiles & Motorcycles', 'https://plus.unsplash.com/premium_photo-1698263800117-4f03881269d1'),
            (8, 'Sports & Outdoors', 'https://images.unsplash.com/photo-1610839563044-8996a168a961'),
            (9, 'Computers & Office', 'https://images.unsplash.com/photo-1535957998253-26ae1ef29506'),
            (10, 'Home & Kitchen', 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d');
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "productCategories"`);
  }
}
