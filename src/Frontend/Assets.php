<?php
/**
 * Assets Handler
 *
 * @package Tascom
 */

namespace Tascom\Frontend;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Assets Class
 */
class Assets {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
    }

    /**
     * Enqueue frontend assets
     */
    public function enqueue_frontend_assets() {
        // Enqueue Google Fonts - Instrument Serif
        wp_enqueue_style(
            'tascom-google-fonts',
            'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap',
            [],
            null,
            'all'
        );

        // Only enqueue on comparison post type pages
        if (is_singular('comparison') || is_post_type_archive('comparison')) {
            wp_enqueue_style(
                'tascom-frontend',
                TASCOM_PLUGIN_URL . 'assets/css/frontend.css',
                [],
                TASCOM_VERSION,
                'all'
            );
        }
    }
}
