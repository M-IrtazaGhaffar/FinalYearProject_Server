const { prisma } = require("../config/prisma"); // Import Prisma instance
const ApiResponse = require("../utils/ApiResponse"); // Import your custom ApiResponse utility

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      formula,
      detail,
      consumption,
      sideeffects,
      other,
      retailer_id,
    } = req.body;

    await prisma.products.create({
      data: {
        name,
        description,
        detail,
        consumption,
        sideeffects,
        other,
        formula,
        retailer_id,
      },
    });

    return ApiResponse.success(res, "Product created successfully");
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, "Error creating product");
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        detail: true,
        consumption: true,
        sideeffects: true,
        other: true,
        retailer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
          },
        },
      },
    });

    return ApiResponse.success(
      res,
      "Products retrieved successfully",
      products
    );
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, "Error fetching products");
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await prisma.products.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        description: true,
        detail: true,
        consumption: true,
        sideeffects: true,
        other: true,
        retailer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
          },
        },
      },
    });

    if (!product) {
      return ApiResponse.notFound(res, "Product not found");
    }

    return ApiResponse.success(res, "Product retrieved successfully", product);
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, "Error fetching product");
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id, name, formula, description, detail, consumption, sideeffects, other } =
      req.body;

      await prisma.products.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        formula,
        detail,
        consumption,
        sideeffects,
        other,
      },
    });

    return ApiResponse.success(res, "Product updated successfully");
  } catch (error) {
    if (error.code === "P2025") {
      // Prisma-specific error for record not found
      return ApiResponse.notFound(res, "Product not found");
    }

    return ApiResponse.error(res, "Error updating product");
  }
};

// Delete a product by ID
// exports.deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await prisma.products.delete({
//       where: { id: parseInt(id) },
//     });

//     return ApiResponse.success(res, "Product deleted successfully");
//   } catch (error) {
//     console.error(error);

//     if (error.code === "P2025") {
//       // Prisma-specific error for record not found
//       return ApiResponse.notFound(res, "Product not found");
//     }

//     return ApiResponse.error(res, "Error deleting product");
//   }
// };

exports.addRetailerProduct = async (req, res) => {
  try {
    const { stock, wholesaleprice, price, product_id, retailer_id } = req.body;
    await prisma.retailerProduct.create({
      data: {
        stock,
        wholesaleprice,
        price,
        retailer_id,
        product_id,
      },
    });
    return ApiResponse.success(res, "Product Added Successfully");
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, "Error adding retailer product", 500);
  }
};

exports.updateRetailProduct = async (req, res) => {
  try {
    const { stock, wholesaleprice, price, product_id } = req.body;
    await prisma.retailerProduct.update({
      where: { id: product_id },
      data: {
        stock,
        wholesaleprice,
        price,
      },
    });
  } catch (error) {
    if (error.code === "P2025") {
      // Prisma-specific error for record not found
      return ApiResponse.notFound(res, "Product not found");
    }
    return ApiResponse.error(res, "Error updating retailer product", 500);
  }
};
