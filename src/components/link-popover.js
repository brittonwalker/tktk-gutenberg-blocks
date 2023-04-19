import { __experimentalLinkControl as LinkControl } from "@wordpress/block-editor";

import { TextControl, Popover } from "@wordpress/components";

const LinkPopover = ({
	onClose = () => {},
	onChangeText = () => {},
	onChangeAnchor = () => {},
	onChangeLink = () => {},
	text = "",
	url = "",
	anchor = "",
	opensInNewTab = false,
	isAnchor = false,
	title = "Link",
	hideText = false
}) => {
	return (
		<Popover position="bottom center" onClose={onClose}>
			<div className="w-[380px]">
				<div className="p-4 border-b border-black">
					<div className="link-popover__title">{title}</div>
				</div>
				<div className="p-4">
					{ !hideText && <TextControl label="Link Text" value={text} onChange={onChangeText} /> }
				</div>
				<div>
					<label className="cursor-none px-4">Link</label>
					{isAnchor ? (
						<div className="p-4">
							<TextControl
								label="Anchor Link"
								value={anchor}
								onChange={onChangeAnchor}
							/>
						</div>
					) : (
						<LinkControl
							value={{
								url,
								opensInNewTab,
							}}
							onChange={onChangeLink}
						/>
					)}
				</div>
			</div>
		</Popover>
	);
};

export default LinkPopover;
