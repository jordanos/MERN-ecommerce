import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/list.dart';
import 'package:reca_mobile/models/package_list.dart';
import 'package:reca_mobile/models/package_response.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/shimmer.dart';

class PackagesPage extends StatelessWidget {
  const PackagesPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    StorageController controller = Get.find<StorageController>();

    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
          backgroundColor: Colors.white,
          body: SingleChildScrollView(
            physics: const ScrollPhysics(),
            child: Container(
              color: Colors.white,
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  Container(
                    alignment: Alignment.center,
                    height: 50,
                    child: FutureBuilder<dynamic>(
                        future: ApiServices()
                            .checkPackage(int.parse(controller.id)),
                        builder: (context, snapshot) {
                          var data = snapshot.data;
                          if (snapshot.connectionState ==
                              ConnectionState.done) {
                            // print(data);
                            if (data == null) {
                              return const Text(
                                  'Please purchase a package to start posting products.');
                            } else {
                              if (data.status == 3) {
                                return const Text(
                                    'Your package purchase request is denied.');
                              }
                              String text = '';
                              switch (data.haspackage) {
                                case 'pending':
                                  text =
                                      'Your package purchase request is pending';
                                  break;
                                case 'true':
                                  text =
                                      'Your package purchase request is approved';
                                  break;
                                case 'false':
                                  text =
                                      'Please purchase a package to start posting products';
                                  break;
                                default:
                                  text = '';
                              }
                              return Align(
                                alignment: Alignment.centerLeft,
                                child: Text(
                                  text,
                                  style: const TextStyle(color: Colors.black),
                                ),
                              );
                            }
                          }
                          if (snapshot.connectionState ==
                              ConnectionState.waiting) {
                            return Skeleton(
                              width: MediaQuery.of(context).size.width / 1.5,
                              height: 10,
                            );
                          } else {
                            return SizedBox(
                              height: 240,
                              child: Center(
                                  child: IconButton(
                                      onPressed: () {
                                        print('Refresh button pressed');
                                      },
                                      icon: const Icon(
                                        Icons.replay_outlined,
                                        size: 50,
                                        color: Color(0xfff7921f),
                                      ))),
                            );
                          }
                        }),
                  ),
                  FutureBuilder<List<Package>>(
                      future: ApiServices().getPackageInfo(),
                      builder: (context, snapshot) {
                        if (snapshot.connectionState == ConnectionState.none) {
                          return ListView.builder(
                            itemCount: 4,
                            shrinkWrap: true,
                            itemBuilder: (context, index) {
                              return Container(
                                height: 150,
                                margin:
                                    const EdgeInsets.symmetric(vertical: 15),
                                child: Skeleton(
                                  width: double.infinity,
                                  height: 150,
                                ),
                              );
                            },
                          );
                        } else if (snapshot.connectionState ==
                            ConnectionState.waiting) {
                          return ListView.builder(
                            itemCount: 4,
                            shrinkWrap: true,
                            itemBuilder: (context, index) {
                              return Container(
                                height: 150,
                                margin:
                                    const EdgeInsets.symmetric(vertical: 15),
                                child: Skeleton(
                                  width: double.infinity,
                                  height: 150,
                                ),
                              );
                            },
                          );
                        } else if (snapshot.connectionState ==
                            ConnectionState.done) {
                          if (snapshot.hasData) {
                            var data = snapshot.data;
                            return ListView.builder(
                                shrinkWrap: true,
                                physics: const NeverScrollableScrollPhysics(),
                                scrollDirection: Axis.vertical,
                                itemCount: data!.length,
                                itemBuilder: (context, index) {
                                  var packageData = data[index];
                                  return Container(
                                    margin: const EdgeInsets.symmetric(
                                        vertical: 15),
                                    // padding: const EdgeInsets.all(20),
                                    width: double.infinity,
                                    height: 150,
                                    decoration: BoxDecoration(
                                        color: package[index]['bgcolor'],
                                        borderRadius: BorderRadius.circular(12),
                                        boxShadow: const [
                                          BoxShadow(
                                              color: Colors.grey,
                                              spreadRadius: 0,
                                              blurRadius: 3,
                                              offset: Offset(0, 2))
                                        ]),
                                    child: Stack(
                                      children: [
                                        Container(
                                          padding: const EdgeInsets.fromLTRB(
                                              20, 20, 20, 10),
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceEvenly,
                                            children: [
                                              Text(
                                                'MEMBERSHIP FOR ${packageData.expirationtime}',
                                                style: TextStyle(
                                                  color: package[index]
                                                      ['color'],
                                                  fontWeight: FontWeight.w900,
                                                ),
                                              ),
                                              const SizedBox(
                                                height: 5,
                                              ),
                                              Text(
                                                packageData.price == 0
                                                    ? 'FREE'
                                                    : '${packageData.price.toString()} ETB',
                                                style: TextStyle(
                                                  color: package[index]
                                                      ['color'],
                                                  fontWeight: FontWeight.w600,
                                                ),
                                              ),
                                              const SizedBox(
                                                height: 5,
                                              ),
                                              Text(
                                                'Allowed Posts: ${packageData.postsleft.toString()}',
                                                style: TextStyle(
                                                  color: package[index]
                                                      ['color'],
                                                  fontWeight: FontWeight.w600,
                                                ),
                                              ),
                                              const SizedBox(
                                                height: 10,
                                              ),
                                              ElevatedButton(
                                                onPressed: () async {
                                                  switch (index) {
                                                    case 0:
                                                      var result =
                                                          await ApiServices()
                                                              .buyPackage(
                                                                  'free',
                                                                  controller
                                                                      .id);
                                                      if (result.status ==
                                                          200) {
                                                        Get.snackbar('Package',
                                                            'Package purchase pending, please wait until your request is approved');
                                                      } else if (result
                                                              .status ==
                                                          404) {
                                                        Get.snackbar('Package',
                                                            'Package purchase, you\'ve already bought free trail package');
                                                      } else {
                                                        Get.snackbar('Package',
                                                            'Package purchase error, please try again');
                                                      }
                                                      print('Free Package');
                                                      break;
                                                    case 1:
                                                      var result =
                                                          await ApiServices()
                                                              .buyPackage(
                                                                  'basic',
                                                                  controller
                                                                      .id);
                                                      if (result.status ==
                                                          200) {
                                                        Get.snackbar('Package',
                                                            'Package purchase pending, please wait until your request is approved');
                                                      } else {
                                                        Get.snackbar('Package',
                                                            'Package purchase error, please try again');
                                                      }
                                                      print('Basic');
                                                      break;
                                                    case 2:
                                                      var result =
                                                          await ApiServices()
                                                              .buyPackage(
                                                                  'premium',
                                                                  controller
                                                                      .id);
                                                      if (result.status ==
                                                          200) {
                                                        Get.snackbar('Package',
                                                            'Package purchase pending, please wait until your request is approved');
                                                      } else {
                                                        Get.snackbar('Package',
                                                            'Package purchase error, please try again');
                                                      }
                                                      print('Premium');
                                                      break;
                                                    case 3:
                                                      var result =
                                                          await ApiServices()
                                                              .buyPackage(
                                                                  'vip',
                                                                  controller
                                                                      .id);
                                                      if (result.status ==
                                                          200) {
                                                        Get.snackbar('Package',
                                                            'Package purchase pending, please wait until your request is approved');
                                                      } else {
                                                        Get.snackbar('Package',
                                                            'Package purchase error, please try again');
                                                      }
                                                      print('Vip');
                                                      break;
                                                    default:
                                                  }
                                                },
                                                child: const Text(
                                                  'BUY',
                                                  style:
                                                      TextStyle(fontSize: 14),
                                                ),
                                                style: ElevatedButton.styleFrom(
                                                  elevation: 0,
                                                  onPrimary: Colors.white,
                                                  primary: package[index]
                                                      ['color'],
                                                  minimumSize:
                                                      const Size(100, 28),
                                                  maximumSize:
                                                      const Size(100, 28),
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
                                            ],
                                          ),
                                        ),
                                        Positioned(
                                            right: 20,
                                            top: 0,
                                            child: Container(
                                              height: 15,
                                              width: 20,
                                              color: package[index]['color'],
                                            )),
                                        Positioned(
                                            right: 20,
                                            top: 15,
                                            child: _Triangle(
                                              color: package[index]['color'],
                                            )),
                                      ],
                                    ),
                                  );
                                });
                          } else {
                            return ListView.builder(
                              itemCount: 4,
                              shrinkWrap: true,
                              itemBuilder: (context, index) {
                                return Container(
                                  height: 150,
                                  margin:
                                      const EdgeInsets.symmetric(vertical: 15),
                                  child: Skeleton(
                                    width: double.infinity,
                                    height: 150,
                                  ),
                                );
                              },
                            );
                          }
                        } else {
                          return ListView.builder(
                            shrinkWrap: true,
                            itemCount: 4,
                            itemBuilder: (context, index) {
                              return Container(
                                height: 150,
                                margin:
                                    const EdgeInsets.symmetric(vertical: 15),
                                child: Skeleton(
                                  width: double.infinity,
                                  height: 150,
                                ),
                              );
                            },
                          );
                        }
                      })
                ],
              ),
            ),
          )),
    );
  }
}

class _Triangle extends StatelessWidget {
  const _Triangle({
    Key? key,
    required this.color,
  }) : super(key: key);
  final Color color;
  @override
  Widget build(BuildContext context) {
    return CustomPaint(
        painter: _ShapesPainter(color),
        child: Container(
          height: 10,
          width: 20,
          child: Center(
            child: Padding(
              padding: const EdgeInsets.only(left: .0, bottom: 16),
              child: Transform.rotate(
                angle: math.pi / 4,
              ),
            ),
          ),
        ));
  }
}

class _ShapesPainter extends CustomPainter {
  final Color color;
  _ShapesPainter(this.color);
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint();
    paint.color = color;
    var path = Path();
    path.lineTo(size.width, 0);
    path.lineTo(size.height, size.width);
    path.close();
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
