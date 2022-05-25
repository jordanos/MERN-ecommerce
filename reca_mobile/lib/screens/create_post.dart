import 'dart:io';

import 'package:carousel_pro_nullsafety/carousel_pro_nullsafety.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/profile_by_id.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/app_bar.dart';

class CreatePost extends StatefulWidget {
  CreatePost({Key? key}) : super(key: key);

  @override
  State<CreatePost> createState() => _CreatePostState();
}

class _CreatePostState extends State<CreatePost> {
  StorageController controller = Get.find();

  TextEditingController textController = TextEditingController();

  final ImagePicker imgpicker = ImagePicker();

  List<XFile>? imagefiles;

  @override
  Widget build(BuildContext context) {
    var length = imagefiles?.length ?? 0;
    bool indicator = length > 1 ? true : false;
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        backgroundColor: Colors.white,
        resizeToAvoidBottomInset: true,
        appBar: MyAppBar(height: 50, isBackButton: true, isSearchPage: false),
        body: Container(
          padding: const EdgeInsets.only(top: 20, left: 20, right: 20),
          child: Column(
            children: [
              FutureBuilder<ProfileById?>(
                future: ApiServices().getUserById(controller.id),
                builder: (context, snapshot) {
                  var data = snapshot.data;
                  var user;

                  bool isOffline;
                  if (data == null) {
                    isOffline = true;
                  } else {
                    isOffline = false;
                    user = data.data;
                  }
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const CircularProgressIndicator.adaptive();
                  }
                  if (snapshot.connectionState == ConnectionState.done) {
                    if (snapshot.hasData) {
                      return Row(
                        children: [
                          CircleAvatar(
                            backgroundImage: NetworkImage(user.profileimage),
                          ),
                          const SizedBox(
                            width: 15,
                          ),
                          Text(
                            user.fullname,
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                            ),
                          )
                        ],
                      );
                    } else {
                      return const Text('Couldnt connect to the server');
                    }
                  } else {
                    return const CircularProgressIndicator.adaptive();
                  }
                },
              ),
              TextField(
                maxLines: 10,
                minLines: 1,
                controller: textController,
                autofocus: true,
                decoration: const InputDecoration(
                  hintText: 'What\'s on your mind?',
                  hintStyle: TextStyle(color: Colors.grey),
                ),
              ),
              Flexible(
                  child: imagefiles != null
                      ? SizedBox(
                          height: 300,
                          width: MediaQuery.of(context).size.width * .9,
                          child: Carousel(
                            showIndicator: indicator,
                            images: imagefiles!
                                .map<Widget>((e) => GestureDetector(
                                      onTap: () {
                                        print('Delete icon tap');
                                        imagefiles!.remove(e);
                                        setState(() {
                                          if (imagefiles!.isEmpty) {
                                            length = 0;
                                            imagefiles = null;
                                          }
                                        });
                                      },
                                      child: Center(
                                          child: Image.file(File(e.path))),
                                    ))
                                .toList(),
                            animationDuration:
                                const Duration(milliseconds: 500),
                            dotSize: 5,
                            dotBgColor: Colors.transparent,
                            dotSpacing: 15,
                            dotIncreasedColor: const Color(0xffF7921F),
                            dotIncreaseSize: 1.5,
                            autoplay: false,
                          ),
                        )
                      : Container()),
              imagefiles != null
                  ? const SizedBox(
                      height: 10,
                    )
                  : Container(),
              imagefiles != null
                  ? const Text(
                      'Tap on the image to delete it',
                    )
                  : Container(),
              const SizedBox(
                height: 5,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  ElevatedButton(
                    onPressed: () {
                      openImages();
                    },
                    child: const Text(
                      'Add images',
                      style: TextStyle(fontSize: 14),
                    ),
                    style: ElevatedButton.styleFrom(
                      elevation: 0,
                      onPrimary: Colors.white,
                      primary: const Color(0xfff7921f),
                      minimumSize: const Size(120, 35),
                      maximumSize: const Size(120, 35),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(5.0)),
                      // side: const BorderSide(
                      //   width: 2.0,
                      //   color: Colors.green,
                      // ),
                    ),
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      try {
                        var res = await ApiServices().createPost(
                            controller.id, textController.text, imagefiles);

                        Get.back();
                        Get.snackbar('Post', 'Posted successfully',
                            duration: const Duration(seconds: 3));
                      } catch (e) {
                        Get.snackbar(
                            'Post', 'Your data could not be posted, $e',
                            duration: const Duration(seconds: 3));
                      }
                    },
                    child: const Text(
                      'Post',
                      style: TextStyle(fontSize: 14),
                    ),
                    style: ElevatedButton.styleFrom(
                      elevation: 0,
                      onPrimary: Colors.white,
                      primary: const Color(0xfff7921f),
                      minimumSize: const Size(120, 35),
                      maximumSize: const Size(120, 35),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(5.0)),
                      // side: const BorderSide(
                      //   width: 2.0,
                      //   color: Colors.green,
                      // ),
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  openImages() async {
    try {
      var pickedfiles = await imgpicker.pickMultiImage();
      //you can use ImageCourse.camera for Camera capture
      if (pickedfiles != null) {
        imagefiles = pickedfiles;
        setState(() {});
      } else {
        print("No image is selected.");
      }
    } catch (e) {
      print("error while picking file.");
    }
  }
}
