import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class initDb1656230431479 implements MigrationInterface {
  name = "initDb1656230431479";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Table member
    await queryRunner.createTable(
      new Table({
        name: "member",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "phone",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "level",
            type: "enum",
            enum: ["junior", "senior"],
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "token_setup_password",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "bigint",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "bigint",
            isNullable: false,
          },
        ],
      })
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("member");
  }
}
