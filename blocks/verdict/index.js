/**
 * Verdict Block
 *
 * @package Tascom
 */

import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, Button, SelectControl, RangeControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Icon components
const icons = {
    lightbulb: () => (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
    ),
    briefcase: () => (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
    ),
    currency: () => (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
    ),
    refresh: () => (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
    ),
    bolt: () => (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/>
        </svg>
    )
};

registerBlockType('tascom/verdict', {
    edit: ({ attributes, setAttributes }) => {
        const {
            labelText,
            title,
            points,
            sectionBgColor,
            sectionTextColor,
            titleColor,
            titleEmphasisColor,
            iconBgColor,
            iconColor,
            boxBgColor,
            boxBorderColor,
            headingColor,
            descriptionColor,
            paddingTopDesktop,
            paddingBottomDesktop,
            paddingTopTablet,
            paddingBottomTablet,
            paddingTopMobile,
            paddingBottomMobile
        } = attributes;

        // Normalize points to ensure all have the required fields
        const normalizedPoints = points.map(point => ({
            icon: 'lightbulb',
            heading: '',
            description: '',
            showIcon: true,
            useCustomImage: false,
            customImageUrl: '',
            customImageId: 0,
            ...point
        }));

        const blockProps = useBlockProps({
            className: 'tasp-comp-verdict',
            style: {
                paddingTop: `${paddingTopDesktop}px`,
                paddingBottom: `${paddingBottomDesktop}px`,
                backgroundColor: sectionBgColor,
                color: sectionTextColor
            }
        });

        const updatePoint = (index, field, value) => {
            const updatedPoints = [...points];
            // Ensure all required fields exist
            updatedPoints[index] = {
                icon: 'lightbulb',
                heading: '',
                description: '',
                showIcon: true,
                useCustomImage: false,
                customImageUrl: '',
                customImageId: 0,
                ...updatedPoints[index],
                [field]: value
            };
            setAttributes({ points: updatedPoints });
        };

        const addPoint = () => {
            setAttributes({
                points: [
                    ...points,
                    {
                        icon: 'lightbulb',
                        heading: 'New Point',
                        description: 'Add description here.',
                        showIcon: true,
                        useCustomImage: false,
                        customImageUrl: '',
                        customImageId: 0
                    }
                ]
            });
        };

        const removePoint = (index) => {
            const updatedPoints = points.filter((_, i) => i !== index);
            setAttributes({ points: updatedPoints });
        };

        const onSelectPointImage = (index, media) => {
            const updatedPoints = [...points];
            updatedPoints[index] = {
                icon: 'lightbulb',
                heading: '',
                description: '',
                showIcon: true,
                useCustomImage: true,
                customImageUrl: '',
                customImageId: 0,
                ...updatedPoints[index],
                customImageUrl: media.url,
                customImageId: media.id,
                useCustomImage: true
            };
            setAttributes({ points: updatedPoints });
        };

        const onRemovePointImage = (index) => {
            const updatedPoints = [...points];
            updatedPoints[index] = {
                icon: 'lightbulb',
                heading: '',
                description: '',
                showIcon: true,
                useCustomImage: false,
                customImageUrl: '',
                customImageId: 0,
                ...updatedPoints[index],
                customImageUrl: '',
                customImageId: 0,
                useCustomImage: false
            };
            setAttributes({ points: updatedPoints });
        };

        const IconComponent = (iconType) => {
            const Icon = icons[iconType] || icons.lightbulb;
            return <Icon />;
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={__('Verdict Settings', 'taskip-comparison')}
                        initialOpen={true}
                    >
                        <TextControl
                            label={__('Label Text', 'taskip-comparison')}
                            value={labelText}
                            onChange={(value) => setAttributes({ labelText: value })}
                        />
                        <TextareaControl
                            label={__('Title', 'taskip-comparison')}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            rows={4}
                            help={__('Format: *word* for italic with default color, or *word|#00c896* for italic with custom color', 'taskip-comparison')}
                        />
                    </PanelBody>

                    <PanelColorSettings
                        title={__('Color Settings', 'taskip-comparison')}
                        initialOpen={false}
                        colorSettings={[
                            {
                                value: sectionBgColor,
                                onChange: (value) => setAttributes({ sectionBgColor: value || '#0a0a0a' }),
                                label: __('Section Background', 'taskip-comparison')
                            },
                            {
                                value: sectionTextColor,
                                onChange: (value) => setAttributes({ sectionTextColor: value || '#ffffff' }),
                                label: __('Section Text Color', 'taskip-comparison')
                            },
                            {
                                value: titleColor,
                                onChange: (value) => setAttributes({ titleColor: value || '#ffffff' }),
                                label: __('Title Color', 'taskip-comparison')
                            },
                            {
                                value: titleEmphasisColor,
                                onChange: (value) => setAttributes({ titleEmphasisColor: value || '#00c896' }),
                                label: __('Title Emphasis Color (Italic)', 'taskip-comparison')
                            },
                            {
                                value: iconBgColor,
                                onChange: (value) => setAttributes({ iconBgColor: value || '#0066FF' }),
                                label: __('Icon Background', 'taskip-comparison')
                            },
                            {
                                value: iconColor,
                                onChange: (value) => setAttributes({ iconColor: value || '#ffffff' }),
                                label: __('Icon Color', 'taskip-comparison')
                            },
                            {
                                value: boxBgColor,
                                onChange: (value) => setAttributes({ boxBgColor: value || 'rgba(255, 255, 255, 0.05)' }),
                                label: __('Point Box Background', 'taskip-comparison')
                            },
                            {
                                value: boxBorderColor,
                                onChange: (value) => setAttributes({ boxBorderColor: value || 'rgba(255, 255, 255, 0.08)' }),
                                label: __('Point Box Border', 'taskip-comparison')
                            },
                            {
                                value: headingColor,
                                onChange: (value) => setAttributes({ headingColor: value || '#ffffff' }),
                                label: __('Point Heading Color', 'taskip-comparison')
                            },
                            {
                                value: descriptionColor,
                                onChange: (value) => setAttributes({ descriptionColor: value || '#9ca3af' }),
                                label: __('Point Description Color', 'taskip-comparison')
                            }
                        ]}
                    />

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
                        title={__('Points', 'taskip-comparison')}
                        initialOpen={false}
                    >
                        {normalizedPoints.map((point, index) => (
                            <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                <p style={{ fontWeight: 600, marginBottom: '10px' }}>
                                    {__(`Point ${index + 1}`, 'taskip-comparison')}
                                </p>

                                <ToggleControl
                                    label={__('Show Icon', 'taskip-comparison')}
                                    checked={point.showIcon !== false}
                                    onChange={(value) => updatePoint(index, 'showIcon', value)}
                                />

                                {point.showIcon !== false && (
                                    <>
                                        <ToggleControl
                                            label={__('Use Custom Image', 'taskip-comparison')}
                                            checked={point.useCustomImage || false}
                                            onChange={(value) => updatePoint(index, 'useCustomImage', value)}
                                        />

                                        {point.useCustomImage ? (
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={(media) => onSelectPointImage(index, media)}
                                                    allowedTypes={['image']}
                                                    value={point.customImageId}
                                                    render={({ open }) => (
                                                        <div style={{ marginTop: '10px' }}>
                                                            {point.customImageUrl ? (
                                                                <div>
                                                                    <img
                                                                        src={point.customImageUrl}
                                                                        alt="Custom icon"
                                                                        style={{ maxWidth: '80px', height: 'auto', marginBottom: '10px' }}
                                                                    />
                                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                                        <Button onClick={open} isSecondary>
                                                                            {__('Replace Image', 'taskip-comparison')}
                                                                        </Button>
                                                                        <Button onClick={() => onRemovePointImage(index)} isDestructive>
                                                                            {__('Remove Image', 'taskip-comparison')}
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <Button onClick={open} isPrimary>
                                                                    {__('Upload Icon Image', 'taskip-comparison')}
                                                                </Button>
                                                            )}
                                                        </div>
                                                    )}
                                                />
                                            </MediaUploadCheck>
                                        ) : (
                                            <SelectControl
                                                label={__('Icon', 'taskip-comparison')}
                                                value={point.icon}
                                                options={[
                                                    { label: 'Lightbulb', value: 'lightbulb' },
                                                    { label: 'Briefcase', value: 'briefcase' },
                                                    { label: 'Currency', value: 'currency' },
                                                    { label: 'Refresh', value: 'refresh' },
                                                    { label: 'Bolt', value: 'bolt' }
                                                ]}
                                                onChange={(value) => updatePoint(index, 'icon', value)}
                                            />
                                        )}
                                    </>
                                )}

                                <TextControl
                                    label={__('Heading', 'taskip-comparison')}
                                    value={point.heading}
                                    onChange={(value) => updatePoint(index, 'heading', value)}
                                />

                                <TextareaControl
                                    label={__('Description', 'taskip-comparison')}
                                    value={point.description}
                                    onChange={(value) => updatePoint(index, 'description', value)}
                                    rows={3}
                                />

                                <Button
                                    isDestructive
                                    onClick={() => removePoint(index)}
                                    style={{ marginTop: '10px' }}
                                >
                                    {__('Remove Point', 'taskip-comparison')}
                                </Button>
                            </div>
                        ))}
                        <Button
                            isPrimary
                            onClick={addPoint}
                            style={{ marginTop: '10px' }}
                        >
                            {__('Add Point', 'taskip-comparison')}
                        </Button>
                    </PanelBody>
                </InspectorControls>

                <section {...blockProps}>
                    <div className="taskip-container-1408">
                        <div className="tasp-comp-verdict__content">
                            <div className="tasp-comp-verdict__label">
                                {IconComponent('bolt')}
                                {labelText}
                            </div>
                            <h2 className="tasp-comp-verdict__title" style={{ color: titleColor }}>
                                {(() => {
                                    const parts = title.split('*');
                                    return parts.map((part, index) => {
                                        if (index % 2 === 1) {
                                            // Check if part has custom color: word|#color
                                            const colorMatch = part.match(/^(.+?)\|(\#[0-9A-Fa-f]{6}|\#[0-9A-Fa-f]{3})$/);
                                            if (colorMatch) {
                                                const text = colorMatch[1];
                                                const color = colorMatch[2];
                                                return <em key={index} style={{ color: color }}>{text}</em>;
                                            }
                                            // Use default emphasis color
                                            return <em key={index} style={{ color: titleEmphasisColor }}>{part}</em>;
                                        }
                                        return part;
                                    });
                                })()}
                            </h2>
                            <div className="tasp-comp-verdict__points">
                                {normalizedPoints.map((point, index) => (
                                    <div
                                        key={index}
                                        className="tasp-comp-verdict__point"
                                        style={{
                                            backgroundColor: boxBgColor,
                                            borderColor: boxBorderColor
                                        }}
                                    >
                                        {point.showIcon !== false && (
                                            <div
                                                className="tasp-comp-verdict__point-icon"
                                                style={
                                                    point.useCustomImage === true && point.customImageUrl && point.customImageUrl !== ''
                                                        ? {
                                                            backgroundColor: 'transparent',
                                                            padding: 0,
                                                            width: 'auto',
                                                            height: 'auto'
                                                        }
                                                        : {
                                                            backgroundColor: iconBgColor,
                                                            color: iconColor
                                                        }
                                                }
                                            >
                                                {point.useCustomImage === true && point.customImageUrl && point.customImageUrl !== '' ? (
                                                    <img
                                                        src={point.customImageUrl}
                                                        alt={point.heading}
                                                        style={{ width: '40px', height: '40px', objectFit: 'contain', display: 'block' }}
                                                    />
                                                ) : (
                                                    IconComponent(point.icon || 'lightbulb')
                                                )}
                                            </div>
                                        )}
                                        <div className="tasp-comp-verdict__point-text">
                                            <h4 style={{ color: headingColor }}>{point.heading}</h4>
                                            <p style={{ color: descriptionColor }}>{point.description}</p>
                                        </div>
                                    </div>
                                ))}
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
