
const express=require('express')
const cors=require('cors');
const path = require('path');
const connect = require('./connectdb');
const bodyParser = require('body-parser');
require('dotenv').config();


const app=express();

// app.use(bodyParser.json())
// Increase request body size limit
app.use(bodyParser.json({ limit: "50mb" })); // Increase limit for JSON payloads
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Increase limit for form data
// Allow up to 50MB of JSON data (adjust as needed)
app.use(express.json({ limit: '50mb' }));

// app.use('/images', express.static('images'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors())
// app.use(cors({ origin: 'https://ln-bird-project-px3u.vercel.app/' }));
// app.use(cors({
//     origin: ['https://ln-bird-project-px3u.vercel.app', 'https://www.bharatproperties.co','http://localhost:3000'], // Allow both domains
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//     credentials: true
// }));
connect();
app.get('/',(req,res)=>
{
    res.send("welcome")
})

app.use('/api/admin',require('./routes/lookup'));

app.use('/api/msp',require('./routes/msp_routes'));

app.use('/api/upload',require('./routes/uploadfiles'));


const server=app.listen(process.env.PORT,()=>
{
    console.log(`server is running on port:${process.env.PORT}`);
})
server.setTimeout(5 * 60 * 1000); // 300000 ms = 5 minutes

