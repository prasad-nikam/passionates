import React, { useState, useEffect } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LoginData from "../loginData/LoginData";
import { NodeInstance } from "../../../APIs/axiosInstance";
import Invitations from "../invitations/Invitations";
import SearchBar from "../Search/SearchBar";

const Navbar = ({ rerender }) => {
	const navigate = useNavigate();
	// console.log(rerender);

	const [logBtn, setLogBtn] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await NodeInstance.get("/auth/me", {
					withCredentials: true,
				});
				if (response.status == 200) {
					setLogBtn("Logout");
				} else {
					setLogBtn("Login");
				}
			} catch (error) {
				setLogBtn("Login");
				console.log(error?.response?.data);
			}
		};

		fetchData();
		return () => { };
	}, [rerender]);

	const logHandleClick = async () => {
		if (logBtn === "Logout") {
			await NodeInstance.post("/auth/logout");
			setLogBtn("Login");
			navigate("/login");
		} else {
			navigate("/login");
		}
	};

	return (
		<div className="flex justify-between items-center p-1 bg-indigo-400 h-11 ">
			<div
				className="flex items-center gap-1 justify-start cursor-pointer "
				onClick={() => {
					navigate("/");
				}}
			>
				<div className="logo">
					<img
						alt="Logo"
						src="/logo.png"
						className="bg-transparent h-9 w-9"
					/>
				</div>
				<h2 className="text-xl">Passionates</h2>
			</div>
			<div className="flex items-center justify-end gap-2 ">
				<div className="flex gap-2">
					<SearchBar />
				</div>
				<Link onClick={logHandleClick}>
					<Button variant="outlined">{logBtn}</Button>
				</Link>
				<Link to="/">
					<Button variant="">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							width="30"
							height="30"
							viewBox="0 0 48 48"
						>
							<path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z"></path>
						</svg>
					</Button>
				</Link>

				<div></div>

				<Invitations />
				<LoginData rerender={rerender} />
			</div>
		</div>
	);
};

export default Navbar;
