import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import React from "react";

interface ResetPasswordEmailProps {
  resetLink: string;
}

export const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({
  resetLink,
}) => (
  <Html>
    <Head />
    <Preview>Réinitialisez votre mot de passe SynapticSurge</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Réinitialisation de mot de passe</Heading>
        <Text style={text}>
          Nous avons reçu une demande de réinitialisation de mot de passe pour
          votre compte SynapticSurge. Si vous n&apos;avez pas fait cette
          demande, vous pouvez ignorer cet email.
        </Text>
        <Section style={buttonContainer}>
          <Button style={{ ...button, padding: "12px 20px" }} href={resetLink}>
            Réinitialiser le mot de passe
          </Button>
        </Section>
        <Text style={text}>
          Si le bouton ne fonctionne pas, vous pouvez copier et coller le lien
          suivant dans votre navigateur :
        </Text>
        <Text style={link}>
          <Link href={resetLink} style={link}>
            {resetLink}
          </Link>
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Cet email a été envoyé par SynapticSurge. Si vous avez des questions,
          veuillez nous contacter à support@synapticsurge.com
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ResetPasswordEmail;

const main = {
  backgroundColor: "#ffffff",
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
  backgroundColor: "#007bff",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const link = {
  color: "#007bff",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
