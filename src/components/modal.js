import { Modal } from "@wordpress/components";
import { useState } from "@wordpress/element";

const CustomModal = ({
	children,
	title = "Custom Modal",
	buttonText = "Open Modal",
}) => {
	const [isOpen, setOpen] = useState(false);

	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	return (
		<>
			<button className="button button-primary" onClick={openModal}>
				{buttonText}
			</button>
			{isOpen && (
				<Modal title={title} onRequestClose={closeModal} isOpen={isOpen}>
					{children}
				</Modal>
			)}
		</>
	);
};

export default CustomModal;
