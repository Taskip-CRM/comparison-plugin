<?php
/**
 * Verdict Block Render Template
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
$label_text = $attributes['labelText'] ?? 'TL;DR — Quick Verdict';
$title = $attributes['title'] ?? '';
$points = $attributes['points'] ?? [];

// Color attributes
$section_bg_color = $attributes['sectionBgColor'] ?? '#0a0a0a';
$section_text_color = $attributes['sectionTextColor'] ?? '#ffffff';
$title_color = $attributes['titleColor'] ?? '#ffffff';
$title_emphasis_color = $attributes['titleEmphasisColor'] ?? '#00c896';
$icon_bg_color = $attributes['iconBgColor'] ?? '#0066FF';
$icon_color = $attributes['iconColor'] ?? '#ffffff';
$box_bg_color = $attributes['boxBgColor'] ?? 'rgba(255, 255, 255, 0.05)';
$box_border_color = $attributes['boxBorderColor'] ?? 'rgba(255, 255, 255, 0.08)';
$heading_color = $attributes['headingColor'] ?? '#ffffff';
$description_color = $attributes['descriptionColor'] ?? '#9ca3af';

// Responsive padding
$padding_top_desktop = $attributes['paddingTopDesktop'] ?? 80;
$padding_bottom_desktop = $attributes['paddingBottomDesktop'] ?? 80;
$padding_top_tablet = $attributes['paddingTopTablet'] ?? 60;
$padding_bottom_tablet = $attributes['paddingBottomTablet'] ?? 60;
$padding_top_mobile = $attributes['paddingTopMobile'] ?? 40;
$padding_bottom_mobile = $attributes['paddingBottomMobile'] ?? 40;

// Generate unique ID for this block instance
$block_id = 'tasp-comp-verdict-' . uniqid();

// Icon SVGs
$icons = [
    'lightbulb' => '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
    'briefcase' => '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',
    'currency' => '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    'refresh' => '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>',
    'bolt' => '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/></svg>'
];

// Process title to convert *text* or *text|#color* to <em>text</em>
$processed_title = preg_replace_callback('/\*([^*]+)\*/', function($matches) use ($title_emphasis_color) {
    $content = $matches[1];
    // Check if content has custom color: text|#color
    if (preg_match('/^(.+?)\|(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3})$/', $content, $color_match)) {
        $text = $color_match[1];
        $color = $color_match[2];
        return '<em style="color: ' . esc_attr($color) . ';">' . esc_html($text) . '</em>';
    }
    // Use default emphasis color
    return '<em>' . esc_html($content) . '</em>';
}, $title);

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'tasp-comp-verdict',
    'id' => $block_id
]);
?>

<style>
    /* Desktop */
    #<?php echo $block_id; ?> {
        padding-top: <?php echo $padding_top_desktop; ?>px;
        padding-bottom: <?php echo $padding_bottom_desktop; ?>px;
        background-color: <?php echo esc_attr($section_bg_color); ?>;
        color: <?php echo esc_attr($section_text_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-verdict__title {
        color: <?php echo esc_attr($title_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-verdict__title em {
        color: <?php echo esc_attr($title_emphasis_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-verdict__point {
        background-color: <?php echo esc_attr($box_bg_color); ?>;
        border-color: <?php echo esc_attr($box_border_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-verdict__point-icon {
        background-color: <?php echo esc_attr($icon_bg_color); ?>;
        color: <?php echo esc_attr($icon_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-verdict__point-text h4 {
        color: <?php echo esc_attr($heading_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-verdict__point-text p {
        color: <?php echo esc_attr($description_color); ?>;
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
        <div class="tasp-comp-verdict__content">
            <div class="tasp-comp-verdict__label">
                <?php echo $icons['bolt']; ?>
                <?php echo esc_html($label_text); ?>
            </div>
            <h2 class="tasp-comp-verdict__title"><?php echo wp_kses_post($processed_title); ?></h2>
            <div class="tasp-comp-verdict__points">
                <?php foreach ($points as $point) : ?>
                    <?php
                    $show_icon = $point['showIcon'] ?? true;
                    $use_custom_image = $point['useCustomImage'] ?? false;
                    $custom_image_url = $point['customImageUrl'] ?? '';
                    $point_icon = $point['icon'] ?? 'lightbulb';
                    $point_heading = $point['heading'] ?? '';
                    $point_description = $point['description'] ?? '';
                    $icon_svg = $icons[$point_icon] ?? $icons['lightbulb'];
                    ?>
                    <div class="tasp-comp-verdict__point">
                        <?php if ($show_icon) : ?>
                            <div class="tasp-comp-verdict__point-icon" <?php if ($use_custom_image && !empty($custom_image_url)) : ?>style="background-color: transparent; padding: 0; width: auto; height: auto;"<?php endif; ?>>
                                <?php if ($use_custom_image && !empty($custom_image_url)) : ?>
                                    <img
                                        src="<?php echo esc_url($custom_image_url); ?>"
                                        alt="<?php echo esc_attr($point_heading); ?>"
                                        style="width: 40px; height: 40px; object-fit: contain; display: block;"
                                    />
                                <?php else : ?>
                                    <?php echo $icon_svg; ?>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>
                        <div class="tasp-comp-verdict__point-text">
                            <h4><?php echo esc_html($point_heading); ?></h4>
                            <p><?php echo esc_html($point_description); ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>
