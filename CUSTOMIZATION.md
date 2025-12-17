# Customization Guide

## Archive Page Title & Meta Description

The Taskip Comparison plugin provides filters to customize the archive page title and meta description.

### Default Values

- **Archive Title:** "Comparisons"
- **Archive Meta Description:** "Browse all product comparisons to find the best solution for your needs."

---

## How to Customize

Add these code snippets to your theme's `functions.php` file or a custom plugin.

### 1. Change Archive Page Title

```php
/**
 * Customize comparison archive page title
 */
add_filter('tascom_archive_title', function($title) {
    return 'Taskip vs Competitors - Find Your Perfect Solution';
});
```

### 2. Change Archive Meta Description

```php
/**
 * Customize comparison archive meta description
 */
add_filter('tascom_archive_meta_description', function($description) {
    return 'Comprehensive comparisons of Taskip vs top competitors. See features, pricing, and real user reviews to make the best choice for your business.';
});
```

### 3. Customize Single Post Meta Description

```php
/**
 * Customize single comparison meta description
 */
add_filter('tascom_single_meta_description', function($description, $post) {
    // Use custom field, or customize based on post data
    $custom_desc = get_post_meta($post->ID, 'custom_meta_description', true);

    return !empty($custom_desc) ? $custom_desc : $description;
}, 10, 2);
```

### 4. Complete Example (All-in-One)

```php
/**
 * Taskip Comparison - SEO Customization
 */

// Archive Page Title
add_filter('tascom_archive_title', function($title) {
    return 'Taskip Product Comparisons';
});

// Archive Meta Description
add_filter('tascom_archive_meta_description', function($description) {
    return 'Explore detailed comparisons of Taskip vs leading competitors. Compare features, pricing, and capabilities to find the perfect project management solution.';
});

// Single Post Meta Description
add_filter('tascom_single_meta_description', function($description, $post) {
    // Priority: Custom field > Excerpt > Auto-generated
    $custom_desc = get_post_meta($post->ID, 'seo_meta_description', true);

    if (!empty($custom_desc)) {
        return $custom_desc;
    }

    return $description; // Use default (excerpt or trimmed content)
}, 10, 2);
```

---

## Advanced: Dynamic Meta Description

Customize meta description based on comparison data:

```php
add_filter('tascom_single_meta_description', function($description, $post) {
    // Extract comparison subjects from title
    // Example title: "Taskip vs SuiteDash"
    $title = $post->post_title;

    if (strpos($title, ' vs ') !== false) {
        list($product1, $product2) = explode(' vs ', $title);

        return sprintf(
            'Compare %s and %s. See detailed feature comparison, pricing analysis, pros & cons to choose the best solution for your needs.',
            trim($product1),
            trim($product2)
        );
    }

    return $description;
}, 10, 2);
```

---

## SEO Plugin Integration

**Note:** If you're using an SEO plugin (Yoast SEO, Rank Math, All in One SEO), it will override these meta descriptions. Configure SEO settings directly in those plugins instead.

To disable our meta descriptions when using an SEO plugin:

```php
// Disable built-in meta descriptions
add_filter('tascom_archive_meta_description', '__return_false');
add_filter('tascom_single_meta_description', '__return_false');
```

---

## Archive Page Heading (H1)

To customize the H1 heading on the archive page, edit your theme template:

**In your theme's `archive-comparison.php` or via filter:**

```php
add_filter('get_the_archive_title', function($title) {
    if (is_post_type_archive('comparison')) {
        return 'Product Comparisons';
    }
    return $title;
});
```

---

## Questions?

For more customization options, check the [GitHub repository](https://github.com/Taskip-CRM/comparison-plugin) or contact support.
