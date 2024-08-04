import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Badge from "@mui/material/Badge";
import Invite from "./invite-cmp/Invite";

const options = [
	"None",
	"Atria",
	"Callisto",
	"Dione",
	"Ganymede",
	"Hangouts Call",
];

const ITEM_HEIGHT = 48;

export default function Invitations() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<Badge color="success" badgeContent={options.length}>
					<GroupAddIcon />
				</Badge>
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: "40ch",
					},
				}}
			>
				{options.map((option) => (
					<MenuItem
						key={option}
						selected={option === "Pyxis"}
						onClick={handleClose}
					>
						<Invite />
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
