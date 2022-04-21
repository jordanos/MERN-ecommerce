import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get/get.dart';

final storage = FlutterSecureStorage();

class StorageController extends GetxController {
  var isLoading = true.obs;
  var jwt;
  var id;
  var name;
  var phone;
  // var address;
  var ppic;
  var cpic;
  // var pass;

  get GetData async {
    jwt = await storage.read(key: "jwt");
    id = await storage.read(key: "id");
    name = await storage.read(key: "name");
    phone = await storage.read(key: "phone");
    // address = await storage.read(key: "address");
    ppic = await storage.read(key: "ppic");
    cpic = await storage.read(key: "cpic");
    // pass = await storage.read(key: "pass");
  }

  void changeIsLoading() => isLoading.value = false;
  @override
  void onInit() async {
    GetData;
    update();
    super.onInit();
  }

  @override
  // TODO: implement onStart
  InternalFinalCallback<void> get onStart => super.onStart;
}
