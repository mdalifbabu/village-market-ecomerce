import { Request, Response } from "express";
import axios from "axios";
import Product, { Category } from "../models/productModel";

export default class ProductController {
	public async createProduct(req: Request, res: Response) {
		const newProduct = new Product(req.body);

		try {
			let product = await newProduct.save();
			res.send(product);
		} catch (err) {
			res.send(err);
		}
	}

	public async getProducts(req: Request, res: Response) {
		try {
			let products = await Product.find();
			res.send(products);
		} catch (err) {
			res.send(err);
		}
	}

	public async getSingleProduct(req: Request, res: Response) {
		try {
			let product = await Product.findOne({ slug: req.query.slug });
			res.send(product);
		} catch (err) {
			res.send(err);
		}
	}

	public async updateProduct(req: Request, res: Response) {
		let productId = req.body._id;
		let updatedProduct = req.body;

		try {
			let product = await Product.findOneAndUpdate(
				{ _id: productId },
				updatedProduct,
				{ upsert: true, new: true }
			);
			res.send(product);
		} catch (err) {
			res.send(err);
		}
	}

	public async deleteProduct(req: Request, res: Response) {
		let productId = req.body._id;

		try {
			let del = await Product.deleteOne({ _id: productId }).exec();
			if (del > 0) {
				res.send({ msg: "Product deleted successfully" });
			} else {
				res.status(500).send({ msg: "something error" });
			}
		} catch (err) {
			res.send(err);
		}
	}

	public async generateProducts(req: Request, res: Response) {
		try {
			let productResponse = await axios.get(
				"https://fakestoreapi.com/products"
			);
			let products = await Product.insertMany(productResponse.data);
			res.send(products);
		} catch (err) {
			res.send(err);
		}
	}

	public async searchProducts(req: Request, res: Response) {
		let query = req.query.q;
		var regex = new RegExp(query as string, "i");

		try {
			let results = await Product.find({ title: regex });
			res.send(results);
		} catch (err) {
			res.send(err);
		}
	}

	public async getProductByCategory(req: Request, res: Response) {
		try {
			let category = await Category.findOne({ slug: req.query.categorySlug });
			console.log(category._id);
			let products = await Product.find({ category: category._id });
			res.send(products);
		} catch (err) {
			res.send(err);
		}
	}

	public async getCategories(req: Request, res: Response) {
		try {
			let categories = await Category.find();
			res.send(categories);
		} catch (err) {
			res.send(err);
		}
	}

	public async addCategory(req: Request, res: Response) {
		const newCategory = new Category(req.body);

		try {
			let category = await newCategory.save();
			res.send(category);
		} catch (err) {
			res.send(err);
		}
	}

	public async updateCategory(req: Request, res: Response) {
		let categoryId = req.body._id;
		let updatedCategory = req.body;

		try {
			let category = await Category.findOneAndUpdate(
				{ _id: categoryId },
				updatedCategory,
				{ upsert: true, new: true }
			);
			res.send(category);
		} catch (err) {
			res.send(err);
		}
	}

	public async deleteCategory(req: Request, res: Response) {
		let categoryId = req.body._id;

		try {
			let del = await Category.deleteOne({ _id: categoryId }).exec();
			if (del > 0) {
				res.send({ msg: "Product deleted successfully" });
			} else {
				res.status(500).send({ msg: "something error" });
			}
		} catch (err) {
			res.send(err);
		}
	}

	public async getSingleCategory(req: Request, res: Response) {
		try {
			console.log(req.query.slug);
			let category = await Category.findOne({ slug: req.query.slug });
			res.send(category);
		} catch (err) {
			res.send(err);
		}
	}
}
