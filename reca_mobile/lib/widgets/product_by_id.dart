import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/models/product_response_model.dart';
import 'package:reca_mobile/screens/product_detail.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/grid_product_card.dart';
import 'package:reca_mobile/widgets/rating.dart';
import 'package:reca_mobile/widgets/shimmer.dart';

class ProductById extends StatefulWidget {
  var userId;

  ProductById({Key? key, required this.userId}) : super(key: key);

  @override
  _ProductByIdState createState() => _ProductByIdState();
}

class _ProductByIdState extends State<ProductById> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<ProductData>>(
      future: ApiServices().getProductByUserId(widget.userId),
      builder: (context, snapshot) {
        final data = snapshot.data;
        final orientation = MediaQuery.of(context).orientation;
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Container(
            margin: const EdgeInsets.only(left: 15, top: 15, right: 10),
            child: GridView.builder(
                physics: const ScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount:
                        (orientation == Orientation.portrait) ? 3 : 4,
                    mainAxisSpacing: 0,
                    crossAxisSpacing: 5,
                    childAspectRatio: 1 / 2),
                itemBuilder: (context, index) => const ProductShimmerSP(),
                itemCount: 7),
          );
        } else if (snapshot.connectionState == ConnectionState.none) {
          return Center(
            child: SizedBox(
              // height: 240,
              width: MediaQuery.of(context).size.width,
              child: const Text('Server Error'),
            ),
          );
        } else if (snapshot.connectionState == ConnectionState.done) {
          if (snapshot.hasData) {
            return Container(
              margin: const EdgeInsets.only(left: 15, top: 15, right: 0),
              child: GridProductCard(pData: data),
            );
          } else {
            return Container(
              margin: const EdgeInsets.only(left: 20),
              child: GridView.builder(
                  physics: const ScrollPhysics(),
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount:
                          (orientation == Orientation.portrait) ? 3 : 4,
                      mainAxisSpacing: 0,
                      crossAxisSpacing: 5,
                      childAspectRatio: 1 / 2),
                  itemBuilder: (context, index) => const ProductShimmerSP(),
                  itemCount: 7),
            );
          }
        } else {
          return const Center(child: (Text('Error')));
        }
      },
    );
  }
}

// 
