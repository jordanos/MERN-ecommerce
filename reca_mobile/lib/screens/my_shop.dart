import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/product_response_model.dart';
import 'package:reca_mobile/screens/product_edit.dart';
import 'package:reca_mobile/screens/product_post.dart';
import 'package:reca_mobile/services/api_services.dart';

class MyShop extends StatefulWidget {
  const MyShop({Key? key}) : super(key: key);

  @override
  State<MyShop> createState() => _MyShopState();
}

class _MyShopState extends State<MyShop> {
  StorageController controller = Get.find();
  late Future getStatusInfo;
  late Future<List<ProductData>> products;

  @override
  void initState() {
    getStatusInfo = ApiServices().checkPackage(controller.id);
    products = ApiServices().getMyProducts();
    // setState(() {});
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        backgroundColor: Colors.white,
        resizeToAvoidBottomInset: false,
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
            child: Container(
              // height: MediaQuery.of(context).size.height,
              padding: const EdgeInsets.only(top: 10, left: 20, right: 5),
              color: Colors.white,
              child: Column(
                children: [
                  Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    height: 70,
                    child: FutureBuilder<dynamic>(
                        future: getStatusInfo,
                        builder: (context, snapshot) {
                          var data = snapshot.data;
                          if (snapshot.connectionState ==
                              ConnectionState.done) {
                            return Align(
                              alignment: Alignment.centerLeft,
                              child: SizedBox(
                                // margin: const EdgeInsets.only(bottom: 10),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceEvenly,
                                  children: [
                                    Column(
                                      // crossAxisAlignment:
                                      //     CrossAxisAlignment.center,
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        Container(
                                          width: 40,
                                          height: 40,
                                          margin: const EdgeInsets.only(
                                              right: 20, left: 20, bottom: 5),
                                          padding: const EdgeInsets.all(5),
                                          decoration: const BoxDecoration(
                                            shape: BoxShape.circle,
                                            color: Color(0xffd1f6e4),
                                          ),
                                          child: Center(
                                            child: Text(
                                              "100",
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  color: Color(0xff36cd70)),
                                            ),
                                          ),
                                        ),
                                        const Text('Remaining Product Posts',
                                            style: TextStyle(
                                                color: Color(0xff36cd70))),
                                      ],
                                    ),
                                    Column(
                                      // crossAxisAlignment:
                                      //     CrossAxisAlignment.center,
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        Container(
                                          width: 40,
                                          height: 40,
                                          margin: const EdgeInsets.only(
                                              right: 20, left: 20, bottom: 5),
                                          padding: const EdgeInsets.all(5),
                                          decoration: const BoxDecoration(
                                            shape: BoxShape.circle,
                                            color: Color(0xffedeafe),
                                          ),
                                          child: Center(
                                            child: Text(
                                              "30",
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  color: Color(0xff5633ed)),
                                            ),
                                          ),
                                        ),
                                        const Text('Remaining days',
                                            style: TextStyle(
                                                color: Color(0xff5633ed))),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            );
                          }
                          if (snapshot.connectionState ==
                              ConnectionState.waiting) {
                            return Container();
                          } else {
                            return SizedBox(
                              height: 240,
                              child: Center(
                                  child: IconButton(
                                      onPressed: () {
                                        print('Refresh button pressed');
                                        setState(() {
                                          products =
                                              ApiServices().getMyProducts();
                                        });
                                      },
                                      icon: const Icon(
                                        Icons.replay_outlined,
                                        size: 50,
                                        color: Color(0xfff7921f),
                                      ))),
                            );
                          }
                        }),
                  ),
                  const Divider(),
                  FutureBuilder<List<ProductData>>(
                    future: products,
                    builder: (context, snapshot) {
                      final data = snapshot.data;
                      // final orientation = MediaQuery.of(context).orientation;
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return Container(
                          // color: Colors.red,
                          margin: const EdgeInsets.only(left: 20),
                          child: const Center(
                            child: CircularProgressIndicator.adaptive(
                              backgroundColor: Color(0xfff7921f),
                            ),
                          ),
                        );
                      } else if (snapshot.connectionState ==
                          ConnectionState.none) {
                        return Center(
                          child: SizedBox(
                            // height: 240,
                            width: MediaQuery.of(context).size.width,
                            child: const Text('Server Error'),
                          ),
                        );
                      } else if (snapshot.connectionState ==
                          ConnectionState.done) {
                        // print('Number of products ${data?.length}');
                        if (data == null) {
                          return SizedBox(
                            height: MediaQuery.of(context).size.height,
                            width: MediaQuery.of(context).size.width,
                            child: const Center(
                              child: Text(
                                  'Looks like you haven\'t posted anything yet.)'),
                            ),
                          );
                        }
                        if (snapshot.hasData) {
                          return ListView.separated(
                            physics: const NeverScrollableScrollPhysics(),
                            shrinkWrap: true,
                            itemCount: data.length,
                            itemBuilder: (context, index) {
                              var productData = data[index];
                              // print('Number of products ${data.length}');

                              dynamic timeAgoSinceDate(DateTime dateString,
                                  {bool numericDates = true}) {
                                DateTime notificationDate = dateString;
                                final date2 = DateTime.now();
                                final difference =
                                    date2.difference(notificationDate);

                                if (difference.inDays > 31) {
                                  return 'More than 1 month ago';
                                } else if (difference.inDays > 24) {
                                  return 'More than 3 week ago';
                                } else if (difference.inDays > 16) {
                                  return 'More than 2 week ago';
                                } else if (difference.inDays > 8) {
                                  return 'More than 1 week ago';
                                } else if ((difference.inDays / 7).floor() >=
                                    1) {
                                  return (numericDates)
                                      ? '1 week ago'
                                      : 'Last week';
                                } else if (difference.inDays >= 2) {
                                  return '${difference.inDays} days ago';
                                } else if (difference.inDays >= 1) {
                                  return (numericDates)
                                      ? '1 day ago'
                                      : 'Yesterday';
                                } else if (difference.inHours >= 2) {
                                  return '${difference.inHours} hours ago';
                                } else if (difference.inHours >= 1) {
                                  return (numericDates)
                                      ? '1 hour ago'
                                      : 'An hour ago';
                                } else if (difference.inMinutes >= 2) {
                                  return '${difference.inMinutes} minutes ago';
                                } else if (difference.inMinutes >= 1) {
                                  return (numericDates)
                                      ? '1 minute ago'
                                      : 'A minute ago';
                                } else if (difference.inSeconds >= 3) {
                                  return '${difference.inSeconds} seconds ago';
                                } else {
                                  return 'Just now';
                                }
                              }

                              dynamic timeAgo =
                                  timeAgoSinceDate(productData.date);

                              return SizedBox(
                                width: MediaQuery.of(context).size.width,
                                height: 130,
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    ClipRRect(
                                      borderRadius: BorderRadius.circular(10),
                                      child: Image.network(
                                        productData.image[0],
                                        errorBuilder:
                                            (context, exception, stacktrace) {
                                          return Image.asset(
                                            'assets/images/grey.jpg',
                                            fit: BoxFit.cover,
                                            width: 90,
                                            height: 130,
                                          );
                                        },
                                        width: 90,
                                        height: 130,
                                        fit: BoxFit.cover,
                                      ),
                                    ),
                                    const SizedBox(
                                      width: 10,
                                    ),
                                    Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceEvenly,
                                      children: [
                                        Text(
                                          productData.name,
                                          style: const TextStyle(
                                            fontSize: 16,
                                          ),
                                        ),
                                        Text(
                                          '${(productData.price).toString()} ETB',
                                          style: const TextStyle(
                                            fontSize: 12,
                                          ),
                                        ),
                                        const SizedBox(
                                          height: 20,
                                        ),
                                        ElevatedButton(
                                          onPressed: () {
                                            Get.to(() => const ProductEdit(),
                                                arguments: productData);
                                          },
                                          child: const Text(
                                            'Edit',
                                            style: TextStyle(fontSize: 14),
                                          ),
                                          style: ElevatedButton.styleFrom(
                                            elevation: 0,
                                            onPrimary: Colors.white,
                                            primary: Colors.green,
                                            minimumSize: const Size(140, 30),
                                            maximumSize: const Size(140, 30),
                                            shape: RoundedRectangleBorder(
                                                borderRadius:
                                                    BorderRadius.circular(
                                                        30.0)),
                                            // side: const BorderSide(
                                            //   width: 0.3,
                                            //   color: Colors.grey,
                                            // ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    const Expanded(child: SizedBox()),
                                    Padding(
                                      padding: const EdgeInsets.only(
                                          top: 10, bottom: 8),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.end,
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: [
                                          // const SizedBox(
                                          //   height: 5,
                                          // ),
                                          Text(
                                            timeAgo,
                                            style: const TextStyle(
                                              overflow: TextOverflow.ellipsis,
                                              fontSize: 10,
                                              color: Colors.grey,
                                            ),
                                          ),
                                          // const SizedBox(
                                          //   height: 60,
                                          // ),
                                          GestureDetector(
                                            onTap: () async {
                                              Get.defaultDialog(
                                                title: "Delete Product",
                                                middleText:
                                                    "Are you sure you want to delete this product?",
                                                backgroundColor: Colors.white,
                                                titleStyle: const TextStyle(
                                                    color: Colors.black),
                                                middleTextStyle:
                                                    const TextStyle(
                                                        color: Colors.black),
                                                confirm: ElevatedButton(
                                                    style: ElevatedButton
                                                        .styleFrom(
                                                      elevation: 0,
                                                      onPrimary: const Color(
                                                          0xffe0466c),
                                                      primary: const Color(
                                                          0xfffee6ec),
                                                      minimumSize:
                                                          const Size(90, 25),
                                                      maximumSize:
                                                          const Size(90, 25),
                                                    ),
                                                    onPressed: () {
                                                      Get.back();
                                                      ApiServices()
                                                          .deleteProduct(
                                                        productData.productid,
                                                        controller.id,
                                                        controller.jwt,
                                                      );
                                                      Get.snackbar('Product',
                                                          'Successfully deleted',
                                                          duration:
                                                              const Duration(
                                                                  seconds: 3));
                                                      // Navigator.pop;
                                                      setState(() {});
                                                    },
                                                    child: const Text('Yes')),
                                                cancel: ElevatedButton(
                                                    style: ElevatedButton
                                                        .styleFrom(
                                                      elevation: 0,
                                                      onPrimary: Colors.white,
                                                      primary: const Color(
                                                          0xfff7921f),
                                                      minimumSize:
                                                          const Size(90, 25),
                                                      maximumSize:
                                                          const Size(90, 25),
                                                    ),
                                                    onPressed: () {
                                                      Get.back();
                                                    },
                                                    child: const Text('No')),
                                                buttonColor:
                                                    const Color(0xfff7921f),
                                                barrierDismissible: false,
                                                radius: 5,
                                              );
                                            },
                                            child: Column(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.center,
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.center,
                                              children: [
                                                Container(
                                                  width: 35,
                                                  height: 35,
                                                  margin: const EdgeInsets.only(
                                                      right: 20,
                                                      left: 20,
                                                      bottom: 5),
                                                  padding:
                                                      const EdgeInsets.all(5),
                                                  decoration:
                                                      const BoxDecoration(
                                                    shape: BoxShape.circle,
                                                    color: Color(0xfffee6ec),
                                                  ),
                                                  child: const Icon(
                                                    Icons.close_outlined,
                                                    size: 20,
                                                    color: Color(0xffe0466c),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                          // const SizedBox(
                                          //   height: 5,
                                          // ),
                                        ],
                                      ),
                                    )
                                  ],
                                ),
                              );
                            },
                            separatorBuilder: (context, index) =>
                                const Divider(),
                          );
                        } else {
                          return SizedBox(
                            height: MediaQuery.of(context).size.height,
                            width: MediaQuery.of(context).size.width,
                            child: Center(
                                child: IconButton(
                                    onPressed: () {
                                      print('Refresh button pressed');
                                      setState(() {});
                                    },
                                    icon: const Icon(
                                      Icons.replay_outlined,
                                      size: 50,
                                      color: Color(0xfff7921f),
                                    ))),
                          );
                        }
                      } else {
                        return const Center(child: (Text('Error')));
                      }
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Get.to(() => const ProductPost());
          },
          mini: true,
          elevation: 0.5,
          child: const Icon(
            Icons.add,
            color: Colors.white,
          ),
          backgroundColor: const Color(0xfff7921f),
        ),
      ),
    );
  }
}
