import 'dart:io';

import 'package:carousel_pro_nullsafety/carousel_pro_nullsafety.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/app_bar.dart';

class ProductPost extends StatefulWidget {
  const ProductPost({Key? key}) : super(key: key);

  @override
  State<ProductPost> createState() => _ProductPostState();
}

class _ProductPostState extends State<ProductPost> {
  StorageController controller = Get.find<StorageController>();
  final ImagePicker imgpicker = ImagePicker();
  List<XFile>? imagefiles;
  List<String> stringList = <String>['Electronics', 'Dress', 'Shoes', 'Phones'];
  String? init;
  TextEditingController nameContoller = TextEditingController();
  TextEditingController priceContoller = TextEditingController();
  String categoryController = '';
  // TextEditingController categoryContoller = TextEditingController();
  TextEditingController quantityContoller = TextEditingController();
  TextEditingController brandContoller = TextEditingController();
  TextEditingController descContoller = TextEditingController();

  TextEditingController conditionContoller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    var length = imagefiles?.length ?? 0;
    bool indicator = length > 1 ? true : false;

    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
          backgroundColor: Colors.white,
          appBar: MyAppBar(height: 50, isBackButton: true, isSearchPage: false),
          resizeToAvoidBottomInset: true,
          body: SingleChildScrollView(
            child: Container(
              // height: MediaQuery.of(context).size.height,
              color: Colors.white,
              alignment: Alignment.center,
              padding: const EdgeInsets.all(40),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Container(
                    width: MediaQuery.of(context).size.width * 0.8,
                    height: 150,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: Colors.grey.withOpacity(0.6))
                        // color: Colors.grey,
                        ),
                    child: imagefiles == null
                        ? GestureDetector(
                            behavior: HitTestBehavior.opaque,
                            onTap: () {
                              // print(imagefiles?.length);
                              if (imagefiles?.length == null) openImages();
                            },
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  Icons.file_upload_outlined,
                                  size: 60,
                                  color: Colors.grey.withOpacity(0.6),
                                ),
                                Text(
                                  'Upload Image',
                                  style: TextStyle(
                                      color: Colors.grey.withOpacity(0.6),
                                      fontSize: 22),
                                ),
                                Text(
                                  'You can select multiple images at ones',
                                  style: TextStyle(
                                      color: Colors.grey.withOpacity(0.6),
                                      fontSize: 14),
                                ),
                              ],
                            ),
                          )
                        : SizedBox(
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
                          ),
                  ),
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
                    height: 10,
                  ),
                  TextField(
                    keyboardType: TextInputType.text,
                    controller: nameContoller,
                    autocorrect: false,
                    style: const TextStyle(
                      fontSize: 14,
                      height: 1.2,
                    ),
                    decoration: InputDecoration(
                      border: UnderlineInputBorder(
                        borderSide: BorderSide(
                          width: 0.5,
                          color: Colors.grey.withOpacity(0.5),
                        ),
                      ),
                      focusedBorder: UnderlineInputBorder(
                          borderSide: BorderSide(
                              width: 0.5,
                              color: const Color(0xfff7921f).withOpacity(0.7))),
                      label: const Text(
                        'Product Name',
                        style: TextStyle(color: Colors.grey),
                      ),
                      labelStyle: const TextStyle(
                        color: Colors.grey,
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  TextField(
                    keyboardType: TextInputType.number,
                    controller: priceContoller,
                    autocorrect: false,
                    style: const TextStyle(
                      fontSize: 14,
                      height: 0.8,
                    ),
                    decoration: InputDecoration(
                      border: UnderlineInputBorder(
                        borderSide: BorderSide(
                          width: 0.5,
                          color: Colors.grey.withOpacity(0.5),
                        ),
                      ),
                      focusedBorder: UnderlineInputBorder(
                          borderSide: BorderSide(
                              width: 0.5,
                              color: const Color(0xfff7921f).withOpacity(0.7))),
                      label: const Text(
                        'Price',
                        style: TextStyle(color: Colors.grey),
                      ),
                      labelStyle: const TextStyle(
                        color: Colors.grey,
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  TextField(
                    keyboardType: TextInputType.text,
                    controller: descContoller,
                    autocorrect: false,
                    style: const TextStyle(
                      fontSize: 14,
                      height: 1.2,
                    ),
                    decoration: InputDecoration(
                      border: UnderlineInputBorder(
                        borderSide: BorderSide(
                          width: 0.5,
                          color: Colors.grey.withOpacity(0.5),
                        ),
                      ),
                      focusedBorder: UnderlineInputBorder(
                          borderSide: BorderSide(
                              width: 0.5,
                              color: const Color(0xfff7921f).withOpacity(0.7))),
                      label: const Text(
                        'Description',
                        style: TextStyle(color: Colors.grey),
                      ),
                      labelStyle: const TextStyle(
                        color: Colors.grey,
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  DropdownButton<String>(
                    iconSize: 26,
                    // underline: Container(
                    //   margin: EdgeInsets.only(top: 2),
                    //   child: Divider(
                    //     thickness: 2,
                    //   ),
                    // ),
                    isExpanded: true,
                    hint: init == null
                        ? const Text(
                            'Select Category',
                            style: TextStyle(color: Colors.grey),
                          )
                        : null,
                    value: init,
                    items: stringList.map((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(
                          value,
                          style: const TextStyle(color: Colors.black),
                        ),
                      );
                    }).toList(),
                    onChanged: (newValue) {
                      setState(() {
                        // print(newValue);
                        init = newValue;
                        categoryController = newValue.toString().toLowerCase();
                      });

                      // print(newValue);
                    },
                  ),
                  // TextField(
                  //   controller: categoryContoller,
                  //   autocorrect: false,
                  //   style: const TextStyle(
                  //     fontSize: 14,
                  //     height: 1.2,
                  //   ),
                  //   decoration: InputDecoration(
                  //     border: UnderlineInputBorder(
                  //       borderSide: BorderSide(
                  //         width: 0.5,
                  //         color: Colors.grey.withOpacity(0.5),
                  //       ),
                  //     ),
                  //     focusedBorder: UnderlineInputBorder(
                  //         borderSide: BorderSide(
                  //             width: 0.5,
                  //             color: const Color(0xfff7921f).withOpacity(0.7))),
                  //     label: const Text(
                  //       'Category',
                  //       style: TextStyle(color: Colors.grey),
                  //     ),
                  //     labelStyle: const TextStyle(
                  //       color: Colors.grey,
                  //     ),
                  //   ),
                  // ),
                  const SizedBox(
                    height: 5,
                  ),
                  TextField(
                    keyboardType: TextInputType.number,
                    controller: quantityContoller,
                    autocorrect: false,
                    style: const TextStyle(
                      fontSize: 14,
                      height: 1.2,
                    ),
                    decoration: InputDecoration(
                      border: UnderlineInputBorder(
                        borderSide: BorderSide(
                          width: 0.5,
                          color: Colors.grey.withOpacity(0.5),
                        ),
                      ),
                      focusedBorder: UnderlineInputBorder(
                          borderSide: BorderSide(
                              width: 0.5,
                              color: const Color(0xfff7921f).withOpacity(0.7))),
                      label: const Text(
                        'Quantity',
                        style: TextStyle(color: Colors.grey),
                      ),
                      labelStyle: const TextStyle(
                        color: Colors.grey,
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  TextField(
                    keyboardType: TextInputType.text,
                    controller: brandContoller,
                    autocorrect: false,
                    style: const TextStyle(
                      fontSize: 14,
                      height: 1.2,
                    ),
                    decoration: InputDecoration(
                      border: UnderlineInputBorder(
                        borderSide: BorderSide(
                          width: 0.5,
                          color: Colors.grey.withOpacity(0.5),
                        ),
                      ),
                      focusedBorder: UnderlineInputBorder(
                          borderSide: BorderSide(
                              width: 0.5,
                              color: const Color(0xfff7921f).withOpacity(0.7))),
                      label: const Text(
                        'Brand',
                        style: TextStyle(color: Colors.grey),
                      ),
                      labelStyle: const TextStyle(
                        color: Colors.grey,
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  TextField(
                    keyboardType: TextInputType.text,
                    controller: conditionContoller,
                    autocorrect: false,
                    style: const TextStyle(
                      fontSize: 14,
                      height: 1.2,
                    ),
                    decoration: InputDecoration(
                      border: UnderlineInputBorder(
                        borderSide: BorderSide(
                          width: 0.5,
                          color: Colors.grey.withOpacity(0.5),
                        ),
                      ),
                      focusedBorder: UnderlineInputBorder(
                          borderSide: BorderSide(
                              width: 0.5,
                              color: const Color(0xfff7921f).withOpacity(0.7))),
                      label: const Text(
                        'Condition',
                        style: TextStyle(color: Colors.grey),
                      ),
                      labelStyle: const TextStyle(
                        color: Colors.grey,
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 30,
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      // print('Category product post $categoryController');

                      try {
                        var res = await ApiServices().createProduct(
                            controller.id,
                            nameContoller.text,
                            priceContoller.text,
                            categoryController,
                            quantityContoller.text,
                            brandContoller.text,
                            descContoller.text,
                            conditionContoller.text,
                            imagefiles);
                        Get.back();
                        Get.snackbar('Product', 'Product created successfully',
                            duration: const Duration(seconds: 3));
                      } catch (e) {
                        Get.snackbar('Product', 'Product not created, $e',
                            duration: const Duration(seconds: 5));
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
                      minimumSize: const Size(155, 45),
                      maximumSize: const Size(155, 45),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(1.0)),
                    ),
                  ),
                ],
              ),
            ),
          )),
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
