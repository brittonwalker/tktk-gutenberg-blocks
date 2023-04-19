/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import ServerSideRender from "@wordpress/server-side-render";

/**
 * External dependencies
 */
import tw from "tailwind-styled-components";

/**
 * Internal dependencies
 */
import "./editor.scss";
import Controls from "./controls";

export default function Edit({ attributes, setAttributes }) {
	const { title } = attributes;

	return (
		<div {...useBlockProps()}>
			<Controls attributes={attributes} setAttributes={setAttributes} />
			<div className="content">
				<RichText
					tagName="h2"
					placeholder={__("Title")}
					value={title}
					onChange={(title) => setAttributes({ title })}
				/>
				<Rule />
				<ServerSideRender
					block="tktk-blocks/post-list"
					attributes={attributes}
				/>
			</div>
		</div>
	);
}

const Rule = tw.div`
	border-b
	border-black
	mt-[20px]
	mb-10
`;
