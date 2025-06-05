import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRating1749132590916 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO rating (id, name, value)
            VALUES
            (1, 'Excellent', 5),
            (2, 'Good', 4),
            (3, 'Average', 3),
            (4, 'Poor', 2),
            (5, 'Terrible', 1);            
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rating"`);
  }
}
