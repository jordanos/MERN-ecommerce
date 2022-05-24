import 'dart:convert';

FeedModel feedModelFromJson(String str) =>
    FeedModel.fromJson(json.decode(str)["data"]);

class FeedModel {
  FeedModel({
    required this.id,
    required this.text,
    required this.createdAt,
  });

  String id;
  String text;
  DateTime createdAt;

  factory FeedModel.fromJson(Map<String, dynamic> json) => FeedModel(
        id: json["id"],
        text: json["text"],
        createdAt: DateTime.parse(json["createdAt"]),
      );
}
