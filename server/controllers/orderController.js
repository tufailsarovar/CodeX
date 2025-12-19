import crypto from "crypto";
import nodemailer from "nodemailer";
import { razorpay } from "../config/razorpay.js";
import { Order } from "../models/Order.js";
import { Project } from "../models/Project.js";

/**
 * CREATE PAYMENT ORDER
 */
export const createPaymentOrder = async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const options = {
      amount: project.price * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      razorpayOrderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("CreatePaymentOrder Error:", error);
    res.status(500).json({ message: "Unable to create order" });
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

    console.log("ORDER:", razorpay_order_id);
    console.log("PAYMENT:", razorpay_payment_id);
    console.log("SIGNATURE:", razorpay_signature);
    console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ 1. Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // ✅ 2. Get project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ 3. Save order
    const order = await Order.create({
      user: req.user._id,
      project: project._id,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: project.price,
      status: "paid",
    });

    // ✅ 4. Send email with ZIP link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CodeX" <${process.env.SMTP_USER}>`,
      to: req.user.email,
      subject: "Your CodeX Project Download",
      html: `
        <h2>Payment Successful ✅</h2>
        <p>Thank you for purchasing <b>${project.title}</b>.</p>
        <p>
          <a href="${project.zipFileUrl}" target="_blank">
            👉 Download your ZIP file
          </a>
        </p>
      `,
    });

    res.json({
      success: true,
      orderId: order._id,
    });
  } catch (error) {
    console.error("VerifyPayment Error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
