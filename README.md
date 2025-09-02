# Yarden Gabbay - Clinical Psychologist Website

A professional, bilingual website for Yarden Gabbay, a Clinical Psychologist in private practice. The website features a clean, calming design that reflects the therapeutic approach and provides comprehensive information about services, publications, and contact details.

## Features

### 🌐 Bilingual Support
- Full Hebrew and English language support
- Language toggle in the navigation
- RTL (Right-to-Left) layout for Hebrew
- LTR (Left-to-Right) layout for English
- Persistent language preference storage

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all device sizes
- Touch-friendly navigation
- Smooth animations and transitions

### 🎨 Design Elements
- Calming color palette with warm earth tones
- Professional typography using Assistant and Lora fonts
- Decorative elements using natural imagery (feather pen, leaves, pine cone)
- Subtle animations and hover effects

### 📄 Pages
1. **Home** - Hero section with welcome message and call-to-action
2. **About** - Professional bio, credentials, and therapeutic approach
3. **Areas of Therapy** - Specializations and treatment methods
4. **Digital Courses** - Placeholder for future course offerings
5. **Lectures** - Placeholder for lecture information
6. **Publications** - Articles and media appearances
7. **FAQ** - Comprehensive FAQ with accordion layout
8. **Contact** - Contact form and information

### 🔧 Technical Features
- Newsletter subscription functionality
- Contact form with validation
- FAQ accordion functionality
- Smooth scrolling navigation
- Intersection Observer animations
- Form submission handling
- Social media integration

## File Structure

```
/
├── index.html              # Home page
├── about.html              # About page
├── therapy.html            # Areas of therapy
├── courses.html            # Digital courses
├── lectures.html           # Lectures
├── publications.html       # Publications and articles
├── article-mind-not-security.html  # Full article page
├── faq.html               # FAQ page
├── contact.html           # Contact page
├── styles.css             # Main stylesheet
├── script.js              # JavaScript functionality
├── logo.PNG               # Main logo
├── logo with name.png     # Logo with name
├── feather pen.JPG        # Decorative image
├── leaves.JPG             # Decorative image
├── pine cone.JPG          # Decorative image
├── prompt/                # Content prompts
│   ├── about-page.txt
│   ├── areas-of-therapy.txt
│   ├── design-guide.txt
│   ├── digital-courses.txt
│   ├── FAQ.txt
│   ├── home-page.txt
│   ├── lectures.txt
│   ├── publications-and-articles.txt
│   └── site-structure.txt
├── כתבות/                 # Hebrew articles folder
│   └── הנפש לא בשירות הביטחון.docx
└── README.md              # This file
```

## Color Palette

```css
--bg-primary: #eeedeb        /* Background */
--accent-primary: #a06a4d    /* Primary accent */
--accent-secondary: #bf977d  /* Secondary accent */
--accent-hover: #9f5e36      /* Hover states */
--accent-light: #cfc0b7      /* Light accents */
--accent-muted: #c7aea2      /* Muted accents */
--text-muted: #b4a59d        /* Muted text */
--card-bg: #d9cac5          /* Card backgrounds */
--button-secondary: #b97c44  /* Secondary buttons */
--border-color: #ccc7c4      /* Borders */
```

## Typography

- **Hebrew**: Assistant (Google Fonts)
- **English**: Lora (Google Fonts)
- **UI Elements**: Open Sans (Google Fonts)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Setup and Deployment

1. **Local Development**
   ```bash
   # Clone or download the files
   # Open index.html in a web browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

2. **Deployment**
   - Upload all files to your web hosting service
   - Ensure all files maintain their directory structure
   - The website is static and doesn't require server-side processing

## Content Management

### Adding New Articles
1. Create a new HTML file in the root directory
2. Follow the structure of `article-mind-not-security.html`
3. Add the article link to `publications.html`

### Updating Content
- Edit the HTML files directly
- Update the `languageContent` object in `script.js` for bilingual content
- Modify CSS variables in `styles.css` for design changes

### Newsletter and Contact Forms
- Currently configured for client-side handling
- Form submissions are logged to console
- Integrate with your preferred backend service for production

## Accessibility Features

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast color scheme
- Responsive text sizing
- Screen reader friendly

## Performance Optimizations

- Optimized images
- Minified CSS and JavaScript (recommended for production)
- Lazy loading for images
- Efficient animations using CSS transforms
- Minimal external dependencies

## Contact Information

- **Email**: yarden8223@gmail.com
- **Phone**: 052-4543553
- **Instagram**: @yarden.g.psychologist
- **Facebook**: Yarden Gabbay Psychologist
- **Location**: Ramat Gan, Israel

## License

This website is created for Yarden Gabbay's professional use. All rights reserved.

---

