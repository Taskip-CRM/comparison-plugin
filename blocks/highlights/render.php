<?php
/**
 * Key Differences Block Render Template
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
$section_label = $attributes['sectionLabel'] ?? '🎯 Key Differences';
$section_title = $attributes['sectionTitle'] ?? 'Features that matter most';
$section_title_emphasis = $attributes['sectionTitleEmphasis'] ?? 'matter most';
$section_description = $attributes['sectionDescription'] ?? 'A deep dive into the capabilities that separate Taskip from SuiteDash';
$cards = $attributes['cards'] ?? [];

// Color attributes
$title_color = $attributes['titleColor'] ?? '#1e293b';
$badge_gradient_start = $attributes['badgeGradientStart'] ?? '#10b981';
$badge_gradient_end = $attributes['badgeGradientEnd'] ?? '#059669';
$badge_text_color = $attributes['badgeTextColor'] ?? '#ffffff';
$winner_bg_color = $attributes['winnerBgColor'] ?? '#eff6ff';
$winner_border_color = $attributes['winnerBorderColor'] ?? '#3b82f6';
$winner_text_color = $attributes['winnerTextColor'] ?? '#3b82f6';
$loser_bg_color = $attributes['loserBgColor'] ?? '#f8fafc';
$loser_text_color = $attributes['loserTextColor'] ?? '#94a3b8';

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'tasp-comp-section tasp-comp-section-gradient'
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="taskip-container-1408">
        <div class="tasp-comp-section-header">
            <div class="tasp-comp-section-label"><?php echo esc_html($section_label); ?></div>
            <h2 class="tasp-comp-section-title">
                <?php
                $title_parts = explode($section_title_emphasis, $section_title);
                echo esc_html($title_parts[0]);
                ?>
                <span
                    class="tasp-comp-gradient"
                    style="color: <?php echo esc_attr($title_color); ?>;"
                >
                    <?php echo esc_html($section_title_emphasis); ?>
                </span>
            </h2>
            <div class="tasp-comp-section-desc"><?php echo wp_kses_post($section_description); ?></div>
        </div>

        <div class="tasp-comp-highlights-grid">
            <?php foreach ($cards as $card) : ?>
                <?php
                $show_badge = $card['showBadge'] ?? true;
                $badge = $card['badge'] ?? '✓ Taskip Wins';
                $icon_type = $card['iconType'] ?? 'emoji';
                $icon = $card['icon'] ?? '🎯';
                $icon_color = $card['iconColor'] ?? 'blue';
                $icon_image_url = $card['iconImageUrl'] ?? '';
                $title = $card['title'] ?? 'Feature Title';
                $description = $card['description'] ?? '';
                $winner_title = $card['winnerTitle'] ?? 'Taskip';
                $winner_features = $card['winnerFeatures'] ?? [];
                $loser_title = $card['loserTitle'] ?? 'SuiteDash';
                $loser_features = $card['loserFeatures'] ?? [];
                $image_url = $card['imageUrl'] ?? '';
                $full_width = $card['fullWidth'] ?? false;
                ?>
                <div class="tasp-comp-highlight-card <?php echo $full_width ? 'full' : ''; ?>">
                    <?php if ($show_badge) : ?>
                        <span
                            class="tasp-comp-highlight-badge"
                            style="background: linear-gradient(135deg, <?php echo esc_attr($badge_gradient_start); ?>, <?php echo esc_attr($badge_gradient_end); ?>); color: <?php echo esc_attr($badge_text_color); ?>;"
                        >
                            <?php echo esc_html($badge); ?>
                        </span>
                    <?php endif; ?>

                    <?php if ($icon_type !== 'hide') : ?>
                        <?php if ($icon_type === 'image' && !empty($icon_image_url)) : ?>
                            <div class="tasp-comp-highlight-icon" style="background: transparent; padding: 0;">
                                <img src="<?php echo esc_url($icon_image_url); ?>" alt="Icon" style="width: 60px; height: 60px; object-fit: contain;" />
                            </div>
                        <?php else : ?>
                            <div class="tasp-comp-highlight-icon <?php echo esc_attr($icon_color); ?>">
                                <?php echo esc_html($icon); ?>
                            </div>
                        <?php endif; ?>
                    <?php endif; ?>
                    <h3><?php echo esc_html($title); ?></h3>
                    <div><?php echo wp_kses_post($description); ?></div>

                    <div class="tasp-comp-highlight-compare">
                        <div
                            class="tasp-comp-compare-col winner"
                            style="background: <?php echo esc_attr($winner_bg_color); ?>; border-color: <?php echo esc_attr($winner_border_color); ?>; color: <?php echo esc_attr($winner_text_color); ?>;"
                        >
                            <h5 style="color: <?php echo esc_attr($winner_text_color); ?>;">✓ <?php echo esc_html($winner_title); ?></h5>
                            <ul>
                                <?php foreach ($winner_features as $feature) : ?>
                                    <li><?php echo esc_html($feature); ?></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                        <div
                            class="tasp-comp-compare-col loser"
                            style="background: <?php echo esc_attr($loser_bg_color); ?>; color: <?php echo esc_attr($loser_text_color); ?>;"
                        >
                            <h5 style="color: <?php echo esc_attr($loser_text_color); ?>;">✗ <?php echo esc_html($loser_title); ?></h5>
                            <ul>
                                <?php foreach ($loser_features as $feature) : ?>
                                    <li><?php echo esc_html($feature); ?></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    </div>

                    <?php if (!empty($image_url)) : ?>
                        <div class="tasp-comp-highlight-img">
                            <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>" />
                        </div>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
