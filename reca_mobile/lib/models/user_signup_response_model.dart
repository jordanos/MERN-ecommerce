// To parse this JSON data, do
//
// final userSignUpResponse = userSignUpResponseFromJson(jsonString);

import 'dart:convert';

UserSignUpResponse userSignUpResponseFromJson(String str) =>
    UserSignUpResponse.fromJson(json.decode(str));

String userSignUpResponseToJson(UserSignUpResponse data) =>
    json.encode(data.toJson());

class UserSignUpResponse {
  UserSignUpResponse({
    required this.status,
    required this.message,
  });

  int status;
  String message;

  factory UserSignUpResponse.fromJson(Map<String, dynamic> json) =>
      UserSignUpResponse(
        status: json["status"],
        message: json["message"],
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
      };
}
