// To parse this JSON data, do
//
//     final packageList = packageListFromJson(jsonString);

import 'dart:convert';

PackageList packageListFromJson(String str) =>
    PackageList.fromJson(json.decode(str));

String packageListToJson(PackageList data) => json.encode(data.toJson());

class PackageList {
  PackageList({
    required this.status,
    required this.message,
    required this.data,
  });

  int status;
  String message;
  List<Package> data;

  factory PackageList.fromJson(Map<String, dynamic> json) => PackageList(
        status: json["status"],
        message: json["message"],
        data: List<Package>.from(json["data"].map((x) => Package.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
      };
}

class Package {
  Package({
    required this.planid,
    required this.postsleft,
    required this.price,
    required this.name,
    required this.expirationtime,
  });

  String name;
  String expirationtime;
  int planid;
  int postsleft;
  int price;

  factory Package.fromJson(Map<String, dynamic> json) => Package(
        name: json["name"],
        postsleft: json["postsleft"],
        price: json["price"],
        planid: json["planid"],
        expirationtime: json["expirationtime"],
      );

  Map<String, dynamic> toJson() => {
        "name": name,
        "planid": planid,
        "postsleft": postsleft,
        "price": price,
        "expirationtime": expirationtime,
      };
}
