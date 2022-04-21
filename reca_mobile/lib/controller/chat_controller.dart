import 'dart:async';

import 'package:get/get.dart';
import 'package:flutter/material.dart';
import 'package:reca_mobile/config.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/models/one_to_one_model.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

// class StreamSocket {
//   final _socketResponse = StreamController<List<OtOMessages>>();

//   void Function(List<OtOMessages>) get addResponse => _socketResponse.sink.add;

//   Stream<List<OtOMessages>> get getResponse => _socketResponse.stream;

//   void dispose() {
//     _socketResponse.close();
//   }
// }

class ChatController extends GetxController {
  late IO.Socket socket;
  StorageController controller = Get.find<StorageController>();
  // StreamSocket streamSocket = StreamSocket();

  @override
  void onInit() async {
    chatConnect();
    super.onInit();
  }

  // chatRefresh() {
  //   socket.on('getMessage', (data) {
  //     var message = otOMessagesFromJson(data);
  //     print(data);
  //   });
  //   update();
  // }

  chatConnect() {
    socket = IO.io(
        'ws://${Config.messageUrl}',
        IO.OptionBuilder()
            .setTransports(['websocket'])
            .disableAutoConnect()
            .build());

    socket.connect();

    socket.onConnect((_) {
      print('Socket IO connected');
      socket.emit('adduser', int.parse(controller.id));
    });
    // socket.on('event', (data) => streamSocket.addResponse);
    socket.onDisconnect((_) => print('disconnected'));
    socket.onError((_) {
      print('error');
    });
    socket.onConnectTimeout((_) {
      print('Connect timeout');
    });
    socket.onPing((_) {
      print('ping');
    });
    socket.onError((_) {
      print('error');
    });
    socket.onDisconnect((_) {
      print('Disconnected');
    });
    // socket.on('getMessage', (data) {
    //   // var message = oneToOneMessagesFromJson(data);
    //   var message = otOMessagesFromJson(data);
    //   // print(data);
    //   print('Data in chatcontroller text: ${message.text}');
    // });
  }
}
