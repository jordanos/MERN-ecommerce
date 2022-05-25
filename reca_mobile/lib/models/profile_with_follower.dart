// To parse this JSON data, do
//
//     final profileById = profileByIdFromJson(jsonString);

import 'dart:convert';

ProfileByIdWithFollower profileByIdWithFollowerFromJson(String str) =>
    ProfileByIdWithFollower.fromJson(json.decode(str));

class ProfileByIdWithFollower {
  ProfileByIdWithFollower({
    required this.data,
  });

  UserDataWithFollowerID data;

  factory ProfileByIdWithFollower.fromJson(Map<String, dynamic> json) =>
      ProfileByIdWithFollower(
        data: UserDataWithFollowerID.fromJson(json["data"]),
      );
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

  String userid;
  String fullname;
  String phonenumber;
  String address;
  String profileimage;
  String coverimage;
  int post;
  int product;
  int following;
  int follower;
  bool isfollowing;

  factory UserDataWithFollowerID.fromJson(Map<String, dynamic> user) =>
      UserDataWithFollowerID(
        userid: user["user"]["id"],
        fullname: user["user"]["name"],
        phonenumber: user["user"]["phone"],
        address: user["user"]["address"],
        profileimage: user["user"]["image"],
        coverimage: user["user"]["image"],
        post: user["feedsCount"],
        product: user["productsCount"],
        following: user["followingCount"],
        follower: user["followersCount"],
        isfollowing: false,
      );
}
