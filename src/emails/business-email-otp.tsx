import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from "react-email";

interface BusinessEmailOtpProps {
  firstName: string;
  otp: string;
  appName?: string;
}

export function BusinessEmailOtp({
  firstName,
  otp,
  appName = "Sip",
}: BusinessEmailOtpProps) {
  return (
    <Html lang="en">
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                navy: "#0F172A",
                orange: "#FF6021",
                cream: "#FFFBF2",
                border: "#E5E7EB",
                muted: "#6B7280",
              },
            },
          },
        }}
      >
        <Head />
        <Body className="m-0 bg-cream font-sans" style={{ fontFamily: "'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
          <Preview>{otp} is your {appName} verification code</Preview>

          <Container className="mx-auto max-w-xl">

            {/* ── Header / Navy brand bar ── */}
            <Section className="bg-navy rounded-t-lg px-8 py-6 text-center">
              {/* Logo text (SVG not supported in email; use styled text) */}
              <Text className="m-0 text-4xl font-bold text-white tracking-tight leading-none">
                sip
              </Text>
              <Text className="m-0 mt-1 text-xs text-white" style={{ opacity: 0.45, letterSpacing: "0.08em" }}>
                SMALL MOMENTS. BIG RELATIONSHIPS.
              </Text>
            </Section>

            {/* ── Body ── */}
            <Section className="bg-white px-8 py-8">
              <Heading className="m-0 mb-3 text-2xl font-bold text-navy leading-tight">
                Verify your email 👋
              </Heading>
              <Text className="m-0 mb-6 text-base leading-7 text-muted">
                Hi {firstName}, thanks for signing up for {appName}!<br />
                Use the code below to verify your email and complete your business account setup.
              </Text>

              {/* OTP box */}
              <Section
                className="my-6 rounded-xl border border-solid border-orange px-6 py-5 text-center"
                style={{ background: "#FFF3ED" }}
              >
                <Text className="m-0 text-xs font-bold uppercase tracking-widest text-orange mb-2">
                  Verification code
                </Text>
                <Text
                  className="m-0 text-5xl font-bold tracking-widest text-navy"
                  style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: "0.3em" }}
                >
                  {otp}
                </Text>
              </Section>

              <Text className="m-0 mb-2 text-sm leading-6 text-muted">
                This code expires in <strong>10 minutes</strong>. If you did not request this, you can safely ignore this email.
              </Text>
              <Text className="m-0 text-sm leading-6 text-muted">
                🔒 Never share this code with anyone. {appName} will never ask for your OTP.
              </Text>
            </Section>

            {/* ── Footer ── */}
            <Section className="bg-white px-8 pb-6">
              <Hr className="border-solid border-border m-0 mb-5" />
              <Text className="m-0 text-xs text-muted text-center leading-5">
                Sent by <strong style={{ color: "#0F172A" }}>Sip</strong> · Small moments. Big relationships.<br />
                You received this because you signed up at getsip.in
              </Text>
            </Section>

            {/* ── Orange bottom accent ── */}
            <Section
              className="rounded-b-lg px-8 py-3 text-center"
              style={{ background: "#FF6021" }}
            >
              <Text className="m-0 text-xs font-semibold text-white">
                Sip more. Enjoy more. Build real relationships. ☕
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

BusinessEmailOtp.PreviewProps = {
  firstName: "Avery",
  otp: "482916",
  appName: "Sip",
} satisfies BusinessEmailOtpProps;
