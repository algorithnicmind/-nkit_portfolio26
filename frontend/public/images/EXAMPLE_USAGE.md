# Example: How to Add Images to Your Portfolio

## 📸 Quick Example

Here's exactly how to add your images:

### Step 1: Add Your Profile Photo
1. **Save your photo** as `profile-photo.jpg` in the `images/profile/` folder
2. **Edit `config.js`** and change this line:
   ```javascript
   profileImage: "", // Change this line
   ```
   To:
   ```javascript
   profileImage: "images/profile/profile-photo.jpg", // Your photo path
   ```

### Step 2: Add Project Screenshots
1. **Save project screenshots** in the `images/projects/` folder:
   - `project1-screenshot.jpg`
   - `project2-screenshot.jpg`
   - `project3-screenshot.jpg`

2. **Edit `config.js`** and update the projects section:
   ```javascript
   projects: [
       {
           title: "E-Commerce Platform",
           // ... other details ...
           image: "images/projects/project1-screenshot.jpg" // Add this line
       },
       {
           title: "Task Management App",
           // ... other details ...
           image: "images/projects/project2-screenshot.jpg" // Add this line
       }
   ]
   ```

### Step 3: Add Background Images (Optional)
1. **Save background images** in the `images/backgrounds/` folder:
   - `hero-bg.jpg` - For the hero section
   - `about-bg.jpg` - For the about section

2. **Edit `config.js`** and update:
   ```javascript
   backgrounds: {
       hero: "images/backgrounds/hero-bg.jpg",
       about: "images/backgrounds/about-bg.jpg"
   }
   ```

## 🖼️ Image Requirements

### Profile Photo
- **Size**: 400x400px or larger (square recommended)
- **Format**: JPG, PNG, or WebP
- **File size**: Under 500KB
- **Style**: Professional headshot or clear face photo

### Project Screenshots
- **Size**: 800x600px or similar aspect ratio
- **Format**: JPG, PNG, or WebP
- **File size**: Under 1MB
- **Style**: Clear screenshots of your projects

### Background Images
- **Size**: 1920x1080px or larger
- **Format**: JPG or PNG
- **File size**: Under 2MB
- **Style**: Subtle, not too busy

## 📁 Folder Structure Example

```
images/
├── profile/
│   ├── profile-photo.jpg          ← Your main photo
│   └── about-image.jpg            ← Photo for about section
├── projects/
│   ├── project1-screenshot.jpg    ← E-commerce project
│   ├── project2-screenshot.jpg    ← Task management app
│   └── project3-screenshot.jpg    ← Analytics dashboard
├── backgrounds/
│   ├── hero-bg.jpg               ← Hero section background
│   └── about-bg.jpg              ← About section background
└── icons/
    └── logo.png                  ← Your personal logo
```

## 🔧 Complete Example Configuration

Here's how your `config.js` should look with images:

```javascript
const PORTFOLIO_CONFIG = {
    personal: {
        name: "John Doe",
        title: "Full Stack Developer",
        // ... other personal info ...
        profileImage: "images/profile/profile-photo.jpg",
        aboutImage: "images/profile/about-image.jpg",
        logo: "images/icons/logo.png"
    },
    projects: [
        {
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce solution...",
            technologies: ["React", "Node.js", "MongoDB"],
            demoLink: "https://myproject.com",
            githubLink: "https://github.com/username/project",
            image: "images/projects/project1-screenshot.jpg"
        },
        {
            title: "Task Management App",
            description: "A collaborative task management app...",
            technologies: ["Vue.js", "Express", "PostgreSQL"],
            demoLink: "https://taskapp.com",
            githubLink: "https://github.com/username/taskapp",
            image: "images/projects/project2-screenshot.jpg"
        }
    ],
    backgrounds: {
        hero: "images/backgrounds/hero-bg.jpg",
        about: "images/backgrounds/about-bg.jpg"
    }
};
```

## ✅ What Happens When You Add Images

1. **Profile Photo**: Replaces the user icon in the hero section
2. **Project Images**: Replace the FontAwesome icons in project cards
3. **Background Images**: Add subtle backgrounds to sections
4. **Logo**: Replaces the text logo in the navigation

## 🎯 Tips for Best Results

1. **Use high-quality images** (but keep file sizes reasonable)
2. **Maintain consistent aspect ratios** for similar images
3. **Use descriptive file names** (e.g., `ecommerce-project.jpg`)
4. **Test on different screen sizes** to ensure images look good
5. **Optimize images** before uploading (use tools like TinyPNG)

## 🚀 Quick Test

After adding images:
1. Open `index.html` in your browser
2. You should see your images instead of icons
3. If images don't appear, check the file paths in `config.js`
4. Make sure image files exist in the correct folders

---

**That's it! Your portfolio will now display your actual images instead of placeholder icons.** 🎉 