// To parse this JSON data, do
//
//     final oneToOneMessages = oneToOneMessagesFromJson(jsonString);

import 'dart:convert';

OtOMessages otOMessagesFromJson(String str) =>
    OtOMessages.fromJson(json.decode(str));

String otOMessagesToJson(OtOMessages data) => json.encode(data.toJson());

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
