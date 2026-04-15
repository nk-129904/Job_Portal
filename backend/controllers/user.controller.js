import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "Account created",
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Role mismatch",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    const userData = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };

    return res.status(200).cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true
    }).json({
      message: `Welcome back ${user.fullName}`,
      success: true,
      user: userData,
    });

  } catch (error) {
    console.log(error);
  }
};

// ================= LOGOUT =================
export const logout = async (req, res) => {
  return res.status(200).cookie("token", "", { 
    maxAge: 0,
    httpOnly: true,
    sameSite: "none",
    secure: true 
  }).json({
    message: "Logout successful",
    success: true,
  });
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  return res.status(200).json({
    message: "Profile updated",
    success: true,
  });
};