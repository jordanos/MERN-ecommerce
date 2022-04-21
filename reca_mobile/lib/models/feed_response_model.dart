// To parse this JSON data, do
//
//     final feedResponse = feedResponseFromJson(jsonString);

import 'dart:convert';

FeedResponse feedResponseFromJson(String str) =>
    FeedResponse.fromJson(json.decode(str));

String feedResponseToJson(FeedResponse data) => json.encode(data.toJson());

class FeedResponse {
  FeedResponse({
    required this.status,
    required this.message,
    required this.data,
  });

  int status;
  String message;
  List<FeedData>? data;

  factory FeedResponse.fromJson(Map<String, dynamic> json) => FeedResponse(
        status: json["status"],
        message: json["message"],
        data:
            List<FeedData>.from(json["data"].map((x) => FeedData.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": List<dynamic>.from(data!.map((x) => x.toJson())),
      };
}

class FeedData {
  FeedData({
    required this.fullname,
    required this.profileimage,
    required this.feedid,
    required this.text,
    required this.numberoflike,
    required this.date,
    required this.image,
    required this.postedby,
    required this.isliked,
  });

  String fullname;
  String profileimage;
  int feedid;
  String? text;
  int numberoflike;
  DateTime date;
  List<String> image;
  int postedby;
  String? isliked;

  factory FeedData.fromJson(Map<String, dynamic> json) => FeedData(
        fullname: json["fullname"],
        profileimage: json["profileimage"],
        feedid: json["feedid"],
        text: json["text"],
        numberoflike: json["numberoflike"],
        date: DateTime.parse(json["date"]),
        image: List<String>.from(json["image"].map((x) => x)),
        postedby: json["postedby"],
        isliked: json["isliked"],
      );

  Map<String, dynamic> toJson() => {
        "fullname": fullname,
        "profileimage": profileimage,
        "feedid": feedid,
        "text": text,
        "numberoflike": numberoflike,
        "date": date.toIso8601String(),
        "image": List<dynamic>.from(image.map((x) => x)),
        "postedby": postedby,
        "isliked": isliked,
      };
}
