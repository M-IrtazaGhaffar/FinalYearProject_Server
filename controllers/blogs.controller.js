const { prisma } = require("../config/prisma"); // Import Prisma instance
const ApiResponse = require("../utils/ApiResponse"); // Import your custom ApiResponse utility

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, details, organization_id } = req.body;

    const newBlog = await prisma.blogs.create({
      data: {
        title,
        description,
        details,
        organization_id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        details: true,
        organization: false,
      },
    });

    return ApiResponse.success(res, "Blog created successfully", newBlog, 201);
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, "Error creating blog");
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blogs.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        details: true,
        organization: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            country: true,
            address: true,
            longitude: true,
            latitude: true,
          },
        },
      },
    });

    return ApiResponse.success(res, "Blogs retrieved successfully", blogs);
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, "Error fetching blogs");
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        title: true,
        description: true,
        details: true,
        organization: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            country: true,
            address: true,
            longitude: true,
            latitude: true,
          },
        },
      },
    });

    if (!blog) {
      return ApiResponse.notFound(res, "Blog not found");
    }

    return ApiResponse.success(res, "Blog retrieved successfully", blog);
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, "Error fetching blog");
  }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.body;
    const { title, description, details } = req.body;

    const updatedBlog = await prisma.blogs.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        details,
      },
    });

    return ApiResponse.success(res, "Blog updated successfully", updatedBlog);
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      // Prisma-specific error for record not found
      return ApiResponse.notFound(res, "Blog not found");
    }

    return ApiResponse.error(res, "Error updating blog");
  }
};

// Delete a blog by ID
// exports.deleteBlog = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await prisma.blogs.delete({
//       where: { id: parseInt(id) },
//     });

//     return ApiResponse.success(res, "Blog deleted successfully");
//   } catch (error) {
//     console.error(error);

//     if (error.code === "P2025") {
//       // Prisma-specific error for record not found
//       return ApiResponse.notFound(res, "Blog not found");
//     }

//     return ApiResponse.error(res, "Error deleting blog");
//   }
// };
