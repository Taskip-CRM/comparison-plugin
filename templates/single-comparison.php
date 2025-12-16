<?php
/**
 * Single Comparison Template
 *
 * @package Tascom
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="tascom-single-comparison-wrapper">
    <div class="tascom___container">
        <?php
        while (have_posts()) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('tascom-single-comparison'); ?>>

                <div class="tascom-entry-content">
                    <?php
                    the_content();

                    wp_link_pages([
                        'before' => '<div class="tascom-page-links">' . esc_html__('Pages:', 'taskip-comparison'),
                        'after'  => '</div>',
                    ]);
                    ?>
                </div>

            </article>

            <?php
        endwhile;
        ?>
    </div>
</div>

<?php
get_footer();
