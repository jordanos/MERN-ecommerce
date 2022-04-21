import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/config.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/user_login_response_model.dart';
import 'package:reca_mobile/screens/first_launch/intro_page.dart';
import 'package:reca_mobile/screens/home_page.dart';
import 'package:reca_mobile/screens/main_page.dart';
import 'package:reca_mobile/screens/profile_visit.dart';
import 'package:reca_mobile/screens/sign_in.dart';
import 'package:http/http.dart' as http;

final storage = FlutterSecureStorage();

void main() async {
  // try {
  //   // var url = Uri.http(Config.apiUrl, Config.postApi);
  //   final result = await InternetAddress.lookup('https://www.google.com');
  //   if (result.isNotEmpty && result[0].rawAddress.isNotEmpty) {
  //     print('connected');
  //   }
  // } on SocketException catch (_) {
  //   print('not connected e : $_');
  // StorageController controller = Get.put(StorageController());

  // }
  runApp(MyApp());
}

const MaterialColor white = MaterialColor(0xFFFEFEFE, <int, Color>{
  50: Color(0xFFFEFEFE),
  100: Color(0xFFFFFFFF),
  200: Color(0xFFFFFFFF),
  300: Color(0xFFFFFFFF),
  400: Color(0xFFFFFFFF),
  500: Color(0xFFFFFFFF),
  600: Color(0xFFFFFFFF),
  700: Color(0xFFFFFFFF),
  800: Color(0xFFFFFFFF),
  900: Color(0xFFFFFFFF),
});

class MyApp extends StatelessWidget {
  MyApp({Key? key}) : super(key: key);
  @override
  Future<String> get jwtOrEmpty async {
    var jwt = await storage.read(key: "jwt");
    var id = await storage.read(key: "id");
    // var jwt = null;
    if (jwt == null) return "";
    return jwt;
  }

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Rica Shopping',
      theme: ThemeData(brightness: Brightness.light, primarySwatch: white),
      home: FutureBuilder(
        future: jwtOrEmpty,
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return Container(
              color: const Color(0xfff7921f),
              child: Center(
                child: Image(
                  height: 300,
                  width: MediaQuery.of(context).size.width / 1.5,
                  image: const AssetImage(
                    'assets/images/reca logo2.png',
                  ),
                ),
              ),
            );
          } else if (snapshot.data == "") {
            return SignIn();
          } else if (snapshot.data != null) {
            var jwt = snapshot.data;
            return MainPage();
          } else {
            return Container(
              color: Colors.white,
              child: const Center(
                child: Text(
                    'Looks like the app has crashed, please try reopening it.'),
              ),
            );
          }
        },
      ),
    );
  }
}
