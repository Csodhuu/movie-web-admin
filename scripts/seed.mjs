// Эхний Super Admin үүсгэнэ. Сонголтоор жишээ кинонуудыг нэмнэ.
//
//   npm run seed              -> зөвхөн админ
//   npm run seed -- --sample  -> админ + жишээ кино
//
// .env.local дотор MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD (заавал биш: ADMIN_NAME) байх ёстой.

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME = "Super Admin" } = process.env;

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD орчны хувьсагчийг тохируулна уу (.env.local).");
  process.exit(1);
}
if (ADMIN_PASSWORD.length < 8) {
  console.error("ADMIN_PASSWORD хамгийн багадаа 8 тэмдэгт байна.");
  process.exit(1);
}

// src/lib/models доторх моделиудтай ижил collection-уудыг ашиглана
const Admin = mongoose.model("Admin", new mongoose.Schema({}, { strict: false, timestamps: true }));
const Movie = mongoose.model("Movie", new mongoose.Schema({}, { strict: false, timestamps: true }));

const sampleMovies = [
  { title: "Тэнгэрийн хаалга", type: "Кино", genre: "Драм", year: 2025, duration: "2ц 14м", views: 128400, rating: 4.7, status: "published" },
  { title: "Нүүдэлчдийн домог", type: "Цуврал", genre: "Түүхэн", year: 2024, duration: "12 анги", views: 98200, rating: 4.8, status: "published" },
  { title: "Хотын гэрэл", type: "Кино", genre: "Романтик", year: 2025, duration: "1ц 52м", views: 76500, rating: 4.3, status: "published" },
  { title: "Шөнийн анчин", type: "Кино", genre: "Триллер", year: 2026, duration: "2ц 03м", views: 0, rating: 0, status: "scheduled" },
  { title: "Говийн нууц", type: "Баримтат", genre: "Баримтат", year: 2023, duration: "1ц 28м", views: 41200, rating: 4.5, status: "published" },
  { title: "Од эрхэс", type: "Цуврал", genre: "Шинжлэх ухаан", year: 2026, duration: "8 анги", views: 0, rating: 0, status: "draft" },
];

await mongoose.connect(MONGODB_URI);

const email = ADMIN_EMAIL.trim().toLowerCase();
const existing = await Admin.findOne({ email });
if (existing) {
  console.log(`Админ аль хэдийн байна: ${email}`);
} else {
  await Admin.create({
    name: ADMIN_NAME,
    email,
    passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12),
    role: "Super Admin",
    twoFA: false,
    disabled: false,
  });
  console.log(`Super Admin үүслээ: ${email}`);
}

if (process.argv.includes("--sample")) {
  if ((await Movie.countDocuments()) === 0) {
    await Movie.insertMany(sampleMovies.map((m) => ({ ...m, description: "" })));
    console.log(`${sampleMovies.length} жишээ кино нэмэгдлээ.`);
  } else {
    console.log("Кино аль хэдийн байгаа тул жишээ нэмсэнгүй.");
  }
}

await mongoose.disconnect();
