import React, { useState } from "react";

const Collapsible = ({
	title,
	children,
	className = "",
	wrapperClasses = "",
	childWrapperClasses = "",
	titleClasses = "",
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleCollapse = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={wrapperClasses}>
			<div
				className={`flex justify-between items-center cursor-pointer ${className}`}
				onClick={toggleCollapse}
			>
				<h3 className={titleClasses}>{title}</h3>
				<span className="text-xl">{isOpen ? "-" : "+"}</span>
			</div>
			<div
				className={`overflow-hidden transition-all duration-300 ease-in-out ${
					isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div className={childWrapperClasses}>{children}</div>
			</div>
		</div>
	);
};

export default Collapsible;
