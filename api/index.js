const express = require('express');
const router = express.Router();

router.use('/customer',require('./customers'));
router.use('/agent',require('./agents'));
router.use('/product',require('./products'));
router.use('/invoice',require('./invoices'));

router.use((req,res,next)=>{
    const error = new Error("404 Not FOund");
    error.status =404;
    next();
});

module.exports = router;



