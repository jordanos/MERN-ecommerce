import 'dart:ui';

import 'package:carousel_pro_nullsafety/carousel_pro_nullsafety.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/list.dart';
import 'package:reca_mobile/models/hero_model.dart';
import 'package:reca_mobile/models/product_response_model.dart';
import 'package:reca_mobile/screens/category.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/product_card.dart';
import 'package:reca_mobile/widgets/shimmer.dart';

class HomePage extends StatefulWidget {
  // final List<UserLoginResponse> arg;

  HomePage({Key? key}) : super(key: key);
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Image> images = [];
  late Future<List<HeroImg>> getHeroImg;

  @override
  void initState() {
    getHeroImg = ApiServices().getHero();

    super.initState();
  }

  void setStateIfMounted(f) {
    if (mounted) setState(f);
  }

  final storage = const FlutterSecureStorage();

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        backgroundColor: Colors.white,
        resizeToAvoidBottomInset: false,
        // appBar: const MyAppBar(height: 50,),
        body: RefreshIndicator(
          color: const Color(0xfff7921f),
          onRefresh: () {
            Future<void> f() async {
              setState(() {});
              // return void;
            }

            return f();
          },
          child: SingleChildScrollView(
            physics: const ScrollPhysics(),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                const SizedBox(
                  height: 20,
                ),
                FutureBuilder<List<HeroImg>>(
                    future: getHeroImg,
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.done) {
                        if (snapshot.hasData) {
                          var heroData = snapshot.data;
                          var images = heroData!
                              .map(
                                (e) => Image.network(
                                  e.image,
                                  fit: BoxFit.cover,
                                  errorBuilder:
                                      (context, exception, stacktrace) {
                                    // print(e);
                                    return Image.asset(
                                      'assets/images/grey.jpg',
                                      fit: BoxFit.cover,
                                    );
                                  },
                                ),
                              )
                              .toList();
                          return SizedBox(
                              height: 120,
                              width: MediaQuery.of(context).size.width * .9,
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(10),
                                child: Carousel(
                                  autoplay: true,
                                  images: images,
                                  animationDuration:
                                      const Duration(milliseconds: 1500),
                                  dotSize: 5,
                                  dotBgColor: Colors.transparent,
                                  dotSpacing: 15,
                                  dotIncreasedColor: const Color(0xffF7921F),
                                  dotIncreaseSize: 1.5,
                                ),
                              ));
                        } else {
                          return SizedBox(
                              height: 120,
                              width: MediaQuery.of(context).size.width * .9,
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(10),
                                child: const Image(
                                  image: AssetImage('assets/images/grey.jpg'),
                                  fit: BoxFit.cover,
                                ),
                              ));
                        }
                      } else if (snapshot.connectionState ==
                          ConnectionState.waiting) {
                        return SizedBox(
                            height: 120,
                            width: MediaQuery.of(context).size.width * .9,
                            child: ClipRRect(
                                borderRadius: BorderRadius.circular(10),
                                child: Skeleton(
                                  height: 120,
                                  width: MediaQuery.of(context).size.width * .9,
                                )));
                      } else {
                        return SizedBox(
                            height: 120,
                            width: MediaQuery.of(context).size.width * .9,
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(10),
                              child: const Image(
                                image: AssetImage('assets/images/grey.jpg'),
                              ),
                            ));
                      }
                    }),
                Container(
                  height: 100,
                  padding: const EdgeInsets.symmetric(vertical: 15),
                  child: ListView.builder(
                      itemCount: labels.length,
                      scrollDirection: Axis.horizontal,
                      padding: const EdgeInsets.only(left: 20, right: 20),
                      itemBuilder: (context, index) {
                        return GestureDetector(
                          onTap: () {
                            switch (index) {
                              case 0:
                                Get.to(() => CategoryPage(
                                      category: labels[index]['category'],
                                    ));
                                print('All products');
                                break;
                              case 1:
                                Get.to(() => CategoryPage(
                                      category: labels[index]['category'],
                                    ));
                                print('Sports');
                                break;
                              case 2:
                                Get.to(() => CategoryPage(
                                      category: labels[index]['category'],
                                    ));
                                print('Gaming');
                                break;
                              case 3:
                                Get.to(() => CategoryPage(
                                      category: labels[index]['category'],
                                    ));
                                print('Computers');
                                break;
                              case 4:
                                Get.to(() => CategoryPage(
                                      category: labels[index]['category'],
                                    ));
                                print('Automotive 1');
                                break;
                              default:
                            }
                          },
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            // crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                width: 40,
                                height: 40,
                                margin: const EdgeInsets.only(
                                    right: 20, left: 20, bottom: 5),
                                padding: const EdgeInsets.all(5),
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: labels[index]['bgcolor'],
                                ),
                                child: Icon(
                                  labels[index]['icon'],
                                  color: labels[index]['iconcolor'],
                                ),
                              ),
                              Text(
                                labels[index]['text'],
                                style: const TextStyle(fontSize: 12),
                              ),
                            ],
                          ),
                        );
                      }),
                ),
                futureBuilder(
                    'Trending Products', ApiServices().getProductData()),
                futureBuilder('All Products', ApiServices().getProductData()),

                futureBuilder('Phones',
                    ApiServices().getProductsByCategory('Electronics')),
                futureBuilder(
                    'Clothing', ApiServices().getProductsByCategory('Clothes')),
                futureBuilder(
                    'Shoes', ApiServices().getProductsByCategory('Shoe')),
                // futureBuilder('All Products', ApiServices().getProductData()),
              ],
            ),
          ),
        ),
      ),
    );
  }

  FutureBuilder<List<ProductData>> futureBuilder(
      String title, Future<List<ProductData>> future) {
    return FutureBuilder<List<ProductData>>(
      future: future,
      builder: (context, snapshot) {
        final data = snapshot.data;

        if (snapshot.connectionState == ConnectionState.waiting) {
          return Container(
            margin: const EdgeInsets.only(left: 20),
            height: 230,
            child: ListView.separated(
                scrollDirection: Axis.horizontal,
                physics: const NeverScrollableScrollPhysics(),
                itemBuilder: (context, index) => ProductShimmerHP(),
                separatorBuilder: (context, index) => const SizedBox(
                      width: 20,
                    ),
                itemCount: 3),
          );
        } else if (snapshot.connectionState == ConnectionState.none) {
          return Center(
            child: SizedBox(
              height: 240,
              width: MediaQuery.of(context).size.width,
              child: const Center(child: Text('Server Error')),
            ),
          );
        } else if (snapshot.connectionState == ConnectionState.done) {
          if (snapshot.hasData) {
            return Column(
              children: [
                Padding(
                  padding: const EdgeInsets.only(left: 20.0, top: 10.0),
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      title,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                SizedBox(
                  height: 240,
                  child: ProductCard(pData: data),
                ),
              ],
            );
          } else {
            return Container(
              margin: const EdgeInsets.only(left: 20),
              height: 230,
              child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  physics: const NeverScrollableScrollPhysics(),
                  itemBuilder: (context, index) => ProductShimmerHP(),
                  separatorBuilder: (context, index) => const SizedBox(
                        width: 20,
                      ),
                  itemCount: 3),
            );
          }
        } else {
          return const Center(child: (Text('Error')));
        }
      },
    );
  }
}
