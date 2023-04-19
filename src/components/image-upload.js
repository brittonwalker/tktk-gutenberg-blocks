import { __ } from "@wordpress/i18n";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { ResponsiveWrapper, Spinner } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { Icon, close } from "@wordpress/icons";

import classNames from "classnames";

const ImageUpload = ({ saveData, removeData, imageUrl, imageId }) => {
	const { image } = useSelect((select) => {
		const { getMedia } = select("core");
		return {
			image: imageId ? getMedia(imageId) : null,
		};
	});

	return (
		<>
			<MediaUploadCheck
				fallback={`To edit the background image, you need permission to upload media.`}
			>
				<MediaUpload
					onSelect={saveData}
					type="image"
					value={imageId}
					render={({ open }) => (
						<div
							onClick={open}
							className={classNames(
								"nav-image-wrap",
								"editor-post-featured-image__preview",
								"overflow-hidden",
								{
									"bg-[#f5f5f5]": !image,
								}
							)}
						>
							{!imageId && (
								<ResponsiveWrapper naturalWidth={1080} naturalHeight={608}>
									<div className="flex items-center justify-center">
										Click to choose image
									</div>
								</ResponsiveWrapper>
							)}
							{!!imageId && !image && (
								<ResponsiveWrapper naturalWidth={1080} naturalHeight={608}>
									<div className="flex items-center justify-center">
										<Spinner
											style={{
												height: "calc(4px * 20)",
												width: "calc(4px * 20)",
												backgroundColor: "#fff",
											}}
										/>
									</div>
								</ResponsiveWrapper>
							)}
							{!!imageId && image && (
								<div className="relative cursor-pointer">
									<ResponsiveWrapper
										naturalWidth={image.media_details.width}
										naturalHeight={image.media_details.height}
									>
										<div className="valet-sub-nav__image-wrapper">
											<img src={imageUrl} alt={__("Image")} />
										</div>
									</ResponsiveWrapper>
									<div className="absolute top-2 right-2">
										<div
											onClick={removeData}
											className="rounded-full border border-black p-2 bg-white hover:bg-black hover:text-white cursor-pointer transition-colors duration-200 ease-in-out"
										>
											<Icon icon={close} />
										</div>
									</div>
								</div>
							)}
						</div>
					)}
				/>
			</MediaUploadCheck>
		</>
	);
};

export default ImageUpload;
