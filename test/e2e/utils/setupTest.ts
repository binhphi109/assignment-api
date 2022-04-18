import mongoose, { connection } from "mongoose";
import app from "../../../src/core/express";
import db from "../../../src/core/mongoose";
import { runSeed } from "./seeder";

export const setupTestDB = async function () {
  beforeAll(async function () {
    await db.connect();

    // drop all collections
    const collections = await mongoose.connection.db.collections();
    collections.forEach((collection) => {
      mongoose.connection.dropCollection(collection.collectionName);
    });

    // init data
    await runSeed();
  });

  beforeEach(async function () {});

  afterAll(async function () {
    await db.disconnect();
  });
};
