<?php
/**
 * Migration Support Block Render Template
 *
 * @package Tascom
 * @var array $attributes Block attributes
 * @var string $content Block content
 * @var WP_Block $block Block instance
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Extract attributes with defaults
$eyebrow_text = $attributes['eyebrowText'] ?? 'Migration Support';
$eyebrow_color = $attributes['eyebrowColor'] ?? '#ffffff';
$eyebrow_bg_color = $attributes['eyebrowBgColor'] ?? 'rgba(255, 255, 255, 0.1)';
$title = $attributes['title'] ?? 'Seamless Transition';
$description = $attributes['description'] ?? 'Our dedicated team ensures a smooth migration with minimal disruption to your operations.';
$features = $attributes['features'] ?? [];
$button_text = $attributes['buttonText'] ?? 'Request Migration Support';
$button_url = $attributes['buttonUrl'] ?? '#';
$testimonials = $attributes['testimonials'] ?? [];

// Color attributes
$section_bg_color = $attributes['sectionBgColor'] ?? '#0a0a0a';
$title_color = $attributes['titleColor'] ?? '#ffffff';
$text_color = $attributes['textColor'] ?? '#9ca3af';
$feature_text_color = $attributes['featureTextColor'] ?? '#d1d5db';
$feature_check_bg_color = $attributes['featureCheckBgColor'] ?? '#10b981';
$testimonial_bg_color = $attributes['testimonialBgColor'] ?? 'rgba(255, 255, 255, 0.05)';
$testimonial_border_color = $attributes['testimonialBorderColor'] ?? 'rgba(255, 255, 255, 0.1)';
$testimonial_text_color = $attributes['testimonialTextColor'] ?? '#d1d5db';
$button_bg_color = $attributes['buttonBgColor'] ?? '#10b981';
$button_text_color = $attributes['buttonTextColor'] ?? '#ffffff';

// Responsive padding
$padding_top_desktop = $attributes['paddingTopDesktop'] ?? 80;
$padding_bottom_desktop = $attributes['paddingBottomDesktop'] ?? 80;
$padding_top_tablet = $attributes['paddingTopTablet'] ?? 60;
$padding_bottom_tablet = $attributes['paddingBottomTablet'] ?? 60;
$padding_top_mobile = $attributes['paddingTopMobile'] ?? 40;
$padding_bottom_mobile = $attributes['paddingBottomMobile'] ?? 40;

// Generate unique ID for this block instance
$block_id = 'tasp-comp-migration-' . uniqid();

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'tasp-comp-migration',
    'id' => $block_id
]);
?>

<style>
    /* Desktop */
    #<?php echo $block_id; ?> {
        padding-top: <?php echo $padding_top_desktop; ?>px;
        padding-bottom: <?php echo $padding_bottom_desktop; ?>px;
        background-color: <?php echo esc_attr($section_bg_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-migration__eyebrow {
        color: <?php echo esc_attr($eyebrow_color); ?>;
        background-color: <?php echo esc_attr($eyebrow_bg_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-migration__title {
        color: <?php echo esc_attr($title_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-migration__description {
        color: <?php echo esc_attr($text_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-migration__features li {
        color: <?php echo esc_attr($feature_text_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-migration__check {
        background-color: <?php echo esc_attr($feature_check_bg_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-migration__testimonial {
        background-color: <?php echo esc_attr($testimonial_bg_color); ?>;
        border-color: <?php echo esc_attr($testimonial_border_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-migration__testimonial blockquote {
        color: <?php echo esc_attr($testimonial_text_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-migration__testimonial-meta span:first-child {
        color: <?php echo esc_attr($title_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-migration__testimonial-meta span:last-child {
        color: <?php echo esc_attr($text_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-migration__button {
        background-color: <?php echo esc_attr($button_bg_color); ?>;
        color: <?php echo esc_attr($button_text_color); ?>;
    }

    /* Tablet */
    @media (max-width: 1024px) {
        #<?php echo $block_id; ?> {
            padding-top: <?php echo $padding_top_tablet; ?>px;
            padding-bottom: <?php echo $padding_bottom_tablet; ?>px;
        }
    }

    /* Mobile */
    @media (max-width: 767px) {
        #<?php echo $block_id; ?> {
            padding-top: <?php echo $padding_top_mobile; ?>px;
            padding-bottom: <?php echo $padding_bottom_mobile; ?>px;
        }
    }
</style>

<section <?php echo $wrapper_attributes; ?>>
    <div class="taskip-container-1408">
        <div class="tasp-comp-migration__grid">
            <div class="tasp-comp-migration__content">
                <p class="tasp-comp-migration__eyebrow"><?php echo esc_html($eyebrow_text); ?></p>
                <h2 class="tasp-comp-migration__title"><?php echo esc_html($title); ?></h2>
                <p class="tasp-comp-migration__description"><?php echo esc_html($description); ?></p>

                <?php if (!empty($features)) : ?>
                    <ul class="tasp-comp-migration__features">
                        <?php foreach ($features as $feature) : ?>
                            <li>
                                <span class="tasp-comp-migration__check">✓</span>
                                <?php echo esc_html($feature); ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>

                <a href="<?php echo esc_url($button_url); ?>" class="tasp-comp-migration__button">
                    <?php echo esc_html($button_text); ?>
                </a>
            </div>

            <div class="tasp-comp-migration__testimonials">
                <?php foreach ($testimonials as $testimonial) : ?>
                    <?php
                    $quote = $testimonial['quote'] ?? '';
                    $author_name = $testimonial['authorName'] ?? '';
                    $author_role = $testimonial['authorRole'] ?? '';
                    $author_initials = $testimonial['authorInitials'] ?? 'AN';
                    ?>
                    <div class="tasp-comp-migration__testimonial">
                        <blockquote>"<?php echo esc_html($quote); ?>"</blockquote>
                        <div class="tasp-comp-migration__testimonial-footer">
                            <div class="tasp-comp-migration__avatar">
                                <?php echo esc_html($author_initials); ?>
                            </div>
                            <div class="tasp-comp-migration__testimonial-meta">
                                <span><?php echo esc_html($author_name); ?></span>
                                <span><?php echo esc_html($author_role); ?></span>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>
