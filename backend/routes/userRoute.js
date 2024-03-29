const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").post(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").post(isAuthenticatedUser, updatePassword);

router.route("/me/update").post(isAuthenticatedUser, updateProfile);

router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);

router.route("/admin/user/:id")
    .get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
    .put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
    .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);

router.route("/logout").get(logoutUser);

module.exports = router;
