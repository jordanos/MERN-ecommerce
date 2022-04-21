import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/feed_response_model.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:like_button/like_button.dart';

class LikeButtonP extends StatefulWidget {
  var feedId;
  LikeButtonP({Key? key, required this.feedId}) : super(key: key);

  @override
  _LikeButtonPState createState() => _LikeButtonPState();
}

class _LikeButtonPState extends State<LikeButtonP> {
  StorageController controller = Get.find<StorageController>();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<FeedData?>(
        future: ApiServices().getPostById(widget.feedId, controller.id),
        builder: (context, snapshot) {
          switch (snapshot.connectionState) {
            case ConnectionState.none:
              return const Icon(
                  Icons.signal_cellular_connected_no_internet_0_bar);
            case ConnectionState.waiting:
              return const CircularProgressIndicator.adaptive();
            case ConnectionState.active:
              return Container(
                color: Colors.green,
              );
            case ConnectionState.done:
              if (snapshot.hasData) {
                FeedData? data = snapshot.data;
                // var length = data!.length;
                // print(data!.fullname);
                return LikeButton(
                  size: 18,
                  isLiked: data!.isliked == 'true' ? true : false,
                  likeCount: data.numberoflike,
                  likeBuilder: (isLiked) {
                    final color = isLiked ? Colors.red : Colors.grey[200];
                    return Icon(
                      Icons.favorite,
                      color: color,
                      size: 18,
                    );
                  },
                  countBuilder: (likeCount, isLiked, text) {
                    final color = isLiked ? Colors.black : Colors.grey[600];

                    return Text(
                      data.numberoflike.toString() == '1'
                          ? '$text like'
                          : '$text likes',
                      style: TextStyle(color: color),
                    );
                  },
                  onTap: (isLiked) async {
                    print(
                        'Liked feed id = ${data.feedid} and is liked status  = ${data.isliked.toString()}');
                    print('Liked button isLiked = $isLiked');

                    if (isLiked) {
                      var like = await ApiServices().unLikePost(
                          controller.id, data.feedid, controller.jwt);
                      // setState(() {});
                      print('Unlike message ${like.message}');
                      return !isLiked;
                    }

                    if (!isLiked) {
                      var unlike = await ApiServices().likePost(
                          int.parse(controller.id),
                          data.feedid,
                          controller.jwt);

                      print('Like message ${unlike.message}');
                      return !isLiked;
                    }
                    setState(() {});
                  },
                );
              } else {
                return Container(
                  color: Colors.blue,
                );
              }
          }
        });
  }
}
