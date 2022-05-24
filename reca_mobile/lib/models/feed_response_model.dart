// To parse this JSON data, do
//
//     final feedResponse = feedResponseFromJson(jsonString);

import 'dart:convert';

FeedResponse feedResponseFromJson(String str) =>
    FeedResponse.fromJson(json.decode(str));

class FeedResponse {
  FeedResponse({
    required this.data,
  });

  List<FeedData>? data;

  factory FeedResponse.fromJson(Map<String, dynamic> json) => FeedResponse(
        data:
            List<FeedData>.from(json["data"].map((x) => FeedData.fromJson(x))),
      );
}

class FeedData {
  FeedData({
    required this.feedid,
    required this.text,
    required this.numberoflike,
    required this.date,
    required this.image,
    required this.fullname,
    required this.profileimage,
    required this.postedby,
    required this.isliked,
  });

  String fullname;
  String profileimage;
  String feedid;
  String? text;
  int numberoflike;
  DateTime date;
  List<String> image;
  String postedby;
  String? isliked;

  factory FeedData.fromJson(Map<String, dynamic> feed) => FeedData(
        feedid: feed["id"],
        text: feed["text"],
        numberoflike: 0,
        date: DateTime.parse(feed["createdAt"]),
        image: [feed["image"]],
        postedby: feed["userId"]["id"],
        fullname: feed["userId"]["name"],
        profileimage: feed["userId"]["image"],
        isliked: "false",
      );
}
