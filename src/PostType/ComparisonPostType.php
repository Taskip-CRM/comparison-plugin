<?php
/**
 * Comparison Custom Post Type
 *
 * @package Tascom
 */

namespace Tascom\PostType;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Comparison Post Type Class
 */
class ComparisonPostType {

    /**
     * Post type slug
     *
     * @var string
     */
    const POST_TYPE = 'comparison';

    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', [$this, 'register']);
    }

    /**
     * Register custom post type
     */
    public function register() {
        $labels = [
            'name'                  => _x('Comparisons', 'Post type general name', 'taskip-comparison'),
            'singular_name'         => _x('Comparison', 'Post type singular name', 'taskip-comparison'),
            'menu_name'             => _x('Comparisons', 'Admin Menu text', 'taskip-comparison'),
            'name_admin_bar'        => _x('Comparison', 'Add New on Toolbar', 'taskip-comparison'),
            'add_new'               => __('Add New', 'taskip-comparison'),
            'add_new_item'          => __('Add New Comparison', 'taskip-comparison'),
            'new_item'              => __('New Comparison', 'taskip-comparison'),
            'edit_item'             => __('Edit Comparison', 'taskip-comparison'),
            'view_item'             => __('View Comparison', 'taskip-comparison'),
            'all_items'             => __('All Comparisons', 'taskip-comparison'),
            'search_items'          => __('Search Comparisons', 'taskip-comparison'),
            'parent_item_colon'     => __('Parent Comparisons:', 'taskip-comparison'),
            'not_found'             => __('No comparisons found.', 'taskip-comparison'),
            'not_found_in_trash'    => __('No comparisons found in Trash.', 'taskip-comparison'),
            'featured_image'        => _x('Comparison Featured Image', 'Overrides the "Featured Image" phrase', 'taskip-comparison'),
            'set_featured_image'    => _x('Set featured image', 'Overrides the "Set featured image" phrase', 'taskip-comparison'),
            'remove_featured_image' => _x('Remove featured image', 'Overrides the "Remove featured image" phrase', 'taskip-comparison'),
            'use_featured_image'    => _x('Use as featured image', 'Overrides the "Use as featured image" phrase', 'taskip-comparison'),
            'archives'              => _x('Comparison archives', 'The post type archive label', 'taskip-comparison'),
            'insert_into_item'      => _x('Insert into comparison', 'Overrides the "Insert into post" phrase', 'taskip-comparison'),
            'uploaded_to_this_item' => _x('Uploaded to this comparison', 'Overrides the "Uploaded to this post" phrase', 'taskip-comparison'),
            'filter_items_list'     => _x('Filter comparisons list', 'Screen reader text', 'taskip-comparison'),
            'items_list_navigation' => _x('Comparisons list navigation', 'Screen reader text', 'taskip-comparison'),
            'items_list'            => _x('Comparisons list', 'Screen reader text', 'taskip-comparison'),
        ];

        $args = [
            'labels'             => $labels,
            'description'        => __('Comparison content type', 'taskip-comparison'),
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => [
                'slug'       => 'comparison',
                'with_front' => false,
                'feeds'      => true,
                'pages'      => true,
            ],
            'capability_type'    => 'post',
            'has_archive'        => 'comparison',
            'hierarchical'       => false,
            'menu_position'      => 20,
            'menu_icon'          => 'dashicons-comparison',
            'supports'           => [
                'title',
                'editor',
                'author',
                'thumbnail',
                'excerpt',
                'comments',
                'revisions',
                'custom-fields',
            ],
            'show_in_rest'       => true, // Enable Gutenberg editor
            'rest_base'          => 'comparisons',
            'rest_controller_class' => 'WP_REST_Posts_Controller',
        ];

        register_post_type(self::POST_TYPE, $args);
    }
}
