import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../src/models/userModel.js";
import Book from "../src/models/bookModel.js";
import { HASH_ROUNDS } from "../src/constants/hashRounds.js";

const booksToSeed = [
  { name: "1984", author: "George Orwell", pageCount: 328 },
  { name: "Brave New World", author: "Aldous Huxley", pageCount: 311 },
  { name: "The Hobbit", author: "J.R.R. Tolkien", pageCount: 310 },
  { name: "Clean Code", author: "Robert C. Martin", pageCount: 464 },
  { name: "The Pragmatic Programmer", author: "David Thomas", pageCount: 352 },
];

const seedAdmin = async (): Promise<void> => {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
  }

  const existing = await User.findOne({ email: ADMIN_EMAIL });

  if (existing) {
    console.log(`ℹ️  Admin with email ${ADMIN_EMAIL} already exists, skipping`);
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, HASH_ROUNDS);

  await User.create({
    name: "Admin",
    email: ADMIN_EMAIL,
    passwordHash,
    role: "admin",
  });

  console.log(`✅ Admin created: ${ADMIN_EMAIL}`);
};

const seedBooks = async (): Promise<void> => {
  const count = await Book.countDocuments();

  if (count > 0) {
    console.log(
      `ℹ️  Books collection already has ${count} document(s), skipping`,
    );
    return;
  }

  await Book.insertMany(booksToSeed);
  console.log(`✅ Seeded ${booksToSeed.length} books`);
};

const run = async (): Promise<void> => {
  const { MONGO_URI } = process.env;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI must be set in .env");
  }

  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");

  await seedAdmin();
  await seedBooks();

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
