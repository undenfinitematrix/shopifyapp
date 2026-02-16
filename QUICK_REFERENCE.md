# Quick Reference Commands

## Development Setup

### Start Development Server
```bash
cd aerochat-whatsapp
npm run dev
```

Access app at: `http://localhost:8000`

### Run Prisma Migrations
```bash
cd aerochat-whatsapp
npx prisma migrate dev --name create_whatsapp_settings
```

### Generate Prisma Client
```bash
cd aerochat-whatsapp
npx prisma generate
```

### View Database
```bash
cd aerochat-whatsapp
npx prisma studio
# Opens at http://localhost:5555
```

## Testing API Endpoints

### Test GET Widget Settings
```bash
curl -X GET http://localhost:8000/api/whatsapp/settings \
  -H "Content-Type: application/json"
```

### Test POST Widget Settings
```bash
curl -X POST http://localhost:8000/api/whatsapp/settings \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1-555-0123",
    "message": "Hi! I am interested in your products.",
    "enabled": true
  }'
```

### Test Widget Script
```bash
curl http://localhost:8000/widget.js?shop=test.myshopify.com
```

## Database Query Examples

### View All Settings
```bash
sqlite3 dev.sqlite "SELECT * FROM WhatsAppSettings;"
```

### Get Settings for Specific Shop
```bash
sqlite3 dev.sqlite "SELECT * FROM WhatsAppSettings WHERE shop='test.myshopify.com';"
```

### Delete Settings
```bash
sqlite3 dev.sqlite "DELETE FROM WhatsAppSettings WHERE shop='test.myshopify.com';"
```

### Update Settings
```bash
sqlite3 dev.sqlite "UPDATE WhatsAppSettings SET enabled=0 WHERE shop='test.myshopify.com';"
```

## File Editing Quick Links

### Admin Settings Page
```
File: aerochat-whatsapp/app/routes/app.whatsapp.jsx
Contains: Configuration form, preview, instructions
```

### API Endpoints
```
File: aerochat-whatsapp/app/routes/api.whatsapp.settings.jsx
Methods: GET (fetch), POST (save)
```

### Widget Script Server
```
File: aerochat-whatsapp/app/routes/widget.js.jsx
Serves: widget.js with embedded settings
```

### Widget Styles & JS
```
File: aerochat-whatsapp/public/whatsapp-widget.js
Contains: Widget HTML, CSS, JavaScript
```

### Database Schema
```
File: aerochat-whatsapp/prisma/schema.prisma
Add/modify WhatsAppSettings model here
```

### Frontend Settings Component
```
File: src/pages/whatsappsettingspage.jsx
Old UI component (deprecated, use route instead)
```

## Build & Deployment

### Build for Production
```bash
cd aerochat-whatsapp
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Shopify
```bash
# Requires Shopify CLI
shopify app deploy
```

## Debugging

### Check Browser Console Errors
1. Open DevTools: F12
2. Go to Console tab
3. Look for any red error messages

### Check Network Requests
1. Open DevTools: F12
2. Go to Network tab
3. Search for "widget.js"
4. Check status (should be 200)
5. Check response is valid JavaScript

### Check DOM Elements
1. Open DevTools: F12
2. Go to Elements tab
3. Search for: `whatsapp-widget` or `#whatsapp-widget-aerochat`
4. Verify HTML structure and CSS

### Enable Debug Logging
Add to widget.js:
```javascript
console.log('WhatsApp Widget Status:', CONFIG);
console.log('Widget Enabled:', CONFIG.enabled);
console.log('Phone Number:', CONFIG.phoneNumber);
```

## Common Issues & Solutions

### Migrations Not Running
```bash
# Reset database
npx prisma migrate reset

# Re-run migrations
npx prisma migrate dev
```

### Script Not Loading
```bash
# Check file exists
ls -la aerochat-whatsapp/app/routes/widget.js.jsx

# Check for syntax errors
npx eslint aerochat-whatsapp/app/routes/widget.js.jsx
```

### Settings Not Saving
```bash
# Check database connection
npx prisma db execute --stdin < test-query.sql

# View database logs
sqlite3 dev.sqlite ".log stdout"
```

### Widget Not Appearing
```bash
# 1. Check if enabled in settings
curl http://localhost:8000/api/whatsapp/settings | grep enabled

# 2. Check if phone number is set
curl http://localhost:8000/api/whatsapp/settings | grep phoneNumber

# 3. Check browser console for errors
# Open F12 → Console tab
```

## Code Patterns Used

### API Route Pattern
```javascript
export const loader = async ({ request }) => { }
export const action = async ({ request }) => { }
```

### Database Query Pattern
```javascript
await prisma.whatsAppSettings.findUnique({ where: { shop } })
await prisma.whatsAppSettings.upsert({ where, create, update })
```

### React Hook Pattern
```javascript
export default function Component() {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // load data
  }, []);
  
  return jsx;
}
```

### Widget Injection Pattern
```javascript
// IIFE (Immediately Invoked Function Expression)
(function() {
  // All code in closure, no global state
  function init() { }
  function create() { }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

## Performance Optimization

### Reduce Script Size
```bash
# Minify widget script
npx terser widget.js -o widget.min.js

# Check final size
du -h widget.min.js
```

### Cache Warmup
```bash
# Pre-fetch settings on page load
curl http://localhost:8000/api/whatsapp/settings -s > /dev/null &
```

### Monitor Performance
```javascript
// Add to widget
const start = performance.now();
// ... widget code ...
const end = performance.now();
console.log('Widget init time:', end - start, 'ms');
```

## Git Commands

### Commit Changes
```bash
git add -A
git commit -m "feat: add WhatsApp widget functionality"
git push origin feature/whatsapp-widget
```

### Create Release Tag
```bash
git tag -a v1.0.0 -m "WhatsApp Widget Release"
git push origin v1.0.0
```

## Environment Variables

### Required for Widget
```env
# .env file
DATABASE_URL="file:./dev.sqlite"
SHOPIFY_API_KEY="your-api-key"
SHOPIFY_API_SECRET="your-api-secret"
SHOPIFY_APP_URL="https://your-app-domain.com"
```

## Docker Commands (if using containers)

### Build Image
```bash
docker build -t aerochat-whatsapp .
```

### Run Container
```bash
docker run -p 8000:8000 aerochat-whatsapp
```

## Database Backup

### Backup Database
```bash
cp dev.sqlite dev.sqlite.backup
```

### Restore Database
```bash
cp dev.sqlite.backup dev.sqlite
```

## Useful Links

- **Prisma Docs:** https://www.prisma.io/docs/
- **Remix Docs:** https://remix.run/docs
- **Shopify API:** https://shopify.dev/docs/api
- **WhatsApp Web API:** https://www.whatsapp.com/
- **Shopify App CLI:** https://shopify.dev/docs/apps/tools/cli

## Support Commands

### Generate Bug Report
```bash
# Collect system info
node --version
npm --version
sqlite3 --version

# Check app status
npm run dev > debug.log 2>&1 &

# Send debug.log to support
```

### Check Dependencies
```bash
# List installed packages
npm list

# Check for outdated packages
npm outdated

# Update packages
npm update
```

## Script Examples

### Test Widget on Live Theme (Manual)

1. Get your app domain: `https://your-shopify-app.herokuapp.com`
2. In Shopify theme editor, add to theme.liquid:
```liquid
<script src="https://your-shopify-app.herokuapp.com/widget.js?shop={{ shop.permanent_domain }}" defer></script>
```
3. Visit store homepage
4. Look for WhatsApp button

### Check Widget Load Time
```bash
time curl -o /dev/null -s http://localhost:8000/widget.js?shop=test.myshopify.com
```

### Monitor Widget Performance
```javascript
// Add to console
setInterval(() => {
  const widget = document.getElementById('whatsapp-widget-aerochat');
  console.log('Widget visible:', widget ? 'Yes' : 'No');
  console.log('Button state:', document.querySelector('.whatsapp-widget-link'));
}, 5000);
```

---

**Quick Tip:** Bookmark this file for easy reference during development!

**Last Updated:** February 15, 2026
