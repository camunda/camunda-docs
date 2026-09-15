import { useState } from 'react';
import { Icon } from "@iconify/react";

export default function ExpandableTable({ title, children }) {
	const [showFullscreen, setShowFullscreen] = useState(false);

	const handleShowFullscreen = () => setShowFullscreen(true);
	const handleClose = () => setShowFullscreen(false);

	return (<div className="expandable-table-container">
		<div className="expandable-table-frame">
			<div className="expandable-table-header">
				<span className="expandable-table-header-title">{title}</span>
				<button className="expand-button" onClick={handleShowFullscreen}><Icon icon="bx:expand"/>Show full table</button>
			</div>
			<div className="expandable-table-body">{children}</div>
		</div>

		{showFullscreen ? (
			<div className="expanded-table-modal">
				<div className="expanded-table-modal-backdrop" onClick={handleClose} />
				<div className="expanded-table-modal-contents">
					<button className="close-button" onClick={handleClose}>
						<Icon icon="bx:x" />
					</button>
					{title ? <div className="expanded-table-title">{title}</div> : null}
					{children}
				</div>
			</div>
		) : null}
	</div>);
}

