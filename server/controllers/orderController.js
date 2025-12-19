import crypto from "crypto";
import nodemailer from "nodemailer";
import { razorpay } from "../config/razorpay.js";
import { Order } from "../models/Order.js";
import { Project } from "../models/Project.js";

/**
 * CREATE PAYMENT ORDER
 */console.log("RAZORPAY KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY SECRET EXISTS:", !!process.env.RAZORPAY_KEY_SECRET);

export const createPaymentOrder = async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const options = {
      amount: project.price * 100, // INR → paise
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      project,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Razorpay order creation failed" });
  }
};

/**
 * VERIFY PAYMENT + SAVE ORDER + SEND EMAIL
 */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      projectId,
    } = req.body;

    // 🔐 Safety check
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ STEP 1: VERIFY RAZORPAY SIGNATURE
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // ✅ STEP 2: SAVE ORDER IN DB
    const order = await Order.create({
      user: req.user._id,
      project: projectId,
      paymentId: razorpay_payment_id,
      status: "paid",
    });

    // ✅ STEP 3: SMTP TRANSPORT (MATCHES YOUR .env)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true only for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✅ STEP 4: SEND EMAIL
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: req.user.email,
      subject: "Your CodeX Project ZIP",
      html: `
        <h2>Payment Successful 🎉</h2>
        <p>Your project is ready.</p>
        <p>
          <a href="${process.env.CLIENT_URL}/download/${projectId}">
            Download Project ZIP
          </a>
        </p>
      `,
    });

    // ✅ STEP 5: RESPONSE
    res.json({
      success: true,
      orderId: order._id,
    });
  } catch (error) {
    console.error("VerifyPayment Error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
