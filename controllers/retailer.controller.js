// controllers/retailerController.js
const { prisma } = require("../config/prisma");
const ApiResponse = require("../utils/ApiResponse");
const {
  hashPassword,
  generateToken,
  verifyPassword,
} = require("../utils/jsonwebtoken");

// Create a new retailer
exports.createRetailer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      owner,
      phone,
      national_id,
      country,
      license,
      address,
      longitude,
      latitude,
    } = req.body;

    // Hash the password
    const hashedPassword = await hashPassword(password);

    const newRetailer = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        owner,
        phone,
        national_id,
        country,
        license,
        address,
        longitude,
        latitude,
        type: "retailer",
      },
    });

    delete newRetailer.password;

    // Generate a JWT for the new retailer
    const token = generateToken(
      newRetailer.id,
      newRetailer.email,
      newRetailer.type
    );

    return ApiResponse.success(res, "Retailer created successfully!", token);
  } catch (error) {
    return ApiResponse.error(res, "Error creating retailer", 500);
  }
};

// Retailer login
exports.retailerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the retailer by email
    const retailer = await prisma.users.findUnique({
      where: { email, type: "retailer" },
    });

    if (!retailer) {
      return ApiResponse.notFound(res, "Retailer not found");
    }

    // Verify the password
    const isPasswordValid = await verifyPassword(password, retailer.password);
    if (!isPasswordValid) {
      return ApiResponse.error(res, "Invalid credentials", 401);
    }

    delete retailer.password;

    // Generate a JWT for the retailer
    const token = generateToken(retailer.id, retailer.email, retailer.type);

    return ApiResponse.success(res, "Retailer logged in successfully!", {
      ...retailer,
      token,
    });
  } catch (error) {
    console.log(error);

    return ApiResponse.error(res, "Error logging in retailer", 500);
  }
};

// Retrieve all retailers
exports.getAllRetailers = async (req, res) => {
  try {
    const retailers = await prisma.users.findMany({
      where: { type: "retailer" },
      select: {
        id: true,
        name: true,
        email: true,
        owner: true,
        password: false,
        phone: true,
        national_id: true,
        country: true,
        license: true,
        address: true,
        longitude: true,
        latitude: true,
      },
    });
    return ApiResponse.success(
      res,
      "Retailers retrieved successfully!",
      retailers
    );
  } catch (error) {
    return ApiResponse.error(res, "Error fetching retailers", 500);
  }
};

// Retrieve a single retailer by ID
exports.getRetailerById = async (req, res) => {
  try {
    const { id } = req.body;
    const retailer = await prisma.users.findUnique({
      where: { id: parseInt(id, 10), type: "retailer" },
    });
    if (!retailer) {
      delete retailer.password;
      return ApiResponse.notFound(res, "Retailer not found");
    }
    return ApiResponse.success(
      res,
      "Retailer retrieved successfully!",
      retailer
    );
  } catch (error) {
    return ApiResponse.error(res, "Error fetching retailer", 500);
  }
};

// Update a retailer by ID
exports.updateRetailer = async (req, res) => {
  try {
    const { id } = req.body;
    const {
      name,
      owner,
      phone,
      national_id,
      country,
      license,
      address,
      longitude,
      latitude,
    } = req.body;

    await prisma.users.update({
      where: { id: parseInt(id, 10), type: "retailer" },
      data: {
        name,
        owner,
        phone,
        national_id,
        country,
        license,
        address,
        longitude,
        latitude,
      },
    });
    return ApiResponse.success(res, "Retailer updated successfully!");
  } catch (error) {
    if (error.code === "P2025") {
      // Prisma-specific error for record not found
      return ApiResponse.notFound(res, "Product not found");
    }
    return ApiResponse.error(res, "Error updating retailer", 500);
  }
};

// Delete a retailer by ID
// exports.deleteRetailer = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await prisma.users.delete({
//       where: { id: parseInt(id, 10), type: "retailer" },
//     });
//     return ApiResponse.success(res, "Retailer deleted successfully!");
//   } catch (error) {
//     return ApiResponse.error(res, "Error deleting retailer", 500);
//   }
// };
