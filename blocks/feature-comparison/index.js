import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, SelectControl, RangeControl } from '@wordpress/components';
import './editor.css';

registerBlockType('tascom/feature-comparison', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        // Get attributes with defaults
        const sectionEyebrow = attributes.sectionEyebrow || 'Detailed Comparison';
        const sectionTitle = attributes.sectionTitle || 'Feature-by-Feature Analysis';
        const headerColumn1 = attributes.headerColumn1 || 'Feature';
        const headerColumn2 = attributes.headerColumn2 || 'Taskip';
        const headerColumn3 = attributes.headerColumn3 || 'SuiteDash';

        // Color attributes
        const checkColor = attributes.checkColor || '#10b981';
        const crossColor = attributes.crossColor || '#ef4444';
        const customBadgeColor = attributes.customBadgeColor || '#2563eb';
        const limitedBadgeColor = attributes.limitedBadgeColor || '#f59e0b';
        const comingSoonBadgeColor = attributes.comingSoonBadgeColor || '#8b5cf6';
        const paidBadgeColor = attributes.paidBadgeColor || '#ec4899';
        const headerBgColor = attributes.headerBgColor || '#111827';
        const headerTextColor = attributes.headerTextColor || '#ffffff';
        const categoryBgColor = attributes.categoryBgColor || '#f3f4f6';
        const categoryTextColor = attributes.categoryTextColor || '#6b7280';

        // Spacing attributes
        const sectionSpacing = attributes.sectionSpacing ?? 80;
        const headerPadding = attributes.headerPadding ?? 16;
        const cellPadding = attributes.cellPadding ?? 14;
        const categoryPadding = attributes.categoryPadding ?? 14;

        const categories = attributes.categories || [
            {
                name: 'AI & AUTOMATION',
                rows: [
                    {
                        feature: 'AI Content Writer',
                        col2Type: 'check',
                        col2Badge: 'Winner',
                        col3Type: 'cross'
                    },
                    {
                        feature: 'Smart Suggestions',
                        col2Type: 'check',
                        col3Type: 'cross'
                    }
                ]
            },
            {
                name: 'PROJECT MANAGEMENT',
                rows: [
                    {
                        feature: 'Gantt Charts',
                        col2Type: 'check',
                        col2Badge: 'Winner',
                        col3Type: 'cross'
                    },
                    {
                        feature: 'Time Tracking',
                        col2Type: 'check',
                        col3Type: 'check'
                    }
                ]
            }
        ];

        // Category management
        const updateCategory = (catIndex, field, value) => {
            const updated = [...categories];
            updated[catIndex] = { ...updated[catIndex], [field]: value };
            setAttributes({ categories: updated });
        };

        const addCategory = () => {
            const newCategory = {
                name: 'NEW CATEGORY',
                rows: []
            };
            setAttributes({ categories: [...categories, newCategory] });
        };

        const removeCategory = (catIndex) => {
            const updated = categories.filter((_, i) => i !== catIndex);
            setAttributes({ categories: updated });
        };

        // Row management
        const updateRow = (catIndex, rowIndex, field, value) => {
            const updated = [...categories];
            const rows = [...updated[catIndex].rows];
            rows[rowIndex] = { ...rows[rowIndex], [field]: value };
            updated[catIndex].rows = rows;
            setAttributes({ categories: updated });
        };

        const addRow = (catIndex) => {
            const updated = [...categories];
            const newRow = {
                feature: 'New Feature',
                col2Type: 'check',
                col3Type: 'cross'
            };
            updated[catIndex].rows = [...updated[catIndex].rows, newRow];
            setAttributes({ categories: updated });
        };

        const removeRow = (catIndex, rowIndex) => {
            const updated = [...categories];
            updated[catIndex].rows = updated[catIndex].rows.filter((_, i) => i !== rowIndex);
            setAttributes({ categories: updated });
        };

        const renderCell = (type, text, badge) => {
            if (type === 'check') {
                return (
                    <>
                        <span className="tbl-check" style={{ color: checkColor }}>✓</span>
                        {badge && <span className="tbl-badge" style={{ background: customBadgeColor }}>{badge}</span>}
                    </>
                );
            } else if (type === 'cross') {
                return <span className="tbl-cross" style={{ color: crossColor }}>✗</span>;
            } else if (type === 'limited') {
                return <span className="tbl-badge tbl-badge-limited" style={{ background: limitedBadgeColor }}>Limited</span>;
            } else if (type === 'coming-soon') {
                return <span className="tbl-badge tbl-badge-coming-soon" style={{ background: comingSoonBadgeColor }}>Coming Soon</span>;
            } else if (type === 'paid') {
                return <span className="tbl-badge tbl-badge-paid" style={{ background: paidBadgeColor }}>Paid Add-on</span>;
            } else if (type === 'text') {
                return <span dangerouslySetInnerHTML={{ __html: text }} />;
            }
            return null;
        };

        return (
            <div {...blockProps}>
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
                            label="Column 1 Header"
                            value={headerColumn1}
                            onChange={(value) => setAttributes({ headerColumn1: value })}
                        />
                        <TextControl
                            label="Column 2 Header"
                            value={headerColumn2}
                            onChange={(value) => setAttributes({ headerColumn2: value })}
                        />
                        <TextControl
                            label="Column 3 Header"
                            value={headerColumn3}
                            onChange={(value) => setAttributes({ headerColumn3: value })}
                        />
                    </PanelBody>

                    <PanelBody title="Categories & Rows" initialOpen={false}>
                        {categories.map((category, catIndex) => (
                            <div key={catIndex} style={{ marginBottom: '32px', padding: '16px', border: '2px solid #2563eb', borderRadius: '8px', background: '#eff6ff' }}>
                                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#2563eb' }}>
                                    Category {catIndex + 1}
                                </h4>
                                <TextControl
                                    label="Category Name"
                                    value={category.name}
                                    onChange={(value) => updateCategory(catIndex, 'name', value)}
                                    help="Uppercase text that spans all columns"
                                />

                                <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                                    <h5 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 600 }}>Rows in this category:</h5>
                                    {category.rows.map((row, rowIndex) => (
                                        <div key={rowIndex} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', background: '#fff' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <strong style={{ fontSize: '12px' }}>Row {rowIndex + 1}</strong>
                                                <Button
                                                    isSmall
                                                    isDestructive
                                                    onClick={() => removeRow(catIndex, rowIndex)}
                                                >
                                                    Remove
                                                </Button>
                                            </div>

                                            <TextControl
                                                label="Feature Name"
                                                value={row.feature}
                                                onChange={(value) => updateRow(catIndex, rowIndex, 'feature', value)}
                                            />

                                            <SelectControl
                                                label={`${headerColumn2} Type`}
                                                value={row.col2Type || 'check'}
                                                options={[
                                                    { label: 'Check ✓', value: 'check' },
                                                    { label: 'Cross ✗', value: 'cross' },
                                                    { label: 'Limited', value: 'limited' },
                                                    { label: 'Coming Soon', value: 'coming-soon' },
                                                    { label: 'Paid Add-on', value: 'paid' },
                                                    { label: 'Custom Text', value: 'text' }
                                                ]}
                                                onChange={(value) => updateRow(catIndex, rowIndex, 'col2Type', value)}
                                            />

                                            {row.col2Type === 'text' && (
                                                <TextControl
                                                    label={`${headerColumn2} Text`}
                                                    value={row.col2Text || ''}
                                                    onChange={(value) => updateRow(catIndex, rowIndex, 'col2Text', value)}
                                                    help="You can use HTML like <strong>$49/mo</strong>"
                                                />
                                            )}

                                            {(row.col2Type === 'check' || row.col2Type === 'cross') && (
                                                <TextControl
                                                    label={`${headerColumn2} Badge (optional)`}
                                                    value={row.col2Badge || ''}
                                                    onChange={(value) => updateRow(catIndex, rowIndex, 'col2Badge', value)}
                                                    help="e.g., 'Winner', 'Best Value'"
                                                />
                                            )}

                                            <SelectControl
                                                label={`${headerColumn3} Type`}
                                                value={row.col3Type || 'cross'}
                                                options={[
                                                    { label: 'Check ✓', value: 'check' },
                                                    { label: 'Cross ✗', value: 'cross' },
                                                    { label: 'Limited', value: 'limited' },
                                                    { label: 'Coming Soon', value: 'coming-soon' },
                                                    { label: 'Paid Add-on', value: 'paid' },
                                                    { label: 'Custom Text', value: 'text' }
                                                ]}
                                                onChange={(value) => updateRow(catIndex, rowIndex, 'col3Type', value)}
                                            />

                                            {row.col3Type === 'text' && (
                                                <TextControl
                                                    label={`${headerColumn3} Text`}
                                                    value={row.col3Text || ''}
                                                    onChange={(value) => updateRow(catIndex, rowIndex, 'col3Text', value)}
                                                    help="You can use HTML"
                                                />
                                            )}

                                            {(row.col3Type === 'check' || row.col3Type === 'cross') && (
                                                <TextControl
                                                    label={`${headerColumn3} Badge (optional)`}
                                                    value={row.col3Badge || ''}
                                                    onChange={(value) => updateRow(catIndex, rowIndex, 'col3Badge', value)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <Button
                                        isSecondary
                                        onClick={() => addRow(catIndex)}
                                        style={{ marginTop: '8px', width: '100%' }}
                                    >
                                        + Add Row to "{category.name}"
                                    </Button>
                                </div>

                                <Button
                                    isDestructive
                                    onClick={() => removeCategory(catIndex)}
                                    style={{ width: '100%' }}
                                >
                                    Remove Category
                                </Button>
                            </div>
                        ))}
                        <Button isPrimary onClick={addCategory} style={{ marginTop: '12px', width: '100%' }}>
                            + Add Category
                        </Button>
                    </PanelBody>

                    <PanelColorSettings
                        title="Check & Cross Colors"
                        colorSettings={[
                            {
                                value: checkColor,
                                onChange: (value) => setAttributes({ checkColor: value }),
                                label: 'Check Mark Color'
                            },
                            {
                                value: crossColor,
                                onChange: (value) => setAttributes({ crossColor: value }),
                                label: 'Cross Mark Color'
                            }
                        ]}
                    />

                    <PanelColorSettings
                        title="Badge Colors"
                        colorSettings={[
                            {
                                value: customBadgeColor,
                                onChange: (value) => setAttributes({ customBadgeColor: value }),
                                label: 'Custom Badge (Winner, etc.)'
                            },
                            {
                                value: limitedBadgeColor,
                                onChange: (value) => setAttributes({ limitedBadgeColor: value }),
                                label: 'Limited Badge'
                            },
                            {
                                value: comingSoonBadgeColor,
                                onChange: (value) => setAttributes({ comingSoonBadgeColor: value }),
                                label: 'Coming Soon Badge'
                            },
                            {
                                value: paidBadgeColor,
                                onChange: (value) => setAttributes({ paidBadgeColor: value }),
                                label: 'Paid Add-on Badge'
                            }
                        ]}
                    />

                    <PanelColorSettings
                        title="Table Colors"
                        colorSettings={[
                            {
                                value: headerBgColor,
                                onChange: (value) => setAttributes({ headerBgColor: value }),
                                label: 'Header Background'
                            },
                            {
                                value: headerTextColor,
                                onChange: (value) => setAttributes({ headerTextColor: value }),
                                label: 'Header Text'
                            },
                            {
                                value: categoryBgColor,
                                onChange: (value) => setAttributes({ categoryBgColor: value }),
                                label: 'Category Background'
                            },
                            {
                                value: categoryTextColor,
                                onChange: (value) => setAttributes({ categoryTextColor: value }),
                                label: 'Category Text'
                            }
                        ]}
                    />

                    {/* Spacing Settings */}
                    <PanelBody title="Spacing" initialOpen={false}>
                        <RangeControl
                            label="Section Spacing (Top/Bottom)"
                            value={sectionSpacing}
                            onChange={(value) => setAttributes({ sectionSpacing: value })}
                            min={0}
                            max={200}
                            step={4}
                            help="Vertical padding for the section"
                        />
                        <RangeControl
                            label="Header Cell Padding"
                            value={headerPadding}
                            onChange={(value) => setAttributes({ headerPadding: value })}
                            min={8}
                            max={40}
                            step={2}
                            help="Padding for table header cells"
                        />
                        <RangeControl
                            label="Regular Cell Padding"
                            value={cellPadding}
                            onChange={(value) => setAttributes({ cellPadding: value })}
                            min={8}
                            max={40}
                            step={2}
                            help="Padding for table data cells"
                        />
                        <RangeControl
                            label="Category Row Padding"
                            value={categoryPadding}
                            onChange={(value) => setAttributes({ categoryPadding: value })}
                            min={8}
                            max={40}
                            step={2}
                            help="Padding for category header rows"
                        />
                    </PanelBody>
                </InspectorControls>

                <section className="section section-alt" style={{ paddingTop: `${sectionSpacing}px`, paddingBottom: `${sectionSpacing}px` }}>
                    <div className="container">
                        <div className="section-header center">
                            <p className="section-eyebrow">{sectionEyebrow}</p>
                            <h2 className="section-title">{sectionTitle}</h2>
                        </div>
                        <div className="table-wrap">
                            <table className="comp-table">
                                <thead>
                                    <tr style={{ background: headerBgColor, color: headerTextColor }}>
                                        <th style={{ padding: `${headerPadding}px 20px` }}>{headerColumn1}</th>
                                        <th style={{ padding: `${headerPadding}px 20px` }}>{headerColumn2}</th>
                                        <th style={{ padding: `${headerPadding}px 20px` }}>{headerColumn3}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category, catIdx) => (
                                        <React.Fragment key={catIdx}>
                                            <tr className="cat">
                                                <td colSpan="3" style={{ background: categoryBgColor, color: categoryTextColor, padding: `${categoryPadding}px 20px` }}>{category.name}</td>
                                            </tr>
                                            {category.rows.map((row, rowIdx) => (
                                                <tr key={rowIdx}>
                                                    <td style={{ padding: `${cellPadding}px 20px` }}>{row.feature}</td>
                                                    <td style={{ padding: `${cellPadding}px 20px` }}>
                                                        {renderCell(row.col2Type, row.col2Text, row.col2Badge)}
                                                    </td>
                                                    <td style={{ padding: `${cellPadding}px 20px` }}>
                                                        {renderCell(row.col3Type, row.col3Text, row.col3Badge)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        );
    },

    save: () => null
});
