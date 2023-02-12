require("./db");
require('express-async-errors')
const express = require("express");
const app = express();
const cors=require('cors')
require("dotenv").config();
const morgan = require("morgan");
const PORT = process.env.PORT;

//routers
const postRouter = require("./routers/post");
//middlewares
app.use(express.json({origin:"http://localhost:3000"}))
app.use(morgan("dev"));
app.use(cors())
app.use("/api/post", postRouter);

app.use((err,req,res,next)=>{
  res.status(500).json({error:err.message})
})
app.listen(PORT, () => {
  console.log("App is listing on port", PORT);
});
