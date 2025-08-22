// server.js
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
const PORT = 5000;
const saltRounds = 10;

// ✅ PostgreSQL connection
const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Harinavi@148",
  port: 7000, // default Postgres port
});

db.connect()
  .then(() => console.log("✅ Database connected!"))
  .catch((err) => {
    console.error("❌ Database connection error:", err.stack);
    process.exit(1);
  });

// ✅ Middlewares
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));
app.use(express.json());

// ✅ Routes
app.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    // check if email exists
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists. Try logging in." });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // insert user
    await db.query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3)",
      [email, hashedPassword, name]
    );

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("❌ Error during registration:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ============ LOGIN ============ */

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(" Login attempt:", email, password);

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    console.log(" DB result:", result.rows);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    console.log("👉 bcrypt match:", match);

    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful!", 
      role: user.role
     });
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



/* ============ ROLE SELECTION ============ */
app.post("/select-role", async (req, res) => {
  try {
    const { role } = req.body;

    // Get latest user id
    const result = await db.query("SELECT MAX(id) AS id FROM users");
    const latestId = result.rows[0].id;

    if (!latestId) {
      return res.status(400).json({ error: "No user found to assign role" });
    }

    // ✅ Correct table name: users
    await db.query("UPDATE users SET role = $1 WHERE id = $2", [role, latestId]);

    res.json({ success: true, role });
  } catch (err) {
    console.error("DB error in /select-role:", err);
    res.status(500).json({ error: "Failed to save role" });
  }
});

app.post("/role/reporter", async (req, res) => {
  try {
    const { description, image, severity, lat, lon } = req.body;

    const result = await pool.query(
      `INSERT INTO reports (reporter_id, description, image, severity, lat, lon)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [ description, image, severity, lat, lon]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting report:", err);
    res.status(500).json({ error: "Failed to save report" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
