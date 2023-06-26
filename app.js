const express = require('express');
const PORT = 8080;
const app = express();

app.use(express.json()); 
app.use("/api",require("./api"));

const serverRun = ()=>{
    const server =app.listen(PORT ,()=>{
        console.log(`Showing on port: ${PORT}`);
    });
};

serverRun();
