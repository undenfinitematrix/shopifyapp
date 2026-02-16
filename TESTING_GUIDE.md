# WhatsApp Widget - Quick Testing Guide

## Pre-Deployment Testing

### 1. Database & Migrations
```bash
# Run Prisma migrations
npx prisma migrate dev

# Check if WhatsAppSettings table exists
sqlite3 dev.sqlite ".schema WhatsAppSettings"
```

### 2. Test API Endpoints

**GET Settings (no auth needed for public widget):**
```bash
curl http://localhost:3000/api/whatsapp/settings
```

**POST Settings (requires admin auth):**
```bash
curl -X POST http://localhost:3000/api/whatsapp/settings \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1-555-0123",
    "message": "Hello from AeroChat!",
    "enabled": true
  }'
```

### 3. Test Widget Script
```bash
# Visit the widget script endpoint
http://localhost:3000/widget.js?shop=test.myshopify.com
```

You should see a JavaScript file with embedded settings.

### 4. Test Admin Page

**In Shopify Dev Environment:**
1. Open app admin
2. Click "WhatsApp Widget" in nav
3. You should see:
   - Configuration form
   - Widget preview
   - Installation instructions
   - Status indicator

### 5. Test Storefront Integration

**Manual Testing:**
1. Add this to your store theme's `theme.liquid`:
```liquid
<script src="http://localhost:3000/widget.js?shop=YOUR_SHOP_DOMAIN" defer></script>
```

2. Visit your store homepage
3. Look for green WhatsApp button (bottom-right corner)
4. Verify button appears only when enabled
5. Click button - should open WhatsApp with message

**Browser DevTools Checks:**
- Open F12 → Console
- Check for any JavaScript errors
- Check Network tab - widget.js should load successfully
- Check Elements - look for `#whatsapp-widget-aerochat` div

### 6. Test Phone Number Validation

**Valid Phone Numbers:**
- ✅ +1-555-0123
- ✅ +919876543210
- ✅ +44-7700-900000
- ✅ +33123456789

**Invalid Numbers Should Be Rejected:**
- ❌ 555-0123 (no country code)
- ❌ +1-555 (too short)
- ❌ +abc (invalid format)

### 7. Test Enable/Disable Toggle

1. In admin page, toggle "Enable Widget" OFF
2. Save settings
3. Visit storefront - button should NOT appear
4. Toggle back ON, save
5. Refresh storefront - button should appear

### 8. Test Message Customization

1. Enter custom message in admin
2. Update message field with: "Test: Click here!"
3. Save settings
4. Click WhatsApp button on store
5. Verify custom message appears in WhatsApp

### 9. Test Responsiveness

**Desktop (1920x1080):**
- Button should be 60x60px
- Positioned bottom-right

**Tablet (768x1024):**
- Button should remain visible
- Size: 55x55px
- Still accessible

**Mobile (375x667):**
- Button should be 50x50px
- Smaller gap from edge (15px)
- Still touchable and visible

### 10. Test Animations

- ✅ Button has pulsing shadow effect
- ✅ Button scales up on hover
- ✅ Button scales down on click
- ✅ Smooth transitions (0.3s)
- ✅ No jank or stuttering

## Automated Testing

### Unit Tests (if applicable)

```javascript
// Test API response
test('GET /api/whatsapp/settings returns settings', async () => {
  const response = await fetch('/api/whatsapp/settings');
  const data = await response.json();
  expect(data.success).toBe(true);
  expect(data.settings).toHaveProperty('phoneNumber');
});

// Test validation
test('POST rejects invalid phone number', async () => {
  const response = await fetch('/api/whatsapp/settings', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber: '123' })
  });
  expect(response.status).toBe(400);
});
```

### Integration Tests

```bash
# Test full flow
1. Create new WhatsApp settings
2. Fetch settings
3. Update settings
4. Verify widget.js reflects changes
5. Test on storefront
```

## Performance Testing

### Load Time
```bash
# Check script load time
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000/widget.js
```

Expected: <1 second

### Memory Usage
- Open DevTools → Performance
- Record page load
- Check memory graph
- Should not exceed 5MB

## Browser Compatibility

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Chrome Mobile
- ✅ Safari Mobile

## Deployment Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] No console errors
- [ ] Database migrations successful
- [ ] API endpoints responding
- [ ] Admin page functional
- [ ] Widget displays correctly
- [ ] Phone validation working
- [ ] Enable/disable toggle working
- [ ] Message customization working
- [ ] Animations smooth
- [ ] Responsive on all devices
- [ ] Documentation updated
- [ ] No hardcoded localhost URLs
- [ ] Environment variables configured
- [ ] HTTPS enabled in production
- [ ] Caching headers set correctly
- [ ] Error handling implemented

## Rollback Plan

If issues occur:

1. **Stop serving widget script**
   - Remove script tag from theme.liquid
   - Or disable in app settings

2. **Revert database changes**
   ```bash
   npx prisma migrate resolve --rolled-back create_whatsapp_settings
   ```

3. **Revert code**
   ```bash
   git revert [commit-hash]
   ```

## Support Resources

- Troubleshooting Guide: `WIDGET_INSTALLATION_GUIDE.md`
- Implementation Details: `IMPLEMENTATION_SUMMARY.md`
- API Documentation: `aerochat-whatsapp/app/routes/api.whatsapp.settings.jsx`
- Theme Extension: `extensions/theme-whatsapp/README.md`

## Contact

For issues:
- Email: dev@aerochat.app
- Documentation: https://docs.aerochat.app
- Support: https://support.aerochat.app

---

**Last Updated:** February 15, 2026
