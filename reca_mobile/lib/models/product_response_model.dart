// To parse this JSON data, do
//
//     final productResponse = productResponseFromJson(jsonString);

import 'dart:convert';

ProductResponse productResponseFromJson(String str) =>
    ProductResponse.fromJson(json.decode(str));

String productResponseToJson(ProductResponse data) =>
    json.encode(data.toJson());

class ProductResponse {
  ProductResponse({
    required this.status,
    required this.message,
    required this.data,
  });

  int status;
  String message;
  List<ProductData> data;

  factory ProductResponse.fromJson(Map<String, dynamic> json) =>
      ProductResponse(
        status: json["status"],
        message: json["message"],
        data: List<ProductData>.from(
            json["data"].map((x) => ProductData.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "status": status,
        "message": message,
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
      };
}

class ProductData {
  ProductData({
    required this.productid,
    required this.postedby,
    required this.fullname,
    required this.phonenumber,
    required this.name,
    required this.price,
    required this.quantity,
    required this.description,
    required this.image,
    required this.rate,
    required this.category,
    required this.date,
    required this.productcondition,
    required this.brand,
    required this.ratecount,
    required this.israted,
  });

  int productid;
  int postedby;
  String fullname;
  int phonenumber;
  String name;
  int price;
  int quantity;
  String description;
  List<String> image;
  var rate;
  String category;
  DateTime date;
  String productcondition;
  String brand;
  int ratecount;
  String? israted;

  factory ProductData.fromJson(Map<String, dynamic> json) => ProductData(
        productid: json["productid"],
        postedby: json["postedby"],
        fullname: json["fullname"],
        phonenumber: json["phonenumber"],
        name: json["name"],
        price: json["price"],
        quantity: json["quantity"],
        description: json["description"],
        image: List<String>.from(json["image"].map((x) => x)),
        rate: json["rate"],
        category: json["category"],
        date: DateTime.parse(json["date"]),
        productcondition: json["productcondition"],
        brand: json["brand"],
        ratecount: json["ratecount"],
        israted: json["israted"],
      );

  Map<String, dynamic> toJson() => {
        "productid": productid,
        "postedby": postedby,
        "fullname": fullname,
        "phonenumber": phonenumber,
        "name": name,
        "price": price,
        "quantity": quantity,
        "description": description,
        "image": List<String>.from(image.map((x) => x)),
        "rate": rate,
        "category": category,
        "date": date.toIso8601String(),
        "productcondition": productcondition,
        "brand": brand,
        "ratecount": ratecount,
        "israted": israted,
      };
}
