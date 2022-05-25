import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/screens/sign_in.dart';

class IntroPage extends StatelessWidget {
  const IntroPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SafeArea(
          child: Center(
        child: Column(
          children: [
            const SizedBox(
              height: 50,
            ),
            Image(
              image: const AssetImage('assets/images/rica splash.png'),
              width: MediaQuery.of(context).size.width * .6,
              height: 100,
            ),
            const SizedBox(
              height: 200,
            ),
            const Text(
              'WELCOME',
              style: TextStyle(
                fontWeight: FontWeight.normal,
                fontSize: 20,
                color: Color(0xfff7921f),
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            const Text(
              'Buy Products online',
              style: TextStyle(
                fontWeight: FontWeight.w500,
                fontSize: 20,
                color: Color(0xfff7921f),
              ),
            ),
            const SizedBox(
              height: 250,
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                  onPrimary: Colors.white,
                  primary: const Color(0xfff7921f),
                  minimumSize: const Size(175, 45),
                  maximumSize: const Size(175, 45),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(0)),
                  side: const BorderSide(
                    width: 2.0,
                    color: Color(0xfff7921f),
                  )),
              onPressed: () {
                Get.to(() => IntroPage1());
                print('intro page next button pressed');
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  SizedBox(width: 10),
                  Text(
                    'Next',
                    style: TextStyle(fontSize: 15),
                  ),
                  Icon(
                    Icons.arrow_forward,
                    size: 16,
                  ),
                ],
              ),
            ),
          ],
        ),
      )),
    );
  }
}

class IntroPage1 extends StatelessWidget {
  const IntroPage1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SafeArea(
          child: Center(
        child: Column(
          children: [
            const SizedBox(
              height: 50,
            ),
            Image(
              image: const AssetImage('assets/images/rica splash.png'),
              width: MediaQuery.of(context).size.width * .6,
              height: 100,
            ),
            const SizedBox(
              height: 200,
            ),
            const Text(
              'Sell Products online',
              style: TextStyle(
                fontWeight: FontWeight.w500,
                fontSize: 20,
                color: Color(0xfff7921f),
              ),
            ),
            const SizedBox(
              height: 292,
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                  onPrimary: Colors.white,
                  primary: const Color(0xfff7921f),
                  minimumSize: const Size(175, 45),
                  maximumSize: const Size(175, 45),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(0)),
                  side: const BorderSide(
                    width: 2.0,
                    color: Color(0xfff7921f),
                  )),
              onPressed: () {
                Get.to(() => GetStarted());
                print('Intro page one next button pressed');
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  SizedBox(width: 10),
                  Text(
                    'Next',
                    style: TextStyle(fontSize: 15),
                  ),
                  Icon(
                    Icons.arrow_forward,
                    size: 16,
                  )
                ],
              ),
            ),
          ],
        ),
      )),
    );
  }
}

class GetStarted extends StatelessWidget {
  const GetStarted({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SafeArea(
          child: Center(
        child: Column(
          children: [
            const SizedBox(
              height: 210,
            ),
            Container(
              width: MediaQuery.of(context).size.width * .35,
              height: 150,
              decoration: const BoxDecoration(
                  image: DecorationImage(
                image: AssetImage('assets/images/girl.png'),
                fit: BoxFit.fitWidth,
                alignment: FractionalOffset.topCenter,
              )),
            ),
            Image(
              image: const AssetImage('assets/images/rica splash.png'),
              width: MediaQuery.of(context).size.width * .6,
              height: 100,
            ),
            const SizedBox(
              height: 50,
            ),
            const Text(
              'Welcome',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 30,
                color: Colors.black,
              ),
            ),
            const SizedBox(
              height: 45,
            ),
            const Text(
              'From reca Technologies',
              style: TextStyle(
                fontWeight: FontWeight.w500,
                fontSize: 12,
                color: Colors.grey,
              ),
            ),
            const SizedBox(
              height: 63,
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                  onPrimary: Colors.white,
                  primary: const Color(0xfff7921f),
                  minimumSize: const Size(175, 45),
                  maximumSize: const Size(175, 45),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(0)),
                  side: const BorderSide(
                    width: 2.0,
                    color: Color(0xfff7921f),
                  )),
              onPressed: () {
                Get.off(() => SignIn());
                print('Get started button pressed');
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  SizedBox(width: 10),
                  Text(
                    'Get Started',
                    style: TextStyle(fontSize: 15),
                  ),
                  Icon(
                    Icons.arrow_forward,
                    size: 16,
                  )
                ],
              ),
            ),
          ],
        ),
      )),
    );
  }
}
