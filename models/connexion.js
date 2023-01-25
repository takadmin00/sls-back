const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const ConnectionString = process.env.CONNECTION_STRING;
console.log("ConnectionString: ", ConnectionString);

mongoose
  .connect(ConnectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected ✅✅✅"))
  .catch((error) => console.error(error));
