import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ToggleControl } from '@wordpress/components';
import './editor.css';

registerBlockType('tascom/pricing-scale', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        // Get attributes with defaults
        const sectionEyebrow = attributes.sectionEyebrow || 'Cost Analysis';
        const sectionTitle = attributes.sectionTitle || 'Pricing at Scale';
        const sectionDescription = attributes.sectionDescription || 'How costs compare as your team grows. Taskip offers flat per-workspace pricing.';
        const taskipLabel = attributes.taskipLabel || 'Taskip';
        const competitorLabel = attributes.competitorLabel || 'SuiteDash';
        const featuredBadgeText = attributes.featuredBadgeText || 'RECOMMENDED';

        // Color variables
        const taskipPriceColor = attributes.taskipPriceColor || '#2563eb';
        const competitorPriceColor = attributes.competitorPriceColor || '#9ca3af';
        const savingsBgColor = attributes.savingsBgColor || '#dcfce7';
        const savingsTextColor = attributes.savingsTextColor || '#166534';
        const featuredBorderColor = attributes.featuredBorderColor || '#2563eb';
        const featuredBadgeBgColor = attributes.featuredBadgeBgColor || '#2563eb';
        const featuredBadgeTextColor = attributes.featuredBadgeTextColor || '#ffffff';

        const cards = attributes.cards || [
            {
                teamSize: '3',
                taskipPrice: '$49',
                competitorPrice: '$57',
                savings: '',
                featured: false
            },
            {
                teamSize: '5',
                taskipPrice: '$49',
                competitorPrice: '$95',
                savings: 'Save 48%',
                featured: false
            },
            {
                teamSize: '10',
                taskipPrice: '$49',
                competitorPrice: '$190',
                savings: 'Save 74%',
                featured: true
            },
            {
                teamSize: '20',
                taskipPrice: '$49',
                competitorPrice: '$380',
                savings: 'Save 87%',
                featured: false
            }
        ];

        // Card management functions
        const updateCard = (index, field, value) => {
            const updatedCards = [...cards];
            updatedCards[index] = { ...updatedCards[index], [field]: value };
            setAttributes({ cards: updatedCards });
        };

        const addCard = () => {
            setAttributes({
                cards: [...cards, {
                    teamSize: '15',
                    taskipPrice: '$49',
                    competitorPrice: '$285',
                    savings: '',
                    featured: false
                }]
            });
        };

        const removeCard = (index) => {
            const updatedCards = cards.filter((_, i) => i !== index);
            setAttributes({ cards: updatedCards });
        };

        return (
            <div {...blockProps}>
                <InspectorControls>
                    {/* Section Header Settings */}
                    <PanelBody title="Section Header" initialOpen={true}>
                        <TextControl
                            label="Eyebrow Text"
                            value={sectionEyebrow}
                            onChange={(value) => setAttributes({ sectionEyebrow: value })}
                        />
                        <TextControl
                            label="Section Title"
                            value={sectionTitle}
                            onChange={(value) => setAttributes({ sectionTitle: value })}
                        />
                        <TextControl
                            label="Description"
                            value={sectionDescription}
                            onChange={(value) => setAttributes({ sectionDescription: value })}
                        />
                    </PanelBody>

                    {/* Labels Settings */}
                    <PanelBody title="Labels" initialOpen={false}>
                        <TextControl
                            label="Taskip Label"
                            value={taskipLabel}
                            onChange={(value) => setAttributes({ taskipLabel: value })}
                        />
                        <TextControl
                            label="Competitor Label"
                            value={competitorLabel}
                            onChange={(value) => setAttributes({ competitorLabel: value })}
                        />
                        <TextControl
                            label="Featured Badge Text"
                            value={featuredBadgeText}
                            onChange={(value) => setAttributes({ featuredBadgeText: value })}
                        />
                    </PanelBody>

                    {/* Cards Management */}
                    <PanelBody title="Pricing Cards" initialOpen={false}>
                        {cards.map((card, index) => (
                            <PanelBody
                                key={index}
                                title={`Card ${index + 1} - Team Size: ${card.teamSize}`}
                                initialOpen={false}
                            >
                                <TextControl
                                    label="Team Size"
                                    value={card.teamSize}
                                    onChange={(value) => updateCard(index, 'teamSize', value)}
                                />
                                <TextControl
                                    label={`${taskipLabel} Price`}
                                    value={card.taskipPrice}
                                    onChange={(value) => updateCard(index, 'taskipPrice', value)}
                                />
                                <TextControl
                                    label={`${competitorLabel} Price`}
                                    value={card.competitorPrice}
                                    onChange={(value) => updateCard(index, 'competitorPrice', value)}
                                />
                                <TextControl
                                    label="Savings Text"
                                    value={card.savings}
                                    onChange={(value) => updateCard(index, 'savings', value)}
                                    help="Leave empty to hide savings badge"
                                />
                                <ToggleControl
                                    label="Featured Card"
                                    checked={card.featured}
                                    onChange={(value) => updateCard(index, 'featured', value)}
                                    help="Show featured badge on this card"
                                />
                                <Button
                                    isDestructive
                                    onClick={() => removeCard(index)}
                                    disabled={cards.length <= 1}
                                >
                                    Remove Card
                                </Button>
                            </PanelBody>
                        ))}
                        <Button isPrimary onClick={addCard}>
                            Add New Card
                        </Button>
                    </PanelBody>

                    {/* Price Colors */}
                    <PanelColorSettings
                        title="Price Colors"
                        colorSettings={[
                            {
                                value: taskipPriceColor,
                                onChange: (value) => setAttributes({ taskipPriceColor: value }),
                                label: `${taskipLabel} Price Color`
                            },
                            {
                                value: competitorPriceColor,
                                onChange: (value) => setAttributes({ competitorPriceColor: value }),
                                label: `${competitorLabel} Price Color`
                            }
                        ]}
                    />

                    {/* Savings Badge Colors */}
                    <PanelColorSettings
                        title="Savings Badge Colors"
                        colorSettings={[
                            {
                                value: savingsBgColor,
                                onChange: (value) => setAttributes({ savingsBgColor: value }),
                                label: 'Background Color'
                            },
                            {
                                value: savingsTextColor,
                                onChange: (value) => setAttributes({ savingsTextColor: value }),
                                label: 'Text Color'
                            }
                        ]}
                    />

                    {/* Featured Card Colors */}
                    <PanelColorSettings
                        title="Featured Card Colors"
                        colorSettings={[
                            {
                                value: featuredBorderColor,
                                onChange: (value) => setAttributes({ featuredBorderColor: value }),
                                label: 'Border Color'
                            },
                            {
                                value: featuredBadgeBgColor,
                                onChange: (value) => setAttributes({ featuredBadgeBgColor: value }),
                                label: 'Badge Background'
                            },
                            {
                                value: featuredBadgeTextColor,
                                onChange: (value) => setAttributes({ featuredBadgeTextColor: value }),
                                label: 'Badge Text Color'
                            }
                        ]}
                    />
                </InspectorControls>

                <section className="section">
                    <div className="container">
                        <div className="section-header center">
                            <p className="section-eyebrow">{sectionEyebrow}</p>
                            <h2 className="section-title">{sectionTitle}</h2>
                            <p className="section-desc">{sectionDescription}</p>
                        </div>
                        <div className="pricing-grid">
                            {cards.map((card, index) => (
                                <div
                                    key={index}
                                    className={`pricing-card ${card.featured ? 'featured' : ''}`}
                                    style={card.featured ? {
                                        borderColor: featuredBorderColor,
                                        position: 'relative'
                                    } : {}}
                                >
                                    {card.featured && (
                                        <span
                                            className="featured-badge"
                                            style={{
                                                position: 'absolute',
                                                top: '-10px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                background: featuredBadgeBgColor,
                                                color: featuredBadgeTextColor,
                                                padding: '4px 12px',
                                                borderRadius: '4px',
                                                fontSize: '10px',
                                                fontWeight: '700'
                                            }}
                                        >
                                            {featuredBadgeText}
                                        </span>
                                    )}
                                    <h4>Team Size</h4>
                                    <div className="team-size">{card.teamSize}</div>
                                    <div className="pricing-row">
                                        <span>{taskipLabel}</span>
                                        <span className="price-blue" style={{ color: taskipPriceColor }}>{card.taskipPrice}</span>
                                    </div>
                                    <div className="pricing-row">
                                        <span>{competitorLabel}</span>
                                        <span className="price-gray" style={{ color: competitorPriceColor }}>{card.competitorPrice}</span>
                                    </div>
                                    {card.savings && (
                                        <span
                                            className="savings"
                                            style={{
                                                background: savingsBgColor,
                                                color: savingsTextColor
                                            }}
                                        >
                                            {card.savings}
                                        </span>
                                    )}
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
