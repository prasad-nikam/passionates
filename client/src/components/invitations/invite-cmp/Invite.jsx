import React from "react";
import { Button } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const User = (props) => {
	const navigate = useNavigate();
	const handleMsgClick = () => {
		navigate(`/message/${props?.user?.email}`, {
			state: { data: props?.user },
		});
	};

	const handleClick = () => {
		console.log("clicked");
	};

	return (
		<div className="">
			<Avatar onClick={handleClick} />

			<div className="flex" onClick={handleClick}>
				user name
			</div>
			<Button
				variant="outlined"
				size="small"
				className="msg"
				onClick={handleMsgClick}
			>
				message
			</Button>
		</div>
	);
};

export default User;
