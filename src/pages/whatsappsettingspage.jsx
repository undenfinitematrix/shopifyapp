import React, { useState } from "react";

const COLORS = {
  bg: "#F6F6F7",
  surface: "#FFFFFF",
  surfaceHover: "#FAFBFB",
  border: "#E1E3E5",
  borderFocus: "#005BD3",
  text: "#202223",
  textSub: "#6D7175",
  textDisabled: "#8C9196",
  primary: "#005BD3",
  primaryHover: "#004299",
  primaryPressed: "#003B8E",
  critical: "#D72C0D",
  success: "#008060",
  successBg: "#AEE9D1",
  whatsapp: "#25D366",
  whatsappDark: "#128C7E",
  warning: "#FFC453",
  warningBg: "#FFF5EA",
};

function ShopifyCard({ children, style }) {
  return (
    <div
      style={{
        background: COLORS.surface,
        borderRadius: "12px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)",
        padding: "24px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Toggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: "48px",
        height: "28px",
        borderRadius: "14px",
        border: "none",
        background: enabled ? COLORS.success : COLORS.border,
        cursor: "pointer",
        position: "relative",
        transition: "background 0.25s ease",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: "3px",
          left: enabled ? "23px" : "3px",
          transition: "left 0.25s ease",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}

function WhatsAppPreview({ phone, message, visible }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "420px",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        borderRadius: "10px",
        overflow: "hidden",
        border: `1px solid ${COLORS.border}`,
      }}
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
            animation: "floatIn 0.4s ease-out",
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
              color: COLORS.text,
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
              background: COLORS.whatsapp,
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
          <span style={{ fontSize: "11px", color: "#868e96", textAlign: "center", lineHeight: 1.2 }}>
            Widget
            <br />
            off
          </span>
        </div>
      )}
    </div>
  );
}

export default function WhatsAppSettingsPage() {
  const [enabled, setEnabled] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("Hi! I'm interested in your products. Can you help me?");
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?[1-9]\d{6,14}$/.test(phone.replace(/[\s\-()]/g, "")))
      e.phone = "Enter a valid phone number with country code (e.g. +919876543210)";
    if (!message.trim()) e.message = "Pre-filled message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        padding: "24px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 600,
              margin: "0 0 6px",
              color: COLORS.text,
            }}
          >
            WhatsApp Chat Widget
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: COLORS.textSub,
              margin: 0,
            }}
          >
            Let customers reach you directly via WhatsApp
          </p>
        </div>

        {/* Success banner */}
        {saved && (
          <div
            style={{
              background: COLORS.successBg,
              border: `1px solid ${COLORS.success}`,
              borderRadius: "10px",
              padding: "14px 18px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.success} strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span style={{ fontSize: "14px", fontWeight: 500, color: COLORS.success }}>
              Settings saved successfully
            </span>
          </div>
        )}

        {/* Main Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "24px",
          }}
        >
          {/* Left column - Settings */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Status Card */}
            <ShopifyCard>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <h2
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    Widget Status
                  </h2>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: "6px",
                      background: enabled ? COLORS.successBg : COLORS.border,
                      color: enabled ? COLORS.success : COLORS.textSub,
                      textTransform: "uppercase",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <Toggle enabled={enabled} onToggle={() => setEnabled(!enabled)} />
              </div>
            </ShopifyCard>

            {/* Configuration */}
            <ShopifyCard>
              <h2
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  margin: "0 0 18px",
                }}
              >
                Configuration
              </h2>

              {/* Phone Number */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  WhatsApp Phone Number
                </label>
                <div style={{ position: "relative" }}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={COLORS.textSub}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((p) => ({ ...p, phone: null }));
                    }}
                    placeholder="+919876543210"
                    style={{
                      width: "100%",
                      padding: "10px 12px 10px 40px",
                      border: `1px solid ${errors.phone ? COLORS.critical : COLORS.border}`,
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: COLORS.text,
                      background: "#fff",
                      boxSizing: "border-box",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                    onFocus={(e) => {
                      if (!errors.phone) {
                        e.target.style.borderColor = COLORS.borderFocus;
                        e.target.style.boxShadow = `0 0 0 1px ${COLORS.borderFocus}`;
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.phone ? COLORS.critical : COLORS.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                {errors.phone && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: COLORS.critical,
                      margin: "6px 0 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.critical}>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    {errors.phone}
                  </p>
                )}
                <p style={{ fontSize: "12px", color: COLORS.textSub, margin: "6px 0 0" }}>
                  Include country code. This is where customer messages will be sent.
                </p>
              </div>

              {/* Message */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  Pre-filled Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((p) => ({ ...p, message: null }));
                  }}
                  rows={3}
                  placeholder="Hi! I'm interested in your products..."
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: `1px solid ${errors.message ? COLORS.critical : COLORS.border}`,
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: COLORS.text,
                    background: "#fff",
                    boxSizing: "border-box",
                    resize: "vertical",
                    fontFamily: "inherit",
                    transition: "border-color 0.15s, box-shadow 0.15s",
                  }}
                  onFocus={(e) => {
                    if (!errors.message) {
                      e.target.style.borderColor = COLORS.borderFocus;
                      e.target.style.boxShadow = `0 0 0 1px ${COLORS.borderFocus}`;
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.message ? COLORS.critical : COLORS.border;
                    e.target.style.boxShadow = "none";
                  }}
                />
                {errors.message && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: COLORS.critical,
                      margin: "6px 0 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.critical}>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    {errors.message}
                  </p>
                )}
                <p style={{ fontSize: "12px", color: COLORS.textSub, margin: "6px 0 0" }}>
                  This message will be pre-filled when a customer clicks the WhatsApp button.
                </p>
              </div>
            </ShopifyCard>

            {/* Link preview */}
            <ShopifyCard style={{ background: "#FAFBFB" }}>
              <h2
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  margin: "0 0 8px",
                  color: COLORS.textSub,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Generated WhatsApp Link
              </h2>
              <code
                style={{
                  fontSize: "13px",
                  color: COLORS.primary,
                  wordBreak: "break-all",
                  lineHeight: 1.5,
                }}
              >
                {phone
                  ? `https://wa.me/${phone.replace(/[\s\-()+ ]/g, "")}?text=${encodeURIComponent(message)}`
                  : "Enter a phone number to generate link"}
              </code>
            </ShopifyCard>
          </div>

          {/* Right column - Preview */}
          <div style={{ position: "sticky", top: "24px", height: "fit-content" }}>
            <ShopifyCard>
              <h2
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  margin: "0 0 4px",
                }}
              >
                Storefront Preview
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: COLORS.textSub,
                  margin: "0 0 16px",
                }}
              >
                How the widget appears to customers
              </p>
              <WhatsAppPreview phone={phone} message={message} visible={enabled} />
            </ShopifyCard>
          </div>
        </div>

        {/* AeroChat Promo Banner */}
        <div
          style={{
            background: "#F0F4FF",
            border: "1px solid #D9E2F3",
            borderRadius: "12px",
            padding: "24px 28px",
            marginTop: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 650,
                margin: 0,
                color: COLORS.text,
              }}
            >
              Getting lots of WhatsApp messages?
            </h3>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: COLORS.textSub,
              margin: "0 0 16px",
              lineHeight: 1.5,
            }}
          >
            AeroChat automates 87-94% of customer conversations with AI-powered responses. Turn chats into conversions automatically.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "18px",
            }}
          >
            {[
              "Instant responses 24/7",
              "Product recommendations & order tracking",
              "Works with your existing WhatsApp number",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  color: COLORS.text,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.text} strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {item}
              </div>
            ))}
          </div>
          <a
            href="#"
            style={{
              fontSize: "14px",
              color: COLORS.primary,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Learn more about AeroChat →
          </a>
        </div>

        {/* Save Button - Fixed at bottom */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#fff",
            borderTop: `1px solid ${COLORS.border}`,
            padding: "16px 24px",
            display: "flex",
            justifyContent: "flex-end",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <button
            onClick={handleSave}
            style={{
              padding: "10px 20px",
              background: COLORS.primary,
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = COLORS.primaryHover)}
            onMouseLeave={(e) => (e.target.style.background = COLORS.primary)}
          >
            Save Settings
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            padding: "32px 0 80px",
            fontSize: "13px",
            color: COLORS.textDisabled,
          }}
        >
          WhatsApp Chat Widget v1.0 · Need help?{" "}
          <a href="#" style={{ color: COLORS.primary, textDecoration: "none" }}>
            View documentation
          </a>
        </div>
      </div>
    </div>
  );
}
