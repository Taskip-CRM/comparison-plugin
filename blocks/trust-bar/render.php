<?php
/**
 * Trust Bar Block Render Template
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
$trust_label = $attributes['trustLabel'] ?? 'Trusted by 500+ agency owners worldwide';
$companies = $attributes['companies'] ?? [];

// Responsive padding
$padding_top_desktop = $attributes['paddingTopDesktop'] ?? 40;
$padding_bottom_desktop = $attributes['paddingBottomDesktop'] ?? 40;
$padding_top_tablet = $attributes['paddingTopTablet'] ?? 30;
$padding_bottom_tablet = $attributes['paddingBottomTablet'] ?? 30;
$padding_top_mobile = $attributes['paddingTopMobile'] ?? 20;
$padding_bottom_mobile = $attributes['paddingBottomMobile'] ?? 20;

// Generate unique ID for this block instance
$block_id = 'tasp-comp-trust-' . uniqid();

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'tasp-comp-trust',
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
        <div class="tasp-comp-trust__content">
            <p class="tasp-comp-trust__label"><?php echo esc_html($trust_label); ?></p>
            <div class="tasp-comp-trust__logos">
                <?php foreach ($companies as $company) : ?>
                    <?php
                    $image_url = $company['imageUrl'] ?? '';
                    $alt_text = $company['altText'] ?? 'Company Logo';
                    ?>
                    <?php if (!empty($image_url)) : ?>
                        <div class="tasp-comp-trust__logo-item">
                            <img
                                src="<?php echo esc_url($image_url); ?>"
                                alt="<?php echo esc_attr($alt_text); ?>"
                                class="tasp-comp-trust__logo-img"
                            />
                        </div>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>
