<?php
/**
 * Block Manager
 *
 * @package Tascom
 */

namespace Tascom\Blocks;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Block Manager Class
 */
class BlockManager {

    /**
     * Blocks directory
     *
     * @var string
     */
    private $blocks_dir;

    /**
     * Constructor
     */
    public function __construct() {
        $this->blocks_dir = TASCOM_PLUGIN_DIR . 'blocks/';

        add_action('init', [$this, 'register_blocks']);
        add_filter('block_categories_all', [$this, 'register_block_category'], 10, 2);
    }

    /**
     * Register all blocks
     */
    public function register_blocks() {
        // Register hero comparison block
        register_block_type(
            $this->blocks_dir . 'hero-comparison',
            [
                'render_callback' => [$this, 'render_hero_comparison_block']
            ]
        );

        // Register trust bar block
        register_block_type(
            $this->blocks_dir . 'trust-bar',
            [
                'render_callback' => [$this, 'render_trust_bar_block']
            ]
        );

        // Register verdict block
        register_block_type(
            $this->blocks_dir . 'verdict',
            [
                'render_callback' => [$this, 'render_verdict_block']
            ]
        );

        // Register migration block
        register_block_type(
            $this->blocks_dir . 'migration',
            [
                'render_callback' => [$this, 'render_migration_block']
            ]
        );

        // Register AI comparison block
        register_block_type(
            $this->blocks_dir . 'ai-comparison',
            [
                'render_callback' => [$this, 'render_ai_comparison_block']
            ]
        );

        // Register highlights block
        register_block_type(
            $this->blocks_dir . 'highlights',
            [
                'render_callback' => [$this, 'render_highlights_block']
            ]
        );

        // Register pricing comparison block
        register_block_type(
            $this->blocks_dir . 'pricing-comparison',
            [
                'render_callback' => [$this, 'render_pricing_comparison_block']
            ]
        );

        // Register feature comparison block
        register_block_type(
            $this->blocks_dir . 'feature-comparison',
            [
                'render_callback' => [$this, 'render_feature_comparison_block']
            ]
        );

        // Register pricing scale block
        register_block_type(
            $this->blocks_dir . 'pricing-scale',
            [
                'render_callback' => [$this, 'render_pricing_scale_block']
            ]
        );
    }

    /**
     * Render hero comparison block
     *
     * @param array $attributes Block attributes.
     * @param string $content Block content.
     * @param object $block Block object.
     * @return string Rendered block HTML.
     */
    public function render_hero_comparison_block($attributes, $content, $block) {
        ob_start();
        include $this->blocks_dir . 'hero-comparison/render.php';
        return ob_get_clean();
    }

    /**
     * Render trust bar block
     *
     * @param array $attributes Block attributes.
     * @param string $content Block content.
     * @param object $block Block object.
     * @return string Rendered block HTML.
     */
    public function render_trust_bar_block($attributes, $content, $block) {
        ob_start();
        include $this->blocks_dir . 'trust-bar/render.php';
        return ob_get_clean();
    }

    /**
     * Render verdict block
     *
     * @param array $attributes Block attributes.
     * @param string $content Block content.
     * @param object $block Block object.
     * @return string Rendered block HTML.
     */
    public function render_verdict_block($attributes, $content, $block) {
        ob_start();
        include $this->blocks_dir . 'verdict/render.php';
        return ob_get_clean();
    }

    /**
     * Render migration block
     *
     * @param array $attributes Block attributes.
     * @param string $content Block content.
     * @param object $block Block object.
     * @return string Rendered block HTML.
     */
    public function render_migration_block($attributes, $content, $block) {
        ob_start();
        include $this->blocks_dir . 'migration/render.php';
        return ob_get_clean();
    }

    /**
     * Render AI comparison block
     *
     * @param array $attributes Block attributes.
     * @param string $content Block content.
     * @param object $block Block object.
     * @return string Rendered block HTML.
     */
    public function render_ai_comparison_block($attributes, $content, $block) {
        ob_start();
        include $this->blocks_dir . 'ai-comparison/render.php';
        return ob_get_clean();
    }

    /**
     * Render highlights block
     *
     * @param array $attributes Block attributes.
     * @param string $content Block content.
     * @param object $block Block object.
     * @return string Rendered block HTML.
     */
    public function render_highlights_block($attributes, $content, $block) {
        ob_start();
        include $this->blocks_dir . 'highlights/render.php';
        return ob_get_clean();
    }

    /**
     * Render pricing comparison block
     *
     * @param array $attributes Block attributes.
     * @param string $content Block content.
     * @param object $block Block object.
     * @return string Rendered block HTML.
     */
    public function render_pricing_comparison_block($attributes, $content, $block) {
        ob_start();
        include $this->blocks_dir . 'pricing-comparison/render.php';
        return ob_get_clean();
    }

    /**
     * Render feature comparison block
     *
     * @param array $attributes Block attributes.
     * @param string $content Block content.
     * @param object $block Block object.
     * @return string Rendered block HTML.
     */
    public function render_feature_comparison_block($attributes, $content, $block) {
        ob_start();
        include $this->blocks_dir . 'feature-comparison/render.php';
        return ob_get_clean();
    }

    /**
     * Render pricing scale block
     *
     * @param array $attributes Block attributes.
     * @param string $content Block content.
     * @param object $block Block object.
     * @return string Rendered block HTML.
     */
    public function render_pricing_scale_block($attributes, $content, $block) {
        ob_start();
        include $this->blocks_dir . 'pricing-scale/render.php';
        return ob_get_clean();
    }

    /**
     * Register custom block category
     *
     * @param array $categories Array of block categories.
     * @param object $editor_context Block editor context.
     * @return array Modified categories.
     */
    public function register_block_category($categories, $editor_context) {
        // Only add category in post editor context
        if (!empty($editor_context->post)) {
            array_unshift(
                $categories,
                [
                    'slug'  => 'tascom-blocks',
                    'title' => __('Taskip Comparison', 'taskip-comparison'),
                    'icon'  => 'megaphone',
                ]
            );
        }

        return $categories;
    }
}
