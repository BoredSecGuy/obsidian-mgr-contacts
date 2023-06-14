import { setIcon } from "obsidian";
import * as React from "react";
import { Sort } from "src/util/constants";

type HeaderProps = {
	onSortChange: React.Dispatch<React.SetStateAction<Sort>>;
	sort: Sort;
	onCreateContact: () => void;
};

export const HeaderView = (props: HeaderProps, onSearchQueryChange:string) => {
	const buttons = React.useRef<(HTMLElement | null)[]>([]);

	React.useEffect(() => {
		buttons.current.forEach(setIconForButton);
	}, [buttons]);

	return (
		<div>
			<div className="nav-header">
				<div className="nav-buttons-container">
					<div
						id="create-btn"
						className="clickable-icon nav-action-button"
						aria-label="Create New Contact"
						onClick={props.onCreateContact}
					>
						Create
					</div>
					<div className="vl"></div>
					<div
						id="sort-by-name-btn"
						data-icon="baseline"
						className={
							"clickable-icon nav-action-button " +
							(props.sort === Sort.NAME && "is-active")
						}
						aria-label="Sort By Name"
						ref={(element) => (buttons.current[1] = element)}
						onClick={() => props.onSortChange(Sort.NAME)}
					/>
				</div>
			</div>
		</div>
	);
};

function setIconForButton(button: HTMLElement | null) {
	if (button != null) {
		const icon = button.getAttr("data-icon");
		if (icon != null) {
			setIcon(button, icon, 16);
		}
	}
}
