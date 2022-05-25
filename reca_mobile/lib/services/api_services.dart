import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:reca_mobile/config.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/all_users.dart';
import 'package:reca_mobile/models/category_list.dart';
import 'package:reca_mobile/models/conversation_model.dart';
import 'package:reca_mobile/models/coversation_model_nolastseen.dart';
import 'package:reca_mobile/models/feed_response_model.dart';
import 'package:reca_mobile/models/general_model.dart';
import 'package:reca_mobile/models/hero_model.dart';
import 'package:reca_mobile/models/notification_model.dart';
import 'package:reca_mobile/models/one_to_one_model.dart';
import 'package:reca_mobile/models/package_list.dart';
import 'package:reca_mobile/models/package_response.dart';
import 'package:reca_mobile/models/product_response_model.dart';
import 'package:reca_mobile/models/profile_by_id.dart';
import 'package:reca_mobile/models/profile_with_follower.dart';
import 'package:reca_mobile/models/user_login_response_model.dart';

var storage = FlutterSecureStorage();

class ApiServices {
  //USER API SERVICES

  dynamic registerUser(String name, String phone, String password) async {
    var url = Uri.http(Config.apiUrl, Config.registerUserApi);

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    String requestBody = jsonEncode({
      'name': name,
      'phone': phone,
      'password': password,
      'address': 'Addis Ababa',
    });
    final response = await http.post(url, headers: header, body: requestBody);

    if (response.statusCode != 201) {
      throw Exception(json.decode(response.body)["error"]);
    }
    return response;
  }

  String getError(var response) {
    return jsonDecode(response.body)["error"];
  }

  Future<UserLoginResponse> logIn(var phoneNo, var password) async {
    var url = Uri.http(Config.apiUrl, Config.loginUserApi);

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    String requestBody = jsonEncode({
      'phone': phoneNo,
      'password': password,
    });

    final response = await http.post(url, headers: header, body: requestBody);

    if (response.statusCode != 200) {
      throw Exception(getError(response));
    }
    final userLoginResponse = userLoginResponseFromJson(response.body);
    return userLoginResponse;
  }

  Future<ProfileById?> getCurrentUser() async {
    final storage = FlutterSecureStorage();
    var userId;
    var jwt;
    userId = await storage.read(key: "id");
    jwt = await storage.read(key: "jwt");

    var url = Uri.http(Config.apiUrl, "${Config.profileByIdApi}/${userId}");

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    final response = await http.get(url);

    try {
      if (response.statusCode == 200) {
        ProfileById profileById = profileByIdFromJson(response.body);
        return profileById;
      }
      return null;
    } catch (e) {
      print(e);
      return null;
    }
  }

  Future<ProfileById?> getUserById(var id) async {
    var url = Uri.http(Config.apiUrl, "${Config.profileByIdApi}/$id");

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    final response = await http.get(url);

    try {
      if (response.statusCode == 200) {
        ProfileById profileById = profileByIdFromJson(response.body);
        return profileById;
      }
      return null;
    } catch (e) {
      print(e);
      return null;
    }
  }

  Future<List<AllUserData>> getAllUsers() async {
    var url = Uri.http(Config.apiUrl, Config.getAllUserApi);

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    final response = await http.get(url);

    final profileById = allUsersFromJson(response.body);

    // print(response.body);

    return profileById.data;
  }

  Future<ProfileByIdWithFollower> getUserByIdWithFollowStatus(
      var id, var following) async {
    var url = Uri.http(Config.apiUrl, "${Config.profileByIdApi}/$id");

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    final response = await http.get(url);

    if (response.statusCode != 200) {
      throw Exception(getError(response));
    }
    final profileById = profileByIdWithFollowerFromJson(response.body);

    return profileById;
  }

  Future<Map<String, String>> getHeaders() async {
    final storage = FlutterSecureStorage();
    var userId;
    var jwt;
    userId = await storage.read(key: "id");
    jwt = await storage.read(key: "jwt");
    return {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': jwt
    };
  }

  Future<bool> changeImage(Uri url, List<XFile> images) async {
    var request = http.MultipartRequest('PUT', url);
    var headers = await getHeaders();
    request.headers.addAll(headers);

    try {
      if (images.length < 1) {
        return true;
      }
      String path = images[0].path;
      request.files.add(await http.MultipartFile.fromPath('image', path));
      http.StreamedResponse streamedResponse = await request.send();
      if (streamedResponse.statusCode == 200) {
        return true;
      }
      return false;
    } catch (e) {
      print(e);
      return false;
    }
  }

  Future<bool> editProfile(
      var id, var token, var name, var address, XFile? images) async {
    var url = Uri.http(Config.apiUrl, Config.editProfileApi + "/$id");

    final body = jsonEncode({"name": name, "address": address});

    final response =
        await http.put(url, body: body, headers: await getHeaders());
    try {
      if (response.statusCode == 200) {
        bool isChanged = await changeImage(
            Uri.http(Config.apiUrl, Config.editProfileApi + "/image/$id"),
            images != null ? [images] : []);
        return isChanged;
      }
      return false;
    } catch (e) {
      print(e);
      return false;
    }
  }

  Future<GeneralResponse> uploadCover(var token, var id, XFile? images) async {
    var url = Uri.http(Config.apiUrl, Config.uploadCoverApi);
    var request = http.MultipartRequest('PATCH', url);
    request.fields['userid'] = id;
    request.fields['token'] = token;

    var path = images!.path;

    request.files.add(await http.MultipartFile.fromPath('image', path));

    http.StreamedResponse streamedResponse = await request.send();
    var response = await http.Response.fromStream(streamedResponse);
    final generalResponse = generalResponseFromJson(response.body);

    return generalResponse;
  }

  Future<GeneralResponse> followUser(var id, var token, var followingId) async {
    var url = Uri.http(Config.apiUrl, Config.followUserApi);

    String requestBody = jsonEncode({
      'token': token,
      'follower': id,
      'following': followingId,
    });
    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };
    var response = await http.post(url, headers: header, body: requestBody);
    var data = response.body;

    final generalResponse = generalResponseFromJson(data);

    return generalResponse;
  }

  Future<GeneralResponse> unfollowUser(
      var id, var token, var followingId) async {
    var url = Uri.http(Config.apiUrl, Config.unfollowUserApi);
    String requestBody = jsonEncode({
      'token': token,
      'follower': id,
      'following': followingId,
    });
    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };
    var response = await http.post(url, headers: header, body: requestBody);
    var data = response.body;

    final generalResponse = generalResponseFromJson(data);

    return generalResponse;
  }

  Future<GeneralResponse> changePassword(
      var token, var phoneNumber, var password, var newPassword) async {
    var url = Uri.http(Config.apiUrl, Config.changePasswordApi);
    String requestBody = jsonEncode({
      'token': token,
      'phonenumber': phoneNumber,
      'password': password,
      'newpassword': newPassword,
    });
    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };
    var response = await http.post(url, headers: header, body: requestBody);
    var data = response.body;
    print(data);
    final generalResponse = generalResponseFromJson(data);

    return generalResponse;
  }

  Future<GeneralResponse> marAllAsRead(int id, var token) async {
    var url = Uri.http(Config.apiUrl, Config.markAllAsRead);

    String requestBody = jsonEncode({
      'userid': id,
      'token': token,
    });
    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    var response = await http.post(url, headers: header, body: requestBody);

    var data = response.body;
    final markAllAsReadResponse = generalResponseFromJson(data);
    print('Read all msg status: ${markAllAsReadResponse.status}');
    print('Read all msg message: ${markAllAsReadResponse.message}');

    return markAllAsReadResponse;
  }

  Future<List<AllConversation>> getAllCoversation(var id) async {
    var url = Uri.http(Config.apiUrl, Config.getAllConversationApi);
    StorageController controller = Get.find<StorageController>();

    var response = await http.get(url, headers: await getHeaders());

    try {
      if (response.statusCode != 200) {
        throw Exception(json.decode(response.body)["error"]);
      }
      final convoResponse = conversationFromJson(response.body);
      return convoResponse.data;
    } catch (e) {
      print(e);
      throw Exception(e);
    }
  }

  Future<List<AllConversation>> createCoversation(var id1, var id2) async {
    var url = Uri.http(Config.apiUrl, Config.createConversationApi);
    String requestBody = jsonEncode({
      'sender': id1,
      'reciever': id2,
    });
    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    var response = await http.post(url, headers: header, body: requestBody);

    var statusCode = response.statusCode;
    var data = response.body;
    final convoResponse = conversationFromJson(data);

    return convoResponse.data;
  }

  Future<List<AllConversationNew>> createNewCoversation(
      var id1, var id2) async {
    var url = Uri.http(Config.apiUrl, Config.createConversationApi);
    String requestBody = jsonEncode({
      'sender': id1,
      'reciever': id2,
    });
    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    var response = await http.post(url, headers: header, body: requestBody);
    // print(response.body);
    var statusCode = response.statusCode;
    var data = response.body;
    final convoResponse = conversationNewFromJson(data);
    // print(convoResponse.data);

    return convoResponse.data;
  }

  Future<List<OtOMessages>> getMessages(var conversationId, var userId) async {
    var url = Uri.http(Config.apiUrl, Config.getMessagesApi);

    var response = await http.get(url, headers: await getHeaders());

    final oneToOneConvoResponse = oneToOneMessagesFromJson(response.body);
    return oneToOneConvoResponse.data;
  }

  Future<GeneralResponse> sendMessage(
      var conversationId, var senderId, var msg) async {
    var url = Uri.http(Config.apiUrl, Config.sendMessageApi);

    String requestBody = jsonEncode({
      'conversationid': conversationId,
      'sender': senderId,
      'text': msg,
    });
    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };
    var response = await http.post(url, headers: header, body: requestBody);

    var statusCode = response.statusCode;
    var data = response.body;
    final sendMsg = generalResponseFromJson(data);

    return sendMsg;
  }

//FEED API SERVICES

  Future<FeedResponse> getPost() async {
    var url = Uri.http(Config.apiUrl, Config.postApi);

    var response = await http.get(url);
    var statusCode = response.statusCode;
    var data = response.body;
    final feedResponse = feedResponseFromJson(data);

    return feedResponse;
  }

  Future<GeneralResponse> likePost(String id, String postId, var token) async {
    var url = Uri.http(Config.apiUrl, Config.likePostApi);

    String requestBody = jsonEncode({
      'userid': id,
      'feedid': postId,
      'token': token,
    });
    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    var response = await http.post(url, headers: header, body: requestBody);

    var data = response.body;
    final feedResponse = generalResponseFromJson(data);
    print('Post like status: ${feedResponse.status}');
    print('Post like message: ${feedResponse.message}');

    return feedResponse;
  }

  Future<GeneralResponse> unLikePost(var id, var postId, var token) async {
    var url = Uri.http(Config.apiUrl, Config.unLikePostApi);

    String requestBody = jsonEncode({
      'userid': id,
      'feedid': postId,
      'token': token,
    });
    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    var response = await http.post(url, headers: header, body: requestBody);

    var data = response.body;
    final feedResponse = generalResponseFromJson(data);
    print('Post unlike status: ${feedResponse.status}');
    print('Post unlike message: ${feedResponse.message}');

    return feedResponse;
  }

  Future<List<FeedData>?> getPostByUserId(var id, dynamic loggedInId) async {
    var url = Uri.http(Config.apiUrl, Config.postByUserIdApi);
//TODO: Correct http response for this

    String requestBody = jsonEncode({
      'userid': id,
      'visitorid': loggedInId,
    });
    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    var response = await http.post(url, headers: header, body: requestBody);
    var statusCode = response.statusCode;
    var data = response.body;
    final feedResponse = feedResponseFromJson(data);
    // print('Like status : ${feedResponse.data![0].isliked}');

    return feedResponse.data;
  }

  Future<List<FeedData>?> getallowedPost(var id) async {
    var url = Uri.http(Config.apiUrl, Config.getAllowedPostApi);

    var response = await http.get(url, headers: await getHeaders());

    try {
      if (response.statusCode == 200) {
        final feedResponse = feedResponseFromJson(response.body);
        return feedResponse.data;
      }
      return [];
    } catch (e) {
      print(e);
      return [];
    }
  }

  Future<FeedData?> getPostById(var id, var userId) async {
    var url = Uri.http(Config.apiUrl, Config.getPostByIdApi);
    String requestBody = jsonEncode({
      'feedid': id.toString(),
      'userid': userId.toString(),
    });
    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    var response = await http.post(url, body: requestBody, headers: header);

    var statusCode = response.statusCode;
    var data = response.body;

    final feedResponse = feedResponseFromJson(data);
    var list = feedResponse.data;
    if (list != null) {
      // print('Get feed by id response data ${list[0].fullname}');
    }
    return list![0];
  }

  Future createPost(var postedBy, String? text, List<XFile>? images) async {
    var url = Uri.http(Config.apiUrl, Config.createPostApi);

    var body = json.encode({"text": text});
    var response =
        await http.post(url, headers: await getHeaders(), body: body);
    if (response.statusCode != 201) {
      throw Exception(getError(response));
    }
    String feedId = json.decode(response.body)["data"]["id"];
    bool isChanged = await changeImage(
        Uri.http(Config.apiUrl, Config.createPostApi + "/image/$feedId"),
        images != null ? images : []);
  }

  Future<List<FeedData>?> getPostData() async {
    var url = Uri.http(Config.apiUrl, Config.postApi);

    var response = await http.get(url);
    // var statusCode = response.statusCode;
    var data = response.body;
    final feedResponse = feedResponseFromJson(data);

    List<FeedData>? datum = feedResponse.data;

    return datum;
  }

  Future<GeneralResponse> deletePost(var postId, var userId, var token) async {
    var url = Uri.http(Config.apiUrl, Config.deletePostApi);

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };
    String requestBody = jsonEncode({
      'userid': userId,
      'feedid': postId,
      'token': token,
    });

    final response = await http.delete(url, headers: header, body: requestBody);
    print(response);
    final generalResponse = generalResponseFromJson(response.body);

    return generalResponse;
  }

  //PRODUCT API SERVICES

  Future<List<HeroImg>> getHero() async {
    var url = Uri.http(Config.apiUrl, Config.heroApi);

    var response = await http.get(url);

    if (response.statusCode == 200) {
      final heroResponse = heroFromJson(response.body);
      return heroResponse.data;
    }
    return [];
  }

  Future<List<ProductData>> getProductData() async {
    var url = Uri.http(Config.apiUrl, Config.productApi);

    var response = await http.get(url);

    try {
      if (response.statusCode == 200) {
        final productResponse = productResponseFromJson(response.body);
        // print(productResponse.products[0].name);
        return productResponse.products;
      }

      return [];
    } catch (e) {
      return [];
    }
  }

  Future<List<ProductData>> getProductDataWithRating(
      var userId, var productId) async {
    var url = Uri.http(Config.apiUrl, Config.productWithRatingApi);
    // print(
    //     userId.toString() + ' user            product' + productId.toString());
    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };
    String requestBody = jsonEncode({
      'productid': productId,
      'userid': userId,
    });

    var response = await http.post(url, headers: header, body: requestBody);
    var data = response.body;
    // print('Product with rating data is body:  ${response.body}');

    final productResponse = productResponseFromJson(data);
    // print('Product with rating data is Rated:  ${productResponse.data[0]}');
    List<ProductData> datum = productResponse.products;

    return datum;
  }

  Future<List<ProductData>> getTrendingProduct() async {
    var url = Uri.http(Config.apiUrl, Config.getTrendingProductApi);

    var response = await http.post(url);
    var data = response.body;
    final productResponse = productResponseFromJson(data);

    List<ProductData> datum = productResponse.products;

    return datum;
  }

  Future<List<ProductData>> getProductsByCategory(var category) async {
    final queryParams = {
      "cat": category,
    };
    var url = Uri.http(Config.apiUrl, Config.productByCategoryApi, queryParams);

    var response = await http.get(url);

    try {
      if (response.statusCode == 200) {
        final productResponse = productResponseFromJson(response.body);
        return productResponse.products;
      }

      return [];
    } catch (e) {
      return [];
    }
  }

  Future<List<CategoryData>> getCategoryList() async {
    var url = Uri.http(Config.apiUrl, Config.categoryListApi);

    var response = await http.get(url);
    // var statusCode = response.statusCode;
    var data = response.body;
    print(data);
    final categoryList = categoryListFromJson(data);

    List<CategoryData> datum = categoryList.data;

    return datum;
  }

  Future<List<ProductData>> getProductByUserId(var id) async {
    var url = Uri.http(Config.apiUrl, Config.productByUserIdApi);

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    final response = await http.get(url, headers: await getHeaders());

    final productResponse = productResponseFromJson(response.body);

    List<ProductData>? datum = productResponse.products;
    return datum;
  }

  Future<List<ProductData>> getMyProducts() async {
    var url = Uri.http(Config.apiUrl, Config.productByUserIdApi);

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };

    final response = await http.get(url, headers: await getHeaders());

    final productResponse = productResponseFromJson(response.body);

    List<ProductData>? datum = productResponse.products;
    return datum;
  }

  Future<GeneralResponse> rateProduct(
      var productId, var userId, var ratecount) async {
    var url = Uri.http(Config.apiUrl, Config.rateProductApi);

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };
    String requestBody = jsonEncode({
      'userid': userId,
      'productid': productId,
      'ratescore': ratecount,
    });

    final response = await http.post(url, headers: header, body: requestBody);
    final generalResponse = generalResponseFromJson(response.body);
    // print('RAte message : ${generalResponse.message}');

    return generalResponse;
  }

  Future deleteProduct(var productId, var userId, var token) async {
    var url = Uri.http(Config.apiUrl, Config.deleteProductApi + "/$productId");

    final response = await http.delete(url, headers: await getHeaders());
    if (response != 200) {
      throw Exception(getError(response));
    }
    return true;
  }

  Future<GeneralResponse> editProduct(var productId, var userId, var token,
      var price, var description, var quantity) async {
    var url = Uri.http(Config.apiUrl, Config.editProductApi);

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };
    String requestBody = jsonEncode({
      'userid': userId,
      'token': token.toString(),
      'price': price,
      'description': description,
      'productid': productId,
      'quantity': quantity,
    });

    final response = await http.post(url, headers: header, body: requestBody);
    final generalResponse = generalResponseFromJson(response.body);

    return generalResponse;
  }

  Future createProduct(
      var postedBy,
      var name,
      var price,
      var category,
      var quantity,
      var brand,
      var description,
      var condition,
      List<XFile>? images) async {
    var url = Uri.http(Config.apiUrl, Config.createProductApi);
    String categoryId = "";
    if (category == "electronics") {
      categoryId = "6278f1a3cb3c6f7cec9f89a8";
    }
    if (category == "dress") {
      categoryId = "627b591a376e823fc303e6b8";
    }
    if (category == "shoes") {
      categoryId = "627b5909376e823fc303e6b6";
    }
    if (category == "phones") {
      categoryId = "6278f1a3cb3c6f7cec9f89a8";
    }
    final body = json.encode({
      "name": name,
      "price": price,
      "category": categoryId,
      "description": description,
      "quantity": quantity,
      "brand": brand,
      "productCondition": condition,
    });

    final response =
        await http.post(url, headers: await getHeaders(), body: body);
    if (response.statusCode != 201) {
      print(getError(response));
      throw Exception(getError(response));
    }
    String productId = json.decode(response.body)["data"]["id"];
    bool isChanged = await changeImage(
        Uri.http(
            Config.apiUrl, Config.createProductApi + '/image/${productId}'),
        images != null ? images : []);
    return true;
  }

  //PACKAGE API

  Future<Status> checkPackage(var userId) async {
    // print('Id: $userId');
    var url = Uri.http(Config.apiUrl, Config.checkPackageApi);

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };
    String requestBody = jsonEncode({
      'userid': userId,
    });

    final response = await http.post(url, headers: header, body: requestBody);
    // print('Check package status response : ${response.body}');
    final packageResponse = checkStatusFromJson(response.body);
    // print('Check package status response : ${packageResponse.data}');

    print(packageResponse);
    return packageResponse.data;
  }

  Future<GeneralResponse> buyPackage(var packageType, var userId) async {
    // print('Id: $userId');
    var url = Uri.http(Config.apiUrl, Config.buyPackageApi);

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };
    String requestBody = jsonEncode({
      'packagetype': packageType,
      'userid': userId,
    });

    final response = await http.post(url, headers: header, body: requestBody);
    final buyPackageResponse = generalResponseFromJson(response.body);

    return buyPackageResponse;
  }

  Future<List<Package>> getPackageInfo() async {
    var url = Uri.http(Config.apiUrl, Config.getPackageApi);

    final response = await http.get(url);
    // print('Get package response ${response.body}');
    final getPackageResponse = packageListFromJson(response.body);
    // print('Package check respose data: $getPackageResponse');

    return getPackageResponse.data;
  }

  //NOTIFICATION API
  Future<List<Notifications>?> getNotifications(var userId, var token) async {
    // print('Id: $userId');
    var url = Uri.http(Config.apiUrl, Config.getNotificationsApi);

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };
    String requestBody = jsonEncode({
      'userid': userId,
      'token': token,
    });

    final response = await http.post(url, headers: header, body: requestBody);
    // print('Get notification response ${response.body}');
    final getNotificationResponse = getNotificationFromJson(response.body);
    // print('Package check respose data: $packageResponse');
    List<Notifications>? data = getNotificationResponse.data;
    return data;
  }

  Future<GeneralResponse> readNotification(
      var userId, var notificationId, var token) async {
    // print('Id: $userId');
    var url = Uri.http(Config.apiUrl, Config.readNotificationsApi);

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };
    String requestBody = jsonEncode({
      'userid': userId,
      'notificationid': notificationId,
      'token': token,
    });

    final response = await http.post(url, headers: header, body: requestBody);
    final readNotificationResponse = generalResponseFromJson(response.body);

    return readNotificationResponse;
  }

  Future<GeneralResponse> readAllNotification(var userId, var token) async {
    var url = Uri.http(Config.apiUrl, Config.readAllNotificationsApi);

    Map<String, String> header = {
      'Content-type': 'application/json; charset=UTF-8'
    };
    String requestBody = jsonEncode({
      'userid': userId,
      'token': token,
    });

    final response = await http.post(url, headers: header, body: requestBody);
    print('REad notification response ${response.body}');
    final readAllNotificationResponse = generalResponseFromJson(response.body);
    // print('Package check respose data: $packageResponse');

    return readAllNotificationResponse;
  }
}
