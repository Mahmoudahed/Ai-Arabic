# مساعد المحتوى العربي - Arabic Content Assistant

تطبيق ذكي يساعدك في توليد محتوى احترافي وجذاب لوسائل التواصل الاجتماعي باللغة العربية.

## المميزات

- توليد محتوى لوسائل التواصل الاجتماعي
- دعم مختلف اللهجات العربية
- واجهة مستخدم سهلة وبسيطة
- حفظ المحتوى المولد
- نسخ المحتوى بسهولة

## المتطلبات

- Node.js 18.x أو أحدث
- npm أو yarn
- حساب Firebase
- مفتاح API من Gemini

## الإعداد

1. قم بنسخ المشروع:
```bash
git clone [repository-url]
cd arabic-content-assistant
```

2. قم بتثبيت التبعيات:
```bash
npm install
# أو
yarn install
```

3. قم بإنشاء ملف `.env.local` وأضف المتغيرات التالية:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

4. قم بتشغيل التطبيق:
```bash
npm run dev
# أو
yarn dev
```

5. افتح المتصفح على العنوان:
```
http://localhost:3000
```

## التقنيات المستخدمة

- Next.js
- TypeScript
- Tailwind CSS
- Firebase
- Gemini API
- React Icons
- React Hot Toast

## الترخيص

هذا المشروع مرخص تحت رخصة MIT.

# Professional Logo Generator

This application provides a professional logo generator with advanced features including logo-like letter shapes and expert design knowledge.

## Features

### Professional Design Knowledge

The logo generator incorporates professional design principles and industry-specific knowledge:

- **Industry Optimization**: Automatic recommendations for styles, colors, and typography based on your industry (tech, finance, healthcare, luxury, etc.)
- **Audience Targeting**: Design suggestions tailored to your target audience (professional, youthful, traditional, upscale)
- **Design Principles**: Built-in guidance on simplicity, versatility, distinctiveness, relevance, and timelessness
- **Expert Recommendations**: Contextual advice that adapts to your selected industry and audience

### Logo-like Letter Shapes

The generator forms letters themselves into logo-like shapes with the following enhancements:

- **Custom SVG Paths**: First letters are rendered using custom SVG paths to create professional logo shapes
- **Geometric Shapes**: Letters can be rendered in square, circle, or triangle shapes depending on the style
- **Connected Letters**: Options to connect letters with lines, curves, or arcs for a cohesive design
- **Visual Styles**: Multiple professional styles including minimalist, corporate, tech, luxury, and more
- **Special Effects**: Embossing, shadows, gradients, and other visual enhancements

### Professional Logo Settings

- **Background Options**: Add solid colors, gradients, or transparent backgrounds
- **Logo Scaling**: Adjust the size and proportions of your logo
- **Icon Integration**: 12 professional SVG icons with positioning options
- **Typography Controls**: 10 font options with weight selectors and spacing controls
- **Advanced Export**: Multiple formats and size presets for professional use

## How It Works

1. Select your industry and target audience to receive professional design recommendations
2. Enter the name or text for your logo
3. Fine-tune the suggested style, colors, and typography or customize as needed
4. Further refine with icons, background options, and other settings
5. Export your professional logo

## Technical Implementation

The logo generator uses canvas rendering with SVG paths and design knowledge to create truly professional logos:

- **logoGenerator.ts**: Creates letter transformations with custom styling properties
- **logoRenderer.ts**: Renders letters as logo shapes using SVG paths and Canvas drawing
- **LogoPreview.tsx**: Displays the rendered logo with proper scaling
- **EnhancedExportOptions.tsx**: Provides professional export capabilities
- **Design Knowledge**: Industry-specific databases with style recommendations

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Then open [http://localhost:3000/logo-test](http://localhost:3000/logo-test) in your browser to test the logo generator.

## Usage Examples

- Create a tech company logo with connected geometric letters and industry-appropriate colors
- Design a luxury brand logo with elegant script letterforms based on professional design principles
- Generate a financial services logo with appropriate colors and styling for trust and stability
- Build a healthcare logo with clean, approachable forms and industry-standard color schemes

# AI Assistant

A modern AI services and assistance platform built with Next.js and Capacitor.

## Features

- AI-powered text generation
- Text-to-speech conversion
- Document scanning
- Mindmap creation
- Chat interface
- Multi-language support
- Mobile app support via Capacitor

## Tech Stack

- Next.js 15.3
- React 19
- TypeScript
- Tailwind CSS
- Capacitor for mobile deployment
- Firebase

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Mahmoudahed/Ai-Arabic.git
cd Ai-Arabic
```

2. Install dependencies
```bash
npm install --legacy-peer-deps
```

3. Run the development server
```bash
npm run dev
```

### Building for mobile

#### Android
```bash
npm run android:build
```

## License

ISC

## Deployment on Vercel

### Prerequisites for Deployment

- A Vercel account
- GitHub repository with the project

### Deployment Steps

1. Connect your GitHub repository to Vercel
2. Configure the following build settings:
   - Build Command: `npm run vercel-build`
   - Output Directory: `out`
   - Install Command: `npm install --legacy-peer-deps`

### Troubleshooting Deployment Issues

#### Import Path Alias Issues

This project uses path aliases (e.g., `@/components`) which can cause build issues on Vercel. We've implemented an automatic fix for this:

1. The `scripts/fix-paths.js` script automatically converts all `@/` import paths to relative paths during the build
2. This script runs as part of the `vercel-build` command

If you're experiencing path-related errors in your Vercel deployment:

1. Make sure your `vercel.json` file contains:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next",
      "config": {
        "installCommand": "npm install --legacy-peer-deps",
        "buildCommand": "npm run vercel-build"
      }
    }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

2. Ensure your `package.json` includes:
```json
"scripts": {
  "fix-paths": "node scripts/fix-paths.js",
  "vercel-build": "npm install --legacy-peer-deps && node scripts/fix-paths.js && next build"
}
```

3. You can run the path fixing script locally to verify it works:
```bash
npm run fix-paths
```

4. If needed, manually update any remaining import paths that use `@/` to relative paths.

#### Dependency Conflicts

The project uses React 19 but some dependencies like `react-speech-kit` require older React versions. We resolve this using:

```
# .npmrc
legacy-peer-deps=true
```
