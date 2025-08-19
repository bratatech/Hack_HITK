import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";

//  Fix dirname/filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  PostgreSQL client
const db = new pg.Client({
  user: "postgres",
  host: "127.0.0.1",        // IPv4 loopback
  database: "postgres",     // change if you made a separate DB
  password: "Harinavi@148",
  port: 7000
});

db.connect()
  .then(() => console.log(" Database connected!"))
  .catch(err => console.error(" Database connection error:", err));

const app = express();
const saltRounds = 10;
const PORT = 5000;

//  Middleware
app.use(cors({
  origin: "http://localhost:5173", // React frontend URL
  credentials: true
}));
app.use(express.json());

//  Serve React build
app.use(express.static(path.join(__dirname, "../stunning-site")));

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express API!" });
});

//  Catch-all route: serve index.html
app.get("/", (req, res) => {
  res.sendFile("/../stunning-site/index.html");
});

/* ============ SIGNUP ============ */
app.post("/signup", async (req, res) => {
  try {
    let { email, name, password } = req.body;

    // --- Validation ---
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    email = email.toLowerCase(); // normalize email

    // Check if email already exists
    const checkResult = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (checkResult.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Email already exists. Try logging in." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    await db.query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3)",
      [email, hashedPassword, name]
    );

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


/* ============ LOGIN ============ */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(201).json({ message: "Login successful!" });
  } catch (err) {
    console.error(" Error during login:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/select-role",(req,res)=>{
  const { role } = req.body;
  // Here you would typically save the role to the user's session or database
  db.query("UPDATE users SET role = $1 where MAX(id)", [role]) 
  console.log(`User selected role: ${role}`);
app.post("/select-role", async (req, res) => {
  const { role } = req.body;
  
  try {
    // Update the user with the highest ID (most recent)
    const result = await db.query(
      `UPDATE users 
       SET role = $1 
       WHERE id = (SELECT MAX(id) FROM users) 
       RETURNING id, email, role`,
      [role]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No users found to update" });
    }

    console.log(`Updated role to ${role} for user ID: ${result.rows[0].id}`);
    res.status(200).json({ 
      message: `Role updated successfully!`,
      user: result.rows[0]
    });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({ message: "Failed to update role" });
  }
});  res.status(200).json({ message: `Role ${role} selected successfully!` });
})
// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
