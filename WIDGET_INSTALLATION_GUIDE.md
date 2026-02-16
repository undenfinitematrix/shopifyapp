# WhatsApp Widget Installation Guide for AeroChat App

## Overview

The WhatsApp widget is a floating button that appears in the bottom-right corner of your store's homepage. When customers click it, they are redirected to WhatsApp with a pre-filled message.

## Quick Setup (3 Steps)

### Step 1: Configure WhatsApp Number in App

1. Install AeroChat WhatsApp app from Shopify App Store
2. Open the app and go to **WhatsApp Widget Settings**
3. Enter your WhatsApp phone number (e.g., `+1-555-0123`)
4. Set a pre-filled message for customers
5. Toggle **Enable Widget** to turn it on
6. Click **Save**

### Step 2: Add Widget Script to Theme

#### Option A: Using Shopify Theme Code Editor (Easiest)

1. Go to **Online Store** → **Themes** in Shopify Admin
2. Find your active theme and click **Edit Code**
3. On the left sidebar, find the **Layout** folder
4. Click on `theme.liquid`
5. Scroll to the bottom and find the closing `</body>` tag
6. **Before the `</body>` tag**, add this code:

```liquid
<!-- AeroChat WhatsApp Widget -->
<script src="https://your-app-domain.com/widget.js?shop={{ shop.permanent_domain }}" defer></script>
```

Replace `your-app-domain.com` with your actual app domain.

7. Click **Save**

#### Option B: Using App Script Tag (Automated)

If your app supports script tag injection, the widget can be added automatically. Contact AeroChat support to enable this.

### Step 3: Verify Installation

1. Visit your store's homepage
2. Look for a green WhatsApp button in the **bottom-right corner**
3. Click it to test (should open WhatsApp with your message)
4. If not visible, clear browser cache and refresh

## Widget Display

The widget appears as:
- **Green circular button** with WhatsApp logo
- **Fixed position** at bottom-right corner
- **Responsive** - scales for mobile devices
- **Animated** - gentle pulsing effect
- **Interactive** - scale up on hover, smooth transitions

## Customization Options

### Change Button Color

Edit the hex color in the widget script:
```javascript
background-color: #25D366 !important;  // Change this
```

Common colors:
- WhatsApp Green: `#25D366`
- Dark Green: `#20ba5a`
- Teal: `#0099cc`
- Purple: `#7c3aed`

### Change Button Position

Modify the spacing in the CSS:
```javascript
bottom: 20px !important;   // Distance from bottom
right: 20px !important;    // Distance from right
```

### Change Button Size

```javascript
width: 60px !important;    // Diameter
height: 60px !important;
```

### Add Custom Message

The message is set in the app settings and will automatically be pre-filled when customers click the button.

## Testing

### Desktop Testing
1. Visit your store homepage
2. Look for green WhatsApp button (bottom-right)
3. Click the button - should open WhatsApp web or mobile app
4. Verify the pre-filled message appears

### Mobile Testing
1. Visit your store on a mobile device
2. The button should be slightly smaller (responsive)
3. Click should open WhatsApp mobile app directly

### Browser DevTools Testing
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Check for any error messages
4. Check **Network** tab to verify script loads successfully

## Troubleshooting

### Widget Not Showing?

**Issue:** Green button is not visible on homepage

**Solutions:**
1. Verify app settings - check if "Enable Widget" is toggled ON
2. Verify phone number - must include country code (e.g., `+1`)
3. Clear browser cache - Ctrl+Shift+Delete (Chrome/Firefox)
4. Check if script tag is properly added to theme.liquid
5. Check browser console for errors (F12 → Console)

### Widget Shows But Link Doesn't Work?

**Issue:** Clicking button doesn't open WhatsApp

**Solutions:**
1. Verify phone number format: `+[country code][number]`
   - Valid: `+1-555-0123` or `+919876543210`
   - Invalid: `555-0123` (missing country code)
2. Ensure WhatsApp is installed or use WhatsApp Web
3. Try visiting `https://wa.me/[phonenumber]` directly in browser

### Multiple Buttons Appear?

**Issue:** More than one WhatsApp button on page

**Solutions:**
1. Check `theme.liquid` - ensure script tag is added only once
2. Disable other WhatsApp apps if installed
3. Clear browser cache
4. Check if app uses script tags or pixel injection (remove duplicates)

### Button Appears But Styling is Off?

**Issue:** Button doesn't look right (wrong size/color/position)

**Solutions:**
1. Verify CSS is not being overridden by theme
2. Check browser DevTools → Elements tab
3. Inspect the button element and check computed styles
4. May need to adjust z-index if hidden behind other elements

## Advanced Configuration

### Track Widget Clicks (Analytics)

Add Google Analytics tracking:

```html
<script>
  document.addEventListener('whatsapp-widget-click', function(e) {
    gtag('event', 'whatsapp_contact', {
      'location': 'widget',
      'page': window.location.pathname
    });
  });
</script>
```

### Disable on Specific Pages

If you want to hide the widget on certain pages:

```liquid
{% unless template == 'cart' or template == 'checkout' %}
  <script src="https://your-app-domain.com/widget.js?shop={{ shop.permanent_domain }}" defer></script>
{% endunless %}
```

### Delay Widget Loading

To avoid style conflicts, delay widget initialization:

```liquid
<script>
  setTimeout(function() {
    var script = document.createElement('script');
    script.src = "https://your-app-domain.com/widget.js?shop={{ shop.permanent_domain }}";
    script.defer = true;
    document.body.appendChild(script);
  }, 500); // Wait 500ms before loading
</script>
```

## API Endpoints

The app provides REST API endpoints for widget management:

### Get Widget Settings
```
GET /api/whatsapp/settings
Response: {
  "success": true,
  "settings": {
    "phoneNumber": "+1-555-0123",
    "message": "Hi! I'm interested...",
    "enabled": true
  }
}
```

### Save Widget Settings
```
POST /api/whatsapp/settings
Body: {
  "phoneNumber": "+1-555-0123",
  "message": "Your message here",
  "enabled": true
}
```

## Uninstall

To remove the widget from your store:

1. **From Theme:** Remove the script tag from `theme.liquid`
2. **From App:** Go to app settings and toggle **Disable**
3. **From Admin:** Uninstall the AeroChat WhatsApp app

## Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Script Size:** ~2KB (minified)
- **Load Time:** <100ms
- **No External Dependencies:** Standalone widget
- **Zero Impact on Performance:** Uses efficient CSS animations

## Security

- ✅ No user data collected
- ✅ HTTPS only (when installed on HTTPS site)
- ✅ Compatible with Content Security Policy
- ✅ No third-party tracking

## Support

For issues or feature requests:
- Email: support@aerochat.app
- Chat: Use the in-app chat support
- Documentation: https://docs.aerochat.app

## FAQ

**Q: Will the widget appear on checkout pages?**
A: By default, yes. You can modify the theme liquid code to exclude checkout if desired.

**Q: Can I use multiple WhatsApp numbers?**
A: Currently, the widget supports one number. Multiple numbers coming in future updates.

**Q: Does the widget work with page builders (PageFly, etc.)?**
A: Yes, as long as they use standard theme.liquid rendering.

**Q: What if customer doesn't have WhatsApp installed?**
A: The link will open WhatsApp Web (web.whatsapp.com) in the browser.

**Q: Can I customize the button position?**
A: Yes, modify the `bottom` and `right` CSS properties in the script.

**Q: Is there mobile optimization?**
A: Yes, the widget is fully responsive and optimized for all screen sizes.
