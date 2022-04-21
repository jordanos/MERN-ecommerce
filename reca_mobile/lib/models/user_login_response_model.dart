// To parse this JSON data, do
//
//     final userLoginResponse = userLoginResponseFromJson(jsonString);

import 'dart:convert';

UserLoginResponse userLoginResponseFromJson(String str) =>
    UserLoginResponse.fromJson(json.decode(str));

String userLoginResponseToJson(UserLoginResponse data) =>
    json.encode(data.toJson());

class UserLoginResponse {
  UserLoginResponse({
    required this.status,
    required this.message,
    required this.data,
    required this.token,
  });

  int status;
  String message;
  List<UserData> data;
  String token;

  factory UserLoginResponse.fromJson(Map<String, dynamic> json) =>
      UserLoginResponse(
        status: json["status"],
        message: json["message"],
        data:
            List<UserData>.from(json["data"].map((x) => UserData.fromJson(x))),
        token: json["token"],
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
        "token": token,
      };
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

  int userid;
  String fullname;
  int phonenumber;
  String password;
  String address;
  String profileimage;
  String? coverimage;

  factory UserData.fromJson(Map<String, dynamic> json) => UserData(
        userid: json["userid"],
        fullname: json["fullname"],
        phonenumber: json["phonenumber"],
        password: json["password"],
        address: json["address"],
        profileimage: json["profileimage"],
        coverimage: json["coverimage"],
      );

  Map<String, dynamic> toJson() => {
        "userid": userid,
        "fullname": fullname,
        "phonenumber": phonenumber,
        "password": password,
        "address": address,
        "profileimage": profileimage,
        "coverimage": coverimage,
      };
}
