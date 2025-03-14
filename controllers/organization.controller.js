// controllers/organizationController.js
const { prisma } = require("../config/prisma");
const ApiResponse = require("../utils/ApiResponse");
const {
  hashPassword,
  generateToken,
  verifyPassword,
} = require("../utils/jsonwebtoken");

// Create a new organization
exports.createOrganization = async (req, res) => {
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

    const newOrganization = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        owner,
        phone,
        national_id,
        country,
        license,
        address,
        longitude,
        latitude,
        type: "organization",
      },
    });

    delete newOrganization.password;

    // Generate a JWT for the new organization
    const token = generateToken(
      newOrganization.id,
      newOrganization.email,
      newOrganization.role
    );

    return ApiResponse.success(
      res,
      "Organization created successfully!",
      token
    );
  } catch (error) {
    return ApiResponse.error(res, "Error creating organization", 500);
  }
};

// Organization login
exports.organizationLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the organization by email
    const organization = await prisma.users.findUnique({
      where: { email, type: "organization" },
    });

    if (!organization) {
      return ApiResponse.notFound(res, "Organization not found");
    }

    // Verify the password
    const isPasswordValid = await verifyPassword(
      password,
      organization.password
    );

    if (!isPasswordValid) {
      return ApiResponse.error(res, "Invalid credentials", 401);
    }

    delete organization.password;

    // Generate a JWT for the organization
    const token = generateToken(
      organization.id,
      organization.email,
      organization.role
    );

    return ApiResponse.success(res, "Organization logged in successfully!", {
      ...organization,
      token,
    });
  } catch (error) {
    return ApiResponse.error(res, "Error logging in organization", 500);
  }
};

// Retrieve all organizations
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await prisma.users.findMany({
      where: { type: "organization" },
      select: {
        id: true,
        name: true,
        email: true,
        owner: true,
        password: false,
        national_id: true,
        country: true,
        license: true,
        phone: true,
        address: true,
        longitude: true,
        latitude: true,
        type: true,
      },
    });
    return ApiResponse.success(
      res,
      "Organizations retrieved successfully!",
      organizations
    );
  } catch (error) {
    return ApiResponse.error(res, "Error fetching organizations", 500);
  }
};

// Retrieve a single organization by ID
exports.getOrganizationById = async (req, res) => {
  try {
    const { id } = req.body;
    const organization = await prisma.users.findUnique({
      where: { id: parseInt(id, 10), type: "organization" },
    });

    if (!organization) {
      delete organization.password;
      return ApiResponse.notFound(res, "Organization not found");
    }
    return ApiResponse.success(
      res,
      "Organization retrieved successfully!",
      organization
    );
  } catch (error) {
    return ApiResponse.error(res, "Error fetching organization", 500);
  }
};

// Update an organization by ID
exports.updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
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

    // Hash the new password if provided
    const hashedPassword = password ? await hashPassword(password) : undefined;

    await prisma.users.update({
      where: { id: parseInt(id, 10), type: "organization" },
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
      },
    });
    return ApiResponse.success(res, "Organization updated successfully!");
  } catch (error) {
    return ApiResponse.error(res, "Error updating organization", 500);
  }
};

// Delete an organization by ID
// exports.deleteOrganization = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await prisma.users.delete({
//       where: { id: parseInt(id, 10), type: "organization" },
//     });
//     return ApiResponse.success(res, "Organization deleted successfully!");
//   } catch (error) {
//     return ApiResponse.error(res, "Error deleting organization", 500);
//   }
// };
