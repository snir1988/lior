require ('dotenv').config();
const http = require('http');
const port = process.env.PORT || 3030;
const app = require('./app');

const srv = http.createServer(app);
srv.listen(port,()=>{console.log("server working")});