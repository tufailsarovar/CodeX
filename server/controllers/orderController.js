import crypto from "crypto";
import { razorpay } from "../config/razorpay.js";
import { Order } from "../models/Order.js";
import Project from "../models/Project.js";
import nodemailer from "nodemailer";

// CREATE PAYMENT ORDER (Frontend will open Razorpay checkout)
export const createPaymentOrder = async (req, res) => {
  try {
    const { projectId, amount } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const options = {
      amount: amount * 100,
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
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
};

// VERIFY PAYMENT SIGNATURE
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

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
    const { items } = req.body;

    let linksHtml = "";

    // INDIVIDUAL LINKS
    if (items?.sourceCode && project.files?.sourceCode) {
      linksHtml += `<p>Source Code: <a href="${project.files.sourceCode}">Download</a></p>`;
    }

    if (items?.ppt && project.files?.ppt) {
      linksHtml += `<p>PPT: <a href="${project.files.ppt}">Download</a></p>`;
    }

    if (items?.documentation && project.files?.documentation) {
      linksHtml += `<p>Documentation: <a href="${project.files.documentation}">Download</a></p>`;
    }

    // FULL BUNDLE (ALL SELECTED)
    if (
      items?.sourceCode &&
      items?.ppt &&
      items?.documentation &&
      project.files?.fullBundle
    ) {
      linksHtml = `<p>Full Bundle: <a href="${project.files.fullBundle}">Download All</a></p>`;
    }

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
          pass: process.env.SMTP_PASS,
        },
      });

      const downloadLink = project.zipFileUrl;

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: userEmail,
        subject: `Your CodeX Purchase: ${project.title}`,
        html: `
          <h2>Payment Successful!</h2>
          <p>You purchased: <strong>${project.title}</strong></p>
          <p>Amount Paid: <b>₹${project.price}</b></p>
          <p>Download your project file:</p>
          ${linksHtml}
          <p>Thanks for Purhasing from CodeX</p>
          <hr>
          <p>© 2026 CodeX. All rights reserved.</p>
          <p>CodeX | Tufail Sarovar</p>
        `,
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
