<?php

// Only process POST requests.
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize and validate input data.
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r", "\n"), array(" ", " "), $name); // Remove newlines
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL); // Sanitize email
    $phone = preg_replace("/[^0-9]/", "", trim($_POST["phone"])); // Sanitize phone to digits only
    $message = htmlspecialchars(trim($_POST["message"]), ENT_QUOTES, 'UTF-8'); // Prevent XSS

    // Validate required fields and email format.
    if (empty($name) || empty($message) || empty($phone) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400); // Bad Request
        echo "Please complete the form and ensure all fields are valid.";
        exit;
    }

    // Recipient email address.
    $recipient = "info@vecuro.com"; // Update to your desired email address.

    // Email subject.
    $subject = "New Contact Form Submission";

    // Build the email content.
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n\n";
    $email_content .= "Message:\n$message\n";

    // Email headers.
    $email_headers = "From: $name <$email>";

    // Attempt to send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200); // Success
        echo "Thank You! Your message has been sent.";
    } else {
        http_response_code(500); // Internal Server Error
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }
} else {
    // Reject non-POST requests.
    http_response_code(403); // Forbidden
    echo "There was a problem with your submission. Please try again.";
}
