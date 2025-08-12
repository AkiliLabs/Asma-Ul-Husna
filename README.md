# Asma Ul Husna - Website

A professional, customer-facing website for the "Asma Ul Husna" iOS app, designed to showcase the app's features and encourage TestFlight downloads.

## Features

### 🎨 Design
- **Islamic Aesthetic**: Beautiful green color scheme matching the app's design
- **Arabic Typography**: Elegant Arabic fonts for authentic presentation
- **Responsive Layout**: Optimized for both desktop and mobile devices
- **Smooth Animations**: Professional transitions and scroll effects

### 📱 Sections
1. **Hero Section**: App introduction with compelling tagline and download CTA
2. **App Showcase**: Interactive carousel showing app screenshots and demo video
3. **Features**: Highlighting the app's key capabilities with icons and descriptions
4. **About**: Information about the app's purpose and spiritual significance
5. **Download**: Strong call-to-action for TestFlight downloads
6. **Footer**: Simple footer with copyright information

### 🚀 Interactive Elements
- **Screenshot Carousel**: Auto-sliding with manual controls and touch/swipe support
- **Smooth Scrolling**: Animated navigation between sections
- **Mobile Menu**: Responsive navigation for smaller screens
- **Scroll Animations**: Elements animate into view as you scroll
- **Download Tracking**: Analytics-ready download button interactions

## File Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
└── README.md          # This documentation
```

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: Interactive functionality without dependencies
- **Google Fonts**: 
  - Amiri (Arabic script)
  - Inter (Latin script)
- **Font Awesome**: Icons for UI elements

## Key Features Implemented

### 🎯 App Features Highlighted
- ✅ Two browsing modes (cards and list)
- ✅ Rich details for each name
- ✅ Personalization with favorites
- ✅ Multi-language support (English & Turkish)
- ✅ Audio recitations
- ✅ Push notifications

### 📲 Mock App Screens
The website includes three interactive demo screens:
1. **Splash Screen**: Shows the beautiful opening with Ayah
2. **Card View**: Interactive card interface with Arabic calligraphy
3. **List View**: Quick browsing with search functionality

### 🎨 Color Scheme (Based on App)
- **Primary Green**: `#3F704D` (Rich medium green)
- **Accent Green**: `#5B9A6A` (Brighter for dark mode)
- **Light Green**: `#E8F5EC` (Soft background)
- **Gold Accent**: `#d4af37` (Highlighting and Arabic text)
- **Background**: `#F9FBFA` (Warm white)

## Usage Instructions

### 🌐 Opening the Website
1. Open `index.html` in any modern web browser
2. The website is fully self-contained - no server required
3. All assets are loaded from CDNs (fonts, icons)

### 📱 Mobile Testing
- Use browser developer tools to test responsive design
- Test touch/swipe functionality on actual mobile devices
- Verify smooth scrolling and animations work properly

### 🔧 Customization

#### Adding Real Screenshots
Replace the demo screens in the carousel:
1. Add your actual app screenshots to an `images/` folder
2. Update the `phone-content` divs in the carousel section
3. Replace demo content with `<img>` tags

#### Adding Real Video
Replace the video placeholder:
1. Upload your demo video to a hosting service
2. Replace the `.video-placeholder` div with an actual `<video>` element
3. Update the click handler in `script.js`

#### Updating TestFlight Link
When your app is ready:
1. Find all `.testflight-btn` elements
2. Update the `href` attributes with your actual TestFlight URL
3. Remove the placeholder notification in `script.js`

#### Analytics Integration
Add tracking to download buttons:
1. Include your analytics script (Google Analytics, etc.)
2. Update the `trackEvent` function in `script.js`
3. Add additional tracking points as needed

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Lazy Loading**: Ready for image lazy loading
- **Debounced Scrolling**: Optimized scroll event handling
- **CSS Animations**: Hardware-accelerated transitions
- **Minimal Dependencies**: Fast loading with CDN resources only

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels where appropriate
- High contrast text and backgrounds
- Mobile-friendly touch targets

## Future Enhancements

### 📸 Real Content Integration
- [ ] Replace placeholder images with actual app screenshots
- [ ] Add real demo video
- [ ] Include user testimonials section
- [ ] Add app store badges when live

### 🔗 External Integration
- [ ] Connect to actual TestFlight link
- [ ] Add social media sharing
- [ ] Integrate with analytics platform
- [ ] Add contact/support form

### 🌍 Localization
- [ ] Add Turkish language version
- [ ] Implement language switcher
- [ ] Localize all text content
- [ ] Add RTL support for Arabic content

## Notes

- All Arabic text uses proper Unicode encoding
- Design follows Islamic principles with respectful presentation
- Color scheme matches the app's green aesthetic
- Animations are smooth and professional
- Code is well-commented for easy maintenance

## Support

This website was created to showcase the "Asma Ul Husna" app and encourage downloads. For technical support or customization questions, refer to the code comments or the development team.

---

**Built with respect for Islamic values and modern web standards** 🕌
