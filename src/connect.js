const { Pool } = require('pg');
const passwordDatabase = require('../passwordDatabase');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: passwordDatabase,
    database: 'bank_app',
})

module.exports = pool