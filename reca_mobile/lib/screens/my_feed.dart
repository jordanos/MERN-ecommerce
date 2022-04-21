import 'package:carousel_pro_nullsafety/carousel_pro_nullsafety.dart';
import 'package:expandable_widget/expandable.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:like_button/like_button.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/feed_response_model.dart';
import 'package:reca_mobile/screens/create_post.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/app_bar.dart';
import 'package:reca_mobile/widgets/like_button.dart';
import 'package:reca_mobile/widgets/my_feed_card.dart';
import 'package:reca_mobile/widgets/shimmer.dart';

class MyFeed extends StatefulWidget {
  const MyFeed({Key? key}) : super(key: key);

  @override
  State<MyFeed> createState() => _MyFeedState();
}

class _MyFeedState extends State<MyFeed> {
  StorageController controller = Get.find<StorageController>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      resizeToAvoidBottomInset: false,
      appBar: MyAppBar(height: 50, isBackButton: true, isSearchPage: false),
      body: RefreshIndicator(
        color: const Color(0xfff7921f),
        onRefresh: () {
          Future<void> f() async {
            setState(() {});
            // return void;
          }

          return f();
        },
        child: SizedBox(
          // padding: const EdgeInsets.all(8),
          child: FutureBuilder<List<FeedData>?>(
            future: ApiServices().getPostByUserId(controller.id, null),
            builder: (context, snapshot) {
              final data = snapshot.data;

              if (snapshot.connectionState == ConnectionState.waiting) {
                return ListView.separated(
                    itemBuilder: (context, index) => const FeedShimmer(),
                    separatorBuilder: (context, index) => const SizedBox(
                          height: 16,
                        ),
                    itemCount: 2);
              } else if (snapshot.connectionState == ConnectionState.none) {
                return Center(
                  child: SizedBox(
                    width: MediaQuery.of(context).size.width,
                    child: const Text('Server Error'),
                  ),
                );
              } else if (snapshot.connectionState == ConnectionState.done) {
                // print('Feed by id snapshot: ${snapshot.data.toString()}');
                if (snapshot.data.toString() == '[]') {
                  return Center(
                    child: Container(
                      alignment: Alignment.center,
                      // color: Colors.redAccent,
                      padding: const EdgeInsets.all(20),
                      width: MediaQuery.of(context).size.width,
                      height: MediaQuery.of(context).size.width,
                      child: const Text(
                        'Looks like you haven\'t posted anything yet, share your moments with your followers.',
                        style: TextStyle(color: Color(0xfff7921f)),
                      ),
                    ),
                  );
                }
                if (snapshot.hasData) {
                  return MyFeedCard(feedData: data);
                } else {
                  // return const Center(child: CircularProgressIndicator(
                  //   color: Color(0xfff7921f),));
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
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Get.to(() => CreatePost());
        },
        mini: true,
        elevation: 0.5,
        child: const Icon(
          Icons.add,
          color: Colors.white,
        ),
        backgroundColor: const Color(0xfff7921f),
      ),
    );
  }

  Widget _buildArrow(bool expanded) {
    return Container(
      margin: const EdgeInsets.only(top: 5),
      height: 15,
      alignment: Alignment.centerRight,
      child: Text(
        expanded ? "Read less" : "Read More",
        style: TextStyle(fontSize: 12, color: Colors.grey[300]),
      ),
    );
  }
}
