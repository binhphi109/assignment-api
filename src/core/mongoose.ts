import mongoose, { Mongoose } from "mongoose";
import path from "path";
import config from "../config";

export default {
  connect: async function (): Promise<Mongoose | null> {
    config.files.models.forEach((modelPath) => {
      require(path.resolve(modelPath));
    });

    var db = null;

    try {
      db = await mongoose.connect(config.mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });

      console.log("MongoDb database connected.");
    } catch (error) {
      console.error("Unable to connect to MongoDb database:", error);
    }

    return db;
  },
};
