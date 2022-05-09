// To parse this JSON data, do
//
//     final conversation = heroFromJson(jsonString);

import 'dart:convert';

HeroModel heroFromJson(String str) => HeroModel.fromJson(json.decode(str));

String heroToJson(HeroModel data) => json.encode(data.toJson());

class HeroModel {
  HeroModel({
    required this.status,
    required this.message,
    required this.data,
  });

  int status;
  String message;
  List<HeroImg> data;

  factory HeroModel.fromJson(Map<String, dynamic> json) => HeroModel(
        status: json["status"],
        message: json["message"],
        data: List<HeroImg>.from(
            json["data"]["data"].map((x) => HeroImg.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
      };
}

class HeroImg {
  HeroImg({
    required this.heroproductid,
    required this.name,
    required this.image,
    required this.description,
  });

  int heroproductid;
  String name;
  String image;
  String description;

  factory HeroImg.fromJson(Map<String, dynamic> json) => HeroImg(
        heroproductid: json["heroproductid"],
        name: json["name"],
        image: json["image"],
        description: json["description"],
      );

  Map<String, dynamic> toJson() => {
        "heroproductid": heroproductid,
        "name": name,
        "image": image,
        "description": description,
      };
}
