// To parse this JSON data, do
//
//     final oneToOneMessages = oneToOneMessagesFromJson(jsonString);

import 'dart:convert';

OneToOneMessages oneToOneMessagesFromJson(String str) =>
    OneToOneMessages.fromJson(json.decode(str));

String oneToOneMessagesToJson(OneToOneMessages data) =>
    json.encode(data.toJson());

OtOMessages otOMessagesFromJson(String str) =>
    OtOMessages.fromJson(json.decode(str));

String otOMessagesToJson(OtOMessages data) => json.encode(data.toJson());

class OneToOneMessages {
  OneToOneMessages({
    required this.status,
    required this.message,
    required this.data,
  });

  int status;
  String message;
  List<OtOMessages> data;

  factory OneToOneMessages.fromJson(Map<String, dynamic> json) =>
      OneToOneMessages(
        status: json["status"],
        message: json["message"],
        data: List<OtOMessages>.from(
            json["data"].map((x) => OtOMessages.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
      };
}

class OtOMessages {
  OtOMessages({
    required this.conversationid,
    required this.sender,
    required this.text,
    required this.time,
  });

  int conversationid;
  int sender;
  String text;
  DateTime time;

  factory OtOMessages.fromJson(Map<String, dynamic> json) => OtOMessages(
        conversationid: json["conversationid"],
        sender: json["sender"],
        text: json["text"],
        time: DateTime.parse(json["time"]),
      );

  Map<String, dynamic> toJson() => {
        "conversationid": conversationid,
        "sender": sender,
        "text": text,
        "time": time.toIso8601String(),
      };
}
