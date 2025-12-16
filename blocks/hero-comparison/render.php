<?php
/**
 * Hero Comparison Block Render Template
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
$badge_text = $attributes['badgeText'] ?? 'Honest Comparison';
$title = $attributes['title'] ?? 'Taskip vs SuiteDash:';
$title_highlight = $attributes['titleHighlight'] ?? 'Which One is Right';
$title_end = $attributes['titleEnd'] ?? 'for Your Agency?';
$subtitle = $attributes['subtitle'] ?? 'An honest, feature-by-feature comparison to help you choose the perfect client management platform. No hype—just facts.';
$primary_btn_text = $attributes['primaryButtonText'] ?? 'Start Free Trial';
$primary_btn_url = $attributes['primaryButtonUrl'] ?? '#';
$secondary_btn_text = $attributes['secondaryButtonText'] ?? 'Book a Demo';
$secondary_btn_url = $attributes['secondaryButtonUrl'] ?? '#';
$hero_image_url = $attributes['heroImageUrl'] ?? '';
$hero_image_alt = $attributes['heroImageAlt'] ?? '';
$full_width = $attributes['fullWidth'] ?? false;

// Color attributes
$badge_text_color = $attributes['badgeTextColor'] ?? '#0066FF';
$badge_bg_color = $attributes['badgeBgColor'] ?? 'rgba(0, 102, 255, 0.1)';
$title_color = $attributes['titleColor'] ?? '#1a1a1a';
$title_highlight_color = $attributes['titleHighlightColor'] ?? '#0066FF';
$subtitle_color = $attributes['subtitleColor'] ?? '#6b7280';
$primary_btn_bg = $attributes['primaryButtonBgColor'] ?? '#0066FF';
$primary_btn_text_color = $attributes['primaryButtonTextColor'] ?? '#ffffff';
$secondary_btn_bg = $attributes['secondaryButtonBgColor'] ?? '#ffffff';
$secondary_btn_text_color = $attributes['secondaryButtonTextColor'] ?? '#1a1a1a';
$secondary_btn_border = $attributes['secondaryButtonBorderColor'] ?? '#6b7280';

// Responsive spacing attributes
$padding_top_desktop = $attributes['paddingTopDesktop'] ?? 60;
$padding_bottom_desktop = $attributes['paddingBottomDesktop'] ?? 60;
$padding_top_tablet = $attributes['paddingTopTablet'] ?? 40;
$padding_bottom_tablet = $attributes['paddingBottomTablet'] ?? 40;
$padding_top_mobile = $attributes['paddingTopMobile'] ?? 30;
$padding_bottom_mobile = $attributes['paddingBottomMobile'] ?? 30;

// Generate unique ID for this block instance
$block_id = 'tasp-comp-hero-' . uniqid();

// Build class names
$hero_classes = 'tasp-comp-hero';
if ($full_width) {
    $hero_classes .= ' tasp-comp-hero--full-width';
}

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => $hero_classes,
    'id' => $block_id
]);
?>

<style>
    /* Desktop */
    #<?php echo $block_id; ?> {
        padding-top: <?php echo $padding_top_desktop; ?>px;
        padding-bottom: <?php echo $padding_bottom_desktop; ?>px;
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
        <div class="tasp-comp-hero__grid">
            <div class="tasp-comp-hero__content">
                <div class="tasp-comp-hero__badge" style="background-color: <?php echo esc_attr($badge_bg_color); ?>; color: <?php echo esc_attr($badge_text_color); ?>;">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <?php echo esc_html($badge_text); ?>
                </div>

                <h1 class="tasp-comp-hero__title" style="color: <?php echo esc_attr($title_color); ?>;">
                    <?php echo esc_html($title); ?><br>
                    <em style="color: <?php echo esc_attr($title_highlight_color); ?>;"><?php echo esc_html($title_highlight); ?></em>
                    <?php echo esc_html($title_end); ?>
                </h1>

                <p class="tasp-comp-hero__subtitle" style="color: <?php echo esc_attr($subtitle_color); ?>;"><?php echo esc_html($subtitle); ?></p>

                <div class="tasp-comp-hero__cta-group">
                    <a href="<?php echo esc_url($primary_btn_url); ?>"
                       class="tasp-comp-btn tasp-comp-btn--primary tasp-comp-btn--large"
                       style="background-color: <?php echo esc_attr($primary_btn_bg); ?>; color: <?php echo esc_attr($primary_btn_text_color); ?>;">
                        <?php echo esc_html($primary_btn_text); ?>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </a>
                    <a href="<?php echo esc_url($secondary_btn_url); ?>"
                       class="tasp-comp-btn tasp-comp-btn--secondary tasp-comp-btn--large"
                       style="background-color: <?php echo esc_attr($secondary_btn_bg); ?>; color: <?php echo esc_attr($secondary_btn_text_color); ?>; border-color: <?php echo esc_attr($secondary_btn_border); ?>;">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <?php echo esc_html($secondary_btn_text); ?>
                    </a>
                </div>
            </div>

            <div class="tasp-comp-hero__visual">
                <?php if (!empty($hero_image_url)) : ?>
                    <div class="tasp-comp-hero__image">
                        <img src="<?php echo esc_url($hero_image_url); ?>" alt="<?php echo esc_attr($hero_image_alt); ?>">
                    </div>
                <?php else : ?>
                    <div class="tasp-comp-hero__placeholder">
                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                            <rect width="200" height="200" rx="8" fill="#e5e7eb"/>
                            <path d="M70 90L100 120L130 90" stroke="#9ca3af" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="100" cy="100" r="40" stroke="#9ca3af" stroke-width="4"/>
                        </svg>
                        <p style="margin-top: 10px; color: #6b7280; font-size: 14px;">
                            <?php esc_html_e('Upload an image', 'taskip-comparison'); ?>
                        </p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>
