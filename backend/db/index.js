const mongoose = require("mongoose");
mongoose.set('strictQuery',false)
mongoose
  .connect('mongodb+srv://nayeem:ZQAZMSYvysIfUWHb@cluster0.qcsncbe.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>console.log('Database connected'))
  .catch((err) =>
    console.log("Database connection failed : ", err.message || err)
  );
