import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps, AlignmentToolbar, BlockControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ToggleControl } from '@wordpress/components';
import './editor.css';

registerBlockType('tascom/pricing-comparison', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        // Get attributes with defaults
        const sectionEyebrow = attributes.sectionEyebrow || 'Pricing Comparison';
        const sectionTitle = attributes.sectionTitle || 'See how costs compare as your team grows';
        const textAlignment = attributes.textAlignment || 'center';
        const headerLeft = attributes.headerLeft || 'Team Size';
        const headerTaskip = attributes.headerTaskip || 'Taskip';
        const headerCompetitor = attributes.headerCompetitor || 'SuiteDash';
        const noteText = attributes.noteText || '💡 <strong>Pro tip:</strong> With Taskip, you pay the same price whether you have 3 or 30 team members.';
        const showNote = attributes.showNote !== false;

        // Color attributes
        const taskipPriceColor = attributes.taskipPriceColor || '#3b82f6';
        const competitorPriceColor = attributes.competitorPriceColor || '#64748b';
        const savingsBgColor = attributes.savingsBgColor || '#10b98133';
        const savingsTextColor = attributes.savingsTextColor || '#059669';
        const headerBgColor = attributes.headerBgColor || '#1f2937';
        const headerTextColor = attributes.headerTextColor || '#ffffff';

        const rows = attributes.rows || [
            {
                teamSize: '3 Team Members',
                taskipPrice: '$49/mo',
                competitorPrice: '$57/mo',
                savings: ''
            },
            {
                teamSize: '5 Team Members',
                taskipPrice: '$49/mo',
                competitorPrice: '$95/mo',
                savings: 'Save 48%'
            },
            {
                teamSize: '10 Team Members',
                taskipPrice: '$49/mo',
                competitorPrice: '$190/mo',
                savings: 'Save 74%'
            },
            {
                teamSize: '20 Team Members',
                taskipPrice: '$49/mo',
                competitorPrice: '$380/mo',
                savings: 'Save 87%'
            }
        ];

        // Row management functions
        const updateRow = (index, field, value) => {
            const updated = [...rows];
            updated[index] = { ...updated[index], [field]: value };
            setAttributes({ rows: updated });
        };

        const addRow = () => {
            const newRow = {
                teamSize: 'New Team Size',
                taskipPrice: '$49/mo',
                competitorPrice: '$99/mo',
                savings: ''
            };
            setAttributes({ rows: [...rows, newRow] });
        };

        const removeRow = (index) => {
            const updated = rows.filter((_, i) => i !== index);
            setAttributes({ rows: updated });
        };

        return (
            <div {...blockProps}>
                <BlockControls>
                    <AlignmentToolbar
                        value={textAlignment}
                        onChange={(value) => setAttributes({ textAlignment: value })}
                    />
                </BlockControls>

                <InspectorControls>
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
                    </PanelBody>

                    <PanelBody title="Table Headers" initialOpen={false}>
                        <TextControl
                            label="Left Column Header"
                            value={headerLeft}
                            onChange={(value) => setAttributes({ headerLeft: value })}
                        />
                        <TextControl
                            label="Taskip Column Header"
                            value={headerTaskip}
                            onChange={(value) => setAttributes({ headerTaskip: value })}
                        />
                        <TextControl
                            label="Competitor Column Header"
                            value={headerCompetitor}
                            onChange={(value) => setAttributes({ headerCompetitor: value })}
                        />
                    </PanelBody>

                    <PanelBody title="Pricing Rows" initialOpen={false}>
                        {rows.map((row, index) => (
                            <div key={index} style={{ marginBottom: '24px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9fafb' }}>
                                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Row {index + 1}</h4>
                                <TextControl
                                    label="Team Size"
                                    value={row.teamSize}
                                    onChange={(value) => updateRow(index, 'teamSize', value)}
                                />
                                <TextControl
                                    label="Taskip Price"
                                    value={row.taskipPrice}
                                    onChange={(value) => updateRow(index, 'taskipPrice', value)}
                                />
                                <TextControl
                                    label="Competitor Price"
                                    value={row.competitorPrice}
                                    onChange={(value) => updateRow(index, 'competitorPrice', value)}
                                />
                                <TextControl
                                    label="Savings Badge (optional)"
                                    value={row.savings}
                                    onChange={(value) => updateRow(index, 'savings', value)}
                                    help="e.g., 'Save 48%' - leave empty to hide"
                                />
                                <Button
                                    isDestructive
                                    onClick={() => removeRow(index)}
                                    style={{ marginTop: '12px' }}
                                >
                                    Remove Row
                                </Button>
                            </div>
                        ))}
                        <Button isPrimary onClick={addRow} style={{ marginTop: '12px' }}>
                            + Add Row
                        </Button>
                    </PanelBody>

                    <PanelBody title="Bottom Note" initialOpen={false}>
                        <ToggleControl
                            label="Show Bottom Note"
                            checked={showNote}
                            onChange={(value) => setAttributes({ showNote: value })}
                        />
                        {showNote && (
                            <TextControl
                                label="Note Text"
                                value={noteText}
                                onChange={(value) => setAttributes({ noteText: value })}
                                help="You can use HTML like <strong>bold</strong>"
                            />
                        )}
                    </PanelBody>

                    <PanelColorSettings
                        title="Price Colors"
                        colorSettings={[
                            {
                                value: taskipPriceColor,
                                onChange: (value) => setAttributes({ taskipPriceColor: value }),
                                label: 'Taskip Price Color'
                            },
                            {
                                value: competitorPriceColor,
                                onChange: (value) => setAttributes({ competitorPriceColor: value }),
                                label: 'Competitor Price Color'
                            }
                        ]}
                    />

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

                    <PanelColorSettings
                        title="Table Header Colors"
                        colorSettings={[
                            {
                                value: headerBgColor,
                                onChange: (value) => setAttributes({ headerBgColor: value }),
                                label: 'Background Color'
                            },
                            {
                                value: headerTextColor,
                                onChange: (value) => setAttributes({ headerTextColor: value }),
                                label: 'Text Color'
                            }
                        ]}
                    />
                </InspectorControls>

                <section className="tasp-comp-section tasp-comp-section--gray">
                    <div className="tasp-comp-container">
                        <div className="tasp-comp-section__header" style={{ textAlign: textAlignment }}>
                            <span className="tasp-comp-section__eyebrow">{sectionEyebrow}</span>
                            <h2 className="tasp-comp-section__title">{sectionTitle}</h2>
                        </div>
                        <div className="tasp-comp-pricing__visual">
                            <div className="tasp-comp-pricing__chart">
                                <div
                                    className="tasp-comp-pricing__chart-header"
                                    style={{
                                        background: headerBgColor,
                                        color: headerTextColor
                                    }}
                                >
                                    <div className="tasp-comp-pricing__chart-header-cell">{headerLeft}</div>
                                    <div className="tasp-comp-pricing__chart-header-cell">{headerTaskip}</div>
                                    <div className="tasp-comp-pricing__chart-header-cell">{headerCompetitor}</div>
                                </div>
                                {rows.map((row, idx) => (
                                    <div key={idx} className="tasp-comp-pricing__chart-row">
                                        <div className="tasp-comp-pricing__chart-cell">{row.teamSize}</div>
                                        <div className="tasp-comp-pricing__chart-cell">
                                            <span
                                                className="tasp-comp-pricing__price tasp-comp-pricing__price--taskip"
                                                style={{ color: taskipPriceColor }}
                                            >
                                                {row.taskipPrice}
                                            </span>
                                            {row.savings && (
                                                <span
                                                    className="tasp-comp-pricing__savings"
                                                    style={{
                                                        background: savingsBgColor,
                                                        color: savingsTextColor
                                                    }}
                                                >
                                                    {row.savings}
                                                </span>
                                            )}
                                        </div>
                                        <div className="tasp-comp-pricing__chart-cell">
                                            <span
                                                className="tasp-comp-pricing__price tasp-comp-pricing__price--competitor"
                                                style={{ color: competitorPriceColor }}
                                            >
                                                {row.competitorPrice}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {showNote && (
                                <div className="tasp-comp-pricing__note">
                                    <p dangerouslySetInnerHTML={{ __html: noteText }} />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        );
    },

    save: () => null
});
