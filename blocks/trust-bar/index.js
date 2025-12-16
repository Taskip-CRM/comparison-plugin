/**
 * Trust Bar Block
 *
 * @package Tascom
 */

import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('tascom/trust-bar', {
    edit: ({ attributes, setAttributes }) => {
        const {
            trustLabel,
            companies,
            paddingTopDesktop,
            paddingBottomDesktop,
            paddingTopTablet,
            paddingBottomTablet,
            paddingTopMobile,
            paddingBottomMobile
        } = attributes;

        const blockProps = useBlockProps({
            className: 'tasp-comp-trust',
            style: {
                paddingTop: `${paddingTopDesktop}px`,
                paddingBottom: `${paddingBottomDesktop}px`
            }
        });

        const updateCompany = (index, field, value) => {
            const updatedCompanies = [...companies];
            updatedCompanies[index] = {
                ...updatedCompanies[index],
                [field]: value
            };
            setAttributes({ companies: updatedCompanies });
        };

        const addCompany = () => {
            setAttributes({
                companies: [
                    ...companies,
                    { imageUrl: '', imageId: 0, altText: 'Company Logo' }
                ]
            });
        };

        const removeCompany = (index) => {
            const updatedCompanies = companies.filter((_, i) => i !== index);
            setAttributes({ companies: updatedCompanies });
        };

        const onSelectImage = (index, media) => {
            const updatedCompanies = [...companies];
            updatedCompanies[index] = {
                ...updatedCompanies[index],
                imageUrl: media.url,
                imageId: media.id,
                altText: media.alt || 'Company Logo'
            };
            setAttributes({ companies: updatedCompanies });
        };

        const onRemoveImage = (index) => {
            const updatedCompanies = [...companies];
            updatedCompanies[index] = {
                ...updatedCompanies[index],
                imageUrl: '',
                imageId: 0
            };
            setAttributes({ companies: updatedCompanies });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={__('Trust Bar Settings', 'taskip-comparison')}
                        initialOpen={true}
                    >
                        <TextControl
                            label={__('Trust Label', 'taskip-comparison')}
                            value={trustLabel}
                            onChange={(value) => setAttributes({ trustLabel: value })}
                            help={__('The text above the company logos', 'taskip-comparison')}
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
                        title={__('Company Logos', 'taskip-comparison')}
                        initialOpen={false}
                    >
                        {companies.map((company, index) => (
                            <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                <p style={{ fontWeight: 600, marginBottom: '10px' }}>
                                    {__(`Logo ${index + 1}`, 'taskip-comparison')}
                                </p>

                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) => onSelectImage(index, media)}
                                        allowedTypes={['image']}
                                        value={company.imageId}
                                        render={({ open }) => (
                                            <div>
                                                {company.imageUrl ? (
                                                    <div>
                                                        <img
                                                            src={company.imageUrl}
                                                            alt={company.altText}
                                                            style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
                                                        />
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            <Button onClick={open} isSecondary>
                                                                {__('Replace Image', 'taskip-comparison')}
                                                            </Button>
                                                            <Button onClick={() => onRemoveImage(index)} isDestructive>
                                                                {__('Remove Image', 'taskip-comparison')}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Button onClick={open} isPrimary>
                                                        {__('Upload Logo', 'taskip-comparison')}
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    />
                                </MediaUploadCheck>

                                <TextControl
                                    label={__('Alt Text', 'taskip-comparison')}
                                    value={company.altText}
                                    onChange={(value) => updateCompany(index, 'altText', value)}
                                    style={{ marginTop: '10px' }}
                                />

                                <Button
                                    isDestructive
                                    onClick={() => removeCompany(index)}
                                    style={{ marginTop: '10px' }}
                                >
                                    {__('Remove Logo', 'taskip-comparison')}
                                </Button>
                            </div>
                        ))}
                        <Button
                            isPrimary
                            onClick={addCompany}
                            style={{ marginTop: '10px' }}
                        >
                            {__('Add Logo', 'taskip-comparison')}
                        </Button>
                    </PanelBody>
                </InspectorControls>

                <section {...blockProps}>
                    <div className="taskip-container-1408">
                        <div className="tasp-comp-trust__content">
                            <p className="tasp-comp-trust__label">{trustLabel}</p>
                            <div className="tasp-comp-trust__logos">
                                {companies.map((company, index) => (
                                    <div key={index} className="tasp-comp-trust__logo-item">
                                        {company.imageUrl ? (
                                            <img
                                                src={company.imageUrl}
                                                alt={company.altText}
                                                className="tasp-comp-trust__logo-img"
                                            />
                                        ) : (
                                            <div className="tasp-comp-trust__logo-placeholder">
                                                {__('No Logo', 'taskip-comparison')}
                                            </div>
                                        )}
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
