// To parse this JSON data, do
//
//     final productResponse = productResponseFromJson(jsonString);

import 'dart:convert';

ProductResponse productResponseFromJson(String body) =>
    ProductResponse.fromJson(json.decode(body));

class ProductResponse {
  ProductResponse({
    required this.products,
  });

  List<ProductData> products;

  factory ProductResponse.fromJson(Map<String, dynamic> body) {
    return ProductResponse(
      products: List<ProductData>.from(
          body["data"].map((product) => ProductData.fromJson(product))),
    );
  }
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

  String productid;
  String postedby;
  String fullname;
  String phonenumber;
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
  var ratecount;
  String? israted;

  factory ProductData.fromJson(Map<String, dynamic> product) => ProductData(
        productid: product["id"],
        postedby: product["userId"]["id"],
        fullname: product["userId"]["name"],
        phonenumber: "251",
        name: product["name"],
        price: product["price"],
        quantity: product["quantity"],
        description: product["description"] ??= "",
        image: [product["image"]],
        rate: product["rate"],
        category: product["category"]["name"],
        date: DateTime.parse(product["createdAt"]),
        productcondition: product["productCondition"],
        brand: product["brand"],
        ratecount: product["rate"],
        israted: 'true',
      );
}
