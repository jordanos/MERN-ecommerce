import 'package:carousel_pro_nullsafety/carousel_pro_nullsafety.dart';
import 'package:expandable_widget/expandable.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/feed_response_model.dart';
import 'package:reca_mobile/screens/profile_visit.dart';

import 'like_button.dart';

class FeedCard extends StatefulWidget {
  List<FeedData>? feedData;
  FeedCard({Key? key, required this.feedData}) : super(key: key);

  @override
  _FeedCardState createState() => _FeedCardState();
}

class _FeedCardState extends State<FeedCard> {
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
            if (index == _max && index != feedData!.length) {
              return const CircularProgressIndicator.adaptive(
                backgroundColor: Color(0xffF7921F),
              );
            } else if (feedData!.length == index) {
              return const Text('You\'ve viewed all the posts');
            } else if (index > feedData!.length) {
              return const Text('You\'ve viewed all the posts');
            }
            if (userData.image.isNotEmpty) {
              userData.image.removeWhere((item) => item == '');
            }

            return (userData.postedby).toString() != (controller.id).toString()
                ? Center(
                    child: Container(
                      margin: const EdgeInsets.only(top: 10, bottom: 5),
                      padding: const EdgeInsets.only(
                        left: 15,
                        right: 15,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(10),
                        boxShadow: [
                          BoxShadow(
                              color: Colors.grey.withOpacity(0.5),
                              spreadRadius: 1)
                        ],
                      ),
                      width: MediaQuery.of(context).size.width * 0.97,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          const SizedBox(
                            height: 10,
                          ),
                          GestureDetector(
                            onTap: () => Get.to(() => const ProfileVisit(),
                                arguments: [userData, true, false]),
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
                              : Container(),
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
                                    images:
                                        // imageData,
                                        userData.image.map((e) {
                                      return Image.network(
                                        e,
                                        // fit: BoxFit.,
                                        errorBuilder:
                                            (context, exception, stacktrace) {
                                          return Image.asset(
                                            'assets/images/grey.jpg',
                                            fit: BoxFit.cover,
                                          );
                                        },
                                      );
                                    }).toList(),
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
                  )
                : Container();
          } else {
            return Container();
            // const Center(
            //     child: Padding(
            //   padding: EdgeInsets.fromLTRB(0, 20, 0, 20),
            //   child: Text(
            //     'You\'ve viewed all the posts',
            //     style: TextStyle(
            //       fontSize: 18,
            //       color: Color(0xffF7921F),
            //     ),
            //   ),
            // ));
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
