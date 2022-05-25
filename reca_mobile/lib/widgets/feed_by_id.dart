import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/feed_response_model.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/feed_card.dart';
import 'package:reca_mobile/widgets/shimmer.dart';

class FeedById extends StatefulWidget {
  var userId;
  FeedById({Key? key, required this.userId}) : super(key: key);

  @override
  _FeedByIdState createState() => _FeedByIdState();
}

class _FeedByIdState extends State<FeedById> {
  StorageController controller = Get.find<StorageController>();
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<FeedData>?>(
      future: ApiServices().getMyFeeds(),
      builder: (context, snapshot) {
        final data = snapshot.data;

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
            return LimitedBox(
              maxHeight: 2000,
              child: FeedCard(feedData: data),
            );
          } else {
            // return const Center(child: CircularProgressIndicator(
            //   color: Color(0xfff7921f),));
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
      },
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
