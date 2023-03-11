const mongoose = require("mongoose");

// mongoose.set("debug",true)

const DB = mongoose

  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then((con) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = DB;
