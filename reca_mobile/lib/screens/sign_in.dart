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
  bool loading = false;

  bool _isObscure = true;
  final storage = FlutterSecureStorage();

  void _setLoading(bool state) {
    setState(() {
      loading = state;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        backgroundColor: Colors.white,
        resizeToAvoidBottomInset: true,
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
                            top: 80,
                            child: Container(
                              child: const Image(
                                  image: AssetImage(
                                      'assets/images/rica logo.png')),
                              width: MediaQuery.of(context).size.width * .9,
                              height: 150,
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
                        child: loading
                            ? const CircularProgressIndicator()
                            : const Text(
                                'Sign in',
                                style: TextStyle(fontSize: 17),
                              ),
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
                          _setLoading(true);
                          try {
                            var loginResponse = await ApiServices().logIn(
                                phoneController.text, passwordController.text);
                            storage.write(
                                key: "jwt", value: loginResponse.token);
                            storage.write(
                                key: 'name',
                                value: loginResponse.user.fullname);
                            storage.write(
                                key: 'id', value: loginResponse.user.userid);
                            storage.write(
                                key: 'phone',
                                value: loginResponse.user.phonenumber);
                            storage.write(
                                key: 'ppic',
                                value: loginResponse.user.profileimage);
                            storage.write(
                                key: 'cpic',
                                value: loginResponse.user.coverimage);
                            Get.offAll(() => MainPage());
                            _setLoading(false);
                          } catch (e) {
                            _setLoading(false);
                            Get.snackbar(
                              'Login Error',
                              '$e',
                              snackPosition: SnackPosition.TOP,
                              duration: const Duration(seconds: 5),
                            );
                          }
                        },
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
