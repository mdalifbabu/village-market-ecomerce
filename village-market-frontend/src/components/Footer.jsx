import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<>
			<div className="py-6 px-8" style={{ background: 'linear-gradient(to right, #74ebd5, #acb6e5)'}}>
				<div className="flex justify-between text-xs md:text-sm">
					<ul className="w-1/2 flex flex-col md:flex-row m-0">
						<li className="mr-3">
							<Link>Terms of Use</Link>
						</li>
						<li className="mr-3">
							<Link>Privacy Policy</Link>
						</li>
						<li className="mr-3">
							<Link>Advertising</Link>
						</li>
					</ul>
					<div className="w-1/2 text-right">
						&copy; 2021 All Rights Reserved by{" Village Market Team "}
						<a
							href="https://facebook.com"
							className="font-semibold"
						>
							@Name
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
