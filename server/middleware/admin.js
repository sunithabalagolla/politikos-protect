/**
 * Middleware to check if user is an admin
 * Must be used after the protect middleware
 */
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      error: {
        message: 'Admin access required',
        code: 'ADMIN_ONLY'
      }
    });
  }
};

module.exports = {
  requireAdmin
};
