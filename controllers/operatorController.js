const Operator = require("../models/Operator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const existing = await Operator.findOne({ email });
    if (existing) {
      return res.status(200).json({ success: false, message: "Operator already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newOperator = new Operator({
      fullName,
      email,
      password: hashed
    });

    await newOperator.save();

    res.status(201).json({
      success: true,
      message: "Signup successful"
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const operator = await Operator.findOne({ email });
    if (!operator) {
      return res.status(200).json({ success: false, message: "Invalid email" });
    }

    const match = await bcrypt.compare(password, operator.password);
    if (!match) {
      return res.status(200).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: operator._id, role: operator.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      operator: {
        id: operator._id,
        fullName: operator.fullName,
        email: operator.email,
        role: operator.role
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
