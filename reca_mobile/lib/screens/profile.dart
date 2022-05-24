import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/list.dart';
import 'package:reca_mobile/models/profile_by_id.dart';
import 'package:reca_mobile/screens/my_feed.dart';
import 'package:reca_mobile/screens/profile_edit.dart';
import 'package:reca_mobile/screens/settings.dart';
import 'package:reca_mobile/screens/sign_in.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/shimmer.dart';

var storage = FlutterSecureStorage();

class ProfilePage extends StatefulWidget {
  final arg;
  ProfilePage({Key? key, this.arg}) : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  late Future<ProfileById?> getInfo;
  StorageController controller = Get.find();

  late String ppic;
  late String cpic;

  @override
  void initState() {
    getInfo = ApiServices().getUserById(controller.id);
    super.initState();
  }

  final ImagePicker imgpicker = ImagePicker();

  late XFile imagefile;

  @override
  Widget build(BuildContext context) {
    var isLoading = controller.isLoading;
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
                getInfo = ApiServices().getUserById(controller.id);
              });
              // return void;
            }

            return f();
          },
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: Container(
              height: 730,
              padding: const EdgeInsets.only(bottom: 0),
              margin: const EdgeInsetsDirectional.only(bottom: 0),
              // color: Colors.redAccent,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Column(
                    children: [
                      const SizedBox(
                        height: 10,
                      ),
                      FutureBuilder<ProfileById?>(
                          future: getInfo,
                          builder: (context, snapshot) {
                            var data = snapshot.data;
                            var argument;
                            bool isOffline;
                            if (data == null) {
                              cpic = 'assets/images/grey.jpg';
                              isOffline = true;
                            } else {
                              isOffline = false;
                              argument = data.data;
                              cpic = argument.coverimage;
                            }
                            if (snapshot.connectionState ==
                                ConnectionState.waiting) {
                              return Container();
                            } else if (snapshot.connectionState ==
                                ConnectionState.done) {
                              if (snapshot.hasData) {
                                return !isOffline
                                    ? SizedBox(
                                        height: 120,
                                        child: Image.network(
                                          cpic,
                                          errorBuilder:
                                              (context, exception, stacktrace) {
                                            return Image.asset(
                                              'assets/images/grey.jpg',
                                              width: MediaQuery.of(context)
                                                  .size
                                                  .width,
                                              fit: BoxFit.fitWidth,
                                            );
                                          },
                                          width:
                                              MediaQuery.of(context).size.width,
                                          height: 120,
                                          fit: BoxFit.fitWidth,
                                        ),
                                      )
                                    : SizedBox(
                                        height: 120,
                                        child: Image.network(
                                          cpic,
                                          errorBuilder:
                                              (context, exception, stacktrace) {
                                            return Image.asset(
                                              'assets/images/grey.jpg',
                                              width: MediaQuery.of(context)
                                                  .size
                                                  .width,
                                              fit: BoxFit.fitWidth,
                                            );
                                          },
                                          width:
                                              MediaQuery.of(context).size.width,
                                          height: 120,
                                          fit: BoxFit.fitWidth,
                                        ),
                                      );
                                // SizedBox(
                                //     height: 120,
                                //     child: Image.file(
                                //       File(imagefile!.path),
                                //       width: MediaQuery.of(context).size.width,
                                //       height: 120,
                                //       fit: BoxFit.fitWidth,
                                //     ),
                                //   );
                              } else {
                                return SizedBox(
                                  height: 120,
                                  child: Image.asset(
                                    'assets/images/grey.jpg',
                                    width: MediaQuery.of(context).size.width,
                                    height: 120,
                                    fit: BoxFit.fitWidth,
                                  ),
                                );
                              }
                            } else {
                              return const Text('Server error');
                            }
                          }),
                      Flexible(
                          flex: 1,
                          child: Container(
                            width: MediaQuery.of(context).size.width,
                            padding: const EdgeInsets.all(30),
                            // color: Colors.grey,
                            child: Column(
                              children: [
                                FutureBuilder<ProfileById?>(
                                    future: getInfo,
                                    builder: (context, snapshot) {
                                      final data = snapshot.data;
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
                                        return const SizedBox(
                                          height: 270,
                                          child: Center(
                                            child: CircularProgressIndicator
                                                .adaptive(
                                              backgroundColor:
                                                  Color(0xfff7921f),
                                            ),
                                          ),
                                        );
                                      } else if (snapshot.connectionState ==
                                          ConnectionState.done) {
                                        if (snapshot.hasData) {
                                          return Column(
                                            children: [
                                              const SizedBox(
                                                height: 10,
                                              ),
                                              Text(
                                                argument.fullname.toString(),
                                                // name.toString(),
                                                // storage.read(key: "name").toString(),
                                                // '',
                                                style: const TextStyle(
                                                    fontSize: 18,
                                                    fontWeight:
                                                        FontWeight.bold),
                                              ),
                                              const SizedBox(
                                                height: 2,
                                              ),
                                              Text(
                                                '+251${argument.phonenumber.toString()}',
                                                // phone.toString(),
                                                // storage.read(key: "phone").toString(),
                                                // arg![0].data[0].phonenumber.toString(),
                                                // '',
                                                style: const TextStyle(
                                                    fontWeight:
                                                        FontWeight.normal),
                                              ),
                                              ElevatedButton(
                                                onPressed: () {
                                                  !isOffline
                                                      ? Get.to(
                                                          () =>
                                                              ProfileEditPage(),
                                                          arguments: [argument])
                                                      : null;
                                                },
                                                child: const Text(
                                                  'Edit',
                                                  style:
                                                      TextStyle(fontSize: 11),
                                                ),
                                                style: ElevatedButton.styleFrom(
                                                  elevation: 0,
                                                  onPrimary: Colors.white,
                                                  primary: Colors.green,
                                                  minimumSize:
                                                      const Size(60, 20),
                                                  maximumSize:
                                                      const Size(60, 20),
                                                  shape: RoundedRectangleBorder(
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              32.0)),
                                                  // side: const BorderSide(
                                                  //   width: 2.0,
                                                  //   color: Colors.green,
                                                  // ),
                                                ),
                                              ),
                                              SizedBox(
                                                height: 50,
                                                child: Row(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment
                                                            .spaceAround,
                                                    children: [
                                                      Column(
                                                        mainAxisAlignment:
                                                            MainAxisAlignment
                                                                .center,
                                                        children: [
                                                          Text(
                                                            argument.product
                                                                .toString(),
                                                            style: const TextStyle(
                                                                fontSize: 20,
                                                                fontWeight:
                                                                    FontWeight
                                                                        .bold),
                                                          ),
                                                          const Text(
                                                            'Products',
                                                            style: TextStyle(
                                                                fontSize: 11),
                                                          ),
                                                        ],
                                                      ),
                                                      Column(
                                                        mainAxisAlignment:
                                                            MainAxisAlignment
                                                                .center,
                                                        children: [
                                                          Text(
                                                            argument.post
                                                                .toString(),
                                                            style: const TextStyle(
                                                                fontSize: 20,
                                                                fontWeight:
                                                                    FontWeight
                                                                        .bold),
                                                          ),
                                                          const Text(
                                                            'Posts',
                                                            style: TextStyle(
                                                                fontSize: 11),
                                                          ),
                                                        ],
                                                      ),
                                                      Column(
                                                        mainAxisAlignment:
                                                            MainAxisAlignment
                                                                .center,
                                                        children: [
                                                          Text(
                                                            argument.follower
                                                                .toString(),
                                                            style: const TextStyle(
                                                                fontSize: 20,
                                                                fontWeight:
                                                                    FontWeight
                                                                        .bold),
                                                          ),
                                                          const Text(
                                                            'Followers',
                                                            style: TextStyle(
                                                                fontSize: 11),
                                                          ),
                                                        ],
                                                      ),
                                                      Column(
                                                        mainAxisAlignment:
                                                            MainAxisAlignment
                                                                .center,
                                                        children: [
                                                          Text(
                                                            argument.following
                                                                .toString(),
                                                            style: const TextStyle(
                                                                fontSize: 20,
                                                                fontWeight:
                                                                    FontWeight
                                                                        .bold),
                                                          ),
                                                          const Text(
                                                            'Following',
                                                            style: TextStyle(
                                                                fontSize: 11),
                                                          ),
                                                        ],
                                                      ),
                                                    ]),
                                              )
                                            ],
                                          );
                                        } else {
                                          return Column(
                                            children: [
                                              const SizedBox(
                                                height: 10,
                                              ),
                                              Text(
                                                controller.name.toString(),
                                                // name.toString(),
                                                // storage.read(key: "name").toString(),
                                                // '',
                                                style: const TextStyle(
                                                    fontSize: 18,
                                                    fontWeight:
                                                        FontWeight.bold),
                                              ),
                                              const SizedBox(
                                                height: 2,
                                              ),
                                              Text(
                                                '+251${controller.phone.toString()}',
                                                // phone.toString(),
                                                // storage.read(key: "phone").toString(),
                                                // arg![0].data[0].phonenumber.toString(),
                                                // '',
                                                style: const TextStyle(
                                                    fontWeight:
                                                        FontWeight.normal),
                                              ),
                                              ElevatedButton(
                                                onPressed: () {
                                                  null;
                                                },
                                                child: const Text(
                                                  'Edit',
                                                  style:
                                                      TextStyle(fontSize: 11),
                                                ),
                                                style: ElevatedButton.styleFrom(
                                                  elevation: 0,
                                                  onPrimary: Colors.white,
                                                  primary: Colors.green,
                                                  minimumSize:
                                                      const Size(60, 20),
                                                  maximumSize:
                                                      const Size(60, 20),
                                                  shape: RoundedRectangleBorder(
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              32.0)),
                                                  // side: const BorderSide(
                                                  //   width: 2.0,
                                                  //   color: Colors.green,
                                                  // ),
                                                ),
                                              ),
                                              SizedBox(
                                                height: 50,
                                                child: Row(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment
                                                            .spaceAround,
                                                    children: [
                                                      Column(
                                                        mainAxisAlignment:
                                                            MainAxisAlignment
                                                                .center,
                                                        children: [
                                                          Skeleton(
                                                            width: 30,
                                                            height: 35,
                                                          ),
                                                          const Text(
                                                            'Products',
                                                            style: TextStyle(
                                                                fontSize: 11),
                                                          ),
                                                        ],
                                                      ),
                                                      Column(
                                                        mainAxisAlignment:
                                                            MainAxisAlignment
                                                                .center,
                                                        children: [
                                                          Skeleton(
                                                            width: 30,
                                                            height: 35,
                                                          ),
                                                          const Text(
                                                            'Posts',
                                                            style: TextStyle(
                                                                fontSize: 11),
                                                          ),
                                                        ],
                                                      ),
                                                      Column(
                                                        mainAxisAlignment:
                                                            MainAxisAlignment
                                                                .center,
                                                        children: [
                                                          Skeleton(
                                                            width: 30,
                                                            height: 35,
                                                          ),
                                                          const Text(
                                                            'Followers',
                                                            style: TextStyle(
                                                                fontSize: 11),
                                                          ),
                                                        ],
                                                      ),
                                                      Column(
                                                        mainAxisAlignment:
                                                            MainAxisAlignment
                                                                .center,
                                                        children: [
                                                          Skeleton(
                                                            width: 30,
                                                            height: 35,
                                                          ),
                                                          const Text(
                                                            'Following',
                                                            style: TextStyle(
                                                                fontSize: 11),
                                                          ),
                                                        ],
                                                      ),
                                                    ]),
                                              )
                                            ],
                                          );
                                        }
                                      } else {
                                        return const Center(
                                          child: Text(
                                              'There seems to be a problem'),
                                        );
                                      }
                                    }),
                                const SizedBox(
                                  height: 15,
                                ),
                                const Align(
                                  alignment: Alignment.centerLeft,
                                  child: Text(
                                    'Settings',
                                    style: TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                ),
                                const SizedBox(
                                  height: 15,
                                ),
                                SizedBox(
                                  // height: ,
                                  child: ListView.builder(
                                      physics:
                                          const NeverScrollableScrollPhysics(),
                                      shrinkWrap: true,
                                      itemCount: profile1.length,
                                      itemBuilder: (context, index) {
                                        return ListTile(
                                          onTap: () {
                                            switch (index) {
                                              case 0:
                                                // print('My Feed');
                                                Get.to(() => const MyFeed());
                                                break;
                                              case 1:
                                                // print('Wallet');
                                                Get.snackbar(
                                                    'Wallet', 'Coming Soon');
                                                break;
                                              case 2:
                                                // print('Security');
                                                Get.to(() => const Settings());
                                                break;
                                              case 3:
                                                print('Help');
                                                break;
                                              case 4:
                                                print('About');
                                                break;
                                              case 5:
                                                Get.defaultDialog(
                                                  title: "Logout",
                                                  middleText:
                                                      "Are you sure you want to logout?",
                                                  backgroundColor: Colors.white,
                                                  titleStyle: const TextStyle(
                                                      color: Colors.black),
                                                  middleTextStyle:
                                                      const TextStyle(
                                                          color: Colors.black),
                                                  confirm: ElevatedButton(
                                                      style: ElevatedButton
                                                          .styleFrom(
                                                        elevation: 0,
                                                        onPrimary: const Color(
                                                            0xffe0466c),
                                                        primary: const Color(
                                                            0xfffee6ec),
                                                        minimumSize:
                                                            const Size(90, 25),
                                                        maximumSize:
                                                            const Size(90, 25),
                                                      ),
                                                      onPressed: () async {
                                                        storage.delete(
                                                            key: 'jwt');
                                                        storage.delete(
                                                            key: 'id');
                                                        storage.delete(
                                                            key: 'name');
                                                        storage.delete(
                                                            key: 'pass');
                                                        storage.delete(
                                                            key: 'ppic');
                                                        storage.delete(
                                                            key: 'cpic');
                                                        storage.delete(
                                                            key: 'address');
                                                        storage.delete(
                                                            key: 'phone');
                                                        // Get.reload<
                                                        //     StorageController>();
                                                        Get.delete<
                                                            StorageController>();
                                                        Get.off(() => SignIn());
                                                      },
                                                      child: const Text('Yes')),
                                                  cancel: ElevatedButton(
                                                      style: ElevatedButton
                                                          .styleFrom(
                                                        elevation: 0,
                                                        onPrimary: Colors.white,
                                                        primary: const Color(
                                                            0xfff7921f),
                                                        minimumSize:
                                                            const Size(90, 25),
                                                        maximumSize:
                                                            const Size(90, 25),
                                                      ),
                                                      onPressed: () {
                                                        Get.back();
                                                      },
                                                      child: const Text('No')),
                                                  buttonColor:
                                                      const Color(0xfff7921f),
                                                  barrierDismissible: false,
                                                  radius: 5,
                                                );

                                                // print('Logout');
                                                break;
                                              default:
                                            }
                                          },
                                          horizontalTitleGap: 0,
                                          leading: Column(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            children: [
                                              Container(
                                                width: 30,
                                                height: 30,
                                                margin: const EdgeInsets.only(
                                                    right: 20,
                                                    left: 20,
                                                    bottom: 5),
                                                padding:
                                                    const EdgeInsets.all(5),
                                                decoration: BoxDecoration(
                                                  shape: BoxShape.circle,
                                                  color: profile1[index]
                                                      ['bgcolor'],
                                                ),
                                                child: Icon(
                                                  profile1[index]['icon'],
                                                  size: 18,
                                                  color: profile1[index]
                                                      ['iconcolor'],
                                                ),
                                              ),
                                            ],
                                          ),
                                          title: Text(
                                            profile1[index]['text'],
                                            style:
                                                const TextStyle(fontSize: 15),
                                          ),
                                          trailing: profile1[index]
                                              ['following'],
                                          contentPadding:
                                              const EdgeInsets.only(left: 0),
                                        );
                                      }),
                                ),
                              ],
                            ),
                          )),
                    ],
                  ),
                  Positioned(
                    left: MediaQuery.of(context).size.width / 2.4,
                    top: 100,
                    child: FutureBuilder<ProfileById?>(
                        future: ApiServices().getUserById(controller.id),
                        builder: (context, snapshot) {
                          var data = snapshot.data;
                          // print('Profile ppic snapshot data $data');
                          var argument;
                          bool isOffline;

                          if (data == null) {
                            isOffline = true;
                            // ppic = profilePic;
                          } else {
                            isOffline = false;
                            argument = data.data;
                            ppic = argument.profileimage;
                          }
                          if (snapshot.connectionState ==
                              ConnectionState.waiting) {
                            return Container();
                          } else if (snapshot.connectionState ==
                              ConnectionState.done) {
                            if (snapshot.hasData) {
                              return CircleAvatar(
                                backgroundImage: NetworkImage(ppic),
                                onBackgroundImageError: (exception,
                                        stackTrace) =>
                                    const AssetImage('assets/images/grey.jpg'),
                                radius: 30,
                              );
                            } else {
                              return const CircleAvatar(
                                backgroundImage:
                                    AssetImage('assets/images/grey.jpg'),
                                radius: 30,
                              );
                            }
                          } else {
                            return const Text('Server error');
                          }
                        }),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  openImages() async {
    // try {
    var pickedfiles = await imgpicker.pickImage(source: ImageSource.gallery);
    if (pickedfiles != null) {
      imagefile = pickedfiles;
      var res = await ApiServices()
          .uploadCover(controller.jwt, controller.id, imagefile);
      print('Response cover image update ${res.message}');
      if (res.status == 200) {
        setState(() {
          getInfo = ApiServices().getUserById(controller.id);
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
