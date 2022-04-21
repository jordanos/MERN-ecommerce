import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/screens/main_page.dart';
import 'package:reca_mobile/screens/profile.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/app_bar.dart';

var storage = FlutterSecureStorage();

class ProfileEditPage extends StatefulWidget {
  ProfileEditPage({Key? key}) : super(key: key);

  @override
  State<ProfileEditPage> createState() => _ProfileEditPageState();
}

class _ProfileEditPageState extends State<ProfileEditPage> {
  var arguments = Get.arguments;
  StorageController controller = Get.find();

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  // static String? name;
  // static String? ppic;
  static String? id;
  static String? jwt;

  @override
  void initState() {
    super.initState();
    getData();
    // print('Argument Name ${arguments[0].fullname}');
    // print('Profile phone ${phone.toString()}');
    // print('Profile address ${address.toString()}');
  }

  void getData() async {
    jwt = await storage.read(key: "jwt");
    id = await storage.read(key: "id");
    setState(() {
      nameController =
          TextEditingController(text: arguments[0].fullname.toString());
      phoneController =
          TextEditingController(text: arguments[0].phonenumber.toString());
      addressController =
          TextEditingController(text: arguments[0].address.toString());
    });
  }

  TextEditingController nameController = TextEditingController();

  TextEditingController phoneController = TextEditingController();

  TextEditingController addressController = TextEditingController();

  final ImagePicker imgpicker = ImagePicker();
  XFile? imagefile;
  XFile? coverimagefile;

  @override
  Widget build(BuildContext context) {
    var length = imagefile?.length ?? 0;
    var clength = coverimagefile?.length ?? 0;

    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        backgroundColor: Colors.white,
        resizeToAvoidBottomInset: true,
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
          child: SingleChildScrollView(
            physics: const ScrollPhysics(),
            child: Container(
                // height: MediaQuery.of(context).size.height,
                color: Colors.white,
                alignment: Alignment.center,
                padding: const EdgeInsets.all(20),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      const SizedBox(
                        height: 10,
                      ),
                      const Align(
                        alignment: Alignment.centerLeft,
                        child: Text('Account',
                            style: TextStyle(
                                fontSize: 20, fontWeight: FontWeight.w700)),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Stack(
                        children: [
                          clength == 0
                              ? Container(
                                  margin: const EdgeInsets.only(bottom: 15),
                                  height: 120,
                                  child: Image.network(
                                    arguments[0].coverimage,
                                    errorBuilder:
                                        (context, exception, stacktrace) {
                                      return Image.asset(
                                        'assets/images/grey.jpg',
                                        width:
                                            MediaQuery.of(context).size.width,
                                        fit: BoxFit.fitWidth,
                                      );
                                    },
                                    width: MediaQuery.of(context).size.width,
                                    height: 120,
                                    fit: BoxFit.fitWidth,
                                  ),
                                )
                              : Container(
                                  margin: const EdgeInsets.only(bottom: 15),
                                  height: 120,
                                  child: Image.file(
                                    File(coverimagefile!.path),
                                    errorBuilder:
                                        (context, exception, stacktrace) {
                                      return Image.asset(
                                        'assets/images/grey.jpg',
                                        width:
                                            MediaQuery.of(context).size.width,
                                        fit: BoxFit.fitWidth,
                                      );
                                    },
                                    width: MediaQuery.of(context).size.width,
                                    height: 120,
                                    fit: BoxFit.fitWidth,
                                  ),
                                ),
                          Positioned(
                            right: -5,
                            top: 100,
                            child: GestureDetector(
                              onTap: () => openCoverImages(),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Container(
                                    width: 35,
                                    height: 35,
                                    margin: const EdgeInsets.only(
                                        right: 20, left: 20, bottom: 5),
                                    padding: const EdgeInsets.all(5),
                                    decoration: const BoxDecoration(
                                      shape: BoxShape.circle,
                                      color: Color(0xfffef0e6),
                                    ),
                                    child: const Icon(
                                      Icons.add_a_photo_outlined,
                                      size: 20,
                                      color: Color(0xfff7921f),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 30,
                      ),
                      const Align(
                        alignment: Alignment.centerLeft,
                        child: Text('Photo',
                            style: TextStyle(
                                color: Colors.grey,
                                fontSize: 18,
                                fontWeight: FontWeight.w500)),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      Stack(
                        children: [
                          length == 0
                              ? CircleAvatar(
                                  radius: 60,
                                  backgroundImage: NetworkImage(
                                      arguments[0].profileimage.toString()),
                                )
                              : CircleAvatar(
                                  radius: 60,
                                  child: ClipOval(
                                    child: Image.file(File(imagefile!.path)),
                                  ),
                                ),
                          Positioned(
                            right: -15,
                            bottom: -10,
                            child: GestureDetector(
                              onTap: () => openImages(),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Container(
                                    width: 35,
                                    height: 35,
                                    margin: const EdgeInsets.only(
                                        right: 20, left: 20, bottom: 5),
                                    padding: const EdgeInsets.all(5),
                                    decoration: const BoxDecoration(
                                      shape: BoxShape.circle,
                                      color: Color(0xfffef0e6),
                                    ),
                                    child: const Icon(
                                      Icons.add_a_photo_outlined,
                                      size: 20,
                                      color: Color(0xfff7921f),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      const Align(
                        alignment: Alignment.centerLeft,
                        child: Text('Name',
                            style: TextStyle(
                                color: Colors.grey,
                                fontSize: 18,
                                fontWeight: FontWeight.w500)),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Align(
                        alignment: Alignment.centerRight,
                        child: SizedBox(
                          width: MediaQuery.of(context).size.width * 0.7,
                          child: TextField(
                            controller: nameController,
                            decoration:
                                const InputDecoration(hintText: 'Name Surname'),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      const Align(
                        alignment: Alignment.centerLeft,
                        child: Text('Phone',
                            style: TextStyle(
                                color: Colors.grey,
                                fontSize: 18,
                                fontWeight: FontWeight.w500)),
                      ),
                      Align(
                        alignment: Alignment.centerRight,
                        child: SizedBox(
                          width: MediaQuery.of(context).size.width * 0.7,
                          child: TextField(
                            readOnly: true,
                            controller: phoneController,
                            decoration: const InputDecoration(
                                hintText: '+251912345678'),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 3,
                      ),
                      const Padding(
                        padding: EdgeInsets.only(right: 30),
                        child: Text(
                          'You can\'t edit your phone number',
                          style: TextStyle(
                              color: Colors.orangeAccent, fontSize: 11),
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      const Align(
                        alignment: Alignment.centerLeft,
                        child: Text('Address',
                            style: TextStyle(
                                color: Colors.grey,
                                fontSize: 18,
                                fontWeight: FontWeight.w500)),
                      ),
                      Align(
                        alignment: Alignment.centerRight,
                        child: SizedBox(
                          width: MediaQuery.of(context).size.width * 0.7,
                          child: TextField(
                            controller: addressController,
                            decoration: const InputDecoration(
                                hintText: 'Addis Ababa, Ethiopia'),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 30,
                      ),
                      ElevatedButton(
                        onPressed: () async {
                          print('Save button pressed');
                          print(nameController.text);
                          print(addressController.text);
                          print('jwt edit profile $jwt');
                          print('id edit profile $id');

                          var res = await ApiServices().editProfile(
                              id,
                              jwt,
                              nameController.text,
                              addressController.text,
                              imagefile);
                          if (res.status == 200) {
                            Get.back();
                            Get.snackbar('Edit', 'Profile edited successfully',
                                duration: const Duration(seconds: 3));
                          } else {
                            Get.snackbar('Edit',
                                'Profile edit unsuccessful, please try again',
                                duration: const Duration(seconds: 3));
                          }
                        },
                        child: const Text(
                          'Save',
                          style: TextStyle(fontSize: 20),
                        ),
                        style: ElevatedButton.styleFrom(
                          elevation: 0,
                          onPrimary: Colors.white,
                          primary: Colors.green,
                          minimumSize: const Size(150, 50),
                          maximumSize: const Size(150, 50),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(32.0)),
                          // side: const BorderSide(
                          //   width: 2.0,
                          //   color: Colors.green,
                          // ),
                        ),
                      ),
                    ],
                  ),
                )),
          ),
        ),
      ),
    );
  }

  openImages() async {
    try {
      var pickedfiles = await imgpicker.pickImage(source: ImageSource.gallery);
      //you can use ImageCourse.camera for Camera capture
      if (pickedfiles != null) {
        imagefile = pickedfiles;
        setState(() {});
      } else {
        print("No image is selected.");
      }
    } catch (e) {
      print("error while picking file.");
    }
  }

  openCoverImages() async {
    // try {
    var pickedfiles = await imgpicker.pickImage(source: ImageSource.gallery);
    if (pickedfiles != null) {
      coverimagefile = pickedfiles;
      var res = await ApiServices()
          .uploadCover(controller.jwt, controller.id, coverimagefile);
      print('Response cover image update ${res.message}');
      if (res.status == 200) {
        setState(() {
          getData();
        });
        Get.snackbar('Cover Image', 'Cover image uploaded successfully',
            duration: const Duration(seconds: 3));
      } else {
        Get.snackbar(
            'Cover Image', 'Cover image upload unsuccessful, please try again',
            duration: const Duration(seconds: 3));
      }
    } else {
      print("No image is selected.");
    }
    // } catch (e) {
    //   print(e);
    //   print("error while picking file.");
    // }
  }
}
