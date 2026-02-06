
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
// app.use(cors())

/* ---------- CORS (VERY IMPORTANT ORDER) ---------- */
const corsOptions = {
  origin: [
    "https://admin.made4ever.in",
    "https://bureau.made4ever.in",
    "https://made4ever.in",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

connect();
app.get('/',(req,res)=>
{
    res.send("welcome to made4ever")
})

// ===============================================
//          all routesm start
// ===============================================
app.use('/api/admin',require('./routes/lookup'));

app.use('/api/msp',require('./routes/msp_routes'));

app.use('/api/upload',require('./routes/uploadfiles'));

app.use('/api/user',require('./routes/add_user'));

app.use('/api/recycle-bin',require('./routes/recycle_bin'));

app.use('/api/msp/signin',require('./routes/sign_in'));

app.use('/api/sub-admin',require('./routes/sub_admin'));

app.use('/api/blog',require('./routes/blog'));

app.use('/api/payu',require('./routes/payment'));

app.use('/api/feedback',require('./routes/feedback'));

app.use('/api/join-now',require('./routes/join_now'));

app.use('/api/contact-us',require('./routes/contactus'));

// ===============================================
//          all routes end
// ===============================================


const server=app.listen(process.env.PORT,()=>
{
    console.log(`server is running on port:${process.env.PORT}`);
})
server.setTimeout(5 * 60 * 1000); // 300000 ms = 5 minutes

