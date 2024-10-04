import mongoose from "mongoose";

const connectDb = async () => {
  //const mongoURI = process.env.MONGODB_URI;
  try {
    // const conn = await mongoose.connect(`mongodb://localhost:27017/BeyondDualism`, {
    //   useNewUrlParser: true,
    // });
    // const conn = await mongoose.connect(mongoURI, {
    //   useNewUrlParser: true,
    // });
    const conn = await mongoose.connect(`mongodb+srv://sachanakshat09:BqgYQ9ss8H3YsFs6@cluster0.vgo8s.mongodb.net/beyonddualism`, {
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export default connectDb;