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
                <?php post_type_archive_title(); ?>
            </h1>
            <?php
            $archive_description = get_the_archive_description();
            if ($archive_description) :
                ?>
                <div class="tascom-archive-description">
                    <?php echo wp_kses_post(wpautop($archive_description)); ?>
                </div>
                <?php
            endif;
            ?>
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

                            <div class="tascom-comparison-meta">
                                <span class="tascom-comparison-date">
                                    <?php
                                    printf(
                                        esc_html__('%s', 'taskip-comparison'),
                                        '<time datetime="' . esc_attr(get_the_date('c')) . '">' . esc_html(get_the_date()) . '</time>'
                                    );
                                    ?>
                                </span>
                            </div>

                            <?php if (has_excerpt()) : ?>
                                <div class="tascom-comparison-excerpt">
                                    <?php the_excerpt(); ?>
                                </div>
                            <?php endif; ?>

                            <div class="tascom-comparison-link">
                                <a href="<?php the_permalink(); ?>" class="tascom-read-more">
                                    <?php esc_html_e('Read More', 'taskip-comparison'); ?>
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
