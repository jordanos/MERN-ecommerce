// To parse this JSON data, do
//
//     final conversation = conversationFromJson(jsonString);

import 'dart:convert';

Conversation conversationFromJson(String str) =>
    Conversation.fromJson(json.decode(str));

class Conversation {
  Conversation({
    required this.data,
  });

  List<AllConversation> data;

  factory Conversation.fromJson(Map<String, dynamic> json) => Conversation(
        data: List<AllConversation>.from(
            json["data"].map((x) => AllConversation.fromJson(x))),
      );
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

  String conversationid;
  String senderid;
  String reciverid;
  DateTime time;
  DateTime lastseen;
  String unread;

  factory AllConversation.fromJson(Map<String, dynamic> message) =>
      AllConversation(
        conversationid: message["id"],
        senderid: message["fromId"],
        reciverid: message["toId"],
        time: DateTime.parse(message["createdAt"]),
        lastseen: DateTime.now(),
        unread: "read",
      );
}
