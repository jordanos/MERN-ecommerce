// To parse this JSON data, do
//
//     final profileById = profileByIdFromJson(jsonString);

import 'dart:convert';

ProfileById profileByIdFromJson(String str) =>
    ProfileById.fromJson(json.decode(str));

String profileByIdToJson(ProfileById data) => json.encode(data.toJson());

class ProfileById {
  ProfileById({
    required this.status,
    required this.message,
    required this.data,
  });

  int status;
  String message;
  UserDataByID data;

  factory ProfileById.fromJson(Map<String, dynamic> json) => ProfileById(
        status: json["status"],
        message: json["message"],
        data: UserDataByID.fromJson(json["data"]),
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": data.toJson(),
      };
}

class UserDataByID {
  UserDataByID({
    required this.userid,
    required this.fullname,
    required this.phonenumber,
    required this.address,
    required this.profileimage,
    required this.coverimage,
    required this.post,
    required this.product,
    required this.following,
    required this.follower,
  });

  int userid;
  String fullname;
  int phonenumber;
  String address;
  String profileimage;
  String coverimage;
  int post;
  int product;
  int following;
  int follower;

  factory UserDataByID.fromJson(Map<String, dynamic> json) => UserDataByID(
        userid: json["userid"],
        fullname: json["fullname"],
        phonenumber: json["phonenumber"],
        address: json["address"],
        profileimage: json["profileimage"],
        coverimage: json["coverimage"],
        post: json["post"],
        product: json["product"],
        following: json["following"],
        follower: json["follower"],
      );

  Map<String, dynamic> toJson() => {
        "userid": userid,
        "fullname": fullname,
        "phonenumber": phonenumber,
        "address": address,
        "profileimage": profileimage,
        "coverimage": coverimage,
        "post": post,
        "product": product,
        "following": following,
        "follower": follower,
      };
}
