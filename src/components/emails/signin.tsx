import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import React from "react";

interface SignInEmailProps {
  url: string;
}

export const SignInEmail: React.FC<SignInEmailProps> = ({ url }) => (
  <Html>
    <Head />
    <Preview>Connectez-vous à votre compte SynapticSurge</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Connexion à SynapticSurge</Heading>
        <Text style={text}>
          Cliquez sur le bouton ci-dessous pour vous connecter à votre compte :
        </Text>
        <Section style={buttonContainer}>
          <Button style={{ ...button, padding: "12px 20px" }} href={url}>
            Se connecter
          </Button>
        </Section>
        <Text style={text}>
          Si vous n&apos;avez pas demandé cette connexion, vous pouvez ignorer
          cet email.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  paddingTop: "32px",
  paddingBottom: "32px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

export default SignInEmail;
