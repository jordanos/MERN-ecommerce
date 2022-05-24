// To parse this JSON data, do
//
//     final profileById = profileByIdFromJson(jsonString);

import 'dart:convert';

ProfileById profileByIdFromJson(String str) =>
    ProfileById.fromJson(json.decode(str));

class ProfileById {
  ProfileById({
    required this.data,
  });

  UserDataByID data;

  factory ProfileById.fromJson(Map<String, dynamic> json) => ProfileById(
        data: UserDataByID.fromJson(json["data"]),
      );
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

  factory UserDataByID.fromJson(Map<String, dynamic> user) => UserDataByID(
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
      );
}
