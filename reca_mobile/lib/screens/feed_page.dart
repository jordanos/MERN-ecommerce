import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/feed_response_model.dart';
import 'package:reca_mobile/screens/create_post.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/feed_card.dart';
import 'package:reca_mobile/widgets/shimmer.dart';

class FeedPage extends StatefulWidget {
  const FeedPage({Key? key}) : super(key: key);

  @override
  State<FeedPage> createState() => _FeedPageState();
}

class _FeedPageState extends State<FeedPage> {
  late List<FeedData>? future;
  StorageController controller = Get.find();
  late List<FeedData>? fullList;
  late List<FeedData>? myList;
  late int length;
  final _scaffoldKey = GlobalKey<ScaffoldState>();
  late Future<List<FeedData>?> getPosts;
  int counter = 0;

  _incrementCounter() {
    setState(() {
      counter += 1;
    });
  }

  @override
  void initState() {
    getPosts = ApiServices().getallowedPost(controller.id);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;

    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        key: _scaffoldKey,
        backgroundColor: Colors.white,
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
        resizeToAvoidBottomInset: false,
        body: RefreshIndicator(
          color: const Color(0xfff7921f),
          onRefresh: () {
            Future<void> f() async {
              setState(() {
                getPosts = ApiServices().getallowedPost(controller.id);
              });
            }

            return f();
          },
          child: Container(
            color: Colors.white,
            child: FutureBuilder<List<FeedData>?>(
              future: getPosts,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return ListView.separated(
                      shrinkWrap: true,
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
                  if (snapshot.hasData) {
                    if (snapshot.data!.isNotEmpty) {
                      final data = snapshot.data;

                      return FeedCard(feedData: data);
                    } else {
                      return ListView.separated(
                          shrinkWrap: true,
                          itemBuilder: (context, index) => const FeedShimmer(),
                          separatorBuilder: (context, index) => const SizedBox(
                                height: 16,
                              ),
                          itemCount: 2);
                    }
                  } else {
                    return ListView.separated(
                        shrinkWrap: true,
                        itemBuilder: (context, index) => const FeedShimmer(),
                        separatorBuilder: (context, index) => const SizedBox(
                              height: 16,
                            ),
                        itemCount: 2);
                  }
                } else {
                  return ListView.separated(
                      shrinkWrap: true,
                      itemBuilder: (context, index) => const FeedShimmer(),
                      separatorBuilder: (context, index) => const SizedBox(
                            height: 16,
                          ),
                      itemCount: 2);
                }
              },
            ),
          ),
        ),
      ),
    );
  }
}
