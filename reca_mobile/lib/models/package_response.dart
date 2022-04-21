// To parse this JSON data, do
//
//     final checkStatus = checkStatusFromJson(jsonString);

import 'dart:convert';

CheckStatus checkStatusFromJson(String str) =>
    CheckStatus.fromJson(json.decode(str));

String checkStatusToJson(CheckStatus data) => json.encode(data.toJson());

class CheckStatus {
  CheckStatus({
    required this.status,
    required this.message,
    required this.data,
  });

  int status;
  String message;
  Status data;

  factory CheckStatus.fromJson(Map<String, dynamic> json) => CheckStatus(
        status: json["status"],
        message: json["message"],
        data: Status.fromJson(json["data"]),
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": data.toJson(),
      };
}

class Status {
  Status({
    required this.subscriptionid,
    required this.userid,
    required this.planid,
    required this.subscriptionStartTimestamp,
    required this.subscriptionEndTimestamp,
    required this.postleft,
    required this.status,
    required this.haspackage,
  });

  int? subscriptionid;
  int? userid;
  int? planid;
  DateTime? subscriptionStartTimestamp;
  DateTime? subscriptionEndTimestamp;
  int? postleft;
  int? status;
  String haspackage;

  factory Status.fromJson(Map<String, dynamic> json) => Status(
        subscriptionid: json["subscriptionid"],
        userid: json["userid"],
        planid: json["planid"],
        subscriptionStartTimestamp: json["subscription_start_timestamp"] == null
            ? DateTime.now()
            : DateTime.parse(json["subscription_start_timestamp"]),
        subscriptionEndTimestamp: json["subscription_end_timestamp"] == null
            ? DateTime.now()
            : DateTime.parse(json["subscription_end_timestamp"]),
        postleft: json["postleft"],
        status: json["status"],
        haspackage: json["haspackage"],
      );

  Map<String, dynamic> toJson() => {
        "subscriptionid": subscriptionid,
        "userid": userid,
        "planid": planid,
        "subscription_start_timestamp":
            subscriptionStartTimestamp!.toIso8601String(),
        "subscription_end_timestamp":
            subscriptionEndTimestamp!.toIso8601String(),
        "postleft": postleft,
        "status": status,
        "haspackage": haspackage,
      };
}
