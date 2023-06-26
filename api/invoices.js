const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'shopping',
    password: '882260',
    port: 5432,
});

router.get('/',async (req,res)=>{
    try {
        const results = await pool.query('SELECT * FROM invoice');
        res.json(results.rows);
    } catch (err) {
        console.error(err);
        res.send("Error Happend when GET!!!")
    }
});

router.post('/', async(req,res)=>{
    try {
        const { invoice_id, customer_id, item_desc, price, agent_id } = req.body;
        const newinvoice = await pool.query(
            'INSERT INTO invoice (invoice_id, customer_id, item_desc, price,agent_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [invoice_id, customer_id, item_desc, price, agent_id]

        );

        res.json(newinvoice.rows[0])
    } catch (err) {
        console.log(err);
        res.send("Error Happend when POST!!!")
    }
});

module.exports = router;