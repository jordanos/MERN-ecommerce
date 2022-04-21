import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/screens/change_pwd.dart';
import 'package:reca_mobile/widgets/app_bar.dart';

class Settings extends StatelessWidget {
  const Settings({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        backgroundColor: Colors.white,
        appBar: MyAppBar(
          height: 50,
          isBackButton: true,
          isSearchPage: false,
        ),
        body: Container(
          padding: const EdgeInsets.only(top: 20, left: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const Text(
                'Settings',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              ListTile(
                contentPadding: const EdgeInsets.only(right: 20),
                leading: const Icon(
                  Icons.lock_open_outlined,
                  color: Color(0xfff7921f),
                ),
                title: const Text(
                  'Change Password',
                  style: TextStyle(fontSize: 16),
                ),
                trailing: const Icon(Icons.chevron_right_outlined,
                    color: Color(0xfff7921f)),
                onTap: () {
                  Get.to(() => const ChangePassword());
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
