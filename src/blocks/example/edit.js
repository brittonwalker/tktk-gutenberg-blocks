/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { title } = attributes;

	return (
		<div {...useBlockProps()}>
			<RichText
				tagName="div"
				value={title}
				onChange={(value) => setAttributes({ title: value })}
				placeholder="Title"
				className="title"
			/>
		</div>
	);
}
