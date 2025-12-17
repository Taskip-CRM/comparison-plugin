import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps, RichText, MediaUpload, MediaUploadCheck, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ToggleControl, RadioControl, SelectControl } from '@wordpress/components';
import './editor.css';

registerBlockType('tascom/highlights', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        // Get attributes with defaults
        const sectionLabel = attributes.sectionLabel || '🎯 Key Differences';
        const sectionTitle = attributes.sectionTitle || 'Features that matter most';
        const sectionTitleEmphasis = attributes.sectionTitleEmphasis || 'matter most';
        const sectionDescription = attributes.sectionDescription || 'A deep dive into the capabilities that separate Taskip from SuiteDash';

        // Color attributes
        const titleColor = attributes.titleColor || '#1e293b';
        const badgeGradientStart = attributes.badgeGradientStart || '#10b981';
        const badgeGradientEnd = attributes.badgeGradientEnd || '#059669';
        const badgeTextColor = attributes.badgeTextColor || '#ffffff';
        const winnerBgColor = attributes.winnerBgColor || '#eff6ff';
        const winnerBorderColor = attributes.winnerBorderColor || '#3b82f6';
        const winnerTextColor = attributes.winnerTextColor || '#3b82f6';
        const loserBgColor = attributes.loserBgColor || '#f8fafc';
        const loserTextColor = attributes.loserTextColor || '#94a3b8';

        // Cards with defaults
        const cards = attributes.cards || [
            {
                badge: '✓ Taskip Wins',
                icon: '🤖',
                iconColor: 'purple',
                title: 'AI-Powered Features',
                description: 'Boost productivity with intelligent writing assistance across your workflow.',
                winnerTitle: 'Taskip',
                winnerFeatures: ['AI proposal & contract writer', 'Smart task suggestions', 'AI email composer'],
                loserTitle: 'SuiteDash',
                loserFeatures: ['No AI writing features', 'Manual task creation', 'Basic email templates'],
                imageUrl: 'https://placehold.co/600x200/f3e8ff/7c3aed?text=AI+Writing+Dashboard',
                fullWidth: false
            },
            {
                badge: '✓ Taskip Wins',
                icon: '🛒',
                iconColor: 'green',
                title: 'Service Catalog',
                description: 'Showcase services with public pages and let clients self-checkout.',
                winnerTitle: 'Taskip',
                winnerFeatures: ['Public-facing catalog', 'Multiple pricing tiers', 'Self-checkout flow'],
                loserTitle: 'SuiteDash',
                loserFeatures: ['No public catalog', 'Basic listings only', 'Login required'],
                imageUrl: 'https://placehold.co/600x200/dcfce7/166534?text=Service+Catalog+Preview',
                fullWidth: false
            }
        ];

        // Card management functions
        const updateCard = (index, field, value) => {
            const updated = [...cards];
            updated[index] = { ...updated[index], [field]: value };
            setAttributes({ cards: updated });
        };

        const addCard = () => {
            const newCard = {
                badge: '✓ Taskip Wins',
                icon: '🎯',
                iconColor: 'blue',
                title: 'New Feature',
                description: 'Description here...',
                winnerTitle: 'Taskip',
                winnerFeatures: ['Feature 1', 'Feature 2'],
                loserTitle: 'SuiteDash',
                loserFeatures: ['Feature 1', 'Feature 2'],
                imageUrl: '',
                fullWidth: false
            };
            setAttributes({ cards: [...cards, newCard] });
        };

        const removeCard = (index) => {
            const updated = cards.filter((_, i) => i !== index);
            setAttributes({ cards: updated });
        };

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="Section Header" initialOpen={true}>
                        <TextControl
                            label="Section Label"
                            value={sectionLabel}
                            onChange={(value) => setAttributes({ sectionLabel: value })}
                            help="Add emoji + text (e.g., 🎯 Key Differences)"
                        />
                        <TextControl
                            label="Section Title"
                            value={sectionTitle}
                            onChange={(value) => setAttributes({ sectionTitle: value })}
                        />
                        <TextControl
                            label="Title Emphasis"
                            value={sectionTitleEmphasis}
                            onChange={(value) => setAttributes({ sectionTitleEmphasis: value })}
                            help="Part of title that will have custom color"
                        />
                        <div style={{ marginTop: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                                Section Description
                            </label>
                            <RichText
                                tagName="p"
                                value={sectionDescription}
                                onChange={(value) => setAttributes({ sectionDescription: value })}
                                placeholder="Enter description..."
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    minHeight: '60px'
                                }}
                            />
                            <p style={{ fontSize: '12px', color: '#757575', marginTop: '4px' }}>
                                You can use bold, italic, and links
                            </p>
                        </div>
                    </PanelBody>

                    <PanelColorSettings
                        title="Title Colors"
                        colorSettings={[
                            {
                                value: titleColor,
                                onChange: (value) => setAttributes({ titleColor: value }),
                                label: 'Title Emphasis Color'
                            }
                        ]}
                    />

                    <PanelColorSettings
                        title="Badge Colors"
                        colorSettings={[
                            {
                                value: badgeGradientStart,
                                onChange: (value) => setAttributes({ badgeGradientStart: value }),
                                label: 'Badge Gradient Start'
                            },
                            {
                                value: badgeGradientEnd,
                                onChange: (value) => setAttributes({ badgeGradientEnd: value }),
                                label: 'Badge Gradient End'
                            },
                            {
                                value: badgeTextColor,
                                onChange: (value) => setAttributes({ badgeTextColor: value }),
                                label: 'Badge Text Color'
                            }
                        ]}
                    />

                    <PanelColorSettings
                        title="Comparison Colors"
                        colorSettings={[
                            {
                                value: winnerBgColor,
                                onChange: (value) => setAttributes({ winnerBgColor: value }),
                                label: 'Winner Background'
                            },
                            {
                                value: winnerBorderColor,
                                onChange: (value) => setAttributes({ winnerBorderColor: value }),
                                label: 'Winner Border'
                            },
                            {
                                value: winnerTextColor,
                                onChange: (value) => setAttributes({ winnerTextColor: value }),
                                label: 'Winner Text'
                            },
                            {
                                value: loserBgColor,
                                onChange: (value) => setAttributes({ loserBgColor: value }),
                                label: 'Loser Background'
                            },
                            {
                                value: loserTextColor,
                                onChange: (value) => setAttributes({ loserTextColor: value }),
                                label: 'Loser Text'
                            }
                        ]}
                    />

                    <PanelBody title="Highlight Cards" initialOpen={false}>
                        {cards.map((card, index) => (
                            <div key={index} style={{ marginBottom: '24px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9fafb' }}>
                                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Card {index + 1}</h4>

                                <ToggleControl
                                    label="Show Badge"
                                    checked={card.showBadge !== false}
                                    onChange={(value) => updateCard(index, 'showBadge', value)}
                                />

                                {card.showBadge !== false && (
                                    <TextControl
                                        label="Badge Text"
                                        value={card.badge || ''}
                                        onChange={(value) => updateCard(index, 'badge', value)}
                                    />
                                )}

                                <RadioControl
                                    label="Icon Type"
                                    selected={card.iconType || 'emoji'}
                                    options={[
                                        { label: 'Emoji', value: 'emoji' },
                                        { label: 'Image', value: 'image' },
                                        { label: 'Hide Icon', value: 'hide' }
                                    ]}
                                    onChange={(value) => updateCard(index, 'iconType', value)}
                                />

                                {(!card.iconType || card.iconType === 'emoji') && (
                                    <>
                                        <TextControl
                                            label="Icon Emoji"
                                            value={card.icon || '🎯'}
                                            onChange={(value) => updateCard(index, 'icon', value)}
                                            help="Enter an emoji (e.g., 🎯, 🤖, 🛒)"
                                        />
                                        <SelectControl
                                            label="Icon Color"
                                            value={card.iconColor || 'blue'}
                                            options={[
                                                { label: 'Blue', value: 'blue' },
                                                { label: 'Green', value: 'green' },
                                                { label: 'Purple', value: 'purple' },
                                                { label: 'Orange', value: 'orange' }
                                            ]}
                                            onChange={(value) => updateCard(index, 'iconColor', value)}
                                        />
                                    </>
                                )}

                                {card.iconType === 'image' && (
                                    <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '12px' }}>
                                            Icon Image
                                        </label>
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={(media) => updateCard(index, 'iconImageUrl', media.url)}
                                                allowedTypes={['image']}
                                                value={card.iconImageUrl}
                                                render={({ open }) => (
                                                    <div>
                                                        {card.iconImageUrl && (
                                                            <div style={{ marginBottom: '10px' }}>
                                                                <img src={card.iconImageUrl} alt="Icon" style={{ width: '60px', height: '60px', objectFit: 'contain', border: '1px solid #ddd', borderRadius: '8px', padding: '4px' }} />
                                                            </div>
                                                        )}
                                                        <Button onClick={open} variant="secondary" size="small">
                                                            {card.iconImageUrl ? 'Change Image' : 'Upload Image'}
                                                        </Button>
                                                        {card.iconImageUrl && (
                                                            <Button onClick={() => updateCard(index, 'iconImageUrl', '')} variant="link" isDestructive size="small" style={{ marginLeft: '8px' }}>
                                                                Remove
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </MediaUploadCheck>
                                    </div>
                                )}

                                <TextControl
                                    label="Title"
                                    value={card.title || ''}
                                    onChange={(value) => updateCard(index, 'title', value)}
                                />

                                <p style={{ fontSize: '12px', color: '#757575', marginTop: '12px', marginBottom: '8px' }}>
                                    💡 <strong>Tip:</strong> Edit the description directly in the card preview below
                                </p>

                                <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ddd' }} />

                                <h5 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 600, color: '#3b82f6' }}>✓ Winner Side</h5>
                                <TextControl
                                    label="Winner Name"
                                    value={card.winnerTitle || 'Taskip'}
                                    onChange={(value) => updateCard(index, 'winnerTitle', value)}
                                />

                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '12px' }}>
                                    Winner Features
                                </label>
                                {(card.winnerFeatures || []).map((feature, fIndex) => (
                                    <div key={fIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                        <TextControl
                                            value={feature}
                                            onChange={(value) => {
                                                const updated = [...cards];
                                                const features = [...(updated[index].winnerFeatures || [])];
                                                features[fIndex] = value;
                                                updated[index].winnerFeatures = features;
                                                setAttributes({ cards: updated });
                                            }}
                                            placeholder="Feature text..."
                                            style={{ flex: 1 }}
                                        />
                                        <Button
                                            isSmall
                                            isDestructive
                                            onClick={() => {
                                                const updated = [...cards];
                                                const features = (updated[index].winnerFeatures || []).filter((_, i) => i !== fIndex);
                                                updated[index].winnerFeatures = features;
                                                setAttributes({ cards: updated });
                                            }}
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    isSmall
                                    onClick={() => {
                                        const updated = [...cards];
                                        updated[index].winnerFeatures = [...(updated[index].winnerFeatures || []), ''];
                                        setAttributes({ cards: updated });
                                    }}
                                    style={{ marginTop: '8px' }}
                                >
                                    + Add Feature
                                </Button>

                                <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ddd' }} />

                                <h5 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>✗ Loser Side</h5>
                                <TextControl
                                    label="Loser Name"
                                    value={card.loserTitle || 'SuiteDash'}
                                    onChange={(value) => updateCard(index, 'loserTitle', value)}
                                />

                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '12px' }}>
                                    Loser Features
                                </label>
                                {(card.loserFeatures || []).map((feature, fIndex) => (
                                    <div key={fIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                        <TextControl
                                            value={feature}
                                            onChange={(value) => {
                                                const updated = [...cards];
                                                const features = [...(updated[index].loserFeatures || [])];
                                                features[fIndex] = value;
                                                updated[index].loserFeatures = features;
                                                setAttributes({ cards: updated });
                                            }}
                                            placeholder="Feature text..."
                                            style={{ flex: 1 }}
                                        />
                                        <Button
                                            isSmall
                                            isDestructive
                                            onClick={() => {
                                                const updated = [...cards];
                                                const features = (updated[index].loserFeatures || []).filter((_, i) => i !== fIndex);
                                                updated[index].loserFeatures = features;
                                                setAttributes({ cards: updated });
                                            }}
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    isSmall
                                    onClick={() => {
                                        const updated = [...cards];
                                        updated[index].loserFeatures = [...(updated[index].loserFeatures || []), ''];
                                        setAttributes({ cards: updated });
                                    }}
                                    style={{ marginTop: '8px' }}
                                >
                                    + Add Feature
                                </Button>

                                <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ddd' }} />

                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '12px' }}>
                                        Bottom Image
                                    </label>
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={(media) => updateCard(index, 'imageUrl', media.url)}
                                            allowedTypes={['image']}
                                            value={card.imageUrl}
                                            render={({ open }) => (
                                                <div>
                                                    {card.imageUrl && (
                                                        <div style={{ marginBottom: '10px' }}>
                                                            <img
                                                                src={card.imageUrl}
                                                                alt="Preview"
                                                                style={{
                                                                    width: '100%',
                                                                    height: '120px',
                                                                    objectFit: 'cover',
                                                                    border: '1px solid #ddd',
                                                                    borderRadius: '8px'
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                    <Button onClick={open} variant="secondary" size="small">
                                                        {card.imageUrl ? 'Change Image' : 'Upload Image'}
                                                    </Button>
                                                    {card.imageUrl && (
                                                        <Button
                                                            onClick={() => updateCard(index, 'imageUrl', '')}
                                                            variant="link"
                                                            isDestructive
                                                            size="small"
                                                            style={{ marginLeft: '8px' }}
                                                        >
                                                            Remove
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                    <p style={{ fontSize: '11px', color: '#757575', marginTop: '4px' }}>
                                        Recommended: 600x200px or larger
                                    </p>
                                </div>

                                <ToggleControl
                                    label="Full Width Card"
                                    checked={card.fullWidth || false}
                                    onChange={(value) => updateCard(index, 'fullWidth', value)}
                                    help="Span across 2 columns"
                                />

                                <Button
                                    isDestructive
                                    onClick={() => removeCard(index)}
                                    style={{ marginTop: '12px' }}
                                >
                                    Remove Card
                                </Button>
                            </div>
                        ))}

                        <Button isPrimary onClick={addCard} style={{ marginTop: '12px' }}>
                            + Add Card
                        </Button>
                    </PanelBody>
                </InspectorControls>

                <section className="tasp-comp-section tasp-comp-section-gradient">
                    <div className="taskip-container-1408">
                        <div className="tasp-comp-section-header">
                            <div className="tasp-comp-section-label">{sectionLabel}</div>
                            <h2 className="tasp-comp-section-title">
                                {sectionTitle.replace(sectionTitleEmphasis, '')}
                                <span
                                    className="tasp-comp-gradient"
                                    style={{
                                        color: titleColor
                                    }}
                                >
                                    {sectionTitleEmphasis}
                                </span>
                            </h2>
                            <RichText.Content
                                tagName="p"
                                className="tasp-comp-section-desc"
                                value={sectionDescription}
                            />
                        </div>

                        <div className="tasp-comp-highlights-grid">
                            {cards.map((card, idx) => (
                                <div key={idx} className={`tasp-comp-highlight-card ${card.fullWidth ? 'full' : ''}`}>
                                    {card.showBadge !== false && (
                                        <span
                                            className="tasp-comp-highlight-badge"
                                            style={{
                                                background: `linear-gradient(135deg, ${badgeGradientStart}, ${badgeGradientEnd})`,
                                                color: badgeTextColor
                                            }}
                                        >
                                            {card.badge}
                                        </span>
                                    )}

                                    {(!card.iconType || card.iconType === 'emoji') && (
                                        <div className={`tasp-comp-highlight-icon ${card.iconColor || 'blue'}`}>
                                            {card.icon || '🎯'}
                                        </div>
                                    )}

                                    {card.iconType === 'image' && card.iconImageUrl && (
                                        <div className="tasp-comp-highlight-icon" style={{ background: 'transparent', padding: 0 }}>
                                            <img src={card.iconImageUrl} alt="Icon" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                                        </div>
                                    )}

                                    <h3>{card.title}</h3>
                                    <RichText
                                        tagName="p"
                                        value={card.description || ''}
                                        onChange={(value) => updateCard(idx, 'description', value)}
                                        placeholder="Click to edit description..."
                                        style={{
                                            fontSize: '15px',
                                            lineHeight: '1.6',
                                            color: '#64748b',
                                            marginTop: '12px'
                                        }}
                                    />

                                    <div className="tasp-comp-highlight-compare">
                                        <div
                                            className="tasp-comp-compare-col winner"
                                            style={{
                                                background: winnerBgColor,
                                                borderColor: winnerBorderColor,
                                                color: winnerTextColor
                                            }}
                                        >
                                            <h5 style={{ color: winnerTextColor }}>✓ {card.winnerTitle}</h5>
                                            <ul>
                                                {card.winnerFeatures.map((feature, i) => (
                                                    <li key={i}>{feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div
                                            className="tasp-comp-compare-col loser"
                                            style={{
                                                background: loserBgColor,
                                                color: loserTextColor
                                            }}
                                        >
                                            <h5 style={{ color: loserTextColor }}>✗ {card.loserTitle}</h5>
                                            <ul>
                                                {card.loserFeatures.map((feature, i) => (
                                                    <li key={i}>{feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="tasp-comp-highlight-img">
                                        <img src={card.imageUrl} alt={card.title} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    },

    save: () => null
});
