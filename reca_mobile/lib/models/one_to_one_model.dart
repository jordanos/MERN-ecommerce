// To parse this JSON data, do
//
//     final oneToOneMessages = oneToOneMessagesFromJson(jsonString);

import 'dart:convert';

OneToOneMessages oneToOneMessagesFromJson(String str) =>
    OneToOneMessages.fromJson(json.decode(str));

OtOMessages otOMessagesFromJson(String str) =>
    OtOMessages.fromJson(json.decode(str));

class OneToOneMessages {
  OneToOneMessages({
    required this.data,
  });

  List<OtOMessages> data;

  factory OneToOneMessages.fromJson(Map<String, dynamic> json) =>
      OneToOneMessages(
        data: List<OtOMessages>.from(
            json["data"].map((x) => OtOMessages.fromJson(x))),
      );
}

class OtOMessages {
  OtOMessages({
    required this.conversationid,
    required this.sender,
    required this.text,
    required this.time,
  });

  String conversationid;
  String sender;
  String text;
  DateTime time;

  factory OtOMessages.fromJson(Map<String, dynamic> json) => OtOMessages(
        conversationid: json["id"],
        sender: json["fromId"],
        text: json["text"],
        time: DateTime.parse(json["createdAt"]),
      );
}
