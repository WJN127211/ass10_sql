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
        const results = await pool.query('SELECT * FROM customer');
        res.json(results.rows);
    } catch (err) {
        console.error(err);
        res.send("Error Happend when GET!!!")
    }
});

router.post('/', async(req,res)=>{
    try {
        const { customerid, customername, agentid, phonenumber } = req.body;
        const newcustomer = await pool.query(
            'INSERT INTO customer (customerid, customername, agentid, phonenumber) VALUES ($1, $2, $3, $4) RETURNING *',
            [customerid, customername, agentid, phonenumber]

        );

        res.json(newcustomer.rows[0])
    } catch (err) {
        console.log(err);
        res.send("Error Happend when POST!!!")
    }
});

module.exports = router;