<?php
/**
 * Pricing Comparison Block Render Template
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
$section_eyebrow = $attributes['sectionEyebrow'] ?? 'Pricing Comparison';
$section_title = $attributes['sectionTitle'] ?? 'See how costs compare as your team grows';
$text_alignment = $attributes['textAlignment'] ?? 'center';
$header_left = $attributes['headerLeft'] ?? 'Team Size';
$header_taskip = $attributes['headerTaskip'] ?? 'Taskip';
$header_competitor = $attributes['headerCompetitor'] ?? 'SuiteDash';
$note_text = $attributes['noteText'] ?? '💡 <strong>Pro tip:</strong> With Taskip, you pay the same price whether you have 3 or 30 team members.';
$show_note = $attributes['showNote'] ?? true;
$rows = $attributes['rows'] ?? [];

// Color attributes
$taskip_price_color = $attributes['taskipPriceColor'] ?? '#3b82f6';
$competitor_price_color = $attributes['competitorPriceColor'] ?? '#64748b';
$savings_bg_color = $attributes['savingsBgColor'] ?? '#10b98133';
$savings_text_color = $attributes['savingsTextColor'] ?? '#059669';
$header_bg_color = $attributes['headerBgColor'] ?? '#1f2937';
$header_text_color = $attributes['headerTextColor'] ?? '#ffffff';

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'tasp-comp-section tasp-comp-section--gray'
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="tasp-comp-container">
        <div class="tasp-comp-section__header" style="text-align: <?php echo esc_attr($text_alignment); ?>;">
            <span class="tasp-comp-section__eyebrow"><?php echo esc_html($section_eyebrow); ?></span>
            <h2 class="tasp-comp-section__title"><?php echo esc_html($section_title); ?></h2>
        </div>
        <div class="tasp-comp-pricing__visual">
            <div class="tasp-comp-pricing__chart">
                <div class="tasp-comp-pricing__chart-header" style="background: <?php echo esc_attr($header_bg_color); ?>; color: <?php echo esc_attr($header_text_color); ?>;">
                    <div class="tasp-comp-pricing__chart-header-cell"><?php echo esc_html($header_left); ?></div>
                    <div class="tasp-comp-pricing__chart-header-cell"><?php echo esc_html($header_taskip); ?></div>
                    <div class="tasp-comp-pricing__chart-header-cell"><?php echo esc_html($header_competitor); ?></div>
                </div>
                <?php foreach ($rows as $row) : ?>
                    <?php
                    $team_size = $row['teamSize'] ?? '';
                    $taskip_price = $row['taskipPrice'] ?? '';
                    $competitor_price = $row['competitorPrice'] ?? '';
                    $savings = $row['savings'] ?? '';
                    ?>
                    <div class="tasp-comp-pricing__chart-row">
                        <div class="tasp-comp-pricing__chart-cell"><?php echo esc_html($team_size); ?></div>
                        <div class="tasp-comp-pricing__chart-cell">
                            <span class="tasp-comp-pricing__price tasp-comp-pricing__price--taskip" style="color: <?php echo esc_attr($taskip_price_color); ?>;">
                                <?php echo esc_html($taskip_price); ?>
                            </span>
                            <?php if (!empty($savings)) : ?>
                                <span class="tasp-comp-pricing__savings" style="background: <?php echo esc_attr($savings_bg_color); ?>; color: <?php echo esc_attr($savings_text_color); ?>;">
                                    <?php echo esc_html($savings); ?>
                                </span>
                            <?php endif; ?>
                        </div>
                        <div class="tasp-comp-pricing__chart-cell">
                            <span class="tasp-comp-pricing__price tasp-comp-pricing__price--competitor" style="color: <?php echo esc_attr($competitor_price_color); ?>;">
                                <?php echo esc_html($competitor_price); ?>
                            </span>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            <?php if ($show_note) : ?>
                <div class="tasp-comp-pricing__note">
                    <p><?php echo wp_kses_post($note_text); ?></p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>
