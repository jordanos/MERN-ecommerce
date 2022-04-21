// To parse this JSON data, do
//
//     final profileById = allUsersFromJson(jsonString);

import 'dart:convert';

Profile allUsersFromJson(String str) => Profile.fromJson(json.decode(str));

String allUsersToJson(Profile data) => json.encode(data.toJson());

class Profile {
  Profile({
    required this.status,
    required this.message,
    required this.data,
  });

  int status;
  String message;
  List<AllUserData> data;

  factory Profile.fromJson(Map<String, dynamic> json) => Profile(
        status: json["status"],
        message: json["message"],
        data: List<AllUserData>.from(
            json["data"].map((x) => AllUserData.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
      };
}

class AllUserData {
  AllUserData({
    required this.userid,
    required this.fullname,
    required this.profileimage,
  });

  int userid;
  String fullname;
  String profileimage;

  factory AllUserData.fromJson(Map<String, dynamic> json) => AllUserData(
        userid: json["userid"],
        fullname: json["fullname"],
        profileimage: json["profileimage"],
      );

  Map<String, dynamic> toJson() => {
        "userid": userid,
        "fullname": fullname,
        "profileimage": profileimage,
      };
}
