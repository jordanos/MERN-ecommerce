const multer = require("multer");
const path = require("path");
const express = require("express");
const router = require("express").Router();
const {
  CreateUser,
  Login,
  ViewProfile,
  EditProfile,
  GetUserById,
  UploadCoverPicture,
  FollowUser,
  GetFollower,
  GetFollowing,
  ChangePassword,
  UnFollowUser,
  IsFollowing,
  SuggestedFriend,
  GetAllUsers,
} = require("../controllers/userController");
const { autheticateUser } = require("../middleware/authnticateUsers");

const storage = multer.diskStorage({
  destination: "./src/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `profile_${file.fieldname}_${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    var respo = {
      status: 404,
      message: "Only images are allowed",
    };
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(JSON.stringify(respo));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
});

router.use("/images", express.static("./src/images/"));

router.post("/login", Login);
router.post("/register", CreateUser);

router.post("/profile", GetUserById);

router.patch(
  "/editprofile",
  upload.single("profilepic"),
  autheticateUser,
  EditProfile
);

router.patch(
  "/uploadcoverpic",
  upload.single("image"),
  autheticateUser,
  UploadCoverPicture
);

router.post("/follow", autheticateUser, FollowUser);
router.post("/unfollow", autheticateUser, UnFollowUser);
router.post("/isfollowing", IsFollowing);

router.get("/following/:userid", autheticateUser, GetFollowing);
router.get("/follower/:userid", autheticateUser, GetFollower);

router.post("/changepassword", ChangePassword);
router.post("/suggestedfriend", SuggestedFriend);
router.get("/all", GetAllUsers);
router.use("/logout", (req, res) => {
  res.send("logout");
});
router.use("/*", (req, res) => {
  res.json({
    status: 404,
    message: "Requested Route not Found",
  });
});
module.exports = router;
