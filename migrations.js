exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function(table) {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('role').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
};
