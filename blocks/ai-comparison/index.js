import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, RangeControl } from '@wordpress/components';
import './editor.css';

registerBlockType('tascom/ai-comparison', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        // Get attributes with defaults
        const title = attributes.title || 'Ask AI about Taskip vs SuiteDash';
        const subtitle = attributes.subtitle || 'Get an unbiased summary from your favorite AI assistant';
        const leftIconUrl = attributes.leftIconUrl || '';
        const rightIconUrl = attributes.rightIconUrl || '';
        const titleColor = attributes.titleColor || '#1e293b';
        const subtitleColor = attributes.subtitleColor || '#64748b';
        const buttonBgColor = attributes.buttonBgColor || 'rgba(0, 0, 0, 0.05)';
        const buttonBorderColor = attributes.buttonBorderColor || 'rgba(0, 0, 0, 0.1)';
        const buttonTextColor = attributes.buttonTextColor || '#1e293b';
        const buttonHoverBgColor = attributes.buttonHoverBgColor || 'rgba(0, 0, 0, 0.08)';
        const buttonHoverBorderColor = attributes.buttonHoverBorderColor || 'rgba(0, 0, 0, 0.15)';

        // Responsive padding
        const paddingTopDesktop = attributes.paddingTopDesktop ?? 80;
        const paddingBottomDesktop = attributes.paddingBottomDesktop ?? 80;
        const paddingTopTablet = attributes.paddingTopTablet ?? 60;
        const paddingBottomTablet = attributes.paddingBottomTablet ?? 60;
        const paddingTopMobile = attributes.paddingTopMobile ?? 40;
        const paddingBottomMobile = attributes.paddingBottomMobile ?? 40;

        // AI buttons with prompts
        const buttons = attributes.buttons || [
            {
                text: 'Ask ChatGPT',
                iconUrl: 'https://wcr2.taskip.net/chatgpt.png',
                prompt: 'Compare Taskip vs SuiteDash for agency management'
            },
            {
                text: 'Ask Claude',
                iconUrl: 'https://wcr2.taskip.net/claude.svg',
                prompt: 'Compare Taskip vs SuiteDash for agency management'
            },
            {
                text: 'Ask Perplexity',
                iconUrl: 'https://wcr2.taskip.net/perplexity.svg',
                prompt: 'Compare Taskip vs SuiteDash'
            }
        ];

        // Update button prompt
        const updateButtonPrompt = (index, value) => {
            const updated = [...buttons];
            updated[index] = { ...updated[index], prompt: value };
            setAttributes({ buttons: updated });
        };

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="Content Settings" initialOpen={true}>
                        <TextControl
                            label="Title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                        />
                        <TextControl
                            label="Subtitle"
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                        />
                    </PanelBody>

                    <PanelBody title="Platform Icons" initialOpen={false}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Left Platform Icon</label>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ leftIconUrl: media.url })}
                                    allowedTypes={['image']}
                                    value={leftIconUrl}
                                    render={({ open }) => (
                                        <div>
                                            {leftIconUrl && (
                                                <div style={{ marginBottom: '10px' }}>
                                                    <img src={leftIconUrl} alt="Left Platform" style={{ width: '64px', height: '64px', objectFit: 'contain', border: '1px solid #ddd', borderRadius: '4px', padding: '4px' }} />
                                                </div>
                                            )}
                                            <Button onClick={open} variant="secondary">
                                                {leftIconUrl ? 'Change Image' : 'Upload Image'}
                                            </Button>
                                            {leftIconUrl && (
                                                <Button onClick={() => setAttributes({ leftIconUrl: '' })} variant="link" isDestructive style={{ marginLeft: '10px' }}>
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Right Platform Icon</label>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ rightIconUrl: media.url })}
                                    allowedTypes={['image']}
                                    value={rightIconUrl}
                                    render={({ open }) => (
                                        <div>
                                            {rightIconUrl && (
                                                <div style={{ marginBottom: '10px' }}>
                                                    <img src={rightIconUrl} alt="Right Platform" style={{ width: '64px', height: '64px', objectFit: 'contain', border: '1px solid #ddd', borderRadius: '4px', padding: '4px' }} />
                                                </div>
                                            )}
                                            <Button onClick={open} variant="secondary">
                                                {rightIconUrl ? 'Change Image' : 'Upload Image'}
                                            </Button>
                                            {rightIconUrl && (
                                                <Button onClick={() => setAttributes({ rightIconUrl: '' })} variant="link" isDestructive style={{ marginLeft: '10px' }}>
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </PanelBody>

                    <PanelBody title="AI Prompts" initialOpen={false}>
                        <TextControl
                            label="ChatGPT Prompt"
                            value={buttons[0]?.prompt || ''}
                            onChange={(value) => updateButtonPrompt(0, value)}
                        />
                        <TextControl
                            label="Claude Prompt"
                            value={buttons[1]?.prompt || ''}
                            onChange={(value) => updateButtonPrompt(1, value)}
                        />
                        <TextControl
                            label="Perplexity Prompt"
                            value={buttons[2]?.prompt || ''}
                            onChange={(value) => updateButtonPrompt(2, value)}
                        />
                    </PanelBody>

                    <PanelBody title="Spacing" initialOpen={false}>
                        <p style={{ fontWeight: 600, marginBottom: '8px' }}>Desktop (1025px+)</p>
                        <RangeControl
                            label="Padding Top"
                            value={paddingTopDesktop}
                            onChange={(value) => setAttributes({ paddingTopDesktop: value })}
                            min={0}
                            max={200}
                            step={5}
                        />
                        <RangeControl
                            label="Padding Bottom"
                            value={paddingBottomDesktop}
                            onChange={(value) => setAttributes({ paddingBottomDesktop: value })}
                            min={0}
                            max={200}
                            step={5}
                        />

                        <hr style={{ margin: '20px 0' }} />

                        <p style={{ fontWeight: 600, marginBottom: '8px' }}>Tablet (768px - 1024px)</p>
                        <RangeControl
                            label="Padding Top"
                            value={paddingTopTablet}
                            onChange={(value) => setAttributes({ paddingTopTablet: value })}
                            min={0}
                            max={200}
                            step={5}
                        />
                        <RangeControl
                            label="Padding Bottom"
                            value={paddingBottomTablet}
                            onChange={(value) => setAttributes({ paddingBottomTablet: value })}
                            min={0}
                            max={200}
                            step={5}
                        />

                        <hr style={{ margin: '20px 0' }} />

                        <p style={{ fontWeight: 600, marginBottom: '8px' }}>Mobile (0 - 767px)</p>
                        <RangeControl
                            label="Padding Top"
                            value={paddingTopMobile}
                            onChange={(value) => setAttributes({ paddingTopMobile: value })}
                            min={0}
                            max={200}
                            step={5}
                        />
                        <RangeControl
                            label="Padding Bottom"
                            value={paddingBottomMobile}
                            onChange={(value) => setAttributes({ paddingBottomMobile: value })}
                            min={0}
                            max={200}
                            step={5}
                        />
                    </PanelBody>
                </InspectorControls>

                <section
                    className="tasp-comp-ai"
                    style={{
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                        paddingTop: `${paddingTopDesktop}px`,
                        paddingBottom: `${paddingBottomDesktop}px`
                    }}
                >
                    <div className="taskip-container-1408">
                        <div className="tasp-comp-ai__content">
                            <div className="tasp-comp-ai__icons" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
                                {leftIconUrl ? (
                                    <div style={{ width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '8px' }}>
                                        <img src={leftIconUrl} alt="Platform 1" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                ) : (
                                    <div style={{ width: '64px', height: '64px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', border: '2px dashed rgba(255, 255, 255, 0.3)' }}></div>
                                )}
                                <span style={{ color: '#60a5fa', fontSize: '24px', fontWeight: '600' }}>VS</span>
                                {rightIconUrl ? (
                                    <div style={{ width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '8px' }}>
                                        <img src={rightIconUrl} alt="Platform 2" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                ) : (
                                    <div style={{ width: '64px', height: '64px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', border: '2px dashed rgba(255, 255, 255, 0.3)' }}></div>
                                )}
                            </div>
                            <h2 className="tasp-comp-ai__title" style={{ color: titleColor }}>
                                {title}
                            </h2>
                            <p className="tasp-comp-ai__subtitle" style={{ color: subtitleColor }}>
                                {subtitle}
                            </p>
                            <div className="tasp-comp-ai__buttons">
                                {buttons.map((btn, idx) => {
                                    // Add white bg for ChatGPT and Perplexity
                                    const needsWhiteBg = btn.text.includes('ChatGPT') || btn.text.includes('Perplexity');

                                    return (
                                        <a
                                            key={idx}
                                            href="#"
                                            className="tasp-comp-ai__btn"
                                            style={{
                                                backgroundColor: buttonBgColor,
                                                borderColor: buttonBorderColor,
                                                color: buttonTextColor
                                            }}
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '20px',
                                                height: '20px',
                                                background: needsWhiteBg ? '#ffffff' : 'transparent',
                                                borderRadius: '4px',
                                                padding: needsWhiteBg ? '2px' : '0'
                                            }}>
                                                <img
                                                    src={btn.iconUrl}
                                                    alt={btn.text}
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                />
                                            </span>
                                            {btn.text}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    },

    save: () => null
});
