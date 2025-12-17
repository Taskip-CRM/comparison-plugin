<?php
/**
 * Archive Comparison Template
 *
 * @package Tascom
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="tascom-archive-comparison-wrapper">
    <div class="tascom-container">

        <header class="tascom-archive-header">
            <h1 class="tascom-archive-title">
                See How Taskip Compares
            </h1>
            <div class="tascom-archive-description">
                Feature-by-feature comparisons with other client portal and agency management tools. No fluff—just facts.
            </div>
        </header>

        <?php if (have_posts()) : ?>

            <div class="tascom-comparison-grid">

                <?php
                while (have_posts()) :
                    the_post();
                    ?>

                    <article id="post-<?php the_ID(); ?>" <?php post_class('tascom-comparison-item'); ?>>

                        <?php if (has_post_thumbnail()) : ?>
                            <div class="tascom-comparison-thumbnail">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('medium'); ?>
                                </a>
                            </div>
                        <?php endif; ?>

                        <div class="tascom-comparison-content">
                            <h2 class="tascom-comparison-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            <?php if (has_excerpt()) : ?>
                                <div class="tascom-comparison-excerpt">
                                    <?php the_excerpt(); ?>
                                </div>
                            <?php endif; ?>

                            <div class="tascom-comparison-link">
                                <a href="<?php the_permalink(); ?>" class="tascom-read-more">
                                    <?php esc_html_e('View Full Comparison', 'taskip-comparison'); ?>
                                    <span class="tascom-arrow">&rarr;</span>
                                </a>
                            </div>
                        </div>

                    </article>

                    <?php
                endwhile;
                ?>

            </div>

            <?php
            // Pagination
            the_posts_pagination([
                'mid_size'  => 2,
                'prev_text' => __('&laquo; Previous', 'taskip-comparison'),
                'next_text' => __('Next &raquo;', 'taskip-comparison'),
                'class'     => 'tascom-pagination',
            ]);
            ?>

        <?php else : ?>

            <div class="tascom-no-content">
                <h2><?php esc_html_e('No comparisons found', 'taskip-comparison'); ?></h2>
                <p><?php esc_html_e('It seems we can\'t find what you\'re looking for.', 'taskip-comparison'); ?></p>
            </div>

        <?php endif; ?>

    </div>
</div>

<?php
get_footer();
