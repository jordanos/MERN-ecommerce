// To parse this JSON data, do
//
//     final conversation = conversationFromJson(jsonString);

import 'dart:convert';

Conversation conversationFromJson(String str) =>
    Conversation.fromJson(json.decode(str));

String conversationToJson(Conversation data) => json.encode(data.toJson());

class Conversation {
  Conversation({
    required this.status,
    required this.message,
    required this.data,
  });

  int status;
  String message;
  List<AllConversation> data;

  factory Conversation.fromJson(Map<String, dynamic> json) => Conversation(
        status: json["status"],
        message: json["message"],
        data: List<AllConversation>.from(
            json["data"].map((x) => AllConversation.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
      };
}

class AllConversation {
  AllConversation({
    required this.conversationid,
    required this.senderid,
    required this.reciverid,
    required this.time,
    required this.lastseen,
    required this.unread,
  });

  int conversationid;
  int senderid;
  int reciverid;
  DateTime time;
  DateTime lastseen;
  int unread;

  factory AllConversation.fromJson(Map<String, dynamic> json) =>
      AllConversation(
        conversationid: json["conversationid"],
        senderid: json["senderid"],
        reciverid: json["reciverid"],
        time: DateTime.parse(json["time"]),
        lastseen: DateTime.parse(json["last_seen"]),
        unread: json["unread"],
      );

  Map<String, dynamic> toJson() => {
        "conversationid": conversationid,
        "senderid": senderid,
        "reciverid": reciverid,
        "time": time.toIso8601String(),
        "last_seen": time.toIso8601String(),
        "unread": unread,
      };
}
