import { Router } from "express";
import { authorize } from "../middlewares/authMiddleware";
import ProductController from "../controllers/productController";

export default class ProductRoutes {
	private router = Router();
	private productController: ProductController = new ProductController();

	constructor() {
		this.initRoutes();
	}

	private initRoutes() {
		this.router.get("/products", this.productController.getProducts);
		this.router.get("/product", this.productController.getSingleProduct);
		this.router.get("/product/search", this.productController.searchProducts);
		this.router.get(
			"/products/categories",
			this.productController.getCategories
		);
		this.router.get(
			"/products/category",
			this.productController.getSingleCategory
		);
		this.router.post(
			"/products/categories",
			this.productController.addCategory
		);
		this.router.put(
			"/products/categories",
			authorize("superadmin", "admin"),
			this.productController.updateCategory
		);
		this.router.delete(
			"/products/categories",
			authorize("superadmin", "admin"),
			this.productController.deleteCategory
		);
		this.router.get(
			"/category/products",
			this.productController.getProductByCategory
		);
		this.router.post(
			"/products",
			authorize("superadmin", "admin"),
			this.productController.createProduct
		);
		this.router.put(
			"/products",
			authorize("superadmin", "admin"),
			this.productController.updateProduct
		);
		this.router.delete(
			"/products",
			authorize("superadmin", "admin"),
			this.productController.deleteProduct
		);
		this.router.get(
			"/products/generate",
			authorize("superadmin"),
			this.productController.generateProducts
		);
	}
}
