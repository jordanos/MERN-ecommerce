import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/chat_controller.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/conversation_model.dart';
import 'package:reca_mobile/models/profile_by_id.dart';
import 'package:reca_mobile/models/socket_response_model.dart';
import 'package:reca_mobile/screens/messages.dart';
import 'package:reca_mobile/screens/profile_visit.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/shimmer.dart';

class AllMessages extends StatefulWidget {
  const AllMessages({Key? key}) : super(key: key);

  @override
  State<AllMessages> createState() => _AllMessagesState();
}

class _AllMessagesState extends State<AllMessages> {
  late Future<List<AllConversation>> getAllMessage;
  StorageController controller = Get.find<StorageController>();
  ChatController chatController = Get.find<ChatController>();

  List<OtOMessages>? msgData;
  int mlength = 0;

  @override
  void initState() {
    getAllMessage = ApiServices().getAllCoversation(controller.id);

    super.initState();
  }

  void setStateIfMounted(f) {
    if (mounted) {
      getAllMessage = ApiServices().getAllCoversation(controller.id);
      mlength++;
      setState(f);
    }
  }

  bool isVisible = true;
  bool unread = false;
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
              setState(() {
                getAllMessage = ApiServices().getAllCoversation(controller.id);
              });
            }

            return f();
          },
          child: Container(
            color: Colors.white,
            padding: const EdgeInsets.only(left: 20, right: 20),
            child: Column(
              children: [
                const SizedBox(
                  height: 5,
                ),
                SizedBox(
                  width: MediaQuery.of(context).size.width * 0.85,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Messages',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.black,
                        ),
                      ),
                      TextButton(
                        onPressed: () async {
                          var res = await ApiServices().marAllAsRead(
                              int.parse(controller.id), controller.jwt);
                          if (res.status == 200) {
                            setState(() {
                              getAllMessage = ApiServices()
                                  .getAllCoversation(controller.id);
                            });
                          }
                        },
                        child: Text(
                          'Mark all as read',
                          style: TextStyle(
                            fontSize: 14,
                            color: unread
                                ? const Color(0xfff7921f)
                                : Colors.grey[400],
                          ),
                        ),
                      )
                    ],
                  ),
                ),
                FutureBuilder<List<AllConversation>>(
                    future: getAllMessage,
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return ListView.separated(
                            separatorBuilder: (context, index) =>
                                const SizedBox(
                                  height: 5,
                                ),
                            shrinkWrap: true,
                            scrollDirection: Axis.vertical,
                            itemCount: 7,
                            itemBuilder: (context, snapshot) {
                              return Container(
                                margin:
                                    const EdgeInsets.only(top: 5, bottom: 5),
                                padding:
                                    const EdgeInsets.only(left: 20, right: 20),
                                width: MediaQuery.of(context).size.width,
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: <Widget>[
                                    CircleSkeleton(
                                      height: 50,
                                      width: 50,
                                    ),
                                    SizedBox(width: 10),
                                    Skeleton(
                                      width: 100,
                                      height: 10,
                                    ),
                                    Expanded(child: SizedBox()),
                                    Skeleton(
                                      width: 70,
                                      height: 10,
                                    )
                                  ],
                                ),
                              );
                            });
                      } else if (snapshot.connectionState ==
                          ConnectionState.done) {
                        var data = snapshot.data;
                        if (data != null) {
                          for (var item in data) {
                            if (item.unread == "unread") {
                              setState(() {
                                unread = true;
                              });
                            }
                          }

                          var length = data.length;
                          return Expanded(
                            child: ListView.builder(
                                shrinkWrap: true,
                                scrollDirection: Axis.vertical,
                                itemCount: length,
                                itemBuilder: (context, index) {
                                  var userData = data[index];
                                  String finalId;
                                  userData.senderid == controller.id
                                      ? finalId = userData.reciverid
                                      : finalId = userData.senderid;

                                  return FutureBuilder<ProfileById?>(
                                      future:
                                          ApiServices().getUserById(finalId),
                                      builder: (context, snapshot) {
                                        var data = snapshot.data;
                                        var argument;
                                        bool isOffline;
                                        if (data == null) {
                                          isOffline = true;
                                        } else {
                                          isOffline = false;
                                          argument = data.data;
                                        }
                                        if (snapshot.connectionState ==
                                            ConnectionState.waiting) {
                                          print(
                                              'Snapshot data waiting: ${snapshot.data}');
                                          return ListView.separated(
                                              separatorBuilder:
                                                  (context, index) =>
                                                      const SizedBox(
                                                        height: 5,
                                                      ),
                                              shrinkWrap: true,
                                              scrollDirection: Axis.vertical,
                                              itemCount: 2,
                                              itemBuilder: (context, snapshot) {
                                                return Container(
                                                  margin: const EdgeInsets.only(
                                                      top: 5, bottom: 5),
                                                  padding:
                                                      const EdgeInsets.only(
                                                          left: 20, right: 20),
                                                  width: MediaQuery.of(context)
                                                      .size
                                                      .width,
                                                  child: Row(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment.start,
                                                    children: <Widget>[
                                                      CircleSkeleton(
                                                        height: 50,
                                                        width: 50,
                                                      ),
                                                      SizedBox(width: 10),
                                                      Skeleton(
                                                        width: 100,
                                                        height: 10,
                                                      ),
                                                      Expanded(
                                                          child: SizedBox()),
                                                      Skeleton(
                                                        width: 70,
                                                        height: 10,
                                                      )
                                                    ],
                                                  ),
                                                );
                                              });
                                        } else if (snapshot.connectionState ==
                                            ConnectionState.done) {
                                          print(
                                              'Snapshot data done: ${snapshot.data}');
                                          if (snapshot.hasData) {
                                            dynamic timeAgoSinceDate(
                                                DateTime dateString,
                                                {bool numericDates = true}) {
                                              DateTime notificationDate =
                                                  dateString;
                                              final date2 = DateTime.now();
                                              final difference = date2
                                                  .difference(notificationDate);

                                              if (difference.inDays > 31) {
                                                return 'More than 1 month ago';
                                              } else if (difference.inDays >
                                                  24) {
                                                return 'More than 3 week ago';
                                              } else if (difference.inDays >
                                                  16) {
                                                return 'More than 2 week ago';
                                              } else if (difference.inDays >
                                                  8) {
                                                return 'More than 1 week ago';
                                              } else if ((difference.inDays / 7)
                                                      .floor() >=
                                                  1) {
                                                return (numericDates)
                                                    ? '1 week ago'
                                                    : 'Last week';
                                              } else if (difference.inDays >=
                                                  2) {
                                                return '${difference.inDays} days ago';
                                              } else if (difference.inDays >=
                                                  1) {
                                                return (numericDates)
                                                    ? '1 day ago'
                                                    : 'Yesterday';
                                              } else if (difference.inHours >=
                                                  2) {
                                                return '${difference.inHours} hours ago';
                                              } else if (difference.inHours >=
                                                  1) {
                                                return (numericDates)
                                                    ? '1 hour ago'
                                                    : 'An hour ago';
                                              } else if (difference.inMinutes >=
                                                  2) {
                                                return '${difference.inMinutes} minutes ago';
                                              } else if (difference.inMinutes >=
                                                  1) {
                                                return (numericDates)
                                                    ? '1 minute ago'
                                                    : 'A minute ago';
                                              } else if (difference.inSeconds >=
                                                  3) {
                                                return '${difference.inSeconds} seconds ago';
                                              } else {
                                                return 'Just now';
                                              }
                                            }

                                            if ((msgData == null &&
                                                userData.unread == 0)) {
                                              isVisible = false;
                                            } else {
                                              isVisible = true;
                                            }
                                            dynamic timeAgo = timeAgoSinceDate(
                                                userData.lastseen);
                                            return GestureDetector(
                                              behavior:
                                                  HitTestBehavior.translucent,
                                              onTap: () {
                                                Get.to(() => MessagePage(),
                                                    arguments: [
                                                      userData.conversationid,
                                                      finalId
                                                    ]);
                                              },
                                              child: Center(
                                                child: Container(
                                                  // color: Colors.grey[300],
                                                  margin: const EdgeInsets.only(
                                                      top: 5),
                                                  padding:
                                                      const EdgeInsets.only(
                                                          left: 20, right: 20),
                                                  child: Column(
                                                    crossAxisAlignment:
                                                        CrossAxisAlignment
                                                            .start,
                                                    children: <Widget>[
                                                      Divider(
                                                        height: 1,
                                                        color: Colors.grey[400],
                                                      ),
                                                      const SizedBox(
                                                        height: 10,
                                                      ),
                                                      Row(
                                                        mainAxisAlignment:
                                                            MainAxisAlignment
                                                                .start,
                                                        children: <Widget>[
                                                          GestureDetector(
                                                            onTap: () {
                                                              Get.to(
                                                                  () =>
                                                                      const ProfileVisit(),
                                                                  arguments: [
                                                                    finalId,
                                                                    false,
                                                                    true
                                                                  ]);
                                                            },
                                                            child: CircleAvatar(
                                                              radius: 25,
                                                              backgroundImage:
                                                                  NetworkImage(data!
                                                                      .data
                                                                      .profileimage),
                                                            ),
                                                          ),
                                                          const SizedBox(
                                                              width: 10),
                                                          Text(
                                                            data.data.fullname,
                                                            style:
                                                                const TextStyle(
                                                              color:
                                                                  Colors.black,
                                                              fontSize: 16,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .w600,
                                                            ),
                                                          ),
                                                          const Expanded(
                                                            child: SizedBox(),
                                                          ),
                                                          Column(
                                                            crossAxisAlignment:
                                                                CrossAxisAlignment
                                                                    .end,
                                                            mainAxisAlignment:
                                                                MainAxisAlignment
                                                                    .spaceBetween,
                                                            children: [
                                                              Text(
                                                                timeAgo,
                                                                style:
                                                                    const TextStyle(
                                                                  fontSize: 10,
                                                                  color: Colors
                                                                      .grey,
                                                                ),
                                                                textAlign:
                                                                    TextAlign
                                                                        .right,
                                                              ),
                                                              const SizedBox(
                                                                height: 20,
                                                              ),
                                                              userData.unread ==
                                                                      "unread"
                                                                  ? Visibility(
                                                                      visible:
                                                                          isVisible,
                                                                      child:
                                                                          Container(
                                                                        width:
                                                                            20,
                                                                        height:
                                                                            20,
                                                                        decoration:
                                                                            BoxDecoration(
                                                                          borderRadius:
                                                                              BorderRadius.circular(50),
                                                                          color:
                                                                              const Color(0xfff7921f),
                                                                        ),
                                                                        child:
                                                                            Center(
                                                                          child:
                                                                              Text(
                                                                            msgData != null
                                                                                ? (msgData!.length).toString()
                                                                                : userData.unread.toString(),
                                                                            style:
                                                                                const TextStyle(color: Colors.white),
                                                                          ),
                                                                        ),
                                                                      ),
                                                                    )
                                                                  : Container(
                                                                      height:
                                                                          20,
                                                                    ),
                                                            ],
                                                          ),
                                                        ],
                                                      ),
                                                      const SizedBox(
                                                        height: 10,
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                              ),
                                            );
                                          } else {
                                            return ListView.separated(
                                                separatorBuilder:
                                                    (context, index) =>
                                                        const SizedBox(
                                                          height: 5,
                                                        ),
                                                shrinkWrap: true,
                                                scrollDirection: Axis.vertical,
                                                itemCount: 7,
                                                itemBuilder:
                                                    (context, snapshot) {
                                                  return Container(
                                                    margin:
                                                        const EdgeInsets.only(
                                                            top: 5, bottom: 5),
                                                    padding:
                                                        const EdgeInsets.only(
                                                            left: 20,
                                                            right: 20),
                                                    // height: 50,
                                                    width:
                                                        MediaQuery.of(context)
                                                            .size
                                                            .width,
                                                    child: Row(
                                                      mainAxisAlignment:
                                                          MainAxisAlignment
                                                              .start,
                                                      children: <Widget>[
                                                        CircleSkeleton(
                                                          height: 50,
                                                          width: 50,
                                                        ),
                                                        SizedBox(width: 10),
                                                        Skeleton(
                                                          width: 100,
                                                          height: 10,
                                                        ),
                                                        Expanded(
                                                            child: SizedBox()),
                                                        Skeleton(
                                                          width: 70,
                                                          height: 10,
                                                        )
                                                      ],
                                                    ),
                                                  );
                                                });
                                          }
                                        } else {
                                          return Container(
                                              height: MediaQuery.of(context)
                                                  .size
                                                  .height,
                                              child: Center(
                                                  child: Text('Server Error')));
                                        }
                                      });
                                }),
                          );
                        } else {
                          return const Center(child: Text('No chats yet'));
                        }
                      } else {
                        return ListView.separated(
                            separatorBuilder: (context, index) =>
                                const SizedBox(
                                  height: 5,
                                ),
                            shrinkWrap: true,
                            scrollDirection: Axis.vertical,
                            itemCount: 7,
                            itemBuilder: (context, snapshot) {
                              return Container(
                                margin:
                                    const EdgeInsets.only(top: 5, bottom: 5),
                                padding:
                                    const EdgeInsets.only(left: 20, right: 20),
                                // height: 50,
                                width: MediaQuery.of(context).size.width,
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: <Widget>[
                                    CircleSkeleton(
                                      height: 50,
                                      width: 50,
                                    ),
                                    SizedBox(width: 10),
                                    Skeleton(
                                      width: 100,
                                      height: 10,
                                    ),
                                    Expanded(child: SizedBox()),
                                    Skeleton(
                                      width: 70,
                                      height: 10,
                                    )
                                  ],
                                ),
                              );
                            });
                      }
                    }),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
