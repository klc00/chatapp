import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1685678213442 implements MigrationInterface {
    name = 'Migration1685678213442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` text NOT NULL, \`creatorId\` int NOT NULL, \`recipientId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`nickname\` varchar(255) NOT NULL, \`privateKey\` varchar(255) NOT NULL, \`photo\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`connected_user_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`socketId\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`connected_user_entity\` ADD CONSTRAINT \`FK_a2cac4ca8aafbecb41901b07edb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`connected_user_entity\` DROP FOREIGN KEY \`FK_a2cac4ca8aafbecb41901b07edb\``);
        await queryRunner.query(`DROP TABLE \`connected_user_entity\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`message\``);
    }

}
