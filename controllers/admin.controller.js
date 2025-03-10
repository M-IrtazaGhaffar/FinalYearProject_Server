// controllers/adminController.js
const { prisma } = require("../config/prisma");
const ApiResponse = require("../utils/ApiResponse");

exports.searchAll = async (req, res) => {
  try {
    const { query: q } = req.body; // Get the search query from the URL query parameters

    if (!q) {
      return ApiResponse.error(res, "Search query is required", 400);
    }

    // Perform all searches concurrently
    const [blogs, organizations, products, retailers] = await Promise.all([
      // Search blogs
      prisma.blogs.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { description: { contains: q } },
            { details: { contains: q } },
          ],
        },
        take: 10, // Limit to 10 results
        select: {
          id: true,
          title: true,
          description: true,
          details: true,
          organization_id: true,
          createdAt: true,
          updatedAt: true,
        },
      }),

      // Search organizations (users with type 'organization')
      prisma.users.findMany({
        where: {
          type: "organization",
          OR: [
            { name: { contains: q } },
            { email: { contains: q } },
            { address: { contains: q } },
          ],
        },
        take: 10, // Limit to 10 results
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
          createdAt: true,
          updatedAt: true,
        },
      }),

      // Search products
      prisma.products.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { description: { contains: q } },
            { detail: { contains: q } },
          ],
        },
        take: 10, // Limit to 10 results
        select: {
          id: true,
          name: true,
          description: true,
          detail: true,
          createdAt: true,
          updatedAt: true,
        },
      }),

      // Search retailers (users with type 'retailer')
      prisma.users.findMany({
        where: {
          type: "retailer",
          OR: [
            { name: { contains: q } },
            { email: { contains: q } },
            { address: { contains: q } },
          ],
        },
        take: 10, // Limit to 10 results
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    // Return the results
    return ApiResponse.success(res, "Search results retrieved successfully", {
      blogs,
      organizations,
      products,
      retailers,
    });
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, "Error performing search", 500);
  }
};
