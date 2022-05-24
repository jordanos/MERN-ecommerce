import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/chat_controller.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/screens/all_messages.dart';
import 'package:reca_mobile/screens/feed_page.dart';
import 'package:reca_mobile/screens/home_page.dart';
import 'package:reca_mobile/screens/profile.dart';
import 'package:reca_mobile/widgets/app_bar.dart';

// import 'package:socket_io_client/socket_io_client.dart' as IO;

// class MainPage extends StatelessWidget {
//   // This widget is the root of your application.
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Bottom Navigation Bar Demo',
//       home: AppBottomNavigationBarController(),
//     );
//   }
// }

// class AppBottomNavigationBarController extends StatefulWidget {
//   @override
//   _AppBottomNavigationBarControllerState createState() =>
//       _AppBottomNavigationBarControllerState();
// }

// class _AppBottomNavigationBarControllerState
//     extends State<AppBottomNavigationBarController> {
//   @override
//   Widget build(BuildContext context) {
//     return Container();
//   }
// }

class MainPage extends StatefulWidget {
  MainPage({
    Key? key,
  }) : super(key: key);

  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _selectedIndex = 0;

  final List<Widget> pages = [
    HomePage(
      key: PageStorageKey('home'),
    ),
    FeedPage(
      key: PageStorageKey('feeds'),
    ),
    AllMessages(
      key: PageStorageKey('messages'),
    ),
    ProfilePage(
      key: PageStorageKey('profile'),
    ),
  ];

  StorageController controller = Get.put(StorageController());
  final storage = FlutterSecureStorage();

  int currentIndex = 0;
  var id;
  var jwt;

  @override
  void initState() {
    jwtOrEmpty;

    super.initState();
  }

  Future<String> get jwtOrEmpty async {
    var jwt = await storage.read(key: "jwt");
    id = await storage.read(key: "id");
    print('Main page id for checkstatus $id');
    if (jwt == null) return "";
    return jwt;
  }

  Widget _bottomNavigationBar(int selectedIndex) => BottomNavigationBar(
          onTap: (int index) => setState(() => _selectedIndex = index),
          currentIndex: selectedIndex,
          backgroundColor: Colors.white,
          type: BottomNavigationBarType.fixed,
          selectedItemColor: const Color(0xfff7921f),
          unselectedItemColor: Colors.grey[900],
          items: const [
            BottomNavigationBarItem(
                icon: Icon(Icons.home_outlined), label: 'Home'),
            BottomNavigationBarItem(
                icon: Icon(Icons.feed_outlined), label: 'Feed'),
            BottomNavigationBarItem(
                icon: Icon(Icons.chat_outlined), label: 'Message'),
            BottomNavigationBarItem(
                icon: Icon(Icons.person_outline_rounded), label: 'Profile'),
          ]);

  @override
  Widget build(BuildContext context) {
    ChatController chatController = Get.put(ChatController());
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: MyAppBar(
        height: 50,
        isBackButton: false,
        isSearchPage: false,
      ),
      bottomNavigationBar: _bottomNavigationBar(_selectedIndex),
      body: IndexedStack(
        children: pages,
        index: _selectedIndex,
      ),
    );
  }
}

// old
// class MainPage extends StatefulWidget {
//   MainPage({
//     Key? key,
//   }) : super(key: key);

//   @override
//   _MainPageState createState() => _MainPageState();
// }

// class _MainPageState extends State<MainPage> {
//   // StorageController controller = Get.put(StorageController());
//   StorageController controller = Get.put(StorageController());
//   final storage = FlutterSecureStorage();

//   int currentIndex = 0;
//   var id;
//   var jwt;

//   @override
//   void initState() {
//     jwtOrEmpty;

//     super.initState();
//   }

//   Future<String> get jwtOrEmpty async {
//     var jwt = await storage.read(key: "jwt");
//     id = await storage.read(key: "id");
//     print('Main page id for checkstatus $id');
//     if (jwt == null) return "";
//     return jwt;
//   }

//   @override
//   Widget build(BuildContext context) {
//     ChatController chatController = Get.put(ChatController());
//     final screens = [
//       HomePage(),
//       FeedPage(),
//       AllMessages(),
//       FutureBuilder<Status>(
//           future: ApiServices().checkPackage(controller.id),
//           builder: (context, snapshot) {
//             var data = snapshot.data;
//             // print("Check package status data: ${data.status}");
//             bool hasPackage = true;
//             if (snapshot.connectionState == ConnectionState.done) {
//               if (hasPackage == false) {
//                 return Container(
//                   padding: const EdgeInsets.all(16),
//                   height: MediaQuery.of(context).size.height,
//                   child: const Center(
//                     child: Text(
//                       'Please check your internet connection and try again',
//                       textAlign: TextAlign.center,
//                       style: TextStyle(
//                         fontSize: 16,
//                         color: Color(0xfff7921f),
//                         fontWeight: FontWeight.bold,
//                       ),
//                     ),
//                   ),
//                 );
//               } else if (hasPackage == false) {
//                 return const PackagesPage();
//               } else {
//                 return const MyShop();
//               }
//             }
//             if (snapshot.connectionState == ConnectionState.waiting) {
//               return const Center(
//                 child: CircularProgressIndicator.adaptive(
//                   backgroundColor: Color(0xfff7921f),
//                 ),
//               );
//             } else {
//               return SizedBox(
//                 height: 240,
//                 child: Center(
//                     child: IconButton(
//                         onPressed: () {
//                           print('Refresh button pressed');
//                           setState(() {});
//                         },
//                         icon: const Icon(
//                           Icons.replay_outlined,
//                           size: 50,
//                           color: Color(0xfff7921f),
//                         ))),
//               );
//             }
//           }),
//       // hasPackage ? const MyShop() : const PackagesPage(),
//       ProfilePage(),
//     ];
//     return Scaffold(
//       backgroundColor: Colors.white,
//       appBar: MyAppBar(
//         height: 50,
//         isBackButton: false,
//         isSearchPage: false,
//       ),
//       body: screens[currentIndex],
//       bottomNavigationBar: BottomNavigationBar(
//           backgroundColor: Colors.white,
//           type: BottomNavigationBarType.fixed,
//           currentIndex: currentIndex,
//           selectedItemColor: const Color(0xfff7921f),
//           unselectedItemColor: Colors.grey[900],
//           onTap: (index) => setState(() => currentIndex = index),
//           items: const [
//             BottomNavigationBarItem(
//                 icon: Icon(Icons.home_outlined), label: 'Home'),
//             BottomNavigationBarItem(
//                 icon: Icon(Icons.feed_outlined), label: 'Feed'),
//             BottomNavigationBarItem(
//                 icon: Icon(Icons.chat_outlined), label: 'Message'),
//             BottomNavigationBarItem(
//                 icon: Icon(Icons.shopping_bag_outlined), label: 'My Shop'),
//             BottomNavigationBarItem(
//                 icon: Icon(Icons.person_outline_rounded), label: 'Profile'),
//           ]),
//     );
//   }
// }
