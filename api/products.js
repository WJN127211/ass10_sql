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
        const results = await pool.query('SELECT * FROM product');
        res.json(results.rows);
    } catch (err) {
        console.error(err);
        res.send("Error Happend when GET!!!")
    }
});

router.post('/', async(req,res)=>{
    try {
        const { productname, price, weight, number_left } = req.body;
        const newproduct = await pool.query(
            'INSERT INTO product (productname, price, weight, number_left) VALUES ($1, $2, $3, $4) RETURNING *',
            [productname, price, weight, number_left]

        );

        res.json(newproduct.rows[0])
    } catch (err) {
        console.log(err);
        res.send("Error Happend when POST!!!")
    }
});

module.exports = router;