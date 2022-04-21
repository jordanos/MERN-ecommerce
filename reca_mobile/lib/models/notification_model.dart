// To parse this JSON data, do
//
//     final getNotification = getNotificationFromJson(jsonString);

import 'dart:convert';

GetNotifications getNotificationFromJson(String str) =>
    GetNotifications.fromJson(json.decode(str));

String getNotificationToJson(GetNotifications data) =>
    json.encode(data.toJson());

class GetNotifications {
  GetNotifications({
    required this.status,
    required this.message,
    required this.data,
  });

  int status;
  String message;
  List<Notifications>? data;

  factory GetNotifications.fromJson(Map<String, dynamic> json) =>
      GetNotifications(
        status: json["status"],
        message: json["message"],
        data: List<Notifications>.from(
            json["data"].map((x) => Notifications.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": List<dynamic>.from(data!.map((x) => x.toJson())),
      };
}

class Notifications {
  Notifications({
    required this.notificationid,
    required this.touser,
    required this.sentfrom,
    required this.fullname,
    required this.text,
    required this.status,
    required this.timestamp,
  });

  int notificationid;
  int touser;
  int sentfrom;
  String fullname;
  String text;
  int status;
  DateTime timestamp;

  factory Notifications.fromJson(Map<String, dynamic> json) => Notifications(
        notificationid: json["notificationid"],
        touser: json["touser"],
        sentfrom: json["sentfrom"],
        fullname: json["fullname"],
        text: json["text"],
        status: json["status"],
        timestamp: DateTime.parse(json["timestamp"]),
      );

  Map<String, dynamic> toJson() => {
        "notificationid": notificationid,
        "touser": touser,
        "sentfrom": sentfrom,
        "fullname": fullname,
        "text": text,
        "status": status,
        "timestamp": timestamp.toIso8601String(),
      };
}
