import { __ } from "@wordpress/i18n";
import {
	PanelBody,
	Panel,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

const Controls = ({ attributes, setAttributes }) => {
	const postTypeOptions = [
		{ label: __("Post"), value: "post" },
		{ label: __("Latest Insights"), value: "latest_insights" },
		{ label: __("News & Press"), value: "news_press" },
		{ label: __("Video"), value: "video" },
		{ label: __("Podcast"), value: "podcast" },
		{ label: __("Case Study"), value: "case_study" },
		{ label: __("Event"), value: "event" },
		{ label: __("Report"), value: "report" },
	];

	return (
		<InspectorControls>
			<PanelBody title={__("Post List Settings")}>
				<Panel>
					<PanelRow>
						<div className="w-full">
							<SelectControl
								label={__("Post Type")}
								value={attributes.postType}
								options={postTypeOptions}
								onChange={(postType) => setAttributes({ postType })}
							/>
						</div>
					</PanelRow>
				</Panel>
			</PanelBody>
		</InspectorControls>
	);
};

export default Controls;
