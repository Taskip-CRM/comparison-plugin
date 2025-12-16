/**
 * Migration Support Block
 *
 * @package Tascom
 */

import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, Button, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('tascom/migration', {
    edit: ({ attributes, setAttributes }) => {
        const {
            eyebrowText,
            eyebrowColor,
            title,
            description,
            features,
            buttonText,
            buttonUrl,
            testimonials,
            sectionBgColor,
            titleColor,
            textColor,
            featureTextColor,
            featureCheckBgColor,
            testimonialBgColor,
            testimonialBorderColor,
            testimonialTextColor,
            buttonBgColor,
            buttonTextColor,
            paddingTopDesktop,
            paddingBottomDesktop,
            paddingTopTablet,
            paddingBottomTablet,
            paddingTopMobile,
            paddingBottomMobile
        } = attributes;

        const blockProps = useBlockProps({
            className: 'tasp-comp-migration',
            style: {
                paddingTop: `${paddingTopDesktop}px`,
                paddingBottom: `${paddingBottomDesktop}px`,
                backgroundColor: sectionBgColor
            }
        });

        const updateFeature = (index, value) => {
            const updatedFeatures = [...features];
            updatedFeatures[index] = value;
            setAttributes({ features: updatedFeatures });
        };

        const addFeature = () => {
            setAttributes({ features: [...features, 'New feature'] });
        };

        const removeFeature = (index) => {
            const updatedFeatures = features.filter((_, i) => i !== index);
            setAttributes({ features: updatedFeatures });
        };

        const updateTestimonial = (index, field, value) => {
            const updatedTestimonials = [...testimonials];
            updatedTestimonials[index] = {
                ...updatedTestimonials[index],
                [field]: value
            };
            setAttributes({ testimonials: updatedTestimonials });
        };

        const addTestimonial = () => {
            setAttributes({
                testimonials: [
                    ...testimonials,
                    {
                        quote: 'Add testimonial quote here...',
                        authorName: 'Author Name',
                        authorRole: 'Author Role',
                        authorInitials: 'AN'
                    }
                ]
            });
        };

        const removeTestimonial = (index) => {
            const updatedTestimonials = testimonials.filter((_, i) => i !== index);
            setAttributes({ testimonials: updatedTestimonials });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={__('Content Settings', 'taskip-comparison')}
                        initialOpen={true}
                    >
                        <TextControl
                            label={__('Eyebrow Text', 'taskip-comparison')}
                            value={eyebrowText}
                            onChange={(value) => setAttributes({ eyebrowText: value })}
                        />
                        <TextControl
                            label={__('Title', 'taskip-comparison')}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                        />
                        <TextareaControl
                            label={__('Description', 'taskip-comparison')}
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            rows={3}
                        />
                        <TextControl
                            label={__('Button Text', 'taskip-comparison')}
                            value={buttonText}
                            onChange={(value) => setAttributes({ buttonText: value })}
                        />
                        <TextControl
                            label={__('Button URL', 'taskip-comparison')}
                            value={buttonUrl}
                            onChange={(value) => setAttributes({ buttonUrl: value })}
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
                                value: eyebrowColor,
                                onChange: (value) => setAttributes({ eyebrowColor: value || '#60a5fa' }),
                                label: __('Eyebrow Color', 'taskip-comparison')
                            },
                            {
                                value: titleColor,
                                onChange: (value) => setAttributes({ titleColor: value || '#ffffff' }),
                                label: __('Title Color', 'taskip-comparison')
                            },
                            {
                                value: textColor,
                                onChange: (value) => setAttributes({ textColor: value || '#9ca3af' }),
                                label: __('Description Color', 'taskip-comparison')
                            },
                            {
                                value: featureTextColor,
                                onChange: (value) => setAttributes({ featureTextColor: value || '#d1d5db' }),
                                label: __('Feature Text Color', 'taskip-comparison')
                            },
                            {
                                value: featureCheckBgColor,
                                onChange: (value) => setAttributes({ featureCheckBgColor: value || '#10b981' }),
                                label: __('Feature Check Background', 'taskip-comparison')
                            },
                            {
                                value: testimonialBgColor,
                                onChange: (value) => setAttributes({ testimonialBgColor: value || 'rgba(255, 255, 255, 0.05)' }),
                                label: __('Testimonial Background', 'taskip-comparison')
                            },
                            {
                                value: testimonialBorderColor,
                                onChange: (value) => setAttributes({ testimonialBorderColor: value || 'rgba(255, 255, 255, 0.1)' }),
                                label: __('Testimonial Border', 'taskip-comparison')
                            },
                            {
                                value: testimonialTextColor,
                                onChange: (value) => setAttributes({ testimonialTextColor: value || '#d1d5db' }),
                                label: __('Testimonial Text Color', 'taskip-comparison')
                            },
                            {
                                value: buttonBgColor,
                                onChange: (value) => setAttributes({ buttonBgColor: value || '#0066FF' }),
                                label: __('Button Background', 'taskip-comparison')
                            },
                            {
                                value: buttonTextColor,
                                onChange: (value) => setAttributes({ buttonTextColor: value || '#ffffff' }),
                                label: __('Button Text Color', 'taskip-comparison')
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
                        title={__('Features', 'taskip-comparison')}
                        initialOpen={false}
                    >
                        {features.map((feature, index) => (
                            <div key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                <TextControl
                                    label={__(`Feature ${index + 1}`, 'taskip-comparison')}
                                    value={feature}
                                    onChange={(value) => updateFeature(index, value)}
                                />
                                <Button
                                    isDestructive
                                    onClick={() => removeFeature(index)}
                                    style={{ marginTop: '5px' }}
                                >
                                    {__('Remove', 'taskip-comparison')}
                                </Button>
                            </div>
                        ))}
                        <Button isPrimary onClick={addFeature}>
                            {__('Add Feature', 'taskip-comparison')}
                        </Button>
                    </PanelBody>

                    <PanelBody
                        title={__('Testimonials', 'taskip-comparison')}
                        initialOpen={false}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                <p style={{ fontWeight: 600, marginBottom: '10px' }}>
                                    {__(`Testimonial ${index + 1}`, 'taskip-comparison')}
                                </p>
                                <TextareaControl
                                    label={__('Quote', 'taskip-comparison')}
                                    value={testimonial.quote}
                                    onChange={(value) => updateTestimonial(index, 'quote', value)}
                                    rows={3}
                                />
                                <TextControl
                                    label={__('Author Name', 'taskip-comparison')}
                                    value={testimonial.authorName}
                                    onChange={(value) => updateTestimonial(index, 'authorName', value)}
                                />
                                <TextControl
                                    label={__('Author Role', 'taskip-comparison')}
                                    value={testimonial.authorRole}
                                    onChange={(value) => updateTestimonial(index, 'authorRole', value)}
                                />
                                <TextControl
                                    label={__('Author Initials', 'taskip-comparison')}
                                    value={testimonial.authorInitials}
                                    onChange={(value) => updateTestimonial(index, 'authorInitials', value)}
                                    help={__('2-3 characters for avatar', 'taskip-comparison')}
                                />
                                <Button
                                    isDestructive
                                    onClick={() => removeTestimonial(index)}
                                    style={{ marginTop: '10px' }}
                                >
                                    {__('Remove Testimonial', 'taskip-comparison')}
                                </Button>
                            </div>
                        ))}
                        <Button isPrimary onClick={addTestimonial}>
                            {__('Add Testimonial', 'taskip-comparison')}
                        </Button>
                    </PanelBody>
                </InspectorControls>

                <section {...blockProps}>
                    <div className="taskip-container-1408">
                        <div className="tasp-comp-migration__grid">
                            <div className="tasp-comp-migration__content">
                                <p className="tasp-comp-migration__eyebrow" style={{ color: eyebrowColor }}>
                                    {eyebrowText}
                                </p>
                                <h2 className="tasp-comp-migration__title" style={{ color: titleColor }}>
                                    {title}
                                </h2>
                                <p className="tasp-comp-migration__description" style={{ color: textColor }}>
                                    {description}
                                </p>
                                <ul className="tasp-comp-migration__features">
                                    {features.map((feature, index) => (
                                        <li key={index} style={{ color: featureTextColor }}>
                                            <span className="tasp-comp-migration__check" style={{ backgroundColor: featureCheckBgColor }}>✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href={buttonUrl}
                                    className="tasp-comp-migration__button"
                                    style={{
                                        backgroundColor: buttonBgColor,
                                        color: buttonTextColor
                                    }}
                                >
                                    {buttonText}
                                </a>
                            </div>
                            <div className="tasp-comp-migration__testimonials">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className="tasp-comp-migration__testimonial"
                                        style={{
                                            backgroundColor: testimonialBgColor,
                                            borderColor: testimonialBorderColor
                                        }}
                                    >
                                        <blockquote style={{ color: testimonialTextColor }}>
                                            "{testimonial.quote}"
                                        </blockquote>
                                        <div className="tasp-comp-migration__testimonial-footer">
                                            <div className="tasp-comp-migration__avatar">
                                                {testimonial.authorInitials}
                                            </div>
                                            <div className="tasp-comp-migration__testimonial-meta">
                                                <span style={{ color: titleColor }}>{testimonial.authorName}</span>
                                                <span style={{ color: textColor }}>{testimonial.authorRole}</span>
                                            </div>
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
