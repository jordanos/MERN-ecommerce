// To parse this JSON data, do
//
//     final conversation = categoryListFromJson(jsonString);

import 'dart:convert';

CategoryList categoryListFromJson(String str) =>
    CategoryList.fromJson(json.decode(str));

String categoryListToJson(CategoryList data) => json.encode(data.toJson());

class CategoryList {
  CategoryList({
    required this.status,
    required this.message,
    required this.data,
  });

  int status;
  String message;
  List<CategoryData> data;

  factory CategoryList.fromJson(Map<String, dynamic> json) => CategoryList(
        status: json["status"],
        message: json["message"],
        data: List<CategoryData>.from(
            json["data"].map((x) => CategoryData.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
      };
}

class CategoryData {
  CategoryData({
    required this.categoryid,
    required this.category,
  });

  int categoryid;
  String category;

  factory CategoryData.fromJson(Map<String, dynamic> json) => CategoryData(
        categoryid: json["catagoryid"],
        category: json["catagory"],
      );

  Map<String, dynamic> toJson() => {
        "catagoryid": categoryid,
        "catagory": category,
      };
}
