// To parse this JSON data, do
//
//     final userLoginResponse = userLoginResponseFromJson(jsonString);

import 'dart:convert';

UserLoginResponse userLoginResponseFromJson(String str) =>
    UserLoginResponse.fromJson(json.decode(str));

class UserLoginResponse {
  UserData user;
  String token;

  UserLoginResponse({
    required this.user,
    required this.token,
  });

  factory UserLoginResponse.fromJson(Map<String, dynamic> body) =>
      UserLoginResponse(
          user: UserData.fromJson(body["data"]["user"]),
          token: body["data"]["token"]);
}

class UserData {
  UserData({
    required this.userid,
    required this.fullname,
    required this.phonenumber,
    required this.password,
    required this.address,
    required this.profileimage,
    required this.coverimage,
  });

  String userid;
  String fullname;
  String phonenumber;
  String password;
  String address;
  String profileimage;
  String? coverimage;

  factory UserData.fromJson(Map<String, dynamic> user) => UserData(
        userid: user["id"],
        fullname: user["name"],
        phonenumber: user["phone"],
        password: user["password"],
        address: user["address"],
        profileimage: user["image"],
        coverimage: user["image"],
      );
}
