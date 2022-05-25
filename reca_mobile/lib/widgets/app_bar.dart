import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/notification_model.dart';
import 'package:reca_mobile/models/profile_by_id.dart';
import 'package:reca_mobile/screens/profile_visit.dart';
import 'package:reca_mobile/screens/search_page.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/shimmer.dart';

class MyAppBar extends StatefulWidget implements PreferredSizeWidget {
  final double height;
  bool isBackButton;
  bool isSearchPage;

  MyAppBar(
      {Key? key,
      required this.height,
      required this.isBackButton,
      required this.isSearchPage})
      : super(key: key);

  @override
  _MyAppBarState createState() => _MyAppBarState();

  @override
  Size get preferredSize => Size.fromHeight(height);
}

class _MyAppBarState extends State<MyAppBar> {
  late Future<List<Notifications>?> notificationFuture;
  late Future<ProfileById?> getInfo;

  bool isBackButton = false;
  bool isSearchPage = false;
  bool isVisible = true;
  TextEditingController searchController = TextEditingController();

  StorageController controller = Get.find<StorageController>();

  @override
  void initState() {
    notificationFuture =
        ApiServices().getNotifications(controller.id, controller.jwt);
    getInfo = ApiServices().getCurrentUser();
    isBackButton = widget.isBackButton;
    isSearchPage = widget.isSearchPage;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 5),
      child: AppBar(
        elevation: 0,
        actions: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              !isBackButton
                  ? FutureBuilder<ProfileById?>(
                      future: getInfo,
                      builder: (context, snapshot) {
                        if (snapshot.connectionState ==
                            ConnectionState.waiting) {
                          return Container(
                            // padding: const EdgeInsets.only(left: 10),
                            margin: const EdgeInsets.only(left: 10, right: 10),
                            child: CircleSkeleton(
                              width: 38,
                              height: 38,
                            ),
                          );
                          // return const CircularProgressIndicator.adaptive(
                          //   backgroundColor: Color(0xfff7921f),
                          // );
                        }
                        if (snapshot.connectionState == ConnectionState.done) {
                          if (snapshot.hasData) {
                            ProfileById? data = snapshot.data;
                            return Container(
                              margin:
                                  const EdgeInsets.only(left: 10, right: 10),
                              child: CircleAvatar(
                                backgroundImage:
                                    NetworkImage(data!.data.profileimage),
                                onBackgroundImageError:
                                    (exception, stackTrace) {
                                  setState(() {});
                                },
                                radius: 20,
                              ),
                            );
                          } else {
                            return Container(
                              // padding: const EdgeInsets.only(left: 10),
                              margin:
                                  const EdgeInsets.only(left: 10, right: 10),
                              child: CircleSkeleton(
                                width: 38,
                                height: 38,
                              ),
                            );
                          }
                        } else {
                          return Container(
                            // padding: const EdgeInsets.only(left: 10),
                            margin: const EdgeInsets.only(left: 10, right: 10),
                            child: const CircleAvatar(
                              backgroundImage:
                                  AssetImage('assets/images/grey.jpg'),
                              radius: 20,
                            ),
                          );
                        }
                      })
                  : Container(),
              const SizedBox(
                width: 15,
              ),
              searchBar(),
              const SizedBox(
                width: 15,
              ),
              notificationIcon(),
              const SizedBox(
                width: 20,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget searchBar() {
    var width = MediaQuery.of(context).size.width;
    return Container(
      height: 30,
      // margin: const EdgeInsets.only(bottom: 5),
      width: width * .6,
      child: TextField(
        controller: searchController,
        autofocus: isSearchPage ? true : false,
        onTap: () {
          setState(() {
            FocusManager.instance.primaryFocus?.unfocus();
            searchController.text = '';
          });
          isSearchPage ? null : Get.to(() => const SearchPage());
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
                        // List notification = [];

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
                                color: Colors.white, fontSize: 13),
                            textAlign: TextAlign.center,
                          ),
                        );
                      } else {
                        return const Center(
                          child: Text(
                            '0',
                            style: TextStyle(color: Colors.white, fontSize: 13),
                            textAlign: TextAlign.center,
                          ),
                        );
                      }
                    } else {
                      return const Center(
                        child: Icon(
                          Icons.warning_outlined,
                          size: 12,
                        ),
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
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
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
                        if (snapshot.connectionState ==
                            ConnectionState.waiting) {
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
                                  physics: const NeverScrollableScrollPhysics(),
                                  reverse: true,
                                  shrinkWrap: true,
                                  itemCount: data.length,
                                  itemBuilder: (context, index) {
                                    var finalData = data[index];

                                    dynamic timeAgoSinceDate(
                                        DateTime dateString,
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
                                              Icons
                                                  .notifications_active_outlined,
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
                                                      fontWeight:
                                                          FontWeight.bold,
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
            ),
          );
        });
  }
}
