import 'dart:convert';

GeneralResponse generalResponseFromJson(String str) =>
    GeneralResponse.fromJson(json.decode(str));

class GeneralResponse {
  GeneralResponse({
    required this.status,
    required this.message,
  });

  int status;
  String message;

  factory GeneralResponse.fromJson(Map<String, dynamic> json) =>
      GeneralResponse(
        status: json["status"],
        message: json["message"],
      );
}
