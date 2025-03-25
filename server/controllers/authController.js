const User = require("../models/User");
const { sendVerificationEmail } = require("../utils/emailService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const db = require("../config/database");

const registerCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error occurred" });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const verificationToken = crypto.randomBytes(32).toString("hex");

        const query =
          "INSERT INTO users (first_name, last_name, email, password, role, verification_token) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(
          query,
          [
            firstName,
            lastName,
            email,
            hashedPassword,
            "customer",
            verificationToken,
          ],
          async (err, result) => {
            if (err) {
              console.error("Database error:", err);
              return res
                .status(500)
                .json({ message: "Error creating customer account" });
            }

            try {
              await sendVerificationEmail(email, verificationToken);
              res
                .status(201)
                .json({
                  message:
                    "Registration successful. Please check your email for verification.",
                });
            } catch (emailErr) {
              console.error("Email error:", emailErr);
              res
                .status(201)
                .json({
                  message:
                    "Registration successful but failed to send verification email.",
                });
            }
          }
        );
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering customer" });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error occurred" });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const verificationToken = crypto.randomBytes(32).toString("hex");

        const query =
          "INSERT INTO users (first_name, last_name, email, password, role, verification_token) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(
          query,
          [
            firstName,
            lastName,
            email,
            hashedPassword,
            "admin",
            verificationToken,
          ],
          async (err, result) => {
            if (err) {
              console.error("Database error:", err);
              return res
                .status(500)
                .json({ message: "Error creating admin account" });
            }

            try {
              await sendVerificationEmail(email, verificationToken);
              res
                .status(201)
                .json({
                  message:
                    "Admin registered successfully. Please check your email for verification.",
                });
            } catch (emailErr) {
              console.error("Email error:", emailErr);
              res
                .status(201)
                .json({
                  message:
                    "Admin registered successfully but failed to send verification email.",
                });
            }
          }
        );
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering admin" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error occurred" });
        }

        if (results.length === 0) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = results[0];

        if (!user.email_verified) {
          return res
            .status(401)
            .json({ message: "Please verify your email before logging in" });
        }

        if (user.role !== "admin") {
          return res
            .status(403)
            .json({ message: "You are not allowed to login from here" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
          { userId: user.id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        res.json({
          token,
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            role: user.role,
          },
        });
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    db.query(
      "SELECT * FROM users WHERE verification_token = ?",
      [token],
      async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error occurred" });
        }

        if (results.length === 0) {
          return res
            .status(400)
            .json({ message: "Invalid verification token" });
        }

        const user = results[0];

        db.query(
          "UPDATE users SET email_verified = TRUE, verification_token = NULL WHERE id = ?",
          [user.id],
          (err) => {
            if (err) {
              console.error("Database error:", err);
              return res.status(500).json({ message: "Error verifying email" });
            }
            res.redirect(
              `${process.env.FRONTEND_URL}/verify-email/${token}?status=success`
            );
          }
        );
      }
    );
  } catch (error) {
    console.error("Verification error:", error);
    res.redirect(
      `${process.env.FRONTEND_URL}/verify-email/${token}?status=error`
    );
  }
};

module.exports = {
  registerCustomer,
  registerAdmin,
  login,
  verifyEmail,
};
