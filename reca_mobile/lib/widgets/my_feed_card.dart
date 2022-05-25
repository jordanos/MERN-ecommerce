import 'package:carousel_pro_nullsafety/carousel_pro_nullsafety.dart';
import 'package:expandable_widget/expandable.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/feed_response_model.dart';
import 'package:reca_mobile/services/api_services.dart';

import 'like_button.dart';

class MyFeedCard extends StatefulWidget {
  List<FeedData>? feedData;
  MyFeedCard({Key? key, required this.feedData}) : super(key: key);

  @override
  _FeedCardState createState() => _FeedCardState();
}

class _FeedCardState extends State<MyFeedCard> {
  final _scrollController = ScrollController();
  StorageController controller = Get.find<StorageController>();
  List<FeedData>? feedData;
  var _max;
  @override
  void initState() {
    feedData = widget.feedData;
    var length = feedData!.length;
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
        controller: _scrollController,
        scrollDirection: Axis.vertical,
        itemCount: _max + 1,
        itemBuilder: (context, index) {
          if (index < feedData!.length) {
            var userData = feedData![index];

            dynamic timeAgoSinceDate(DateTime dateString,
                {bool numericDates = true}) {
              DateTime notificationDate = dateString;
              final date2 = DateTime.now();
              final difference = date2.difference(notificationDate);

              if (difference.inDays > 31) {
                return 'More than 1 month ago';
              } else if (difference.inDays > 24) {
                return 'More than 3 week ago';
              } else if (difference.inDays > 16) {
                return 'More than 2 week ago';
              } else if (difference.inDays > 8) {
                return 'More than 1 week ago';
              } else if ((difference.inDays / 7).floor() >= 1) {
                return (numericDates) ? '1 week ago' : 'Last week';
              } else if (difference.inDays >= 2) {
                return '${difference.inDays} days ago';
              } else if (difference.inDays >= 1) {
                return (numericDates) ? '1 day ago' : 'Yesterday';
              } else if (difference.inHours >= 2) {
                return '${difference.inHours} hours ago';
              } else if (difference.inHours >= 1) {
                return (numericDates) ? '1 hour ago' : 'An hour ago';
              } else if (difference.inMinutes >= 2) {
                return '${difference.inMinutes} minutes ago';
              } else if (difference.inMinutes >= 1) {
                return (numericDates) ? '1 minute ago' : 'A minute ago';
              } else if (difference.inSeconds >= 3) {
                return '${difference.inSeconds} seconds ago';
              } else {
                return 'Just now';
              }
            }

            dynamic timeAgo = timeAgoSinceDate(userData.date);

            bool indicator = userData.image.length > 1 ? true : false;
            bool hasText = userData.text != null ? true : false;
            var text;
            if (hasText == true) {
              text = userData.text;
            }
            if (userData.image.isNotEmpty) {
              userData.image.removeWhere((item) => item == '');
            }
            // print(userData.profileimage);
            return Center(
              child: Container(
                margin: const EdgeInsets.only(top: 10, bottom: 5),
                padding: const EdgeInsets.only(left: 15, right: 15),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                  boxShadow: [
                    BoxShadow(
                        color: Colors.grey.withOpacity(0.5), spreadRadius: 1)
                  ],
                ),
                width: MediaQuery.of(context).size.width * 0.97,
                // margin: const EdgeInsets.only(left: 20,right: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    const SizedBox(
                      height: 10,
                    ),
                    GestureDetector(
                      onTap: () {},
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: <Widget>[
                          CircleAvatar(
                            radius: 25,
                            backgroundImage:
                                NetworkImage(userData.profileimage),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            userData.fullname,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const Expanded(
                            child: SizedBox(),
                          ),
                          Text(
                            timeAgo,
                            style: const TextStyle(
                              fontSize: 10,
                              color: Colors.grey,
                            ),
                            textAlign: TextAlign.right,
                          ),
                          PopupMenuButton(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(5),
                            ),
                            itemBuilder: (context) {
                              return [
                                PopupMenuItem(
                                    value: "Delete Post",
                                    child: TextButton.icon(
                                      onPressed: () async {
                                        Navigator.pop(context, "Delete Post");

                                        Get.defaultDialog(
                                          title: "Delete Post",
                                          middleText:
                                              "Are you sure you want to delete this post?",
                                          backgroundColor: Colors.white,
                                          titleStyle: const TextStyle(
                                              color: Colors.black),
                                          middleTextStyle: const TextStyle(
                                              color: Colors.black),
                                          confirm: ElevatedButton(
                                              style: ElevatedButton.styleFrom(
                                                elevation: 0,
                                                onPrimary:
                                                    const Color(0xffe0466c),
                                                primary:
                                                    const Color(0xfffee6ec),
                                                minimumSize:
                                                    const Size(100, 30),
                                                maximumSize:
                                                    const Size(100, 30),
                                              ),
                                              onPressed: () async {
                                                Get.back();
                                                var res = await ApiServices()
                                                    .deletePost(
                                                        userData.feedid,
                                                        controller.id,
                                                        controller.jwt);
                                                if (res.status == 200) {
                                                  Get.snackbar('Post',
                                                      'Post deleted successfully');
                                                  setState(() {});
                                                } else {
                                                  Get.snackbar('Post',
                                                      'Post not deleted, please try again');
                                                }
                                              },
                                              child: const Text('Yes')),
                                          cancel: ElevatedButton(
                                              style: ElevatedButton.styleFrom(
                                                elevation: 0,
                                                onPrimary: Colors.white,
                                                primary:
                                                    const Color(0xfff7921f),
                                                minimumSize:
                                                    const Size(100, 30),
                                                maximumSize:
                                                    const Size(100, 30),
                                              ),
                                              onPressed: () {
                                                Get.back();
                                              },
                                              child: const Text('No')),
                                          buttonColor: const Color(0xfff7921f),
                                          barrierDismissible: false,
                                          radius: 5,
                                        );
                                        // print(userData.feedid);
                                        // var res =
                                        //     await ApiServices()
                                        //         .deletePost(
                                        //             userData.feedid,
                                        //             controller.id,
                                        //             controller.jwt);
                                        // if (res.status == 200) {
                                        //   Get.snackbar('Post',
                                        //       'Post deleted successfully');
                                        //   setState(() {});
                                        // } else {
                                        //   Get.snackbar('Post',
                                        //       'Post not deleted, please try again');
                                        // }
                                      },
                                      icon: const Icon(
                                        Icons.delete_forever_outlined,
                                        color: Colors.redAccent,
                                      ),
                                      label: const Text(
                                        'Delete post',
                                        style: TextStyle(
                                          color: Colors.black54,
                                        ),
                                      ),
                                    ))
                              ];
                            },
                            iconSize: 18,
                          )
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    hasText
                        ? ExpandableText.lines(
                            text,
                            //expand: true,
                            lines: 4,
                            arrowWidgetBuilder: (expanded) =>
                                _buildArrow(expanded),
                          )
                        : Text(''),
                    const SizedBox(
                      height: 10,
                    ),
                    userData.image.isEmpty
                        ? Container()
                        : SizedBox(
                            height: 170,
                            width: MediaQuery.of(context).size.width * .9,
                            child: Carousel(
                              dotPosition: DotPosition.bottomCenter,
                              showIndicator: indicator,
                              images: userData.image
                                  .map(
                                    (e) => Image.network(
                                      e,
                                      // fit: BoxFit.cover,
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
                                  .toList(),
                              autoplay: false,
                              animationDuration:
                                  const Duration(milliseconds: 500),
                              dotSize: 3,
                              dotBgColor: Colors.transparent,
                              dotSpacing: 10,
                              dotIncreasedColor: const Color(0xffF7921F),
                              dotIncreaseSize: 1.3,
                            ),
                          ),
                    const SizedBox(
                      height: 15,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        LikeButtonP(feedId: userData.feedid),
                        const Icon(Icons.share),
                      ],
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                  ],
                ),
              ),
            );
          } else {
            return const Center(
                child: Padding(
              padding: EdgeInsets.fromLTRB(0, 20, 0, 20),
              child: Text(
                'No more posts',
                style: TextStyle(
                  fontSize: 18,
                  color: Color(0xffF7921F),
                ),
              ),
            ));
          }
        });
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
