import 'package:carousel_pro_nullsafety/carousel_pro_nullsafety.dart';
import 'package:expandable_widget/expandable.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/feed_response_model.dart';
import 'package:reca_mobile/models/product_response_model.dart';
import 'package:reca_mobile/screens/product_detail.dart';
import 'package:reca_mobile/screens/profile_visit.dart';
import 'package:reca_mobile/widgets/rating.dart';

import 'like_button.dart';

class ProductCard extends StatefulWidget {
  List<ProductData>? pData;
  ProductCard({Key? key, required this.pData}) : super(key: key);

  @override
  _FeedCardState createState() => _FeedCardState();
}

class _FeedCardState extends State<ProductCard> {
  final _scrollController = ScrollController();
  StorageController controller = Get.find<StorageController>();
  List<ProductData>? pData;
  var _max;
  @override
  void initState() {
    pData = widget.pData;
    var length = pData!.length;
    if (length <= 10) {
      _max = length;
    } else {
      _max = 10;
    }

    // TODO: implement initState
    super.initState();
    _scrollController.addListener(() {
      if (_scrollController.position.pixels ==
          _scrollController.position.maxScrollExtent) {
        if (_max < length) {
          if (_max + 10 <= length) {
            setState(() {
              _max += 10;
            });
          } else if (_max + 10 > length) {
            setState(() {
              _max += 5;
            });
          }
        } else if (_max == length) {
          setState(() {
            _max = length;
          });
        }
      }
    });
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    _scrollController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        scrollDirection: Axis.horizontal,
        controller: _scrollController,
        itemCount: _max + 1,
        itemBuilder: (context, index) {
          if (index < pData!.length) {
            var productData = pData![index];
            if (index == _max && index != pData!.length) {
              return const SizedBox(
                height: 150,
                child: Center(
                  child: CircularProgressIndicator.adaptive(
                    backgroundColor: Color(0xffF7921F),
                  ),
                ),
              );
            }

            return GestureDetector(
              onTap: () {
                // print(snapshot.data);
                Get.to(() => ProductDetail(), arguments: [productData]);
              },
              child: Container(
                width: 100,
                margin: const EdgeInsets.only(left: 20),
                // alignment: Alignment,
                child: Column(
                  // mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Container(
                      width: 100,
                      height: 150,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            width: 1,
                            color: Colors.white30,
                          ),
                          image: DecorationImage(
                              fit: BoxFit.cover,
                              image: NetworkImage(productData.image[0]))),
                    ),
                    const SizedBox(
                      height: 8,
                    ),
                    SizedBox(
                      width: 155,
                      child: Text(
                        productData.name,
                        maxLines: 2,
                        style: const TextStyle(fontSize: 15),
                      ),
                    ),
                    const SizedBox(
                      height: 2,
                    ),
                    StarRating(
                      rating: productData.rate == null
                          ? 0
                          : productData.rate.toDouble(),
                    ),
                    const SizedBox(
                      height: 2,
                    ),
                    Row(
                      children: [
                        Text(
                          productData.price.toString(),
                          style: const TextStyle(
                            color: Colors.black,
                            fontSize: 18,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        const Text(' '),
                        const Text('ETB',
                            textAlign: TextAlign.right,
                            style: TextStyle(
                                fontSize: 10, fontWeight: FontWeight.normal)),
                      ],
                    ),
                  ],
                ),
              ),
            );
          } else {
            return Container(
              color: Colors.redAccent,
            );
          }
        });
  }
}
