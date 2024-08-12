const mongoose = require("mongoose");

// Using Asynchronous function of async and await for handling the promises

const connectDB = async () => {
  // Using the Try catch statement for catching any errors that occur
  try {
    await mongoose.connect("process.env.MONGO_URI", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected Now");
  } catch (error) {
    console.log(error.message);
  }
};

//Exporting connectDB for Further use
module.export = connectDB;
