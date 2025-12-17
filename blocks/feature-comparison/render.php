<?php
/**
 * Feature-by-Feature Comparison Block Render Template
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
$section_eyebrow = $attributes['sectionEyebrow'] ?? 'Detailed Comparison';
$section_title = $attributes['sectionTitle'] ?? 'Feature-by-Feature Analysis';
$header_column1 = $attributes['headerColumn1'] ?? 'Feature';
$header_column2 = $attributes['headerColumn2'] ?? 'Taskip';
$header_column3 = $attributes['headerColumn3'] ?? 'SuiteDash';
$categories = $attributes['categories'] ?? [];

// Color attributes
$check_color = $attributes['checkColor'] ?? '#10b981';
$cross_color = $attributes['crossColor'] ?? '#ef4444';
$custom_badge_color = $attributes['customBadgeColor'] ?? '#2563eb';
$limited_badge_color = $attributes['limitedBadgeColor'] ?? '#f59e0b';
$coming_soon_badge_color = $attributes['comingSoonBadgeColor'] ?? '#8b5cf6';
$paid_badge_color = $attributes['paidBadgeColor'] ?? '#ec4899';
$header_bg_color = $attributes['headerBgColor'] ?? '#111827';
$header_text_color = $attributes['headerTextColor'] ?? '#ffffff';
$category_bg_color = $attributes['categoryBgColor'] ?? '#f3f4f6';
$category_text_color = $attributes['categoryTextColor'] ?? '#6b7280';

// Spacing attributes
$section_spacing = $attributes['sectionSpacing'] ?? 80;
$header_padding = $attributes['headerPadding'] ?? 16;
$cell_padding = $attributes['cellPadding'] ?? 14;
$category_padding = $attributes['categoryPadding'] ?? 14;

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'section section-alt'
]);

// Function to render table cell with colors
$render_table_cell = function($type, $text = '', $badge = '', $colors = []) {
    $check_color = $colors['check'] ?? '#10b981';
    $cross_color = $colors['cross'] ?? '#ef4444';
    $custom_badge_color = $colors['custom_badge'] ?? '#2563eb';
    $limited_badge_color = $colors['limited'] ?? '#f59e0b';
    $coming_soon_badge_color = $colors['coming_soon'] ?? '#8b5cf6';
    $paid_badge_color = $colors['paid'] ?? '#ec4899';

    if ($type === 'check') {
        $output = '<span class="tbl-check" style="color: ' . esc_attr($check_color) . ';">✓</span>';
        if (!empty($badge)) {
            $output .= '<span class="tbl-badge" style="background: ' . esc_attr($custom_badge_color) . ';">' . esc_html($badge) . '</span>';
        }
        return $output;
    } elseif ($type === 'cross') {
        return '<span class="tbl-cross" style="color: ' . esc_attr($cross_color) . ';">✗</span>';
    } elseif ($type === 'limited') {
        return '<span class="tbl-badge tbl-badge-limited" style="background: ' . esc_attr($limited_badge_color) . ';">Limited</span>';
    } elseif ($type === 'coming-soon') {
        return '<span class="tbl-badge tbl-badge-coming-soon" style="background: ' . esc_attr($coming_soon_badge_color) . ';">Coming Soon</span>';
    } elseif ($type === 'paid') {
        return '<span class="tbl-badge tbl-badge-paid" style="background: ' . esc_attr($paid_badge_color) . ';">Paid Add-on</span>';
    } elseif ($type === 'text') {
        return wp_kses_post($text);
    }
    return '';
};

// Prepare colors array for the render function
$colors = [
    'check' => $check_color,
    'cross' => $cross_color,
    'custom_badge' => $custom_badge_color,
    'limited' => $limited_badge_color,
    'coming_soon' => $coming_soon_badge_color,
    'paid' => $paid_badge_color
];
?>

<section <?php echo $wrapper_attributes; ?> style="padding-top: <?php echo esc_attr($section_spacing); ?>px; padding-bottom: <?php echo esc_attr($section_spacing); ?>px;">
    <div class="container">
        <div class="section-header center tascom-feature-comparison-section-header">
            <p class="section-eyebrow"><?php echo esc_html($section_eyebrow); ?></p>
            <h2 class="section-title"><?php echo esc_html($section_title); ?></h2>
        </div>
        <div class="table-wrap">
            <table class="comp-table">
                <thead>
                    <tr style="background: <?php echo esc_attr($header_bg_color); ?>; color: <?php echo esc_attr($header_text_color); ?>;">
                        <th style="padding: <?php echo esc_attr($header_padding); ?>px 20px;"><?php echo esc_html($header_column1); ?></th>
                        <th style="padding: <?php echo esc_attr($header_padding); ?>px 20px;"><?php echo esc_html($header_column2); ?></th>
                        <th style="padding: <?php echo esc_attr($header_padding); ?>px 20px;"><?php echo esc_html($header_column3); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($categories as $category) : ?>
                        <?php
                        $category_name = $category['name'] ?? '';
                        $rows = $category['rows'] ?? [];
                        ?>
                        <tr class="cat">
                            <td colspan="3" style="background: <?php echo esc_attr($category_bg_color); ?>; color: <?php echo esc_attr($category_text_color); ?>; padding: <?php echo esc_attr($category_padding); ?>px 20px;">
                                <?php echo esc_html($category_name); ?>
                            </td>
                        </tr>
                        <?php foreach ($rows as $row) : ?>
                            <?php
                            $feature = $row['feature'] ?? '';
                            $col2_type = $row['col2Type'] ?? '';
                            $col2_text = $row['col2Text'] ?? '';
                            $col2_badge = $row['col2Badge'] ?? '';
                            $col3_type = $row['col3Type'] ?? '';
                            $col3_text = $row['col3Text'] ?? '';
                            $col3_badge = $row['col3Badge'] ?? '';
                            ?>
                            <tr>
                                <td style="padding: <?php echo esc_attr($cell_padding); ?>px 20px;"><?php echo esc_html($feature); ?></td>
                                <td style="padding: <?php echo esc_attr($cell_padding); ?>px 20px;"><?php echo $render_table_cell($col2_type, $col2_text, $col2_badge, $colors); ?></td>
                                <td style="padding: <?php echo esc_attr($cell_padding); ?>px 20px;"><?php echo $render_table_cell($col3_type, $col3_text, $col3_badge, $colors); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</section>
