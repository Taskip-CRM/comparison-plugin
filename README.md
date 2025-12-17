# Taskip Comparison Plugin

A comprehensive WordPress plugin providing custom Gutenberg blocks for creating comparison content pages. Built specifically for Taskip to showcase product comparisons with competitors.

## Overview

This plugin adds a custom post type "Comparison" with 9 specialized Gutenberg blocks designed to create compelling comparison landing pages. All blocks are fully customizable with color options, responsive design, and modern UI components.

## Features

- **Custom Post Type**: "Comparison" with Gutenberg support
- **9 Specialized Blocks**: All fully customizable
- **Modern Architecture**: React/JSX with WordPress block editor
- **Responsive Design**: Mobile-first approach
- **Color Customization**: Extensive color options for all blocks
- **No Theme Conflicts**: All CSS classes use `tascom-` prefix
- **Font Integration**: Google Font 'Instrument Serif' support

## Available Blocks

### 1. Hero Comparison Block
Full-width hero section with side-by-side product comparison.
- Custom headlines and descriptions
- Company logos with image upload
- Feature lists with checkmarks
- CTA buttons with customizable links
- Background colors and text colors

**Location**: `blocks/hero-comparison/`

### 2. Trust Bar Block
Social proof bar displaying company logos.
- Multiple logo uploads
- Customizable title and eyebrow text
- Horizontal scrolling on mobile
- Logo spacing controls

**Location**: `blocks/trust-bar/`

### 3. Verdict Block
Editorial verdict section with rating and recommendation.
- Star ratings (0-5)
- Recommendation badge
- Rich text editor for verdict
- Color customization for ratings

**Location**: `blocks/verdict/`

### 4. Migration Support Block
Information section about migration assistance.
- Icon/image upload support
- Title and description editing
- Feature list with checkmarks
- CTA button customization

**Location**: `blocks/migration/`

### 5. AI Comparison Block
Compare AI capabilities between platforms.
- Platform icons with image upload
- Feature comparison matrix
- Check/cross/custom text support
- Badge support for features
- 10+ color options

**Location**: `blocks/ai-comparison/`

### 6. Highlights Block
Winner/loser comparison cards.
- Multiple highlight cards
- Winner/loser badges
- Inline editable descriptions (RichText)
- Gradient customization
- Show/hide badge toggle

**Location**: `blocks/highlights/`

### 7. Pricing Comparison Block
Detailed pricing table comparison.
- Dynamic row management
- Text alignment controls
- Show/hide bottom note
- 6 color customization options
- Savings highlights

**Location**: `blocks/pricing-comparison/`

### 8. Feature-by-Feature Comparison Block
Comprehensive feature comparison table.
- Category-based organization
- 6 cell types: Check, Cross, Limited, Coming Soon, Paid, Custom Text
- Dynamic category and row management
- Badge support with custom colors
- 10 color options

**Location**: `blocks/feature-comparison/`

### 9. Pricing at Scale Block
Pricing cards showing cost at different team sizes.
- Card grid layout (responsive)
- Featured card support
- Dynamic card management
- Savings badges
- 7 color customization options

**Location**: `blocks/pricing-scale/`

## Installation

1. **Upload Plugin**:
   ```bash
   # Upload to WordPress plugins directory
   wp-content/plugins/taskip-comparison/
   ```

2. **Install Dependencies**:
   ```bash
   cd taskip-comparison
   npm install
   composer install
   ```

3. **Build Blocks**:
   ```bash
   npm run build
   ```

4. **Activate Plugin**:
   - Go to WordPress admin
   - Navigate to Plugins
   - Activate "Taskip Comparison"

## Development

### Requirements
- PHP 7.4+
- WordPress 6.0+
- Node.js 18+
- Composer

### Build Commands

```bash
# Build all blocks
npm run build

# Build individual blocks
npm run build:hero
npm run build:trust
npm run build:verdict
npm run build:migration
npm run build:ai
npm run build:highlights
npm run build:pricing
npm run build:features
npm run build:scale

# Development mode (watch mode)
npm run start
```

### Project Structure

```
taskip-comparison/
├── blocks/                          # All Gutenberg blocks
│   ├── hero-comparison/
│   │   ├── block.json              # Block configuration
│   │   ├── index.js                # Editor interface (React)
│   │   ├── render.php              # Frontend rendering
│   │   ├── style.css               # Frontend styles
│   │   ├── editor.css              # Editor styles
│   │   └── build/                  # Compiled assets
│   ├── trust-bar/
│   ├── verdict/
│   ├── migration/
│   ├── ai-comparison/
│   ├── highlights/
│   ├── pricing-comparison/
│   ├── feature-comparison/
│   └── pricing-scale/
├── src/
│   ├── Blocks/
│   │   └── BlockManager.php        # Block registration
│   └── PostTypes/
│       └── ComparisonPostType.php  # Custom post type
├── taskip-comparison.php           # Main plugin file
├── composer.json                   # PHP dependencies
├── package.json                    # Node dependencies
├── README.md                       # This file
└── DEVELOPER.md                    # Developer documentation
```

## Usage

### Creating a Comparison Page

1. **Create New Comparison**:
   - Go to WordPress admin
   - Click "Comparisons" > "Add New"
   - Title your comparison (e.g., "Taskip vs SuiteDash")

2. **Add Blocks**:
   - Click the "+" icon
   - Find "Taskip Comparison" category
   - Select blocks to add

3. **Customize Content**:
   - Edit text directly in the preview
   - Use right sidebar (InspectorControls) for settings
   - Customize colors via color panels

4. **Publish**:
   - Click "Publish"
   - View at: `yoursite.com/compare/post-slug`

### Block Customization

All blocks have settings accessible via the right sidebar:

- **Section Headers**: Edit eyebrow, title, description
- **Content Management**: Add/remove dynamic items (cards, rows, features)
- **Colors**: Extensive color pickers for all elements
- **Toggles**: Show/hide specific elements
- **Media**: Upload logos, icons, images via WordPress media library

## Custom Post Type

**Post Type**: `comparison`
**Slug**: `compare`
**URL Structure**: `yoursite.com/compare/post-slug`
**Supports**: Title, Editor, Thumbnail, Revisions
**Editor**: Gutenberg only

## Font Integration

The plugin automatically loads 'Instrument Serif' from Google Fonts for all comparison pages. This can be customized in the main plugin file.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- All blocks use server-side rendering for optimal performance
- CSS is minified and optimized
- No jQuery dependencies
- Modern React hooks for efficient re-renders
- Lazy loading for images (recommended via WordPress settings)

## Security

- All user inputs sanitized with WordPress functions
- XSS protection via `esc_html()`, `esc_attr()`, `wp_kses_post()`
- ABSPATH checks on all PHP files
- Nonce verification for admin actions

## Styling Consistency

For information about maintaining consistent styling across all blocks when used together on the same page, see [DEVELOPER.md](DEVELOPER.md).

## Troubleshooting

### Blocks Not Showing
1. Ensure plugin is activated
2. Run `npm run build` to compile blocks
3. Clear browser cache
4. Check PHP error logs

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Styles Not Loading
1. Check that `style.css` exists in block build folder
2. Clear WordPress cache
3. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+F5)

### Function Redeclaration Errors
- Ensure using latest version with closure functions in `render.php`
- Check for duplicate block registrations

## Contributing

For development guidelines and styling consistency, see [DEVELOPER.md](DEVELOPER.md).

## Version History

### v1.0.0 (Current)
- Initial release
- 9 fully functional blocks
- Complete customization options
- Responsive design
- Color customization
- PHP 8+ compatibility

## Support

For issues or feature requests, please contact the Taskip development team.

## License

Proprietary - Taskip CRM © 2025

## Credits

- **Developer**: Taskip Development Team
- **Framework**: WordPress, React, @wordpress/scripts
- **Font**: Instrument Serif by Google Fonts
- **Icons**: Custom SVG icons

---

**Built with ❤️ for Taskip**
