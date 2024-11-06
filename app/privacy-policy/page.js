import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "2rem",
            lineHeight: "1.6",
            fontFamily: "Arial, sans-serif",
            color: "#333",
        }}>
            <h1 style={{
                fontSize: "2rem",
                color: "#0070f3",
                textAlign: "center",
                marginBottom: "1.5rem",
            }}>
                Privacy Policy
            </h1>

            <div style={{ fontSize: "1rem" }}>
                <p><strong>Effective Date:</strong> 06-11-2024</p>

                <p>Schedulrr is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our application, available at <Link href={"https://myschedulrr.vercel.app/"} style={{ color: "#0070f3", textDecoration: "underline" }} target="/blank">here</Link>.</p>

                <p>By using Schedulrr, you agree to the collection and use of your information as described in this Privacy Policy.</p>

                <h2>1. Information We Collect</h2>
                <p>When you use Schedulrr, we collect personal information to provide and improve our services. The information we collect may include:</p>

                <ul style={{ paddingLeft: "1.5rem" }}>
                    <li><strong>Account Information:</strong> When you sign up or log in, we collect your name, email address, and any other details you provide through your Google account (via Clerk authentication).</li>
                    <li><strong>Calendar Data:</strong> We access your Google Calendar to create events, check availability, and schedule meetings. This data is used solely for the purpose of providing the scheduling functionality within the app.</li>
                    <li><strong>Usage Data:</strong> We collect data about how you interact with our app, including your IP address, browser type, operating system, and usage patterns (such as pages viewed, time spent on the app).</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <p>We use the collected information for the following purposes:</p>

                <ul style={{ paddingLeft: "1.5rem" }}>
                    <li>To provide and maintain the functionality of Schedulrr.</li>
                    <li>To authenticate users and manage your account.</li>
                    <li>To interact with third-party services, including Google Calendar, for event scheduling.</li>
                    <li>To send you important notifications, such as meeting reminders and cancellations.</li>
                    <li>To analyze usage patterns and improve the performance of the app.</li>
                </ul>

                <h2>3. Data Sharing and Third-Party Services</h2>
                <p>We use the following third-party services to operate and improve our app:</p>

                <ul style={{ paddingLeft: "1.5rem" }}>
                    <li><strong>Google Calendar:</strong> We access your Google Calendar through Google’s API to help you schedule and manage events. Google may collect and store information when you use their services. Please refer to Google’s privacy policy for more details on how they handle your data.</li>
                    <li><strong>Clerk:</strong> We use Clerk for authentication and user management. Clerk may collect personal information such as your name, email address, and login credentials for account management purposes. Please refer to Clerk’s privacy policy for more information on their data practices.</li>
                </ul>

                <p>We do not sell or share your personal data with third parties for marketing purposes.</p>

                <h2>4. Data Security</h2>
                <p>We take reasonable precautions to protect your personal information from unauthorized access, loss, or alteration. However, please be aware that no method of electronic transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.</p>

                <h2>5. Your Rights and Choices</h2>
                <p>You have the right to access, update, or delete your personal information at any time. You can also revoke access to your Google Calendar through your Google account settings.</p>

                <p>If you wish to delete your account or request any changes to your data, please contact us at <strong>rakshitdevra123@gmail.com</strong>.</p>

                <h2>6. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated Privacy Policy on our website and updating the "Effective Date" at the top of this page. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your data.</p>

                <h2>7. Contact Us</h2>
                <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
                <p>Email: <strong>rakshitdevra123@gmail.com</strong></p>
            </div>
        </div>
    );
}
