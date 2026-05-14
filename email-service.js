const EMAILJS_PUBLIC_KEY = "mc8vKTjCZkXqh_ll5";
const EMAILJS_SERVICE_ID = "service_c8h5ulr";
const EMAILJS_TEMPLATE_ID = "template_a6qlz0u";

(function() {
    if(typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        console.log("📧 Email system ready!");
    }
})();

async function sendEmail(toEmail, subject, message) {
    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email: toEmail,
            subject: subject,
            message: message,
            from_name: "TVET Bursary System",
            reply_to: "support@tvetbursary.com"
        });
        return { success: true };
    } catch (error) {
        console.error("Email failed:", error);
        return { success: false, error };
    }
}

async function sendWelcomeEmail(email, name) {
    return sendEmail(email, "🎉 Welcome to TVET Bursary System!", 
        `Dear ${name},\n\nWelcome! Your account has been created.\n\nBest regards,\nTVET Bursary Team`);
}

async function sendStatusUpdateEmail(email, name, appId, status, remarks) {
    return sendEmail(email, `Application ${status.toUpperCase()} - TVET Bursary`,
        `Dear ${name},\n\nYour application ${appId} has been ${status}.\nRemarks: ${remarks || 'N/A'}`);
}

window.sendWelcomeEmail = sendWelcomeEmail;
window.sendStatusUpdateEmail = sendStatusUpdateEmail;