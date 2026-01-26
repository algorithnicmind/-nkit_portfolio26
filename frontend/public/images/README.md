# Images Folder - Portfolio Website

This folder contains all images used in your portfolio website. The folder is organized into subfolders for easy management.

## 📁 Folder Structure

```
images/
├── profile/          # Your profile pictures and personal images
├── projects/         # Project screenshots and images
├── backgrounds/      # Background images and textures
├── icons/           # Custom icons and logos
└── README.md        # This file
```

## 🖼️ How to Use Images

### 1. Profile Images (`profile/`)
- **profile-photo.jpg** - Your main profile picture
- **profile-photo-2.jpg** - Alternative profile picture
- **about-image.jpg** - Image for the about section

**Recommended size:** 400x400px or larger (square format)

### 2. Project Images (`projects/`)
- **project1-screenshot.jpg** - Screenshot of your first project
- **project2-screenshot.jpg** - Screenshot of your second project
- **project3-screenshot.jpg** - Screenshot of your third project

**Recommended size:** 800x600px or similar aspect ratio

### 3. Background Images (`backgrounds/`)
- **hero-bg.jpg** - Background for hero section
- **section-bg.jpg** - Background for other sections
- **texture.png** - Subtle texture overlays

**Recommended size:** 1920x1080px or larger

### 4. Custom Icons (`icons/`)
- **logo.png** - Your personal logo
- **favicon.ico** - Website favicon
- **custom-icon.svg** - Custom SVG icons

## 🔧 How to Add Images

### Step 1: Add Your Images
1. Copy your images to the appropriate subfolder
2. Use descriptive names (e.g., `my-profile-photo.jpg`)
3. Use web-friendly formats: JPG, PNG, SVG, WebP

### Step 2: Update the Website
The website is already configured to use images from these folders. You can:

#### Option A: Use the Config File (Recommended)
Edit `config.js` to specify image paths:

```javascript
personal: {
    name: "Your Name",
    profileImage: "images/profile/profile-photo.jpg",
    aboutImage: "images/profile/about-image.jpg"
},
projects: [
    {
        title: "My Project",
        image: "images/projects/project1-screenshot.jpg",
        // ... other project details
    }
]
```

#### Option B: Edit HTML Directly
Update image paths in `index.html`:

```html
<!-- Profile image -->
<img src="images/profile/profile-photo.jpg" alt="Your Name">

<!-- Project image -->
<img src="images/projects/project1-screenshot.jpg" alt="Project Screenshot">
```

## 📐 Image Guidelines

### File Formats
- **JPG** - For photographs and complex images
- **PNG** - For images with transparency
- **SVG** - For icons and logos (scalable)
- **WebP** - Modern format (good compression)

### File Sizes
- **Profile images:** 100KB - 500KB
- **Project screenshots:** 200KB - 1MB
- **Background images:** 500KB - 2MB
- **Icons:** 10KB - 50KB

### Optimization Tips
1. **Compress images** before uploading
2. **Use appropriate formats** for each image type
3. **Keep file names** descriptive and lowercase
4. **Avoid spaces** in file names (use hyphens)

## 🎨 Current Image Placeholders

The website currently uses FontAwesome icons as placeholders. To replace them with your images:

### Replace Profile Icon
1. Add your photo to `images/profile/profile-photo.jpg`
2. Update the hero section in `index.html`:

```html
<!-- Replace this: -->
<i class="fas fa-user"></i>

<!-- With this: -->
<img src="images/profile/profile-photo.jpg" alt="Your Name" class="profile-image">
```

### Replace Project Icons
1. Add project screenshots to `images/projects/`
2. Update project cards in `index.html`:

```html
<!-- Replace this: -->
<i class="fas fa-shopping-cart"></i>

<!-- With this: -->
<img src="images/projects/project1-screenshot.jpg" alt="Project Screenshot">
```

## 🚀 Quick Start

1. **Add your profile photo** to `images/profile/`
2. **Add project screenshots** to `images/projects/`
3. **Update the config file** (`config.js`) with image paths
4. **Test the website** to see your images

## 📱 Responsive Images

The website automatically handles responsive images. For best results:
- Use high-resolution images (2x the display size)
- The CSS will scale them appropriately
- Images will look crisp on all devices

## 🔍 SEO Tips

- Use descriptive file names
- Add meaningful `alt` attributes
- Optimize image file sizes
- Use appropriate image formats

---

**Happy customizing! 🎨** 