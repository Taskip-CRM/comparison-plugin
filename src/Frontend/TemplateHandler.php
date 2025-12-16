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
}
