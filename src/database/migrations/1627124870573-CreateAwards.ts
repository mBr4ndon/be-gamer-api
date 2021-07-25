import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAwards1627124870573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'awards',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'user_sender',
                        type: 'uuid'
                    },
                    {
                        name: 'user_receiver',
                        type: 'uuid'
                    },
                    {
                        name: 'tag_id',
                        type: 'uuid'
                    },
                    {
                        name: 'message',
                        type: 'varchar'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },                    
                ],
                foreignKeys: [
                    {
                        name: 'FKAwardsUserReceiver',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_receiver'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'FKAwardsUserSender',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_sender'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'FKAwardsTagId',
                        referencedTableName: 'tags',
                        referencedColumnNames: ['id'],
                        columnNames: ['tag_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                    
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('awards');
    }

}
