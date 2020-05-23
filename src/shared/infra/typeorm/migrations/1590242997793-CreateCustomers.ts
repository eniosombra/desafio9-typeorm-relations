import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// Caso a migration falhe, então execute essa query no banco postgres: CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

export default class CreateCustomers1590242997793
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // createExtension('uuid-ossp', { ifNotExists: true });

    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers');
  }
}
