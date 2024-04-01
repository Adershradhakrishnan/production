
const dotenv =require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors =require("cors");
const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/userroutes');
const connect = require("./db/connect");
dotenv.config();

connect();

const corsOptions = {
  origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(authRoutes);

app.use(userRoutes);
app.use('/getuser',userRoutes);
app.use('/updateuser',userRoutes);



// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

console.log("__dirname: ",__dirname);
app.use('/',express.static(__dirname + "/hrm_client"));

app.listen(process.env.PORT, () => {
  console.log(`server listening at http://localhost:${process.env.PORT}`);
})