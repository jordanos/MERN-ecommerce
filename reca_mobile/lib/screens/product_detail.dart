import 'package:carousel_pro_nullsafety/carousel_pro_nullsafety.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/conversation_model.dart';
import 'package:reca_mobile/models/coversation_model_nolastseen.dart';
import 'package:reca_mobile/models/product_response_model.dart';
import 'package:reca_mobile/screens/messages.dart';
import 'package:reca_mobile/screens/profile_visit.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/rating.dart';
import 'package:reca_mobile/widgets/shimmer.dart';
import 'package:shimmer/shimmer.dart';
import 'package:url_launcher/url_launcher.dart';

class ProductDetail extends StatefulWidget {
  ProductDetail({Key? key}) : super(key: key);

  @override
  State<ProductDetail> createState() => _ProductDetailState();
}

class _ProductDetailState extends State<ProductDetail> {
  dynamic argumentData = Get.arguments;
  // final CarouselController _controller = CarouselController();
  StorageController controller = Get.find<StorageController>();
  late Future<List<AllConversationNew>> textFuture;
  final pageViewContoller = PageController(
    initialPage: 0,
  );

  @override
  void initState() {
    textFuture = ApiServices()
        .createNewCoversation(controller.id, argumentData[0].postedby);
    // TODO: implement initState
    super.initState();
  }

  var currentPageIndex = 0;
  var _current = 0;

  @override
  Widget build(BuildContext context) {
    if (argumentData[0].image.isNotEmpty) {
      argumentData[0].image.removeWhere((item) => item == '');
    }
    bool indicator = argumentData[0].image.length > 1 ? true : false;
    return Scaffold(
      backgroundColor: Colors.white,
      resizeToAvoidBottomInset: false,
      appBar:
          //  PreferredSize(
          //     child: Row(
          //       crossAxisAlignment: CrossAxisAlignment.end,
          //       mainAxisAlignment: MainAxisAlignment.spaceBetween,
          //       children: [
          //         Padding(
          //           padding: const EdgeInsets.only(top: 10, left: 20),
          //           child: IconButton(
          //             onPressed: () {
          //               Navigator.pop(context);
          //             },
          //             icon: const Icon(Icons.arrow_back_outlined),
          //           ),
          //         ),
          //         Padding(
          //           padding: EdgeInsets.only(top: 10, right: 20),
          //           child: Align(
          //             alignment: Alignment.centerRight,
          //             child: Icon(Icons.share),
          //           ),
          //         )
          //       ],
          //     ),
          //     preferredSize: const Size.fromHeight(30)),
          AppBar(
        elevation: 0,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back_outlined),
        ),
        actions: const [
          Expanded(child: SizedBox()),
          Padding(
            padding: EdgeInsets.only(right: 20),
            child: Align(
              alignment: Alignment.centerRight,
              child: Icon(Icons.share),
            ),
          )
        ],
      ),
      body: SingleChildScrollView(
        child: Container(
          height: 690,
          padding: const EdgeInsets.only(right: 25, left: 25),
          color: Colors.white,
          child: Column(
            children: [
              SizedBox(
                height: 300,
                width: MediaQuery.of(context).size.width * .9,
                child: Carousel(
                  showIndicator: indicator,
                  images: argumentData[0]
                      .image
                      .map<Widget>((e) => Image.network(
                            e,
                            errorBuilder: (context, exception, stacktrace) {
                              return Image.asset(
                                'assets/images/grey.jpg',
                                fit: BoxFit.cover,
                              );
                            },
                          ))
                      .toList(),
                  animationDuration: const Duration(milliseconds: 500),
                  dotSize: 5,
                  dotBgColor: Colors.transparent,
                  dotSpacing: 15,
                  dotIncreasedColor: const Color(0xffF7921F),
                  dotIncreaseSize: 1.5,
                  autoplay: false,
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              RichText(
                textAlign: TextAlign.center,
                text: TextSpan(
                    recognizer: TapGestureRecognizer()
                      ..onTap = () => pageViewContoller.jumpToPage(0),
                    text: 'OverView',
                    style: TextStyle(
                      color: (currentPageIndex == 0
                          ? const Color(0xfff7921f)
                          : Colors.black),
                      fontSize: 22,
                    ),
                    children: [
                      const TextSpan(
                        text: '             ',
                        style: TextStyle(fontSize: 22, color: Colors.grey),
                      ),
                      TextSpan(
                        recognizer: TapGestureRecognizer()
                          ..onTap = () => pageViewContoller.jumpToPage(1),
                        text: 'Specification',
                        style: TextStyle(
                          color: (currentPageIndex == 1
                              ? const Color(0xfff7921f)
                              : Colors.black),
                          fontSize: 22,
                        ),
                      )
                    ]),
              ),
              const SizedBox(
                height: 20,
              ),
              SizedBox(
                height: 250,
                child: PageView(
                  controller: pageViewContoller,
                  children: [
                    OverView(argumentDataO: argumentData),
                    Specs(
                      argumentDataS: argumentData,
                    ),
                  ],
                  onPageChanged: _onPageViewChange,
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              SizedBox(
                height: 60,
                width: MediaQuery.of(context).size.width,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      margin:
                          const EdgeInsets.only(right: 20, left: 0, bottom: 5),
                      padding: const EdgeInsets.all(5),
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.transparent,
                      ),
                      child: FutureBuilder<List<AllConversationNew>>(
                          future: ApiServices().createNewCoversation(
                              controller.id, argumentData[0].postedby),
                          builder: (context, snapshot) {
                            print(
                                'Product detail page text future output: ${snapshot.data}');

                            if (snapshot.connectionState ==
                                ConnectionState.done) {
                              if (snapshot.hasData) {
                                print(
                                    'Product detail page text future output: ${snapshot.data}');
                                var data = snapshot.data![0];

                                var length = data;
                                var finalId;
                                data.senderid.toString() ==
                                        controller.id.toString()
                                    ? finalId = data.reciverid
                                    : finalId = data.senderid;
                                return argumentData[0].postedby.toString() !=
                                        controller.id.toString()
                                    ? GestureDetector(
                                        onTap: () {
                                          Get.to(() => MessagePage(),
                                              // );
                                              arguments: [
                                                data.conversationid,
                                                finalId
                                              ]);
                                        },
                                        child: const Icon(
                                          Icons.message_outlined,
                                          size: 20,
                                          color: Colors.black,
                                        ),
                                      )
                                    : const Icon(
                                        Icons.message_outlined,
                                        size: 20,
                                        color: Colors.black,
                                      );
                              } else {
                                return IconButton(
                                    onPressed: () {
                                      print('Refresh button pressed');
                                      setState(() {});
                                    },
                                    icon: const Icon(
                                      Icons.replay_outlined,
                                      size: 20,
                                      color: Color(0xfff7921f),
                                    ));
                              }
                            }
                            if (snapshot.connectionState ==
                                ConnectionState.waiting) {
                              return const CircularProgressIndicator.adaptive();
                            } else {
                              return IconButton(
                                  onPressed: () {
                                    print('Refresh button pressed');
                                    setState(() {});
                                  },
                                  icon: const Icon(
                                    Icons.replay_outlined,
                                    size: 20,
                                    color: Color(0xfff7921f),
                                  ));
                            }
                          }),
                    ),
                    ElevatedButton.icon(
                        icon: const Icon(Icons.phone_outlined),
                        style: ElevatedButton.styleFrom(
                            onPrimary: Colors.white,
                            primary: const Color(0xfff7921f),
                            minimumSize: const Size(250, 40),
                            maximumSize: const Size(250, 40),
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(32.0)),
                            side: const BorderSide(
                              width: 2.0,
                              color: Color(0xfff7921f),
                            )),
                        onPressed: () {
                          launch(
                              'tel://${argumentData[0].phonenumber.toString()}');
                          print(argumentData[0].phonenumber);
                          print('Call button pressed');
                        },
                        label: const Text(
                          'Call',
                          style: TextStyle(fontSize: 17),
                        )),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  _onPageViewChange(int page) {
    print("Current Page: " + page.toString());
    currentPageIndex = page;
    setState(() {});
    // if (page != 0)
    //   previousPage--;
  }
}

class OverView extends StatefulWidget {
  OverView({Key? key, required this.argumentDataO}) : super(key: key);
  dynamic argumentDataO;

  @override
  State<OverView> createState() => _OverViewState();
}

class _OverViewState extends State<OverView> {
  StorageController controller = Get.find<StorageController>();
  double rating = 0.0;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Text(
            widget.argumentDataO[0].description,
            style: const TextStyle(
              height: 1.5,
              fontSize: 14,
            ),
          ),
          const SizedBox(
            height: 15,
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Text(
              'Price',
              style: TextStyle(
                color: Colors.grey[700],
                fontSize: 15,
              ),
            ),
          ),
          const SizedBox(
            height: 15,
          ),
          Align(
            alignment: Alignment.topLeft,
            child: RichText(
              text: TextSpan(
                  text: widget.argumentDataO[0].price.toString(),
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 30,
                  ),
                  children: const [
                    TextSpan(
                      text: ' ',
                    ),
                    TextSpan(
                      text: 'ETB',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 14,
                      ),
                    ),
                  ]),
            ),
          ),
          const SizedBox(
            height: 15,
          ),
          Align(
            alignment: Alignment.topLeft,
            child: RichText(
              text: TextSpan(
                  text: 'Posted by',
                  style: TextStyle(
                    color: Colors.grey[700],
                    fontSize: 14,
                  ),
                  children: [
                    const TextSpan(
                      text: ' ',
                    ),
                    controller.id.toString() ==
                            widget.argumentDataO[0].postedby.toString()
                        ? TextSpan(
                            recognizer: TapGestureRecognizer()..onTap = () {},
                            text: widget.argumentDataO[0].fullname,
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                              fontSize: 17,
                            ),
                          )
                        : TextSpan(
                            recognizer: TapGestureRecognizer()
                              ..onTap = () {
                                Get.to(() => const ProfileVisit(), arguments: [
                                  widget.argumentDataO[0],
                                  true,
                                  false
                                ]);
                              },
                            text: widget.argumentDataO[0].fullname,
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                              fontSize: 17,
                            ),
                          ),
                  ]),
            ),
          ),
          const SizedBox(
            height: 15,
          ),
          Align(
            alignment: Alignment.topLeft,
            child: FutureBuilder<List<ProductData>>(
                future: ApiServices().getProductDataWithRating(
                    controller.id, widget.argumentDataO[0].productid),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Skeleton(
                      width: 80,
                    );
                  } else if (snapshot.connectionState == ConnectionState.done) {
                    if (snapshot.hasData) {
                      var data = snapshot.data;
                      // print('Product detail page snapshot data $data');
                      var length = data!.length;
                      var isRated = data[0].israted;

                      if (isRated == 'false') {
                        return SizedBox(
                          height: 45,
                          child: Column(
                            children: [
                              PStarRating(
                                rating: widget.argumentDataO[0].rate == null
                                    ? 0
                                    : widget.argumentDataO[0].rate.toDouble(),
                                onRatingChanged: (rating) async {
                                  setState(() {
                                    this.rating = rating;
                                    widget.argumentDataO[0].rate = this.rating;
                                    widget.argumentDataO[0].ratecount++;
                                    data[0].israted = 'true';
                                  });
                                  // setState(() => );
                                  var result = await ApiServices().rateProduct(
                                      widget.argumentDataO[0].productid,
                                      controller.id,
                                      rating);
                                  if (result.status == 200) {
                                    Get.snackbar(
                                        'Rating', 'Product rated successfully');
                                    setState(() {});
                                  } else {
                                    Get.snackbar('Rating',
                                        'You have already rated this product');
                                  }
                                },
                              ),
                              const SizedBox(
                                height: 5,
                              ),
                              const Align(
                                alignment: Alignment.centerLeft,
                                child: Text(
                                  'Rate this product',
                                  style: TextStyle(color: Colors.black),
                                ),
                              ),
                            ],
                          ),
                        );
                      } else {
                        return SizedBox(
                          height: 45,
                          child: Column(
                            children: [
                              PStarRating(
                                rating: widget.argumentDataO[0].rate == null
                                    ? 0
                                    : widget.argumentDataO[0].rate.toDouble(),
                              ),
                              const SizedBox(
                                height: 5,
                              ),
                              const Align(
                                alignment: Alignment.centerLeft,
                                child: Text(
                                  'You have already rated this product',
                                  style: TextStyle(color: Colors.black),
                                ),
                              ),
                            ],
                          ),
                        );
                      }
                    } else {
                      return const CircleAvatar(
                        backgroundImage: AssetImage('assets/images/grey.jpg'),
                        radius: 30,
                      );
                    }
                  } else {
                    return const Text('Server error');
                  }
                }),
          ),
        ],
      ),
    );
  }
}

class Specs extends StatelessWidget {
  Specs({Key? key, required this.argumentDataS}) : super(key: key);
  dynamic argumentDataS;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        // color: Colors.grey,
        padding: const EdgeInsets.only(left: 10, right: 30),
        width: MediaQuery.of(context).size.width,
        // height: MediaQuery.of(context).size.width,
        child: DataTable(
          dataRowHeight: 50,
          columnSpacing: 30,
          dividerThickness: 0.1,
          // horizontalMargin: 20,
          headingRowHeight: 0,
          columns: [
            DataColumn(label: Container()),
            DataColumn(label: Container()),
          ],
          rows: [
            DataRow(
              cells: [
                const DataCell(
                  Text(
                    'Condition',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                DataCell(Text(
                  argumentDataS[0].productcondition,
                  style: const TextStyle(
                    overflow: TextOverflow.fade,
                  ),
                )),
              ],
            ),
            DataRow(
              cells: [
                const DataCell(Text(
                  'Category',
                  style: TextStyle(fontWeight: FontWeight.bold),
                )),
                DataCell(Text(argumentDataS[0].category)),
              ],
            ),
            DataRow(
              cells: [
                const DataCell(Text(
                  'Quantity',
                  style: TextStyle(fontWeight: FontWeight.bold),
                )),
                DataCell(Text(argumentDataS[0].quantity.toString())),
              ],
            ),
            DataRow(
              cells: [
                const DataCell(Text(
                  'Rating',
                  style: TextStyle(fontWeight: FontWeight.bold),
                )),
                DataCell(Text(
                    '${argumentDataS[0].rate.toString() == 'null' ? 0 : argumentDataS[0].rate.toStringAsFixed(1)} stars (${argumentDataS[0].ratecount.toString()})')),
              ],
            ),
            // const DataRow(
            //   cells: [
            //     DataCell(Text(
            //       'Condition',
            //       style: TextStyle(fontWeight: FontWeight.bold),
            //     )),
            //     DataCell(Text('Used')),
            //   ],
            // ),
          ],
        ),
      ),
    );
  }
}
