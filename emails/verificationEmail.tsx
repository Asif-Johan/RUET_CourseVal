import { Html, Head, Body, Row, Section, Text, Button, Heading, Preview } from "@react-email/components";

// Interface for the email props
interface VerificationEmailProps {
    username: string;
    otp: string;
}


// Verification Email component
const verificationEmail = ({ username, otp }: VerificationEmailProps) => (
    <Html lang="en" dir="ltr">
        <Head>
            <style>
                {`
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f9f9f9;
                    }
                `}
            </style>
            <title>Verification Code</title>
        </Head>
        <Body>
            <Preview>Your OTP Code</Preview>
            <Row style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <Section>
                    <Heading as="h2" style={{ textAlign: "center", marginBottom: "20px" }}>Hello, {username}!</Heading>
                    <Text style={{ textAlign: "center" }}>Your OTP (One Time Password) is below:</Text>

                    <Text style={{ fontSize: "24px", fontWeight: "bold", color: "#333333", textAlign: "center", margin: "10px 0" }}>
                        {otp}
                    </Text>

                    <Text style={{ textAlign: "center" }}>Please use the above code to complete your verification process.</Text>

                    <Button href="#" style={{ display: "block", width: "100%", padding: "12px", backgroundColor: "#4CAF50", color: "white", textAlign: "center", fontSize: "16px", borderRadius: "5px", textDecoration: "none", marginTop: "20px" }}>
                        Verify Now
                    </Button>

                    <Text style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#888888" }}>
                        If you did not request this code, please ignore this email. The code will expire in 10 minutes.
                    </Text>
                </Section>
            </Row>
        </Body>
    </Html>
);

export default verificationEmail;
