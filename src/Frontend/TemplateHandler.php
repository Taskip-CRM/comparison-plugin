<?php
/**
 * Template Handler
 *
 * @package Tascom
 */

namespace Tascom\Frontend;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Template Handler Class
 */
class TemplateHandler {

    /**
     * Template directory
     *
     * @var string
     */
    private $template_dir;

    /**
     * Constructor
     */
    public function __construct() {
        $this->template_dir = TASCOM_PLUGIN_DIR . 'templates/';

        add_filter('template_include', [$this, 'load_template'], 99);
        add_filter('single_template', [$this, 'load_single_template'], 99);
        add_filter('archive_template', [$this, 'load_archive_template'], 99);

        // SEO customization
        add_filter('document_title_parts', [$this, 'customize_archive_title'], 10);
        add_action('wp_head', [$this, 'add_meta_description'], 1);
    }

    /**
     * Load custom template
     *
     * @param string $template The path to the template file.
     * @return string Modified template path.
     */
    public function load_template($template) {
        global $post;

        if (is_singular('comparison')) {
            $custom_template = $this->locate_template('single-comparison.php');
            if ($custom_template) {
                return $custom_template;
            }
        }

        if (is_post_type_archive('comparison')) {
            $custom_template = $this->locate_template('archive-comparison.php');
            if ($custom_template) {
                return $custom_template;
            }
        }

        return $template;
    }

    /**
     * Load single template
     *
     * @param string $template The path to the template file.
     * @return string Modified template path.
     */
    public function load_single_template($template) {
        global $post;

        if ('comparison' === $post->post_type) {
            $custom_template = $this->locate_template('single-comparison.php');
            if ($custom_template) {
                return $custom_template;
            }
        }

        return $template;
    }

    /**
     * Load archive template
     *
     * @param string $template The path to the template file.
     * @return string Modified template path.
     */
    public function load_archive_template($template) {
        if (is_post_type_archive('comparison')) {
            $custom_template = $this->locate_template('archive-comparison.php');
            if ($custom_template) {
                return $custom_template;
            }
        }

        return $template;
    }

    /**
     * Locate template file
     *
     * Looks in theme first, then plugin templates directory
     *
     * @param string $template_name Template file name.
     * @return string|false Template path or false if not found.
     */
    private function locate_template($template_name) {
        // Check if template exists in theme
        $theme_template = locate_template([
            'taskip-comparison/' . $template_name,
            $template_name,
        ]);

        if ($theme_template) {
            return $theme_template;
        }

        // Check plugin templates directory
        $plugin_template = $this->template_dir . $template_name;
        if (file_exists($plugin_template)) {
            return $plugin_template;
        }

        return false;
    }

    /**
     * Get template part
     *
     * @param string $slug Template slug.
     * @param string $name Template name (optional).
     * @param array  $args Template arguments (optional).
     */
    public static function get_template_part($slug, $name = '', $args = []) {
        $template_name = $slug;
        if ($name) {
            $template_name .= '-' . $name;
        }
        $template_name .= '.php';

        // Check theme directory first
        $theme_template = locate_template([
            'taskip-comparison/' . $template_name,
            $template_name,
        ]);

        if ($theme_template) {
            load_template($theme_template, false, $args);
            return;
        }

        // Load from plugin templates
        $plugin_template = TASCOM_PLUGIN_DIR . 'templates/' . $template_name;
        if (file_exists($plugin_template)) {
            load_template($plugin_template, false, $args);
        }
    }

    /**
     * Customize archive page title
     *
     * @param array $title Title parts array.
     * @return array Modified title parts.
     */
    public function customize_archive_title($title) {
        if (is_post_type_archive('comparison')) {
            // Default archive title
            $archive_title = __('See How Taskip Compares', 'taskip-comparison');

            // Allow customization via filter
            $archive_title = apply_filters('tascom_archive_title', $archive_title);

            $title['title'] = $archive_title;
        }

        return $title;
    }

    /**
     * Add custom meta description for archive page
     */
    public function add_meta_description() {
        if (is_post_type_archive('comparison')) {
            // Default meta description
            $meta_description = __('Browse all product comparisons to find the best solution for your needs.', 'taskip-comparison');

            // Allow customization via filter
            $meta_description = apply_filters('tascom_archive_meta_description', $meta_description);

            if (!empty($meta_description)) {
                echo '<meta name="description" content="' . esc_attr($meta_description) . '">' . "\n";
            }
        }

        if (is_singular('comparison')) {
            global $post;

            // Use excerpt as meta description for single posts
            $meta_description = !empty($post->post_excerpt)
                ? $post->post_excerpt
                : wp_trim_words($post->post_content, 30, '...');

            // Allow customization via filter
            $meta_description = apply_filters('tascom_single_meta_description', $meta_description, $post);

            if (!empty($meta_description)) {
                echo '<meta name="description" content="' . esc_attr(strip_tags($meta_description)) . '">' . "\n";
            }
        }
    }
}
