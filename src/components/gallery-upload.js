import { __ } from "@wordpress/i18n";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

const GalleryUpload = ({
	saveData,
	images,
	buttonText,
	removeAll = () => {},
}) => {
	return (
		<MediaUploadCheck
			fallback={`To edit the background image, you need permission to upload media.`}
		>
			<MediaUpload
				onSelect={saveData}
				type="image"
				value={images}
				gallery={true}
				addToGallery={true}
				removeAll={removeAll}
				multiple={true}
				render={({ open }) => (
					<div className="flex gap-4 my-4">
						<Button onClick={open} variant="secondary">
							{__(buttonText, "tktk-blocks")}
						</Button>
						{images.length > 0 && (
							<Button isDestructive onClick={removeAll}>
								{__("Remove All", "tktk-blocks")}
							</Button>
						)}
					</div>
				)}
			/>
		</MediaUploadCheck>
	);
};

export default GalleryUpload;
