import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/chat_controller.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/one_to_one_model.dart';
import 'package:reca_mobile/models/profile_by_id.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/app_bar.dart';
import 'package:reca_mobile/widgets/shimmer.dart';

class MessagePage extends StatefulWidget {
  MessagePage({Key? key}) : super(key: key);

  @override
  _MessagePageState createState() => _MessagePageState();
}

class _MessagePageState extends State<MessagePage> {
  StorageController controller = Get.find<StorageController>();
  ChatController chatController = Get.find<ChatController>();

  late Future<List<OtOMessages>?> getAllMessage;
  dynamic argument = Get.arguments;
  TextEditingController txtController = TextEditingController();
  FocusNode focusNode = FocusNode();
  // late IO.Socket socket;
  List<OtOMessages>? msgData;

  @override
  void initState() {
    getAllMessage = ApiServices().getMessages(argument[0], controller.id);

    chatController.socket.on('getMessage', (data) {
      print('Socket io message time : $data');
      var message = otOMessagesFromJson(data);

      setStateIfMounted(() {
        msgData!.add(message);
      });
    });
    super.initState();
  }

  void setStateIfMounted(f) {
    if (mounted) setState(f);
  }

  // bool isMe = true;
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
        body: Container(
          color: Colors.white,
          padding: const EdgeInsets.only(top: 0),
          height: MediaQuery.of(context).size.height,
          child: FutureBuilder<List<OtOMessages>?>(
              future: getAllMessage,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return SizedBox(
                    height: MediaQuery.of(context).size.height,
                    child: const Center(
                      child: CircularProgressIndicator.adaptive(
                        backgroundColor: Color(0xfff7921f),
                      ),
                    ),
                  );
                } else if (snapshot.connectionState == ConnectionState.done) {
                  if (snapshot.hasData) {
                    // if (snapshot.data != null) {
                    //   for (OtOMessages item in snapshot.data!) {
                    //     msgData?.add(item);
                    //   }
                    // }

                    // print(
                    //     'Snapshot data in chat page ${snapshot.data!.toList()}');
                    // msgData!.addAll(snapshot.data!);
                    msgData = snapshot.data!;
                    // print('Msg Data data in chat page ${msgData.toString()}');
                    var length = msgData!.length;
                    // print('msgData length $length');
                    return Column(
                      children: [
                        SizedBox(
                            height: 30, child: GetProfile(id: argument[1])),
                        const SizedBox(
                          height: 5,
                        ),
                        const Divider(
                          color: Colors.black45,
                        ),
                        Expanded(
                          child: ListView.builder(
                              shrinkWrap: true,
                              reverse: true,
                              itemCount: length,
                              itemBuilder: (context, index) {
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

                                var reverse = msgData!.reversed.toList();
                                var text = reverse[index];
                                dynamic timeAgo = timeAgoSinceDate(text.time);
                                return Column(
                                  mainAxisSize: MainAxisSize.max,
                                  children: [
                                    Container(
                                      padding: text.sender.toString() ==
                                              controller.id.toString()
                                          ? const EdgeInsets.fromLTRB(
                                              60, 5, 20, 5)
                                          : const EdgeInsets.fromLTRB(
                                              20, 5, 60, 5),
                                      child: Align(
                                        alignment: text.sender.toString() ==
                                                controller.id.toString()
                                            ? Alignment.bottomRight
                                            : Alignment.bottomLeft,
                                        child: Container(
                                          decoration: BoxDecoration(
                                            color: text.sender.toString() ==
                                                    controller.id.toString()
                                                ? const Color(0xfff7921f)
                                                    .withOpacity(0.6)
                                                : Colors.grey,
                                            borderRadius:
                                                text.sender.toString() ==
                                                        controller.id.toString()
                                                    ? const BorderRadius.only(
                                                        topLeft:
                                                            Radius.circular(20),
                                                        topRight:
                                                            Radius.circular(20),
                                                        bottomLeft:
                                                            Radius.circular(20),
                                                      )
                                                    : const BorderRadius.only(
                                                        topLeft:
                                                            Radius.circular(20),
                                                        topRight:
                                                            Radius.circular(20),
                                                        bottomRight:
                                                            Radius.circular(20),
                                                      ),
                                          ),
                                          padding: text.sender.toString() ==
                                                  controller.id.toString()
                                              ? const EdgeInsets.only(
                                                  left: 12,
                                                  right: 5,
                                                  bottom: 5,
                                                  top: 8)
                                              : const EdgeInsets.only(
                                                  left: 10,
                                                  right: 12,
                                                  bottom: 5,
                                                  top: 8),
                                          child: Text(
                                            text.text.trim(),
                                            style: const TextStyle(
                                                color: Colors.black,
                                                fontSize: 16),
                                          ),
                                        ),
                                      ),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 20.0),
                                      child: Align(
                                        alignment: text.sender.toString() ==
                                                controller.id.toString()
                                            ? Alignment.centerRight
                                            : Alignment.centerLeft,
                                        child: Text(
                                          timeAgo,
                                          style: const TextStyle(
                                            fontSize: 10,
                                          ),
                                        ),
                                      ),
                                    ),
                                    const SizedBox(
                                      height: 5,
                                    )
                                  ],
                                );
                              }),
                        ),
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          mainAxisSize: MainAxisSize.max,
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Container(
                              margin: const EdgeInsets.symmetric(vertical: 5),
                              width: MediaQuery.of(context).size.width * .7,
                              child: TextFormField(
                                controller: txtController,
                                cursorColor: Colors.black,
                                style: const TextStyle(
                                  fontSize: 15,
                                  height: 1.5,
                                ),
                                autocorrect: false,
                                decoration: InputDecoration(
                                  contentPadding: const EdgeInsets.symmetric(
                                      vertical: 10, horizontal: 15),
                                  hintText: 'Text Message...',
                                  border: OutlineInputBorder(
                                    borderRadius: const BorderRadius.all(
                                        Radius.circular(50)),
                                    borderSide: BorderSide(
                                      width: 1,
                                      color: Colors.grey.withOpacity(0.5),
                                    ),
                                  ),
                                  focusedBorder: const OutlineInputBorder(
                                    borderRadius:
                                        BorderRadius.all(Radius.circular(50)),
                                    borderSide: BorderSide(
                                      width: 0.5,
                                      color: Color(0xfff7921f),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            Container(
                              alignment: Alignment.center,
                              width: 30,
                              height: 30,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xfff7921f),
                              ),
                              child: IconButton(
                                  icon: const Icon(Icons.send),
                                  iconSize: 14,
                                  color: Colors.white,
                                  onPressed: () async {
                                    print('Send button pressed');
                                    int reciever = argument[1];
                                    String finalText = txtController.text;
                                    if (finalText.removeAllWhitespace != '') {
                                      txtController.text = '';

                                      var res = await ApiServices().sendMessage(
                                          argument[0],
                                          controller.id,
                                          finalText);
                                      chatController.socket.emit(
                                        "sendMessage",
                                        {
                                          "conversationId": argument[0],
                                          "senderId": int.parse(controller.id),
                                          "receiverId": reciever,
                                          "text": finalText,
                                        },
                                      );
                                      setStateIfMounted(() {
                                        msgData!.add(OtOMessages(
                                            conversationid: argument[0],
                                            sender: controller.id,
                                            text: finalText,
                                            time: DateTime.now()));
                                      });

                                      // setState(() {
                                      //   getAllMessage = ApiServices()
                                      //       .getMessages(
                                      //           argument[0], controller.id);
                                      // });
                                    }
                                  }),
                            ),
                          ],
                        ),
                        const SizedBox(
                          height: 10,
                        )
                      ],
                    );
                  } else {
                    return Column(
                      children: [
                        SizedBox(
                          height: 40,
                          child: FutureBuilder<ProfileById?>(
                              future: ApiServices().getUserById(argument[1]),
                              builder: (context, snapshot) {
                                var data = snapshot.data;
                                var userDataLength;
                                bool isOffline;
                                if (data == null) {
                                  isOffline = true;
                                } else {
                                  isOffline = false;
                                  // userDataLength = data.data.length;
                                }
                                if (snapshot.connectionState ==
                                    ConnectionState.waiting) {
                                  return const CircularProgressIndicator
                                      .adaptive(
                                    backgroundColor: Color(0xfff7921f),
                                  );
                                } else if (snapshot.connectionState ==
                                    ConnectionState.done) {
                                  if (snapshot.hasData) {
                                    return Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.start,
                                      children: <Widget>[
                                        const SizedBox(
                                          width: 20,
                                        ),
                                        CircleAvatar(
                                          radius: 20,
                                          backgroundImage: NetworkImage(
                                              data!.data.profileimage),
                                        ),
                                        const SizedBox(width: 10),
                                        Text(
                                          data.data.fullname,
                                          style: const TextStyle(
                                            color: Colors.black,
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ],
                                    );
                                  } else {
                                    return const CircleAvatar(
                                      backgroundColor: Colors.grey,
                                    );
                                  }
                                } else {
                                  return const Text('Server error');
                                }
                              }),
                        ),
                        const SizedBox(
                          height: 5,
                        ),
                        const Divider(
                          color: Colors.black45,
                        ),
                        const Expanded(child: Text('No chats yet')),
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          mainAxisSize: MainAxisSize.max,
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Container(
                              height: 70,
                              margin: const EdgeInsets.symmetric(vertical: 2),
                              width: MediaQuery.of(context).size.width * .7,
                              child: TextFormField(
                                controller: txtController,
                                cursorColor: Colors.black,
                                style: const TextStyle(
                                  fontSize: 15,
                                  height: 1.0,
                                ),
                                autocorrect: false,
                                decoration: InputDecoration(
                                  contentPadding: const EdgeInsets.symmetric(
                                      vertical: 5, horizontal: 10),
                                  hintText: 'Text Message...',
                                  border: OutlineInputBorder(
                                    borderRadius: const BorderRadius.all(
                                        Radius.circular(50)),
                                    borderSide: BorderSide(
                                      width: 1,
                                      color: Colors.grey.withOpacity(0.5),
                                    ),
                                  ),
                                  focusedBorder: const OutlineInputBorder(
                                    borderRadius:
                                        BorderRadius.all(Radius.circular(50)),
                                    borderSide: BorderSide(
                                      width: 0.5,
                                      color: Color(0xfff7921f),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            Container(
                              alignment: Alignment.center,
                              width: 30,
                              height: 30,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xfff7921f),
                              ),
                              child: IconButton(
                                  icon: const Icon(Icons.send),
                                  iconSize: 14,
                                  color: Colors.white,
                                  onPressed: () async {
                                    print('Send button pressed');
                                    int reciever = argument[1];
                                    // print('Sender ID ${controller.id}');
                                    String finalText = txtController.text;
                                    if (finalText != '') {
                                      var res = await ApiServices().sendMessage(
                                          argument[0],
                                          controller.id,
                                          finalText);
                                      chatController.socket.emit(
                                        "sendMessage",
                                        {
                                          "conversationId": argument[0],
                                          "senderId": int.parse(controller.id),
                                          "receiverId": reciever,
                                          "text": finalText,
                                        },
                                      );
                                      print(res);
                                    }
                                  }),
                            ),
                          ],
                        ),
                        const SizedBox(
                          height: 10,
                        )
                      ],
                    );
                  }
                } else {
                  return Text('Something went wrong');
                }
              }),
        ),
      ),
    );
  }
}

class GetProfile extends StatelessWidget {
  var id;
  GetProfile({Key? key, required this.id}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<ProfileById?>(
        stream: ApiServices().getUserById(id).asStream(),
        builder: (context, snapshot) {
          var data = snapshot.data;
          var userDataLength;
          bool isOffline;
          if (data == null) {
            isOffline = true;
          } else {
            isOffline = false;
            // userDataLength = data.data.length;
          }
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: const <Widget>[
                SizedBox(
                  width: 30,
                ),
                CircleSkeleton(
                  height: 40,
                  width: 30,
                ),
                SizedBox(width: 10),
                Skeleton(
                  width: 80,
                  height: 10,
                )
              ],
            );
          } else if (snapshot.connectionState == ConnectionState.done) {
            if (snapshot.hasData) {
              return Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  const SizedBox(
                    width: 20,
                  ),
                  CircleAvatar(
                    radius: 25,
                    backgroundImage: NetworkImage(data!.data.profileimage),
                  ),
                  const SizedBox(width: 10),
                  Text(
                    data.data.fullname,
                    style: const TextStyle(
                      color: Colors.black,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              );
            } else {
              return const CircleAvatar(
                backgroundColor: Colors.grey,
              );
            }
          } else {
            return const Text('Server error');
          }
        });
  }
}
