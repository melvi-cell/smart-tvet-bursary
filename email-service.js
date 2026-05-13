// ================================================
// TVET BURSARY SYSTEM - EMAIL SERVICE
// ================================================

// YOUR EMAILJS KEYS (Already inserted)
const EMAILJS_PUBLIC_KEY = "mc8vKTjCZkXqh_ll5";
const EMAILJS_SERVICE_ID = "service_c8h5ulr";
const EMAILJS_TEMPLATE_ID = "template_a6qlz0u";

// Email Addresses
const SENDER_EMAIL = "tvet.bursary@gmail.com";
const ADMIN_EMAIL = "tvet.bursary@gmail.com";
const SUPPORT_EMAIL = "support@tvetbursary.com";

// Initialize EmailJS
(function() {
    if(typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY,
        });
        console.log("📧 TVET Bursary Email System - READY!");
        console.log(`   Sender: ${SENDER_EMAIL}`);
        console.log(`   Service: ${EMAILJS_SERVICE_ID}`);
        console.log(`   Template: ${EMAILJS_TEMPLATE_ID}`);
    } else {
        console.log("📧 EmailJS not loaded yet");
    }
})();

// ================================================
// SEND EMAIL FUNCTION
// ================================================

async function sendEmail(toEmail, subject, message, templateParams = {}) {
    try {
        const defaultParams = {
            to_email: toEmail,
            subject: subject,
            message: message,
            from_name: "TVET Bursary System",
            reply_to: SUPPORT_EMAIL,
            ...templateParams
        };
        
        const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, defaultParams);
        console.log(`✅ Email sent to ${toEmail}`);
        return { success: true, response };
    } catch (error) {
        console.error("❌ Email failed:", error);
        return { success: false, error };
    }
}

// ================================================
// EMAIL TEMPLATES
// ================================================

// Welcome Email - New User Registration
async function sendWelcomeEmail(applicantEmail, applicantName) {
    const subject = "🎉 Welcome to TVET Bursary System!";
    const message = `Dear ${applicantName},\n\nWelcome to the Smart TVET Bursary Application and Allocation Management System!\n\n✅ Your account has been successfully created.\n✅ You can now apply for bursary funding.\n✅ Track your application in real-time.\n\n📋 Next Steps:\n1. Login to your dashboard\n2. Complete your profile\n3. Submit your bursary application\n\nBest regards,\nTVET Bursary Committee\n\n---\nSent from: ${SENDER_EMAIL}`;
    return sendEmail(applicantEmail, subject, message);
}

// Application Received Confirmation
async function sendApplicationReceivedEmail(applicantEmail, applicantName, applicationId) {
    const subject = `📝 Application Received - ${applicationId}`;
    const message = `Dear ${applicantName},\n\n✅ Your bursary application has been received successfully!\n\n📋 Application Details:\n   Reference ID: ${applicationId}\n   Status: Under Review\n   Expected Processing Time: 5-7 business days\n\nYou will receive email updates when your application status changes.\n\nBest regards,\nTVET Bursary Committee\n\n---\nSent from: ${SENDER_EMAIL}`;
    return sendEmail(applicantEmail, subject, message);
}

// Status Update Email
async function sendStatusUpdateEmail(applicantEmail, applicantName, applicationId, newStatus, remarks) {
    const statusIcon = newStatus === 'approved' ? '✅ APPROVED' : (newStatus === 'rejected' ? '❌ REJECTED' : '🔄 UPDATED');
    const subject = `${statusIcon} - Application ${applicationId}`;
    
    let message = `Dear ${applicantName},\n\nYour bursary application (${applicationId}) has been ${newStatus.toUpperCase()}.\n\n`;
    
    if(newStatus === 'approved') {
        message += `🎉 Congratulations! Your application has been approved.\n\n📋 Next Steps:\n1. Funds will be disbursed to your institution within 14 days\n2. Check with your institution's finance office\n\n`;
    } else if(newStatus === 'rejected') {
        message += `📋 Reason: ${remarks || 'Does not meet the eligibility criteria for this cycle'}\n\nYou may appeal this decision within 14 days.\n\n`;
    } else {
        message += `📋 Remarks: ${remarks || 'No additional remarks'}\n\n`;
    }
    
    message += `Best regards,\nTVET Bursary Committee\n\n---\nSent from: ${SENDER_EMAIL}`;
    return sendEmail(applicantEmail, subject, message);
}

// Approval Email (Detailed)
async function sendApprovalEmail(applicantEmail, applicantName, applicationId, amount, institution) {
    const subject = "🎉 CONGRATULATIONS! Your Bursary Has Been Approved!";
    const message = `Dear ${applicantName},\n\nWe are delighted to inform you that your bursary application has been APPROVED!\n\n📊 Approval Details:\n   Application ID: ${applicationId}\n   Approved Amount: KES ${amount.toLocaleString()}\n   Institution: ${institution}\n\n💰 Disbursement Information:\n   Funds will be transferred to your institution within 14 business days\n\n🎓 We wish you success in your studies!\n\nBest regards,\nTVET Bursary Committee\n\n---\nSent from: ${SENDER_EMAIL}`;
    return sendEmail(applicantEmail, subject, message);
}

// Rejection Email (With Appeal Option)
async function sendRejectionEmail(applicantEmail, applicantName, applicationId, reason) {
    const subject = "📋 Application Status Update - TVET Bursary";
    const message = `Dear ${applicantName},\n\nThank you for applying to the TVET Bursary Program.\n\nAfter careful review of your application ${applicationId}, we regret to inform you that it has not been approved at this time.\n\n📋 Reason: ${reason || 'Does not meet the eligibility criteria for the current cycle'}\n\n⚠️ Appeal Process:\n   You may submit an appeal within 14 days by logging into your dashboard.\n\nWe encourage you to apply again in the next cycle.\n\nBest regards,\nTVET Bursary Committee\n\n---\nSent from: ${SENDER_EMAIL}`;
    return sendEmail(applicantEmail, subject, message);
}

// Admin Alert Email
async function sendAdminAlert(adminEmail, subject, details, priority = 'normal') {
    const priorityIcon = priority === 'high' ? '🔴 URGENT' : (priority === 'medium' ? '🟡 IMPORTANT' : '🔵 INFO');
    const fullSubject = `[ADMIN ALERT] ${priorityIcon} - ${subject}`;
    const message = `Dear Administrator,\n\n${priorityIcon} Notification\n\nDetails: ${details}\n\nTime: ${new Date().toLocaleString()}\n\nAction Required: Login to the admin panel for immediate attention.\n\n---\nTVET Bursary System\nSent from: ${SENDER_EMAIL}`;
    return sendEmail(adminEmail, fullSubject, message);
}

// Password Reset Email (Firebase)
async function sendPasswordResetEmail(applicantEmail, applicantName) {
    try {
        if(window.firebaseSendPasswordResetEmail) {
            await window.firebaseSendPasswordResetEmail(window.firebaseAuth, applicantEmail);
            console.log(`Password reset email sent to ${applicantEmail}`);
            return { success: true, message: "Password reset email sent" };
        }
        console.log("Firebase not available for password reset");
        return { success: false, error: "Firebase not available" };
    } catch (error) {
        console.error("Password reset error:", error);
        return { success: false, error };
    }
}

// Test Email (for verification)
async function sendTestEmail(testEmail) {
    const subject = "✅ TVET Bursary System - Email Test";
    const message = `This is a test email from the TVET Bursary System.\n\nIf you received this, your email configuration is working correctly!\n\nSender: ${SENDER_EMAIL}\nTime: ${new Date().toLocaleString()}\n\nBest regards,\nTVET Bursary Team`;
    return sendEmail(testEmail, subject, message);
}

// ================================================
// MAKE FUNCTIONS GLOBALLY AVAILABLE
// ================================================

window.sendWelcomeEmail = sendWelcomeEmail;
window.sendApplicationReceivedEmail = sendApplicationReceivedEmail;
window.sendStatusUpdateEmail = sendStatusUpdateEmail;
window.sendApprovalEmail = sendApprovalEmail;
window.sendRejectionEmail = sendRejectionEmail;
window.sendAdminAlert = sendAdminAlert;
window.sendPasswordResetEmail = sendPasswordResetEmail;
window.sendTestEmail = sendTestEmail;

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("📧 TVET Bursary Email Service Loaded");
console.log(`   Sender: ${SENDER_EMAIL}`);
console.log(`   Status: Ready to send emails!`);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");