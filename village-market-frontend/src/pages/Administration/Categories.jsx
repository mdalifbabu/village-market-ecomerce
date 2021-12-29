import React, { useEffect, useState } from "react";
import { Table, Space, Button, Spin, message } from "antd";
import { coreAxios } from "../../utils/axios";
import { Link } from "react-router-dom";
import AddOrUpdateModal from "./AddOrUpdateModal";

let formItems = [
	{
		label: "ID",
		name: "_id",
		placeholder: "Category ID",
		hidden: true,
	},
	{
		label: "Title",
		name: "title",
		placeholder: "Product Category",
		rules: [{ required: true, message: "Category must have a name" }],
	},
];

export default function Categories() {
	const [categories, setCategories] = useState();
	const [singleCategory, setSingleCategory] = useState();
	const [addOrUpdateModalVisibility, setAddOrUpdateModalVisibility] = useState(
		false
	);

	useEffect(() => {
		loadCategories();

		coreAxios
			.get("api/products/categories")
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const columns = [
		{
			title: "Category",
			dataIndex: "title",
			key: "category",
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Space size="middle">
					<div
						style={linkStyle}
						onClick={() => {
							handleEdit(record.slug);
						}}
					>
						Edit
					</div>
					<Link to="#" onClick={() => {
						handleDelete(record._id)
					}}
					>
						Delete
					</Link>
				</Space>
			),
		},
	];

	const loadCategories = () => {
		coreAxios
			.get("api/products/categories")
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSubmit = (values) => {
		if (singleCategory) {
			coreAxios
				.put("api/products/categories", values)
				.then((res) => {
					message.success("Categories Updated Successfully");
					setAddOrUpdateModalVisibility(false);
					loadCategories();
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			coreAxios
				.post("api/products/categories", values)
				.then((res) => {
					message.success("Categories Added Successfully");
					setAddOrUpdateModalVisibility(false);
					loadCategories();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const handleEdit = (slug) => {
		coreAxios
			.get("/api/products/category", {
				params: {
					slug: slug,
				},
			})
			.then((res) => {
				setSingleCategory(res.data);
				setAddOrUpdateModalVisibility(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDelete = (_id) => {
		coreAxios
			.delete("api/products/categories", { data: { _id } })
			.then((res) => {
				message.info("Category Deleted Successfully");
				loadCategories();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-5">
				<h1 className="text-2xl font-semibold">Categories</h1>
				<Button
					type="primary"
					onClick={() => setAddOrUpdateModalVisibility(true)}
				>
					Create New Category
				</Button>
			</div>
			<Spin spinning={!categories}>
				<Table dataSource={categories} columns={columns} rowKey="_id" />
			</Spin>
			<AddOrUpdateModal
				isModalVisible={addOrUpdateModalVisibility}
				setIsModalVisible={(value) => {
					setSingleCategory();
					setAddOrUpdateModalVisibility(value);
				}}
				handleSubmit={handleSubmit}
				modalTitle="Add New Category"
				formItems={formItems}
				updateData={singleCategory}
			/>
		</div>
	);
}

const linkStyle = { color: "#40a9ff", cursor: "pointer" };
