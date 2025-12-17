<?php
/**
 * Plugin Name: Taskip Comparison
 * Plugin URI: https://taskip.net
 * Description: Custom post type for comparison content with Gutenberg support
 * Version: 1.2.0
 * Author: Taskip
 * Author URI: https://taskip.net
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: taskip-comparison
 * Domain Path: /languages
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

namespace Tascom;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('TASCOM_VERSION', '1.2.0');
define('TASCOM_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('TASCOM_PLUGIN_URL', plugin_dir_url(__FILE__));
define('TASCOM_PLUGIN_BASENAME', plugin_basename(__FILE__));

// Require Composer autoloader
if (file_exists(TASCOM_PLUGIN_DIR . 'vendor/autoload.php')) {
    require_once TASCOM_PLUGIN_DIR . 'vendor/autoload.php';
}

/**
 * Main Plugin Class
 */
class TaskipComparison {

    /**
     * Plugin instance
     *
     * @var TaskipComparison
     */
    private static $instance = null;

    /**
     * Get plugin instance
     *
     * @return TaskipComparison
     */
    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        $this->init_hooks();
    }

    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Initialize plugin components
        add_action('plugins_loaded', [$this, 'init_components']);

        // Activation hook
        register_activation_hook(__FILE__, [$this, 'activate']);

        // Deactivation hook
        register_deactivation_hook(__FILE__, [$this, 'deactivate']);
    }

    /**
     * Initialize plugin components
     */
    public function init_components() {
        // Initialize custom post type
        new PostType\ComparisonPostType();

        // Initialize frontend handler
        new Frontend\TemplateHandler();

        // Initialize assets
        new Frontend\Assets();

        // Initialize blocks
        new Blocks\BlockManager();
    }

    /**
     * Plugin activation
     */
    public function activate() {
        // Register post type
        $post_type = new PostType\ComparisonPostType();
        $post_type->register();

        // Flush rewrite rules
        flush_rewrite_rules();
    }

    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
    }
}

// Initialize plugin
TaskipComparison::instance();
