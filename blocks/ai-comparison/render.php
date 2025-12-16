<?php
/**
 * AI Comparison Block Render Template
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
$title = $attributes['title'] ?? 'Ask AI about Taskip vs SuiteDash';
$subtitle = $attributes['subtitle'] ?? 'Get an unbiased summary from your favorite AI assistant';
$left_icon_url = $attributes['leftIconUrl'] ?? '';
$right_icon_url = $attributes['rightIconUrl'] ?? '';
$buttons = $attributes['buttons'] ?? [
    ['text' => 'Ask ChatGPT', 'iconUrl' => 'https://wcr2.taskip.net/chatgpt.png', 'prompt' => 'Compare Taskip vs SuiteDash for agency management'],
    ['text' => 'Ask Claude', 'iconUrl' => 'https://wcr2.taskip.net/claude.svg', 'prompt' => 'Compare Taskip vs SuiteDash for agency management'],
    ['text' => 'Ask Perplexity', 'iconUrl' => 'https://wcr2.taskip.net/perplexity.svg', 'prompt' => 'Compare Taskip vs SuiteDash']
];

// Color attributes
$section_bg_gradient_start = $attributes['sectionBgGradientStart'] ?? '#1f2937';
$section_bg_gradient_end = $attributes['sectionBgGradientEnd'] ?? '#0a0a0a';
$icon_bg_gradient_start = $attributes['iconBgGradientStart'] ?? '#0066FF';
$icon_bg_gradient_end = $attributes['iconBgGradientEnd'] ?? '#00D4FF';
$icon_color = $attributes['iconColor'] ?? '#ffffff';
$title_color = $attributes['titleColor'] ?? '#ffffff';
$subtitle_color = $attributes['subtitleColor'] ?? '#9ca3af';
$button_bg_color = $attributes['buttonBgColor'] ?? 'rgba(255, 255, 255, 0.1)';
$button_border_color = $attributes['buttonBorderColor'] ?? 'rgba(255, 255, 255, 0.15)';
$button_text_color = $attributes['buttonTextColor'] ?? '#ffffff';
$button_hover_bg_color = $attributes['buttonHoverBgColor'] ?? 'rgba(255, 255, 255, 0.15)';
$button_hover_border_color = $attributes['buttonHoverBorderColor'] ?? 'rgba(255, 255, 255, 0.25)';

// Responsive padding
$padding_top_desktop = $attributes['paddingTopDesktop'] ?? 80;
$padding_bottom_desktop = $attributes['paddingBottomDesktop'] ?? 80;
$padding_top_tablet = $attributes['paddingTopTablet'] ?? 60;
$padding_bottom_tablet = $attributes['paddingBottomTablet'] ?? 60;
$padding_top_mobile = $attributes['paddingTopMobile'] ?? 40;
$padding_bottom_mobile = $attributes['paddingBottomMobile'] ?? 40;

// Generate unique ID for this block instance
$block_id = 'tasp-comp-ai-' . uniqid();

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'tasp-comp-ai',
    'id' => $block_id
]);
?>

<style>
    /* Desktop */
    #<?php echo $block_id; ?> {
        padding-top: <?php echo $padding_top_desktop; ?>px;
        padding-bottom: <?php echo $padding_bottom_desktop; ?>px;
        background: linear-gradient(135deg, <?php echo esc_attr($section_bg_gradient_start); ?> 0%, <?php echo esc_attr($section_bg_gradient_end); ?> 100%);
    }

    #<?php echo $block_id; ?> .tasp-comp-ai__icon {
        background: linear-gradient(135deg, <?php echo esc_attr($icon_bg_gradient_start); ?> 0%, <?php echo esc_attr($icon_bg_gradient_end); ?> 100%);
    }

    #<?php echo $block_id; ?> .tasp-comp-ai__icon svg {
        color: <?php echo esc_attr($icon_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-ai__title {
        color: <?php echo esc_attr($title_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-ai__subtitle {
        color: <?php echo esc_attr($subtitle_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-ai__btn {
        background-color: <?php echo esc_attr($button_bg_color); ?>;
        border-color: <?php echo esc_attr($button_border_color); ?>;
        color: <?php echo esc_attr($button_text_color); ?>;
    }

    #<?php echo $block_id; ?> .tasp-comp-ai__btn:hover {
        background-color: <?php echo esc_attr($button_hover_bg_color); ?>;
        border-color: <?php echo esc_attr($button_hover_border_color); ?>;
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
        <div class="tasp-comp-ai__content">
            <div class="tasp-comp-ai__icons" style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 24px;">
                <?php if (!empty($left_icon_url)) : ?>
                    <div style="width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px;">
                        <img src="<?php echo esc_url($left_icon_url); ?>" alt="Platform 1" style="width: 100%; height: 100%; object-fit: contain;" />
                    </div>
                <?php else : ?>
                    <div style="width: 64px; height: 64px; background: rgba(255, 255, 255, 0.1); border-radius: 12px; border: 2px dashed rgba(255, 255, 255, 0.3);"></div>
                <?php endif; ?>

                <span style="color: #60a5fa; font-size: 24px; font-weight: 600;">VS</span>

                <?php if (!empty($right_icon_url)) : ?>
                    <div style="width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px;">
                        <img src="<?php echo esc_url($right_icon_url); ?>" alt="Platform 2" style="width: 100%; height: 100%; object-fit: contain;" />
                    </div>
                <?php else : ?>
                    <div style="width: 64px; height: 64px; background: rgba(255, 255, 255, 0.1); border-radius: 12px; border: 2px dashed rgba(255, 255, 255, 0.3);"></div>
                <?php endif; ?>
            </div>
            <h2 class="tasp-comp-ai__title"><?php echo esc_html($title); ?></h2>
            <p class="tasp-comp-ai__subtitle"><?php echo esc_html($subtitle); ?></p>
            <div class="tasp-comp-ai__buttons">
                <?php foreach ($buttons as $button) : ?>
                    <?php
                    $button_text = $button['text'] ?? 'Button';
                    $button_icon_url = $button['iconUrl'] ?? '';
                    $button_prompt = $button['prompt'] ?? '';

                    // Build final URL based on AI service
                    $final_url = '#';
                    if (!empty($button_prompt)) {
                        $encoded_prompt = urlencode($button_prompt);

                        if (strpos($button_text, 'ChatGPT') !== false) {
                            $final_url = 'https://chatgpt.com/?prompt=' . $encoded_prompt;
                        } elseif (strpos($button_text, 'Claude') !== false) {
                            $final_url = 'https://claude.ai/new?q=' . $encoded_prompt;
                        } elseif (strpos($button_text, 'Perplexity') !== false) {
                            $final_url = 'https://www.perplexity.ai/search?q=' . $encoded_prompt;
                        }
                    }
                    ?>
                    <a href="<?php echo esc_url($final_url); ?>" class="tasp-comp-ai__btn" target="_blank" rel="noopener noreferrer">
                        <?php if (!empty($button_icon_url)) : ?>
                            <?php
                            // Add white bg for ChatGPT and Perplexity
                            $needs_white_bg = (strpos($button_text, 'ChatGPT') !== false || strpos($button_text, 'Perplexity') !== false);
                            ?>
                            <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; background: <?php echo $needs_white_bg ? '#ffffff' : 'transparent'; ?>; border-radius: 4px; padding: <?php echo $needs_white_bg ? '2px' : '0'; ?>;">
                                <img src="<?php echo esc_url($button_icon_url); ?>" alt="<?php echo esc_attr($button_text); ?>" style="width: 100%; height: 100%; object-fit: contain;" />
                            </span>
                        <?php else : ?>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10"/>
                            </svg>
                        <?php endif; ?>
                        <?php echo esc_html($button_text); ?>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>
