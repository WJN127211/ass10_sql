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
        const results = await pool.query('SELECT * FROM agent');
        res.json(results.rows);
    } catch (err) {
        console.error(err);
        res.send("Error Happend when GET!!!")
    }
});

router.post('/', async(req,res)=>{
    try {
        const { agentid, agentname, phone, address } = req.body;
        const newagent = await pool.query(
            'INSERT INTO agent (agentid, agentname, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
            [agentid, agentname, phone, address]

        );

        res.json(newagent.rows[0])
    } catch (err) {
        console.log(err);
        res.send("Error Happend when POST!!!")
    }
});

module.exports = router;