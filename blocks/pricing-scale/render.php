<?php
/**
 * Pricing at Scale Block Render Template
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
$section_title = $attributes['sectionTitle'] ?? 'Pricing at Scale';
$section_description = $attributes['sectionDescription'] ?? 'How costs compare as your team grows. Taskip offers flat per-workspace pricing.';
$taskip_label = $attributes['taskipLabel'] ?? 'Taskip';
$competitor_label = $attributes['competitorLabel'] ?? 'SuiteDash';
$featured_badge_text = $attributes['featuredBadgeText'] ?? 'RECOMMENDED';
$cards = $attributes['cards'] ?? [];

// Extract color attributes
$taskip_price_color = $attributes['taskipPriceColor'] ?? '#2563eb';
$competitor_price_color = $attributes['competitorPriceColor'] ?? '#9ca3af';
$savings_bg_color = $attributes['savingsBgColor'] ?? '#dcfce7';
$savings_text_color = $attributes['savingsTextColor'] ?? '#166534';
$featured_border_color = $attributes['featuredBorderColor'] ?? '#2563eb';
$featured_badge_bg_color = $attributes['featuredBadgeBgColor'] ?? '#2563eb';
$featured_badge_text_color = $attributes['featuredBadgeTextColor'] ?? '#ffffff';
$section_bg_color = $attributes['sectionBgColor'] ?? '#0a0a0a';

// Spacing attributes
$section_spacing = $attributes['sectionSpacing'] ?? 80;
$card_padding = $attributes['cardPadding'] ?? 28;
$grid_gap = $attributes['gridGap'] ?? 20;

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'section'
]);
?>

<section <?php echo $wrapper_attributes; ?> style="background-color: <?php echo esc_attr($section_bg_color); ?>; padding-top: <?php echo esc_attr($section_spacing); ?>px; padding-bottom: <?php echo esc_attr($section_spacing); ?>px;">
    <div class="container">
        <div class="section-header center tascom-feature-comparison-section-header">
            <h2 class="section-title"><?php echo esc_html($section_title); ?></h2>
            <p class="section-desc"><?php echo esc_html($section_description); ?></p>
        </div>
        <div class="pricing-grid" style="gap: <?php echo esc_attr($grid_gap); ?>px;">
            <?php foreach ($cards as $card) : ?>
                <?php
                $team_size = $card['teamSize'] ?? '';
                $taskip_price = $card['taskipPrice'] ?? '';
                $competitor_price = $card['competitorPrice'] ?? '';
                $savings = $card['savings'] ?? '';
                $featured = $card['featured'] ?? false;

                // Build card style
                $card_style = 'padding: ' . esc_attr($card_padding) . 'px;';
                if ($featured) {
                    $card_style .= ' border-color: ' . esc_attr($featured_border_color) . '; position: relative;';
                }
                ?>
                <div class="pricing-card <?php echo $featured ? 'featured' : ''; ?>" style="<?php echo $card_style; ?>">
                    <?php if ($featured) : ?>
                        <span class="featured-badge" style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: <?php echo esc_attr($featured_badge_bg_color); ?>; color: <?php echo esc_attr($featured_badge_text_color); ?>; padding: 4px 12px; border-radius: 4px; font-size: 10px; font-weight: 700;">
                            <?php echo esc_html($featured_badge_text); ?>
                        </span>
                    <?php endif; ?>
                    <h4>Team Size</h4>
                    <div class="team-size"><?php echo esc_html($team_size); ?></div>
                    <div class="pricing-row">
                        <span><?php echo esc_html($taskip_label); ?></span>
                        <span class="price-blue" style="color: <?php echo esc_attr($taskip_price_color); ?>;"><?php echo esc_html($taskip_price); ?></span>
                    </div>
                    <div class="pricing-row">
                        <span><?php echo esc_html($competitor_label); ?></span>
                        <span class="price-gray" style="color: <?php echo esc_attr($competitor_price_color); ?>;"><?php echo esc_html($competitor_price); ?></span>
                    </div>
                    <?php if (!empty($savings)) : ?>
                        <span class="savings" style="background: <?php echo esc_attr($savings_bg_color); ?>; color: <?php echo esc_attr($savings_text_color); ?>;"><?php echo esc_html($savings); ?></span>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
