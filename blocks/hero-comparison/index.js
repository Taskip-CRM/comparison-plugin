/**
 * Hero Comparison Block
 *
 * @package Tascom
 */

import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('tascom/hero-comparison', {
    edit: ({ attributes, setAttributes }) => {
        const {
            badgeText,
            title,
            titleHighlight,
            titleEnd,
            subtitle,
            primaryButtonText,
            primaryButtonUrl,
            secondaryButtonText,
            secondaryButtonUrl,
            heroImageId,
            heroImageUrl,
            heroImageAlt,
            fullWidth,
            titleColor,
            subtitleColor,
            primaryButtonBgColor,
            primaryButtonTextColor,
            secondaryButtonBgColor,
            secondaryButtonTextColor,
            secondaryButtonBorderColor,
            badgeTextColor,
            badgeBgColor,
            titleHighlightColor,
            paddingTopDesktop,
            paddingBottomDesktop,
            paddingTopTablet,
            paddingBottomTablet,
            paddingTopMobile,
            paddingBottomMobile
        } = attributes;

        const blockProps = useBlockProps({
            className: `tasp-comp-hero${fullWidth ? ' tasp-comp-hero--full-width' : ''}`,
            style: {
                paddingTop: `${paddingTopDesktop}px`,
                paddingBottom: `${paddingBottomDesktop}px`
            }
        });

        const onSelectImage = (media) => {
            setAttributes({
                heroImageId: media.id,
                heroImageUrl: media.url,
                heroImageAlt: media.alt
            });
        };

        const onRemoveImage = () => {
            setAttributes({
                heroImageId: 0,
                heroImageUrl: '',
                heroImageAlt: ''
            });
        };

        // Inline styles for preview
        const titleStyle = {
            color: titleColor
        };

        const subtitleStyle = {
            color: subtitleColor
        };

        const primaryButtonStyle = {
            backgroundColor: primaryButtonBgColor,
            color: primaryButtonTextColor
        };

        const secondaryButtonStyle = {
            backgroundColor: secondaryButtonBgColor,
            color: secondaryButtonTextColor,
            borderColor: secondaryButtonBorderColor
        };

        const badgeStyle = {
            backgroundColor: badgeBgColor,
            color: badgeTextColor
        };

        const titleHighlightStyle = {
            color: titleHighlightColor
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={__('Layout Settings', 'taskip-comparison')}
                        initialOpen={true}
                    >
                        <ToggleControl
                            label={__('Full Width', 'taskip-comparison')}
                            checked={fullWidth}
                            onChange={(value) => setAttributes({ fullWidth: value })}
                            help={__('Make the hero section full width (100%)', 'taskip-comparison')}
                        />
                    </PanelBody>

                    <PanelBody
                        title={__('Spacing Settings', 'taskip-comparison')}
                        initialOpen={false}
                    >
                        <p style={{ fontWeight: 600, marginBottom: '8px' }}>
                            {__('Desktop (1025px+)', 'taskip-comparison')}
                        </p>
                        <RangeControl
                            label={__('Padding Top', 'taskip-comparison')}
                            value={paddingTopDesktop}
                            onChange={(value) => setAttributes({ paddingTopDesktop: value })}
                            min={0}
                            max={200}
                            step={5}
                        />
                        <RangeControl
                            label={__('Padding Bottom', 'taskip-comparison')}
                            value={paddingBottomDesktop}
                            onChange={(value) => setAttributes({ paddingBottomDesktop: value })}
                            min={0}
                            max={200}
                            step={5}
                        />

                        <hr style={{ margin: '20px 0' }} />

                        <p style={{ fontWeight: 600, marginBottom: '8px' }}>
                            {__('Tablet (768px - 1024px)', 'taskip-comparison')}
                        </p>
                        <RangeControl
                            label={__('Padding Top', 'taskip-comparison')}
                            value={paddingTopTablet}
                            onChange={(value) => setAttributes({ paddingTopTablet: value })}
                            min={0}
                            max={200}
                            step={5}
                        />
                        <RangeControl
                            label={__('Padding Bottom', 'taskip-comparison')}
                            value={paddingBottomTablet}
                            onChange={(value) => setAttributes({ paddingBottomTablet: value })}
                            min={0}
                            max={200}
                            step={5}
                        />

                        <hr style={{ margin: '20px 0' }} />

                        <p style={{ fontWeight: 600, marginBottom: '8px' }}>
                            {__('Mobile (0 - 767px)', 'taskip-comparison')}
                        </p>
                        <RangeControl
                            label={__('Padding Top', 'taskip-comparison')}
                            value={paddingTopMobile}
                            onChange={(value) => setAttributes({ paddingTopMobile: value })}
                            min={0}
                            max={200}
                            step={5}
                        />
                        <RangeControl
                            label={__('Padding Bottom', 'taskip-comparison')}
                            value={paddingBottomMobile}
                            onChange={(value) => setAttributes({ paddingBottomMobile: value })}
                            min={0}
                            max={200}
                            step={5}
                        />
                    </PanelBody>

                    <PanelBody
                        title={__('Hero Content', 'taskip-comparison')}
                        initialOpen={false}
                    >
                        <TextControl
                            label={__('Badge Text', 'taskip-comparison')}
                            value={badgeText}
                            onChange={(value) => setAttributes({ badgeText: value })}
                        />
                        <TextControl
                            label={__('Title', 'taskip-comparison')}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                        />
                        <TextControl
                            label={__('Title Highlight (Italic)', 'taskip-comparison')}
                            value={titleHighlight}
                            onChange={(value) => setAttributes({ titleHighlight: value })}
                        />
                        <TextControl
                            label={__('Title End', 'taskip-comparison')}
                            value={titleEnd}
                            onChange={(value) => setAttributes({ titleEnd: value })}
                        />
                        <TextControl
                            label={__('Subtitle', 'taskip-comparison')}
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            help={__('A short description below the title', 'taskip-comparison')}
                        />
                    </PanelBody>

                    <PanelColorSettings
                        title={__('Color Settings', 'taskip-comparison')}
                        initialOpen={false}
                        colorSettings={[
                            {
                                value: badgeTextColor,
                                onChange: (value) => setAttributes({ badgeTextColor: value || '#0066FF' }),
                                label: __('Badge Text Color', 'taskip-comparison')
                            },
                            {
                                value: badgeBgColor,
                                onChange: (value) => setAttributes({ badgeBgColor: value || 'rgba(0, 102, 255, 0.1)' }),
                                label: __('Badge Background Color', 'taskip-comparison')
                            },
                            {
                                value: titleColor,
                                onChange: (value) => setAttributes({ titleColor: value || '#1a1a1a' }),
                                label: __('Title Color', 'taskip-comparison')
                            },
                            {
                                value: titleHighlightColor,
                                onChange: (value) => setAttributes({ titleHighlightColor: value || '#0066FF' }),
                                label: __('Title Highlight Color (Italic)', 'taskip-comparison')
                            },
                            {
                                value: subtitleColor,
                                onChange: (value) => setAttributes({ subtitleColor: value || '#6b7280' }),
                                label: __('Subtitle Color', 'taskip-comparison')
                            }
                        ]}
                    />

                    <PanelBody
                        title={__('Call to Action Buttons', 'taskip-comparison')}
                        initialOpen={false}
                    >
                        <TextControl
                            label={__('Primary Button Text', 'taskip-comparison')}
                            value={primaryButtonText}
                            onChange={(value) => setAttributes({ primaryButtonText: value })}
                        />
                        <TextControl
                            label={__('Primary Button URL', 'taskip-comparison')}
                            value={primaryButtonUrl}
                            onChange={(value) => setAttributes({ primaryButtonUrl: value })}
                            type="url"
                        />
                        <TextControl
                            label={__('Secondary Button Text', 'taskip-comparison')}
                            value={secondaryButtonText}
                            onChange={(value) => setAttributes({ secondaryButtonText: value })}
                        />
                        <TextControl
                            label={__('Secondary Button URL', 'taskip-comparison')}
                            value={secondaryButtonUrl}
                            onChange={(value) => setAttributes({ secondaryButtonUrl: value })}
                            type="url"
                        />
                    </PanelBody>

                    <PanelColorSettings
                        title={__('Button Styling', 'taskip-comparison')}
                        initialOpen={false}
                        colorSettings={[
                            {
                                value: primaryButtonBgColor,
                                onChange: (value) => setAttributes({ primaryButtonBgColor: value || '#0066FF' }),
                                label: __('Primary Button Background', 'taskip-comparison')
                            },
                            {
                                value: primaryButtonTextColor,
                                onChange: (value) => setAttributes({ primaryButtonTextColor: value || '#ffffff' }),
                                label: __('Primary Button Text', 'taskip-comparison')
                            },
                            {
                                value: secondaryButtonBgColor,
                                onChange: (value) => setAttributes({ secondaryButtonBgColor: value || '#ffffff' }),
                                label: __('Secondary Button Background', 'taskip-comparison')
                            },
                            {
                                value: secondaryButtonTextColor,
                                onChange: (value) => setAttributes({ secondaryButtonTextColor: value || '#1a1a1a' }),
                                label: __('Secondary Button Text', 'taskip-comparison')
                            },
                            {
                                value: secondaryButtonBorderColor,
                                onChange: (value) => setAttributes({ secondaryButtonBorderColor: value || '#6b7280' }),
                                label: __('Secondary Button Border', 'taskip-comparison')
                            }
                        ]}
                    />

                    <PanelBody
                        title={__('Hero Image', 'taskip-comparison')}
                        initialOpen={false}
                    >
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes={['image']}
                                value={heroImageId}
                                render={({ open }) => (
                                    <div>
                                        {heroImageUrl ? (
                                            <div>
                                                <img
                                                    src={heroImageUrl}
                                                    alt={heroImageAlt}
                                                    style={{ maxWidth: '100%', marginBottom: '10px' }}
                                                />
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <Button onClick={open} variant="secondary">
                                                        {__('Replace Image', 'taskip-comparison')}
                                                    </Button>
                                                    <Button onClick={onRemoveImage} variant="tertiary" isDestructive>
                                                        {__('Remove Image', 'taskip-comparison')}
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <Button onClick={open} variant="primary">
                                                    {__('Upload Image', 'taskip-comparison')}
                                                </Button>
                                                <p style={{ marginTop: '10px', fontSize: '13px', color: '#757575' }}>
                                                    {__('If no image is uploaded, a placeholder will be shown.', 'taskip-comparison')}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                    </PanelBody>
                </InspectorControls>

                <section {...blockProps}>
                    <div className="taskip-container-1408">
                        <div className="tasp-comp-hero__grid">
                            <div className="tasp-comp-hero__content">
                                <div className="tasp-comp-hero__badge" style={badgeStyle}>
                                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    {badgeText}
                                </div>

                                <h1 className="tasp-comp-hero__title" style={titleStyle}>
                                    {title}<br />
                                    <em style={titleHighlightStyle}>{titleHighlight}</em> {titleEnd}
                                </h1>

                                <p className="tasp-comp-hero__subtitle" style={subtitleStyle}>{subtitle}</p>

                                <div className="tasp-comp-hero__cta-group">
                                    <a
                                        href={primaryButtonUrl}
                                        className="tasp-comp-btn tasp-comp-btn--primary tasp-comp-btn--large"
                                        style={primaryButtonStyle}
                                    >
                                        {primaryButtonText} →
                                    </a>
                                    <a
                                        href={secondaryButtonUrl}
                                        className="tasp-comp-btn tasp-comp-btn--secondary tasp-comp-btn--large"
                                        style={secondaryButtonStyle}
                                    >
                                        ▶ {secondaryButtonText}
                                    </a>
                                </div>
                            </div>

                            <div className="tasp-comp-hero__visual">
                                {heroImageUrl ? (
                                    <div className="tasp-comp-hero__image">
                                        <img src={heroImageUrl} alt={heroImageAlt} />
                                    </div>
                                ) : (
                                    <div className="tasp-comp-hero__placeholder">
                                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                                            <rect width="200" height="200" rx="8" fill="#e5e7eb"/>
                                            <path d="M70 90L100 120L130 90" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="100" cy="100" r="40" stroke="#9ca3af" strokeWidth="4"/>
                                        </svg>
                                        <p style={{ marginTop: '10px', color: '#6b7280', fontSize: '14px' }}>
                                            {__('Upload an image', 'taskip-comparison')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    },

    save: () => {
        // Render via PHP
        return null;
    }
});
