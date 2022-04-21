// To parse this JSON data, do
//
//     final conversation = conversationNewFromJson(jsonString);

import 'dart:convert';

ConversationNew conversationNewFromJson(String str) =>
    ConversationNew.fromJson(json.decode(str));

String conversationNewToJson(ConversationNew data) =>
    json.encode(data.toJson());

class ConversationNew {
  ConversationNew({
    required this.status,
    required this.message,
    required this.data,
  });

  int status;
  String message;
  List<AllConversationNew> data;

  factory ConversationNew.fromJson(Map<String, dynamic> json) =>
      ConversationNew(
        status: json["status"],
        message: json["message"],
        data: List<AllConversationNew>.from(
            json["data"].map((x) => AllConversationNew.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
      };
}

class AllConversationNew {
  AllConversationNew({
    required this.conversationid,
    required this.senderid,
    required this.reciverid,
    required this.time,
  });

  int conversationid;
  int senderid;
  int reciverid;
  DateTime time;

  factory AllConversationNew.fromJson(Map<String, dynamic> json) =>
      AllConversationNew(
        conversationid: json["conversationid"],
        senderid: json["senderid"],
        reciverid: json["reciverid"],
        time: DateTime.parse(json["time"]),
      );

  Map<String, dynamic> toJson() => {
        "conversationid": conversationid,
        "senderid": senderid,
        "reciverid": reciverid,
        "time": time.toIso8601String(),
      };
}
