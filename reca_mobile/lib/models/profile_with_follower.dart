// To parse this JSON data, do
//
//     final profileById = profileByIdFromJson(jsonString);

import 'dart:convert';

ProfileByIdWithFollower profileByIdWithFollowerFromJson(String str) =>
    ProfileByIdWithFollower.fromJson(json.decode(str));

String profileByIdWithFollowerToJson(ProfileByIdWithFollower data) =>
    json.encode(data.toJson());

class ProfileByIdWithFollower {
  ProfileByIdWithFollower({
    required this.status,
    required this.message,
    required this.data,
  });

  int status;
  String message;
  UserDataWithFollowerID data;

  factory ProfileByIdWithFollower.fromJson(Map<String, dynamic> json) =>
      ProfileByIdWithFollower(
        status: json["status"],
        message: json["message"],
        data: UserDataWithFollowerID.fromJson(json["data"]),
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": data.toJson(),
      };
}

class UserDataWithFollowerID {
  UserDataWithFollowerID({
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
    required this.isfollowing,
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
  bool isfollowing;

  factory UserDataWithFollowerID.fromJson(Map<String, dynamic> json) =>
      UserDataWithFollowerID(
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
        isfollowing: json["isfollowing"],
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
        "isfollowing": isfollowing,
      };
}
