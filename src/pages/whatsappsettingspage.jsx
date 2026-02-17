import React, { useState, useCallback, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Banner,
  Badge,
  Text,
  Box,
  Button,
  InlineStack,
  BlockStack,
  Divider,
  Icon,
  Link,
  InlineCode,
} from "@shopify/polaris";
import { PhoneIcon } from "@shopify/polaris-icons";

// Initialize Supabase client with public/anon credentials
const supabaseUrl = "https://zsizcawrakypkqlwqrrx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzaXpjYXdyYWt5cGtxbHdxcnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyOTcyOTksImV4cCI6MjA4Njg3MzI5OX0.Ev6Cmp4CUYJJPDylDCxbkR-GFh-tfeoIwKqIoRtSJt0";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Custom WhatsApp Preview component (keeping this custom as Polaris doesn't have a storefront preview)
function WhatsAppPreview({ phone, message, visible }) {
  return (
    <Box
      background="bg-surface-secondary"
      padding="400"
      borderRadius="200"
      minHeight="420px"
      position="relative"
    >
      {/* Mock storefront */}
      <div style={{ padding: "16px" }}>
        <div
          style={{
            height: "10px",
            width: "120px",
            background: "#dee2e6",
            borderRadius: "5px",
            marginBottom: "12px",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                height: "80px",
                background: "#dee2e6",
                borderRadius: "8px",
              }}
            />
          ))}
        </div>
        <div
          style={{
            height: "8px",
            width: "80%",
            background: "#dee2e6",
            borderRadius: "4px",
            marginTop: "14px",
          }}
        />
        <div
          style={{
            height: "8px",
            width: "60%",
            background: "#dee2e6",
            borderRadius: "4px",
            marginTop: "8px",
          }}
        />
      </div>

      {/* WhatsApp floating button */}
      {visible && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "8px",
          }}
        >
          {/* Tooltip */}
          <div
            style={{
              background: "#fff",
              padding: "10px 14px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              fontSize: "13px",
              maxWidth: "180px",
              lineHeight: "1.4",
            }}
          >
            {message || "Hi! How can we help you?"}
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid #fff",
                position: "absolute",
                bottom: "52px",
                right: "28px",
              }}
            />
          </div>

          {/* Button */}
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#25D366",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(37,211,102,0.4)",
              cursor: "pointer",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
        </div>
      )}

      {!visible && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            background: "rgba(0,0,0,0.06)",
            borderRadius: "50%",
            width: "56px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed #adb5bd",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: "#868e96",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Widget
            <br />
            off
          </span>
        </div>
      )}
    </Box>
  );
}

export default function WhatsAppSettingsPage() {
  const [enabled, setEnabled] = useState(false);
  const [phone, setPhone] = useState("");
  const [prefilledMessage, setPrefilledMessage] = useState(""); // default OFF
  const [welcomeMessage, setWelcomeMessage] = useState(
  "Hi, How can we help you?"
   );
   
  const [phoneError, setPhoneError] = useState("");
  const [prefilledError, setPrefilledError] = useState("");
  const [welcomeError, setWelcomeError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [backendWarning, setBackendWarning] = useState("");
  // construct API base either from env or same origin
  const API_BASE = import.meta.env.VITE_API_URL || window.location.origin;
  const normalizedAPI = API_BASE.endsWith("/") ? API_BASE.slice(0, -1) : API_BASE;
  // frontend origin for comparison
  const frontendOrigin = window.location.origin;
  // true only if VITE_API_URL is actually set to a different host
  const hasBackend = !!import.meta.env.VITE_API_URL && normalizedAPI !== frontendOrigin;

  // 🔹 Load saved settings when app opens
  useEffect(() => {
    async function loadSettings() {
      const storageKey = `settings_global`;

      // fetch from Supabase directly (no backend server needed)
      try {
        const { data, error } = await supabase
          .from("whatsapp_settings")
          .select("*")
          .limit(1)
          .single();

        if (error) {
          // ignore "no rows found" error, log others silently and fall back
          if (error.code !== "PGRST116") {
            console.warn("Supabase load error (falling back to localStorage):", error.code);
          }
          // fall back to localStorage
          const localData = JSON.parse(localStorage.getItem(storageKey) || "null");
          if (localData && localData.settings) {
            setPhone(localData.settings.phone || "");
            setWelcomeMessage(localData.settings.welcome_message || "Hi, How can we help you?");
            setPrefilledMessage(localData.settings.prefilled_message || "");
            setEnabled(localData.settings.enabled || false);
          }
          return;
        }

        if (data) {
          setPhone(data.phone || "");
          setWelcomeMessage(data.welcome_message || "Hi, How can we help you?");
          setPrefilledMessage(data.prefilled_message || "");
          setEnabled(data.enabled || false);
        }
      } catch (err) {
        console.warn("Failed to load settings (using localStorage):", err?.message);
        // fall back to localStorage
        const localData = JSON.parse(localStorage.getItem(storageKey) || "null");
        if (localData && localData.settings) {
          setPhone(localData.settings.phone || "");
          setWelcomeMessage(localData.settings.welcome_message || "Hi, How can we help you?");
          setPrefilledMessage(localData.settings.prefilled_message || "");
          setEnabled(localData.settings.enabled || false);
        }
      }
    }

    loadSettings();
  }, [hasBackend, normalizedAPI]);

  
  const handlePrefilledChange = useCallback((value) => {
  setPrefilledMessage(value);
  setPrefilledError("");
  setDirty(true);
}, []);

const handleWelcomeChange = useCallback((value) => {
  setWelcomeMessage(value);
  setWelcomeError("");
  setDirty(true);
}, []);
  // Handlers
  const handlePhoneChange = useCallback((value) => {
    setPhone(value);
    setPhoneError("");
    setDirty(true);
  }, []);

  
  const handleToggle = useCallback(() => {
    setEnabled((prev) => !prev);
    setDirty(true);
  }, []);

  const validate = useCallback(() => {
  let valid = true;
  const cleanPhone = phone.replace(/[\s\-()]/g, "");

  if (!phone.trim()) {
    setPhoneError("Phone number is required");
    valid = false;
  } else if (!/^\+?[1-9]\d{6,14}$/.test(cleanPhone)) {
    setPhoneError("Enter valid phone number with country code");
    valid = false;
  }

  // Welcome message must exist
  if (!welcomeMessage.trim()) {
    setWelcomeError("Welcome message is required");
    valid = false;
  }

  return valid;
}, [phone, welcomeMessage]);

  const handleSave = useCallback(async () => {
    if (!validate()) return;
    setSaving(true);

    const storageKey = `settings_global`;

    // attempt to save to Supabase directly - always insert a new row
    try {
      const { error: insertError } = await supabase
        .from("whatsapp_settings")
        .insert({
          phone,
          welcome_message: welcomeMessage,
          prefilled_message: prefilledMessage,
          enabled,
        });

      if (insertError) throw insertError;

      // save succeeded
      console.log("Settings saved to Supabase successfully");
    } catch (err) {
      console.warn("Failed to save to Supabase:", err.message);
      // fall back to localStorage
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          phone,
          welcome_message: welcomeMessage,
          prefilled_message: prefilledMessage,
          enabled,
        })
      );
      console.log("Settings saved to localStorage instead");
    }

    // 3️⃣ Show success UI
    setSaving(false);
    setSaveSuccess(true);
    setDirty(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  }, [phone, welcomeMessage, prefilledMessage, enabled, validate]);
const cleanedPhone = phone.replace(/[\s\-()+ ]/g, "");
  // WhatsApp Link
 const whatsappLink = cleanedPhone
  ? prefilledMessage.trim()
    ? `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(prefilledMessage)}`
    : `https://wa.me/${cleanedPhone}`
  : "";


  return (
    <Page
      title="WhatsApp Chat Widget"
      subtitle="Let customers reach you directly via WhatsApp"
      primaryAction={{
        content: "Save Settings",
        onAction: handleSave,
        loading: saving,
      }}
    >
      <BlockStack gap="500">
        {/* Success Banner */}
        {saveSuccess && (
          <Banner tone="success" onDismiss={() => setSaveSuccess(false)}>
            Settings saved successfully
          </Banner>
        )}
        {/* Backend warning (development only) */}
        {backendWarning && (
          <Banner tone="critical" onDismiss={() => setBackendWarning("")}> 
            {backendWarning}
          </Banner>
        )}

        <Layout>
          {/* LEFT COLUMN - Settings */}
          <Layout.Section>
            <BlockStack gap="500">
              {/* Status Card */}
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between" blockAlign="center">
                    <InlineStack gap="200" blockAlign="center">
                      <Text variant="headingMd" as="h2">
                        Widget Status
                      </Text>
                      <Badge tone={enabled ? "success" : undefined}>
                        {enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </InlineStack>
                    <Button onClick={handleToggle}>
                      {enabled ? "Turn off" : "Turn on"}
                    </Button>
                  </InlineStack>
                </BlockStack>
              </Card>

              {/* Configuration Card */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">
                    Configuration
                  </Text>

                  <FormLayout>
                    <TextField
                      label="WhatsApp Phone Number"
                      value={phone}
                      onChange={handlePhoneChange}
                      prefix={<Icon source={PhoneIcon} />}
                      placeholder="+919876543210"
                      error={phoneError}
                      helpText="Include country code. This is where customer messages will be sent."
                      autoComplete="tel"
                    />
<TextField
  label="Welcome Message (Widget Bubble)"
  value={welcomeMessage}
  onChange={handleWelcomeChange}
  multiline={3}
  error={welcomeError}
  helpText="This message appears above the WhatsApp button."
/>

<TextField
  label="Prefilled WhatsApp Message (Optional)"
  value={prefilledMessage}
  onChange={handlePrefilledChange}
  multiline={3}
  error={prefilledError}
  helpText="This message will appear inside WhatsApp when user clicks button. Leave empty to disable."
  placeholder="Optional..."
/>

                  </FormLayout>
                </BlockStack>
              </Card>

              {/* Link Preview Card */}
              <Card>
                <BlockStack gap="300">
                  <Text variant="headingSm" as="h3" tone="subdued">
                    GENERATED WHATSAPP LINK
                  </Text>
                  {whatsappLink ? (
                    <Link url={whatsappLink} target="_blank" monochrome>
                      <InlineCode>{whatsappLink}</InlineCode>
                    </Link>
                  ) : (
                    <Text as="p" tone="subdued">
                      Enter a phone number to generate link
                    </Text>
                  )}
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>

          {/* RIGHT COLUMN - Preview */}
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <BlockStack gap="100">
                  <Text variant="headingMd" as="h2">
                    Storefront Preview
                  </Text>
                  <Text as="p" tone="subdued">
                    How the widget appears to customers
                  </Text>
                </BlockStack>
               <WhatsAppPreview
        phone={phone}
         message={welcomeMessage}
         visible={enabled}
              />

              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        <Divider />

        {/* AeroChat Promo Banner */}
        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" blockAlign="center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <Text variant="headingMd" as="h2">
                Getting lots of WhatsApp messages?
              </Text>
            </InlineStack>

            <Text as="p">
              AeroChat automates 87-94% of customer conversations with
              AI-powered responses. Turn chats into conversions automatically.
            </Text>

            <BlockStack gap="200">
              {[
                "Instant responses 24/7",
                "Product recommendations & order tracking",
                "Works with your existing WhatsApp number",
              ].map((item) => (
                <InlineStack key={item} gap="200" blockAlign="center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <Text as="span">{item}</Text>
                </InlineStack>
              ))}
            </BlockStack>

            <InlineStack>
              <Link
      url="https://apps.shopify.com/aerochat-chatbot"
       target="_blank"
        removeUnderline
              >
                Learn more about AeroChat →
              </Link>
            </InlineStack>
          </BlockStack>
        </Card>

        {/* Footer */}
        <Box paddingBlock="800">
          <InlineStack align="center" gap="100">
            <Text as="p" tone="subdued" alignment="center">
              WhatsApp Chat Widget v1.0 · Need help?{" "}
              <Link url="#" monochrome>
                View documentation
              </Link>
            </Text>
          </InlineStack>
        </Box>
      </BlockStack>
    </Page>
  );
}
