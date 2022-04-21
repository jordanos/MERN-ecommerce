import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/filter_controller.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/list.dart';
import 'package:reca_mobile/models/all_users.dart';
import 'package:reca_mobile/models/notification_model.dart';
import 'package:reca_mobile/models/product_response_model.dart';
import 'package:reca_mobile/screens/messages.dart';
import 'package:reca_mobile/screens/product_detail.dart';
import 'package:reca_mobile/screens/profile_visit.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/app_bar.dart';
import 'package:reca_mobile/widgets/filter_chip.dart';
import 'package:reca_mobile/widgets/rating.dart';
import 'package:reca_mobile/widgets/shimmer.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({Key? key}) : super(key: key);

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  List<String> stringList = <String>['Products', 'People'];
  List<String> sortList = <String>[
    'By Name',
    'By Name Des',
    'By Price Asc',
    'By Price Des',
    'By Date'
  ];

  String? init = 'Products';
  String? initSort = 'By Name';

  String searchString = '';
  StorageController controller = Get.find<StorageController>();
  FilterContoller filterController = Get.put(FilterContoller());

  final pageViewContoller = PageController(
    initialPage: 0,
  );
  var currentPageIndex = 0;
  late bool isProduct;
  bool isVisible = true;

  String? value;
  late Future<List<ProductData>> productFuture;
  @override
  void initState() {
    getProductData();
    // TODO: implement initState
    super.initState();
  }

  getProductData() async {
    var productFuture = ApiServices().getProductData();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          elevation: 0,
          actions: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.only(top: 30),
                ),
                const SizedBox(
                  width: 30,
                ),
                searchBar(),
                const SizedBox(
                  width: 20,
                ),
                notificationIcon(),
                const SizedBox(
                  width: 20,
                ),
              ],
            ),
          ],
        ),
        body: Container(
          // height: MediaQuery.of(context).size.height,
          color: Colors.white,
          padding: const EdgeInsets.only(
            top: 10,
            right: 20,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: init,
                      items: stringList.map((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Text(
                            value,
                            style: const TextStyle(color: Colors.black),
                          ),
                        );
                      }).toList(),
                      onChanged: (newValue) {
                        setState(() {
                          print(newValue);
                          if (newValue == 'Products') {
                            pageViewContoller.jumpToPage(0);
                          } else {
                            pageViewContoller.jumpToPage(1);
                          }
                          init = newValue;
                        });

                        // print(newValue);
                      },
                    ),
                  ),
                  // TextButton.icon(
                  //   onPressed: () => onFilterPressed(),
                  //   icon: const Text(
                  //     'Filter',
                  //     style: TextStyle(color: Colors.black),
                  //   ),
                  //   label: const Icon(
                  //     Icons.filter_list_outlined,
                  //     color: Colors.black,
                  //   ),
                  // ),
                  DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: initSort,
                      items: sortList.map((String v) {
                        return DropdownMenuItem<String>(
                          value: v,
                          child: Text(
                            v,
                            style: const TextStyle(color: Colors.black),
                          ),
                        );
                      }).toList(),
                      onChanged: (newV) {
                        setState(() {
                          print(newV);
                          // if (newValue == 'Products') {
                          //   pageViewContoller.previousPage(
                          //       duration: Duration(seconds: 1),
                          //       curve: Curves.easeIn);
                          // } else {
                          //   pageViewContoller.nextPage(
                          //       duration: Duration(seconds: 1),
                          //       curve: Curves.easeIn);
                          // }
                          initSort = newV;
                        });

                        // print(newValue);
                      },
                    ),
                  ),
                ],
              ),
              Expanded(
                child: PageView(
                  onPageChanged: _onPageViewChange,
                  controller: pageViewContoller,
                  children: [productSearch(), userSearch()],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  FutureBuilder<List<AllUserData>> userSearch() {
    return FutureBuilder<List<AllUserData>>(
        future: ApiServices().getAllUsers(),
        builder: (context, snapshot) {
          var data = snapshot.data;
          if (data != null) {
            List<AllUserData> userSearchList = data
                .where((element) => element.fullname
                    .toLowerCase()
                    .contains(searchString.toLowerCase()))
                .toList();

            // if (initSort == 'By Name') {
            userSearchList.sort((a, b) =>
                a.fullname.toLowerCase().compareTo(b.fullname.toLowerCase()));
            // }

            if (initSort == 'By Name Desc') {
              userSearchList.reversed;
            }

            return ListView.builder(
                itemCount: searchString == '' ? 0 : userSearchList.length,
                itemBuilder: (context, index) {
                  var user = userSearchList[index];
                  return !((user.userid).toString() ==
                          (controller.id).toString())
                      ? ListTile(
                          leading: CircleAvatar(
                            radius: 20,
                            backgroundImage: NetworkImage(user.profileimage),
                          ),
                          title: Text(
                            user.fullname,
                            maxLines: 1,
                          ),
                          onTap: () {
                            Get.to(() => const ProfileVisit(),
                                arguments: [user.userid, false, true]);
                          },
                        )
                      : Container();
                });
          } else {
            return Container();
          }
        });
  }

  FutureBuilder<List<ProductData>> productSearch() {
    return FutureBuilder<List<ProductData>>(
      future: ApiServices().getProductData(),
      builder: (context, snapshot) {
        final data = snapshot.data;
        final orientation = MediaQuery.of(context).orientation;
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Container(
            margin: const EdgeInsets.only(left: 20),
            child: GridView.builder(
                physics: const ScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount:
                        (orientation == Orientation.portrait) ? 3 : 4,
                    mainAxisSpacing: 10,
                    crossAxisSpacing: 0,
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
            List<ProductData> searchList = data!
                .where((element) => element.name
                    .toLowerCase()
                    .contains(searchString.toLowerCase()))
                .toList();
            print('Sorting parameter is : $initSort');
            if (initSort == 'By Name') {
              searchList.sort((a, b) =>
                  a.name.toLowerCase().compareTo(b.name.toLowerCase()));
            }
            if (initSort == 'By Date') {
              searchList.sort((a, b) => b.date.compareTo(a.date));
            }
            if (initSort == 'By Name Desc') {
              searchList.sort((a, b) =>
                  b.name.toLowerCase().compareTo(a.name.toLowerCase()));
            }
            if (initSort == 'By Price Des') {
              searchList.sort((a, b) => b.price.compareTo(a.price));
            }
            if (initSort == 'By Price Asc') {
              searchList.sort((a, b) => a.price.compareTo(b.price));
            }
            // List<ProductData> filteredList = [];
            // // filterController
            // //         .selectedFilters.isNotEmpty
            // //     ? searchList
            // //         .where((element) =>
            // //             element.category == filterController.selectedFilters[0])
            // //         .toList()
            // //     : searchList;
            // for (var item in searchList) {
            //   if (filterController.selectedFilters.isNotEmpty &&
            //       item.category == filterController.selectedFilters[0]) {
            //     filteredList.add(item);
            //   }
            // }
            return GridView.builder(
                physics: const ScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount:
                        (orientation == Orientation.portrait) ? 3 : 4,
                    mainAxisSpacing: 10,
                    crossAxisSpacing: 0,
                    childAspectRatio: 1 / 2),
                itemCount: searchString == '' ? 0 : searchList.length,
                itemBuilder: (context, index) {
                  var productData = searchList[index];
                  // print(filterController.selectedFilters);

                  return

                      // productData.name.contains(searchString)
                      //     ?
                      //   Obx(
                      // () => filterController.selectedFilters.isEmpty
                      //     ?
                      GestureDetector(
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
                              maxLines: 1,
                              style: const TextStyle(fontSize: 15),
                            ),
                          ),
                          const SizedBox(
                            height: 2,
                          ),
                          StarRating(
                            rating: productData.rate.toDouble(),
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
                                      fontSize: 10,
                                      fontWeight: FontWeight.normal)),
                            ],
                          ),
                        ],
                      ),
                    ),
                  );
                  // : productData.category ==
                  //         filterController.selectedFilters[0]
                  //     ? GestureDetector(
                  //         onTap: () {
                  //           // print(snapshot.data);
                  //           Get.to(() => ProductDetail(),
                  //               arguments: [productData]);
                  //         },
                  //         child: Container(
                  //           width: 100,
                  //           margin: const EdgeInsets.only(left: 20),
                  //           // alignment: Alignment,
                  //           child: Column(
                  //             // mainAxisAlignment: MainAxisAlignment.center,
                  //             crossAxisAlignment:
                  //                 CrossAxisAlignment.start,
                  //             children: <Widget>[
                  //               Container(
                  //                 width: 100,
                  //                 height: 150,
                  //                 decoration: BoxDecoration(
                  //                     borderRadius:
                  //                         BorderRadius.circular(10),
                  //                     border: Border.all(
                  //                       width: 1,
                  //                       color: Colors.white30,
                  //                     ),
                  //                     image: DecorationImage(
                  //                         fit: BoxFit.cover,
                  //                         image: NetworkImage(
                  //                             productData.image[0]))),
                  //               ),
                  //               const SizedBox(
                  //                 height: 8,
                  //               ),
                  //               SizedBox(
                  //                 width: 155,
                  //                 child: Text(
                  //                   productData.name,
                  //                   maxLines: 1,
                  //                   style: const TextStyle(fontSize: 15),
                  //                 ),
                  //               ),
                  //               const SizedBox(
                  //                 height: 2,
                  //               ),
                  //               StarRating(
                  //                 rating: productData.rate.toDouble(),
                  //               ),
                  //               const SizedBox(
                  //                 height: 2,
                  //               ),
                  //               Row(
                  //                 children: [
                  //                   Text(
                  //                     productData.price.toString(),
                  //                     style: const TextStyle(
                  //                       color: Colors.black,
                  //                       fontSize: 18,
                  //                       fontWeight: FontWeight.w500,
                  //                     ),
                  //                   ),
                  //                   const Text(' '),
                  //                   const Text('ETB',
                  //                       textAlign: TextAlign.right,
                  //                       style: TextStyle(
                  //                           fontSize: 10,
                  //                           fontWeight:
                  //                               FontWeight.normal)),
                  //                 ],
                  //               ),
                  //             ],
                  //           ),
                  //         ),
                  //       ),
                  //     // : Visibility(visible: false, child: Container()),

                  // : Container();
                });
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

  _onPageViewChange(int page) {
    print("Current Page: " + page.toString());

    setState(() {
      currentPageIndex = page;
    });
    // if (page != 0)
    //   previousPage--;
  }

  Widget searchBar() {
    var width = MediaQuery.of(context).size.width;
    return Container(
      height: 30,
      margin: const EdgeInsets.only(top: 0),
      width: width * .6,
      child: TextField(
        autofocus: true,
        onSubmitted: (value) {
          setState(() {
            searchString = value;
            print(searchString);

            FocusManager.instance.primaryFocus?.unfocus();
          });
        },
        onChanged: (value) {
          setState(() {
            searchString = value;
            print(searchString);
          });
        },
        cursorColor: Colors.black,
        style: const TextStyle(
          fontSize: 15,
          height: 1.5,
        ),
        maxLines: 1,
        autocorrect: false,
        decoration: InputDecoration(
          contentPadding: const EdgeInsets.symmetric(vertical: 5),
          prefixIcon:
              const Icon(Icons.search_outlined, color: Colors.black, size: 20),
          hintText: 'Search',
          border: OutlineInputBorder(
            borderRadius: const BorderRadius.all(Radius.circular(50)),
            borderSide: BorderSide(
              width: .5,
              color: Colors.grey.withOpacity(0.2),
            ),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: const BorderRadius.all(Radius.circular(50)),
            borderSide: BorderSide(
              width: 1,
              color: const Color(0xfff7921f).withOpacity(.5),
            ),
          ),
        ),
      ),
    );
  }

  GestureDetector notificationIcon() {
    return GestureDetector(
      onTap: () => onNotificationPressed(),
      child: Stack(clipBehavior: Clip.none, children: [
        const Icon(
          Icons.notifications_none_outlined,
          size: 30,
          color: Colors.black,
        ),
        Visibility(
          visible: controller.id == null ? false : isVisible,
          child: Positioned(
            top: -5,
            right: -5,
            child: Container(
              width: 20,
              height: 20,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(50),
                color: const Color(0xfff7921f),
              ),
              child: FutureBuilder<List<Notifications>?>(
                  future: ApiServices()
                      .getNotifications(controller.id, controller.jwt),
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Container();
                      // const Center(
                      //   child: CircularProgressIndicator.adaptive(
                      //     backgroundColor: Color(0xfff7921f),
                      //   ),
                      // );
                    }
                    if (snapshot.connectionState == ConnectionState.done) {
                      if (snapshot.hasData) {
                        var data = snapshot.data;
                        var length = data!.length;
                        for (var item in data) {
                          item.sentfrom.toString() == controller.id.toString()
                              ? length--
                              : null;
                          // print(length);
                        }
                        if (length > 0) {
                          isVisible = true;
                        } else {
                          isVisible = false;
                        }
                        return Center(
                          child: Text(
                            length.toString(),
                            style: const TextStyle(
                              color: Colors.white,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        );
                      } else {
                        return const Center(
                          child: Text(
                            '0',
                            style: TextStyle(color: Colors.white),
                            textAlign: TextAlign.center,
                          ),
                        );
                      }
                    } else {
                      return const Icon(
                        Icons.warning_outlined,
                        size: 12,
                      );
                    }
                  }),
            ),
          ),
        ),
      ]),
    );
  }

  void onNotificationPressed() {
    showModalBottomSheet(
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(10),
            topRight: Radius.circular(10),
          ),
        ),
        isScrollControlled: true,
        context: context,
        builder: (context) {
          return Container(
            height: MediaQuery.of(context).size.height / 1.2,
            padding: const EdgeInsets.only(
              top: 10,
              left: 20,
              right: 20,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const SizedBox(
                  height: 5,
                ),
                FutureBuilder<List<Notifications>?>(
                    future: ApiServices()
                        .getNotifications(controller.id, controller.jwt),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return SizedBox(
                          height: MediaQuery.of(context).size.height / 1.2,
                          child: const Center(
                            child: CircularProgressIndicator.adaptive(
                              backgroundColor: Color(0xfff7921f),
                            ),
                          ),
                        );
                      }
                      if (snapshot.connectionState == ConnectionState.done) {
                        if (snapshot.data != null) {
                          var data = snapshot.data;
                          return Column(
                            children: [
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  const Text(
                                    'Notifications',
                                    style: TextStyle(
                                      color: Colors.black,
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  TextButton(
                                    onPressed: () async {
                                      var result = await ApiServices()
                                          .readAllNotification(
                                              controller.id, controller.jwt);
                                      if (result.status == 200) {
                                        Get.back();
                                        Get.snackbar('Read Notification',
                                            'Successfully read all notifications');
                                      } else {
                                        null;
                                      }
                                    },
                                    child: Text(
                                      'Mark all as read',
                                      style: TextStyle(
                                        color: data!.isNotEmpty
                                            ? const Color(0xfff7921f)
                                            : Colors.grey,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              ListView.builder(
                                shrinkWrap: true,
                                itemCount: data.length,
                                itemBuilder: (context, index) {
                                  var finalData = data[index];

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
                                    } else if ((difference.inDays / 7)
                                            .floor() >=
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
                                      timeAgoSinceDate(finalData.timestamp);
                                  return finalData.sentfrom.toString() !=
                                          controller.id.toString()
                                      ? ListTile(
                                          onTap: () async {
                                            var result = await ApiServices()
                                                .readNotification(
                                                    controller.id,
                                                    finalData.notificationid,
                                                    controller.jwt);
                                            if (result.status == 200) {
                                              Get.back();
                                            } else {
                                              null;
                                            }
                                          },
                                          leading: const Icon(
                                            Icons.notifications_active_outlined,
                                            size: 25,
                                          ),
                                          title: RichText(
                                              text: TextSpan(
                                                  recognizer:
                                                      TapGestureRecognizer()
                                                        ..onTap = () {
                                                          Get.to(
                                                              () =>
                                                                  const ProfileVisit(),
                                                              arguments: [
                                                                finalData
                                                                    .sentfrom,
                                                                false,
                                                                true,
                                                              ]);
                                                        },
                                                  text: finalData.fullname
                                                      .toString(),
                                                  style: const TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                    color: Colors.black,
                                                    fontSize: 15,
                                                  ),
                                                  children: [
                                                const TextSpan(text: ' '),
                                                TextSpan(
                                                  text: finalData.text,
                                                  style: const TextStyle(
                                                    fontWeight:
                                                        FontWeight.normal,
                                                    color: Colors.black,
                                                    fontSize: 15,
                                                  ),
                                                ),
                                              ])),
                                          // Text(
                                          //   finalData.fullname + ' ' + finalData.text,
                                          //   style:
                                          //       const TextStyle(color: Color(0xfff7921f)),
                                          // ),
                                          trailing: Text(
                                            timeAgo,
                                            style: const TextStyle(
                                                color: Color(0xfff7921f)),
                                          ),
                                        )
                                      : Container();
                                },
                              ),
                            ],
                          );
                        } else {
                          return const Center(
                            child: Text('No notifications yet'),
                          );
                        }
                      } else {
                        return const Center(
                          child: Text(
                              'Something went wrong, pleaase try again later'),
                        );
                      }
                    }),
                const SizedBox(
                  height: 40,
                ),
              ],
            ),
          );
        });
  }

  // void onFilterPressed() {
  //   showModalBottomSheet(
  //       shape: const RoundedRectangleBorder(
  //         borderRadius: BorderRadius.only(
  //           topLeft: Radius.circular(10),
  //           topRight: Radius.circular(10),
  //         ),
  //       ),
  //       isScrollControlled: true,
  //       context: context,
  //       builder: (context) {
  //         return Container(
  //           padding: const EdgeInsets.only(
  //             top: 10,
  //             left: 20,
  //             right: 20,
  //           ),
  //           child: Column(
  //             mainAxisSize: MainAxisSize.min,
  //             children: [
  //               const SizedBox(
  //                 height: 5,
  //               ),
  //               Row(
  //                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
  //                 children: [
  //                   const Text(
  //                     'Filter Product',
  //                     style: TextStyle(
  //                       color: Colors.black,
  //                       fontWeight: FontWeight.bold,
  //                     ),
  //                   ),
  //                   TextButton(
  //                     onPressed: () {
  //                       print(filterController.selectedFilters);
  //                       filterController.selectedFilters = [];
  //                       print(filterController.selectedFilters);
  //                     },
  //                     child: const Text(
  //                       'Clear',
  //                       style: TextStyle(
  //                         color: Color(0xfff7921f),
  //                       ),
  //                     ),
  //                   ),
  //                 ],
  //               ),
  //               Container(
  //                 child: Wrap(
  //                   spacing: 15,
  //                   children: [
  //                     MyFilterChip(
  //                       chipName: 'Phone',
  //                       chipIcon: Icons.computer_outlined,
  //                     ),
  //                     MyFilterChip(
  //                         chipName: 'Toys', chipIcon: Icons.toys_outlined),
  //                     MyFilterChip(
  //                         chipName: 'Pets', chipIcon: Icons.pets_outlined),
  //                     MyFilterChip(
  //                         chipName: 'Shoes', chipIcon: Icons.ice_skating),
  //                     MyFilterChip(
  //                         chipName: 'Sports',
  //                         chipIcon: Icons.sports_basketball_outlined),
  //                     MyFilterChip(
  //                         chipName: 'Dress', chipIcon: Icons.card_travel),
  //                     MyFilterChip(
  //                         chipName: 'Furniture',
  //                         chipIcon: Icons.carpenter_outlined),
  //                   ],
  //                 ),
  //               ),
  //               const SizedBox(
  //                 height: 40,
  //               ),
  //             ],
  //           ),
  //         );
  //       });
  // }
}
