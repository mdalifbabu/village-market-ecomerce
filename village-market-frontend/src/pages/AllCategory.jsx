import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import ProductCard from "../components/ProductCard";
import { coreAxios } from "../utils/axios";

export default function AllCategory() {
    const [products, setProducts] = useState();
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearch, setIsSearch] = useState(false);
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		coreAxios
			.get("api/products")
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleSearch = (e) => {
		e.preventDefault();
		setIsSearch(true);
	};

	return (
		<div style={{ background: 'linear-gradient(to right, #74ebd5, #acb6e5)'}}>
			<section className="featured p-2 md:p-4">
				<h2 className="ml-2 mt-2 font-bold text-xl md:text-2xl text-gray-700">
					All Products
				</h2>
				{products ? (
					<div className="flex flex-wrap md:mt-4">
						{products.map((product) => (
							<div
								key={product._id}
								className="w-2/4 md:w-1/4 lg:w-1/3 xl:w-1/4 px-2"
							>
								<ProductCard product={product} cart={cart} />
							</div>
						))}
					</div>
				) : (
					<div className="flex justify-center items-center h-32">
						<Spin />
					</div>
				)}
			</section>

			{isSearch ? <Redirect to={`/search?q=${searchTerm}`} /> : null}

			<style>{`
                .hero {
                    background: url('https://i.ibb.co/sRBb2qw/1306572.jpg') no-repeat;
                    background-position: right;
                    background-size: cover;
                }

                .hero .search {
                    border: 1px solid rgb(179 179 179 / 50%);
                }
            `}</style>
		</div>
	);
}
