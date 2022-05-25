import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/coversation_model_nolastseen.dart';
import 'package:reca_mobile/models/profile_with_follower.dart';
import 'package:reca_mobile/screens/messages.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/app_bar.dart';
import 'package:reca_mobile/widgets/feed_by_id.dart';
import 'package:reca_mobile/widgets/product_by_id.dart';
import 'package:reca_mobile/widgets/shimmer.dart';
import 'package:url_launcher/url_launcher.dart';
// import 'package:expandable_page_view/expandable_page_view_test.dart';

class ProfileVisit extends StatefulWidget {
  const ProfileVisit({Key? key}) : super(key: key);

  @override
  _ProfileVisitState createState() => _ProfileVisitState();
}

class _ProfileVisitState extends State<ProfileVisit> {
  StorageController controller = Get.find();

  late Future<ProfileByIdWithFollower> userProfileFuture;
  var userData = Get.arguments;
  final pageViewContoller = PageController(
    initialPage: 0,
  );

  late String pId;
  @override
  void initState() {
    bool fromProduct = userData[1];
    bool fromMessage = userData[2];

    var id;
    if (fromProduct) {
      id = fromProduct ? userData[0].postedby : userData[0].postedby;
      pId = id;
    } else if (fromMessage) {
      id = fromMessage ? userData[0] : userData[0].postedby;
      pId = id;
    }

    userProfileFuture =
        ApiServices().getUserByIdWithFollowStatus(controller.id, id);
    // TODO: implement initState
    super.initState();
  }

  var scrollController = ScrollController();
  var currentPageIndex = 0;
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        backgroundColor: Colors.white,
        appBar: MyAppBar(
          height: 50,
          isBackButton: true,
          isSearchPage: false,
        ),
        body: RefreshIndicator(
          color: const Color(0xfff7921f),
          onRefresh: () {
            Future<void> f() async {
              setState(() {});
              // return void;
            }

            return f();
          },
          child: Container(
            child: FutureBuilder<ProfileByIdWithFollower>(
                future: userProfileFuture,
                builder: (context, snapshot) {
                  final data = snapshot.data;

                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Container(
                      color: Colors.white,
                      child: const Center(
                          child: CircularProgressIndicator.adaptive(
                        backgroundColor: Color(0xfff7921f),
                      )),
                    );
                  } else if (snapshot.connectionState == ConnectionState.none) {
                    return Center(
                      child: SizedBox(
                        height: 240,
                        width: MediaQuery.of(context).size.width,
                        child: const Text('Server Error'),
                      ),
                    );
                  } else if (snapshot.connectionState == ConnectionState.done) {
                    if (snapshot.hasData) {
                      return DefaultTabController(
                        length: 2,
                        child: NestedScrollView(
                          headerSliverBuilder: (context, _) {
                            return [
                              SliverList(
                                delegate: SliverChildListDelegate(
                                  [
                                    Stack(
                                      clipBehavior: Clip.none,
                                      alignment: Alignment.center,
                                      children: [
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        Container(
                                          margin:
                                              const EdgeInsets.only(bottom: 15),
                                          height: 120,
                                          child: Image.network(
                                            data!.data.coverimage,
                                            errorBuilder: (context, exception,
                                                stacktrace) {
                                              return Image.asset(
                                                'assets/images/grey.jpg',
                                                width: MediaQuery.of(context)
                                                    .size
                                                    .width,
                                                fit: BoxFit.fitWidth,
                                              );
                                            },
                                            width: MediaQuery.of(context)
                                                .size
                                                .width,
                                            height: 120,
                                            fit: BoxFit.fitWidth,
                                          ),
                                        ),
                                        Positioned(
                                          top: 105,
                                          child: CircleAvatar(
                                            backgroundImage: NetworkImage(
                                                data.data.profileimage),
                                            // onBackgroundImageError: (exception, stackTrace) =>
                                            //     Center(child: Text('data')),
                                            radius: 30,
                                          ),
                                        ),
                                      ],
                                    ),
                                    Container(
                                      width: MediaQuery.of(context).size.width,
                                      padding: const EdgeInsets.only(
                                        top: 30,
                                      ),
                                      // color: Colors.grey,
                                      child: Column(
                                        children: [
                                          const SizedBox(
                                            height: 10,
                                          ),
                                          Text(
                                            data.data.fullname,
                                            style: const TextStyle(
                                                fontSize: 18,
                                                fontWeight: FontWeight.bold),
                                          ),
                                          const SizedBox(
                                            height: 15,
                                          ),
                                          FutureBuilder<
                                                  ProfileByIdWithFollower>(
                                              future: ApiServices()
                                                  .getUserByIdWithFollowStatus(
                                                      controller.id, pId),
                                              builder: (context, snapshot) {
                                                final data = snapshot.data;

                                                if (snapshot.connectionState ==
                                                    ConnectionState.waiting) {
                                                  return const CircularProgressIndicator
                                                      .adaptive(
                                                    backgroundColor:
                                                        Color(0xfff7921f),
                                                  );
                                                } else if (snapshot
                                                        .connectionState ==
                                                    ConnectionState.done) {
                                                  var isFollowing =
                                                      data!.data.isfollowing;
                                                  return SizedBox(
                                                    height: 50,
                                                    child: Row(
                                                        mainAxisAlignment:
                                                            MainAxisAlignment
                                                                .spaceAround,
                                                        children: [
                                                          Column(
                                                            mainAxisAlignment:
                                                                MainAxisAlignment
                                                                    .center,
                                                            children: [
                                                              Text(
                                                                data.data
                                                                    .product
                                                                    .toString(),
                                                                style: const TextStyle(
                                                                    fontSize:
                                                                        20,
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .bold),
                                                              ),
                                                              const Text(
                                                                'Products',
                                                                style: TextStyle(
                                                                    fontSize:
                                                                        11),
                                                              ),
                                                            ],
                                                          ),
                                                          Column(
                                                            mainAxisAlignment:
                                                                MainAxisAlignment
                                                                    .center,
                                                            children: [
                                                              Text(
                                                                data.data.post
                                                                    .toString(),
                                                                style: const TextStyle(
                                                                    fontSize:
                                                                        20,
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .bold),
                                                              ),
                                                              const Text(
                                                                'Posts',
                                                                style: TextStyle(
                                                                    fontSize:
                                                                        11),
                                                              ),
                                                            ],
                                                          ),
                                                          Column(
                                                            mainAxisAlignment:
                                                                MainAxisAlignment
                                                                    .center,
                                                            children: [
                                                              Text(
                                                                data.data
                                                                    .follower
                                                                    .toString(),
                                                                style: const TextStyle(
                                                                    fontSize:
                                                                        20,
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .bold),
                                                              ),
                                                              const Text(
                                                                'Followers',
                                                                style: TextStyle(
                                                                    fontSize:
                                                                        11),
                                                              ),
                                                            ],
                                                          ),
                                                          Column(
                                                            mainAxisAlignment:
                                                                MainAxisAlignment
                                                                    .center,
                                                            children: [
                                                              Text(
                                                                data.data
                                                                    .following
                                                                    .toString(),
                                                                style: const TextStyle(
                                                                    fontSize:
                                                                        20,
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .bold),
                                                              ),
                                                              const Text(
                                                                'Following',
                                                                style: TextStyle(
                                                                    fontSize:
                                                                        11),
                                                              ),
                                                            ],
                                                          ),
                                                        ]),
                                                  );
                                                } else {
                                                  return const Center(
                                                    child: Text(
                                                        'There seems to be a problem'),
                                                  );
                                                }
                                              }),
                                          const SizedBox(
                                            height: 15,
                                          ),
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceEvenly,
                                            children: [
                                              data.data.isfollowing
                                                  ? ElevatedButton(
                                                      onPressed: () async {
                                                        // setState(() {
                                                        //   isFollowing = false;
                                                        // });
                                                        var res =
                                                            await ApiServices()
                                                                .unfollowUser(
                                                                    controller
                                                                        .id,
                                                                    controller
                                                                        .jwt,
                                                                    data.data
                                                                        .userid);

                                                        if (res.status == 200) {
                                                          setState(() {
                                                            userProfileFuture =
                                                                ApiServices()
                                                                    .getUserByIdWithFollowStatus(
                                                                        controller
                                                                            .id,
                                                                        data.data
                                                                            .userid);
                                                          });
                                                        } else {
                                                          Get.snackbar('Follow',
                                                              'Something went wrong, please try again');
                                                        }
                                                      },
                                                      child: const Text(
                                                        'UNFOLLOW',
                                                        style: TextStyle(
                                                          fontSize: 10,
                                                          fontWeight:
                                                              FontWeight.w600,
                                                        ),
                                                      ),
                                                      style: ElevatedButton
                                                          .styleFrom(
                                                        elevation: 0,
                                                        onPrimary:
                                                            Colors.grey[800],
                                                        primary:
                                                            Colors.transparent,
                                                        minimumSize:
                                                            const Size(90, 35),
                                                        maximumSize:
                                                            const Size(90, 35),
                                                        shape:
                                                            RoundedRectangleBorder(
                                                                borderRadius:
                                                                    BorderRadius
                                                                        .circular(
                                                                            5)),
                                                        side: const BorderSide(
                                                          width: 0.5,
                                                          color: Colors.grey,
                                                        ),
                                                      ),
                                                    )
                                                  : ElevatedButton(
                                                      onPressed: () async {
                                                        // setState(() {
                                                        //   isFollowing = true;
                                                        // });

                                                        var res =
                                                            await ApiServices()
                                                                .followUser(
                                                                    controller
                                                                        .id,
                                                                    controller
                                                                        .jwt,
                                                                    data.data
                                                                        .userid);

                                                        if (res.status == 200) {
                                                          setState(() {
                                                            userProfileFuture =
                                                                ApiServices()
                                                                    .getUserByIdWithFollowStatus(
                                                                        controller
                                                                            .id,
                                                                        data.data
                                                                            .userid);
                                                          });
                                                        } else {
                                                          Get.snackbar('Follow',
                                                              'Something went wrong, please try again');
                                                        }
                                                      },
                                                      child: const Text(
                                                        'FOLLOW',
                                                        style: TextStyle(
                                                          fontSize: 10,
                                                          fontWeight:
                                                              FontWeight.w600,
                                                        ),
                                                      ),
                                                      style: ElevatedButton
                                                          .styleFrom(
                                                        elevation: 0,
                                                        onPrimary: Colors.white,
                                                        primary: const Color(
                                                            0xfff7921f),
                                                        minimumSize:
                                                            const Size(90, 35),
                                                        maximumSize:
                                                            const Size(90, 35),
                                                        shape:
                                                            RoundedRectangleBorder(
                                                                borderRadius:
                                                                    BorderRadius
                                                                        .circular(
                                                                            5)),
                                                      ),
                                                    ),
                                              FutureBuilder<
                                                      List<AllConversationNew>>(
                                                  future: ApiServices()
                                                      .createNewCoversation(
                                                          controller.id,
                                                          data.data.userid),
                                                  builder: (context, snapshot) {
                                                    if (snapshot.hasData) {
                                                      // print(
                                                      //     'Product detail page text future output: ${snapshot.data!}');
                                                      var data =
                                                          snapshot.data![0];

                                                      var finalId;
                                                      data.senderid
                                                                  .toString() ==
                                                              controller.id
                                                                  .toString()
                                                          ? finalId =
                                                              data.reciverid
                                                          : finalId =
                                                              data.senderid;
                                                      return ElevatedButton(
                                                        onPressed: () {
                                                          Get.to(
                                                              () =>
                                                                  MessagePage(),
                                                              arguments: [
                                                                data.conversationid,
                                                                finalId
                                                              ]);
                                                        },
                                                        child: const Text(
                                                          'MESSAGE',
                                                          style: TextStyle(
                                                            fontSize: 10,
                                                            fontWeight:
                                                                FontWeight.w600,
                                                          ),
                                                        ),
                                                        style: ElevatedButton
                                                            .styleFrom(
                                                          elevation: 0,
                                                          onPrimary:
                                                              Colors.black,
                                                          primary: Colors.white,
                                                          minimumSize:
                                                              const Size(
                                                                  90, 35),
                                                          maximumSize:
                                                              const Size(
                                                                  90, 35),
                                                          shape: RoundedRectangleBorder(
                                                              borderRadius:
                                                                  BorderRadius
                                                                      .circular(
                                                                          5)),
                                                          side:
                                                              const BorderSide(
                                                            width: 0.5,
                                                            color: Colors.grey,
                                                          ),
                                                        ),
                                                      );
                                                    } else {
                                                      return Skeleton(
                                                        width: 95,
                                                        height: 35,
                                                      );
                                                    }
                                                  }),
                                              ElevatedButton(
                                                onPressed: () {
                                                  launch(
                                                      'tel://+251${data.data.phonenumber.toString()}');
                                                },
                                                child: const Text(
                                                  'CALL',
                                                  style: TextStyle(
                                                    fontSize: 10,
                                                    fontWeight: FontWeight.w600,
                                                  ),
                                                ),
                                                style: ElevatedButton.styleFrom(
                                                  elevation: 0,
                                                  onPrimary: Colors.black,
                                                  primary: Colors.white,
                                                  minimumSize:
                                                      const Size(90, 35),
                                                  maximumSize:
                                                      const Size(90, 35),
                                                  shape: RoundedRectangleBorder(
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              5)),
                                                  side: const BorderSide(
                                                    width: 0.5,
                                                    color: Colors.grey,
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    )
                                  ],
                                ),
                              ),
                            ];
                          },
                          body: Column(
                            children: <Widget>[
                              Material(
                                color: Colors.white,
                                child: TabBar(
                                  labelColor: Colors.black,
                                  unselectedLabelColor: Colors.grey[400],
                                  indicatorWeight: 1,
                                  indicatorColor: Colors.black,
                                  tabs: const [
                                    Tab(
                                      icon: Icon(
                                        Icons.feed_outlined,
                                        color: Colors.black45,
                                      ),
                                    ),
                                    Tab(
                                        icon: Icon(
                                      Icons.shopping_cart_outlined,
                                      color: Colors.black45,
                                    )),
                                  ],
                                ),
                              ),
                              Expanded(
                                child: TabBarView(
                                  children: [
                                    FeedById(userId: data!.data.userid),
                                    Container(
                                        padding:
                                            const EdgeInsets.only(left: 10),
                                        child: ProductById(
                                            userId: data.data.userid)),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    } else {
                      // print(userData[0].postedby);
                      return SizedBox(
                        height: 240,
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
                }),
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

class PFeedShimmer extends StatelessWidget {
  const PFeedShimmer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: ListView.separated(
          physics: const NeverScrollableScrollPhysics(),
          itemBuilder: (context, index) => const FeedShimmer(),
          separatorBuilder: (context, index) => const SizedBox(
                height: 16,
              ),
          itemCount: 3),
    );
  }
}
