// To parse this JSON data, do
//
//     final conversation = heroFromJson(jsonString);

import 'dart:convert';

HeroModel heroFromJson(String body) => HeroModel.fromJson(json.decode(body));

class HeroModel {
  HeroModel({
    required this.data,
  });

  List<HeroImg> data;

  factory HeroModel.fromJson(Map<String, dynamic> body) {
    return HeroModel(
      data: List<HeroImg>.from(body["data"].map((hero) {
        return HeroImg.fromJson(hero);
      })),
    );
  }
}

class HeroImg {
  HeroImg({
    required this.heroproductid,
    required this.name,
    required this.image,
  });

  String heroproductid;
  String name;
  String image;

  factory HeroImg.fromJson(Map<String, dynamic> hero) => HeroImg(
        heroproductid: hero["id"],
        name: hero["name"],
        image: hero["image"],
      );
}
