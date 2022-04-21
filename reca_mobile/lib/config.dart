class Config {
  static const String appName = "rica_mobile";
  static const String apiUrl = "192.168.1.2:9000";
  static const String messageUrl = "192.168.1.2:8900";
  static const String postApi = "/feed";
  static const String heroApi = "/product/heroproducts";
  static const String postByUserIdApi = "/feed/user/";
  static const String likePostApi = "/feed/like";
  static const String unLikePostApi = "/feed/unlike";
  static const String createPostApi = "/feed/create";
  static const String deletePostApi = "/feed/delete";
  static const String getAllowedPostApi = "/feed/getallowed";
  static const String getPostByIdApi = "/feed/getfeed";
  static const String getAllUserApi = "/user/all";
  static const String loginUserApi = "/user/login";
  static const String followUserApi = "/user/follow";
  static const String unfollowUserApi = "/user/unfollow";
  static const String registerUserApi = "/user/register";
  static const String changePasswordApi = "/user/changepassword";
  static const String profileByIdApi = "/user/profile";
  static const String editProfileApi = "/user/editprofile/";
  static const String uploadCoverApi = "/user/uploadcoverpic/";
  static const String getAllConversationApi = "/conversation/get/";
  static const String getMessagesApi = "/conversation/message";
  static const String markAllAsRead = "/conversation/readallmessage";
  static const String createConversationApi =
      "/conversation/createconversation/";
  static const String sendMessageApi = "/conversation/sendmessage/";
  static const String productApi = "/product";
  static const String categoryListApi = "/product/catagorylist";
  static const String productWithRatingApi = "/product/getproduct";
  static const String getTrendingProductApi = "/product/trendingproduct";
  static const String editProductApi = "/product/edit";
  static const String deleteProductApi = "/product/delete/";
  static const String productByUserIdApi = "/product/user/";
  static const String rateProductApi = "/product/rate";
  static const String productByCategoryApi = "/product/catagory/";
  static const String createProductApi = "/product/create";
  static const String checkPackageApi = "/package/checkstatus";
  static const String buyPackageApi = "/package/buy";
  static const String getPackageApi = "/package/detail";
  static const String getNotificationsApi = "/notification/getunread";
  static const String readNotificationsApi = "/notification/read";
  static const String readAllNotificationsApi = "/notification/markallasread";

  // static const String getPackageByIdApi = "/package/getbyuserid";
}
