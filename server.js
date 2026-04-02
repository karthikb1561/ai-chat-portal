require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Error:", err));


// =========================
// ✅ STEP 1: Create Schema
// =========================
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});


// =========================
// ✅ STEP 2: Create Model
// =========================
const User = mongoose.model("User", userSchema);


// =========================
// ✅ STEP 3: Routes
// =========================

// CREATE USER
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// TEST ROUTE
app.get('/users', (req, res) => {
  res.send("API is running...");
});

// UPDATE USER
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  res.send({
    message: `User ${id} updated`,
    data: updatedData
  });
});

// DELETE USER
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  res.send({
    message: `User ${id} deleted`
  });
});

// =========================
// ✅ STEP 4: Start Server
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});