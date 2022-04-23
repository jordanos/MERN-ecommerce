import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_custom_clippers/flutter_custom_clippers.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/screens/main_page.dart';
import 'package:reca_mobile/screens/sign_up.dart';
import 'package:reca_mobile/services/api_services.dart';

class SignIn extends StatefulWidget {
  const SignIn({Key? key}) : super(key: key);

  @override
  State<SignIn> createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController phoneController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  bool _isObscure = true;
  final storage = FlutterSecureStorage();

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        backgroundColor: Colors.white,
        resizeToAvoidBottomInset: true,
        // appBar: AppBar(
        //   elevation: 0,
        //   backgroundColor: Colors.white,
        //   // leading: const Icon(Icons.arrow_back_ios_new_outlined),
        // ),
        body: Form(
          key: _formKey,
          autovalidateMode: AutovalidateMode.onUserInteraction,
          child: SingleChildScrollView(
            reverse: true,
            child: Center(
              child: Container(
                color: Colors.white,
                height: MediaQuery.of(context).size.height,
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Stack(
                        alignment: Alignment.center,
                        children: [
                          ClipPath(
                            clipper: WaveClipperTwo(flip: true),
                            child: Container(
                              height: 300,
                              color: const Color(0xfffef0e6),
                            ),
                          ),
                          Positioned(
                            top: 100,
                            child: Container(
                              child: const Image(
                                  image: AssetImage(
                                      'assets/images/reca logo2.png')),
                              width: MediaQuery.of(context).size.width * .6,
                              height: 100,
                            ),
                          ),
                        ],
                      ),
                      const Text(
                        'Login',
                        style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w600,
                            color: Color(0xfff7921f)),
                      ),
                      const SizedBox(
                        height: 35,
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width * .75,
                        child: TextFormField(
                          keyboardType: TextInputType.number,
                          controller: phoneController,
                          cursorColor: Colors.black,
                          style: const TextStyle(
                            fontSize: 15,
                            height: 1.5,
                          ),
                          autocorrect: false,
                          decoration: InputDecoration(
                            contentPadding: const EdgeInsets.symmetric(
                                vertical: 10, horizontal: 15),
                            hintText: 'Phone Number',
                            border: OutlineInputBorder(
                              borderRadius:
                                  const BorderRadius.all(Radius.circular(50)),
                              borderSide: BorderSide(
                                width: 1,
                                color: Colors.grey.withOpacity(0.5),
                              ),
                            ),
                            focusedBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(50)),
                              borderSide: BorderSide(
                                width: 0.5,
                                color: Color(0xfff7921f),
                              ),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 8,
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width * .75,
                        child: TextFormField(
                          keyboardType: TextInputType.text,
                          obscureText: _isObscure,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'A valid password is required';
                            }
                          },
                          controller: passwordController,
                          cursorColor: Colors.black,
                          style: const TextStyle(
                            fontSize: 15,
                            height: 1.5,
                          ),
                          autocorrect: false,
                          decoration: InputDecoration(
                            suffixIcon: IconButton(
                                icon: Icon(
                                  _isObscure
                                      ? Icons.visibility
                                      : Icons.visibility_off,
                                  color: Colors.grey,
                                ),
                                onPressed: () {
                                  setState(() {
                                    _isObscure = !_isObscure;
                                  });
                                }),
                            contentPadding:
                                const EdgeInsets.symmetric(horizontal: 15),
                            hintText: 'Password',
                            border: OutlineInputBorder(
                              borderRadius:
                                  const BorderRadius.all(Radius.circular(50)),
                              borderSide: BorderSide(
                                width: 0.5,
                                color: Colors.grey.withOpacity(0.5),
                              ),
                            ),
                            focusedBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(50)),
                              borderSide: BorderSide(
                                width: 1,
                                color: Color(0xfff7921f),
                              ),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 8,
                      ),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          onPrimary: Colors.white,
                          primary: const Color(0xfff7921f),
                          minimumSize: const Size(290, 45),
                          maximumSize: const Size(290, 45),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(32.0)),
                          side: const BorderSide(
                            width: 2.0,
                            color: Color(0xfff7921f),
                          ),
                        ),
                        onPressed: () async {
                          print('Sign in button pressed');
                          var loginResponse = await ApiServices().logIn(
                              phoneController.text, passwordController.text);
                          if (loginResponse == null) {
                            Get.snackbar(
                              'Login Error',
                              'Can\'t login, Please check your information',
                              snackPosition: SnackPosition.TOP,
                              duration: const Duration(seconds: 5),
                            );
                          } else {
                            var jwt = loginResponse.token;
                            storage.write(key: "jwt", value: jwt);

                            storage.write(
                                key: 'name',
                                value: loginResponse.data[0].fullname);
                            storage.write(
                                key: 'id',
                                value: loginResponse.data[0].userid.toString());
                            storage.write(
                                key: 'phone',
                                value: loginResponse.data[0].phonenumber
                                    .toString());
                            // storage.write(
                            //     key: 'pass', value: loginResponse.data[0].password);
                            // storage.write(
                            //     key: 'address',
                            //     value: loginResponse.data[0].address);
                            storage.write(
                                key: 'ppic',
                                value: loginResponse.data[0].profileimage);
                            storage.write(
                                key: 'cpic',
                                value: loginResponse.data[0].coverimage);
                            Get.offAll(() => MainPage());
                          }
                        },
                        child: const Text(
                          'Sign in',
                          style: TextStyle(fontSize: 17),
                        ),
                      ),
                      const SizedBox(
                        height: 25,
                      ),
                      RichText(
                        text: TextSpan(
                            text: 'Forgot Password',
                            style: const TextStyle(
                                fontSize: 15, color: Color(0xfff7921f)),
                            children: [
                              const TextSpan(
                                  text: ' | ',
                                  style: TextStyle(
                                      fontSize: 20, color: Colors.black)),
                              TextSpan(
                                recognizer: TapGestureRecognizer()
                                  ..onTap = () {
                                    Get.to(() => const SignUp());
                                  },
                                text: 'Create an account',
                                style: const TextStyle(
                                    fontSize: 15, color: Color(0xfff7921f)),
                              )
                            ]),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      // ElevatedButton.icon(
                      //   style: ElevatedButton.styleFrom(
                      //     elevation: 0,
                      //     minimumSize: const Size(290, 50),
                      //     maximumSize: const Size(290, 50),
                      //     shape: RoundedRectangleBorder(
                      //         side: BorderSide(
                      //             width: 1,
                      //             color: Colors.grey.withOpacity(0.5)),
                      //         borderRadius: BorderRadius.circular(32.0)),
                      //   ),
                      //   onPressed: () {
                      //     print('Facebook sign in button pressed');
                      //   },
                      //   icon: FaIcon(
                      //     FontAwesomeIcons.facebook,
                      //     size: 30,
                      //   ),
                      //   // icon: const SizedBox(
                      //   //     width: 40,
                      //   //     height: 40,
                      //   //     child: Image(
                      //   //         image: AssetImage('assets/images/fb.png'))),
                      //   label: const Text('Sign in with Facebook'),
                      // ),
                      // const SizedBox(
                      //   height: 8,
                      // ),
                      // ElevatedButton.icon(
                      //   style: ElevatedButton.styleFrom(
                      //     elevation: 0,
                      //     minimumSize: const Size(290, 50),
                      //     maximumSize: const Size(290, 50),
                      //     shape: RoundedRectangleBorder(
                      //         side: BorderSide(
                      //             width: 1,
                      //             color: Colors.grey.withOpacity(0.5)),
                      //         borderRadius: BorderRadius.circular(32.0)),
                      //   ),
                      //   onPressed: () {
                      //     print('Google signin button pressed');
                      //   },
                      //   icon: FaIcon(
                      //     FontAwesomeIcons.google,
                      //     size: 30,
                      //   ),
                      //   // icon: SizedBox(
                      //   //     width: 28,
                      //   //     height: 28,
                      //   //     child: Image(
                      //   //         image: AssetImage('assets/images/google.png'))),
                      //   label: Text('Sign in with Google'),
                      // ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
