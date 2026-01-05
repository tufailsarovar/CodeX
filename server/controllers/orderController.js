import crypto from "crypto";
import { razorpay } from "../config/razorpay.js";
import { Order } from "../models/Order.js";
import { Project } from "../models/Project.js";
import nodemailer from "nodemailer";

// CREATE PAYMENT ORDER (Frontend will open Razorpay checkout)
export const createPaymentOrder = async (req, res) => {
  try {
    const { projectId } = req.body;
    const userId = req.user._id;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const options = {
      amount: project.price * 100,       // Rupees to Paise
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      project,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Razorpay order creation failed" });
  }
};

// VERIFY PAYMENT SIGNATURE
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    // ✅ FIX: define projectId (was causing ReferenceError)
    const projectId = req.body.project;
    const userId = req.user._id;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // Payment Verified → Save order in DB
    const project = await Project.findById(projectId);
    const order = await Order.create({
      user: userId,
      project: projectId,
      amount: project.price,
      paymentStatus: "paid",
      paymentProvider: "razorpay",
      paymentId: razorpay_payment_id,
    });

    // SEND EMAIL (ZIP LINK)
    const userEmail = req.user.email;

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const downloadLink = project.zipFileUrl;

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: userEmail,
        subject: `Your CodeX Purchase: ${project.title}`,
        html: `
          <h2>Payment Successful!</h2>
          <p>You purchased: <strong>${project.title}</strong></p>
          <p>Amount Paid: ₹${project.price}</p>
          <p>Download your ZIP file:</p>
          <a href="${downloadLink}">Click here to download</a>
        `
      });
    } catch (emailErr) {
      console.log("Email error:", emailErr);
    }

    res.status(200).json({ success: true, message: "Payment verified" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

