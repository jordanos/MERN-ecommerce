// To parse this JSON data, do
//
//     final profileById = allUsersFromJson(jsonString);

import 'dart:convert';

Profile allUsersFromJson(String str) => Profile.fromJson(json.decode(str));

class Profile {
  Profile({
    required this.data,
  });

  List<AllUserData> data;

  factory Profile.fromJson(Map<String, dynamic> json) => Profile(
        data: List<AllUserData>.from(
            json["data"].map((x) => AllUserData.fromJson(x))),
      );
}

class AllUserData {
  AllUserData({
    required this.userid,
    required this.fullname,
    required this.profileimage,
  });

  String userid;
  String fullname;
  String profileimage;

  factory AllUserData.fromJson(Map<String, dynamic> json) => AllUserData(
        userid: json["id"],
        fullname: json["name"],
        profileimage: json["image"],
      );
}
