// ignore_for_file: avoid_print

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_custom_clippers/flutter_custom_clippers.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/screens/sign_in.dart';
import 'package:reca_mobile/services/api_services.dart';

class SignUp extends StatefulWidget {
  const SignUp({Key? key}) : super(key: key);

  @override
  State<SignUp> createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  var nameController = TextEditingController();
  var phoneNoController = TextEditingController();
  var passwordController = TextEditingController();
  var passwordConfirmationController = TextEditingController();

  bool _isObscure = true;
  bool _isObscure2 = true;
  bool loading = false;

  void _setLoading(state) {
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
        // appBar: AppBar(
        //   elevation: 0,
        //   backgroundColor: Colors.white,
        // ),
        body: SingleChildScrollView(
          reverse: true,
          child: Center(
            child: Container(
              color: Colors.white,
              // height: MediaQuery.of(context).size.height,
              child: Form(
                key: _formKey,
                // autovalidateMode: AutovalidateMode.always,
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
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
                        'Register',
                        style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w600,
                            color: Color(0xfff7921f)),
                      ),
                      const SizedBox(
                        height: 25,
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width * .75,
                        child: TextFormField(
                          keyboardType: TextInputType.name,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Name can\'t be null';
                            }
                          },
                          controller: nameController,
                          cursorColor: Colors.black,
                          style: const TextStyle(
                            fontSize: 15,
                            height: 1.5,
                          ),
                          autocorrect: false,
                          decoration: InputDecoration(
                            contentPadding: const EdgeInsets.symmetric(
                                vertical: 10, horizontal: 15),
                            hintText: 'Name',
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
                          keyboardType: TextInputType.number,

                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Phone Number can\'t be null';
                            }
                          },
                          controller: phoneNoController,
                          // onChanged: (value) {
                          //   phoneNoController = value;
                          // },
                          cursorColor: Colors.black,
                          style: const TextStyle(
                            fontSize: 15,
                            height: 1.5,
                          ),
                          autocorrect: false,
                          decoration: InputDecoration(
                            contentPadding:
                                const EdgeInsets.symmetric(horizontal: 15),
                            hintText: 'Phone number',
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
                      SizedBox(
                        width: MediaQuery.of(context).size.width * .75,
                        child: TextFormField(
                          keyboardType: TextInputType.text,

                          obscureText: _isObscure,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Password can\'t be empty';
                            }
                          },
                          controller: passwordController,
                          // enabled: true,
                          // onChanged: (value) {
                          //   passwordController = value;
                          // },
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
                      SizedBox(
                        width: MediaQuery.of(context).size.width * .75,
                        child: TextFormField(
                          keyboardType: TextInputType.text,

                          obscureText: _isObscure2,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Password can\'t be empty';
                            }
                            // else if (value != passwordController.value) {
                            //   return 'Make sure both passwords are the same';
                            // }
                          },
                          controller: passwordConfirmationController,
                          // enabled: true,
                          // onChanged: (value) {
                          //   passwordController = value;
                          // },
                          cursorColor: Colors.black,
                          style: const TextStyle(
                            fontSize: 15,
                            height: 1.5,
                          ),
                          autocorrect: false,
                          decoration: InputDecoration(
                            suffixIcon: IconButton(
                                icon: Icon(
                                  _isObscure2
                                      ? Icons.visibility
                                      : Icons.visibility_off,
                                  color: Colors.grey,
                                ),
                                onPressed: () {
                                  setState(() {
                                    _isObscure2 = !_isObscure2;
                                  });
                                }),
                            contentPadding:
                                const EdgeInsets.symmetric(horizontal: 15),
                            hintText: 'Confirm Password',
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
                        height: 12,
                      ),
                      ElevatedButton(
                        child: loading
                            ? const CircularProgressIndicator()
                            : const Text(
                                'Sign Up',
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
                            )),
                        onPressed: () async {
                          final FormState? form = _formKey.currentState;
                          if (form!.validate()) {
                            _setLoading(true);
                            try {
                              var response = await ApiServices().registerUser(
                                  nameController.text,
                                  phoneNoController.text,
                                  passwordController.text);
                              _setLoading(false);

                              Get.snackbar(
                                  'Resgistrastion', 'Success! Please sign in',
                                  duration: const Duration(seconds: 5));
                              Get.off(() => SignIn());
                            } catch (e) {
                              _setLoading(false);
                              Get.snackbar('Resgistrastion',
                                  'Registration unsuccessful. $e',
                                  duration: const Duration(seconds: 5));
                            }
                          } else {
                            Get.snackbar('Validation',
                                'Please correct the data you entered and try again',
                                duration: const Duration(seconds: 5));
                          }
                        },
                      ),
                      const SizedBox(
                        height: 15,
                      ),
                      RichText(
                        text: TextSpan(
                            text: 'Already have an account?',
                            style: const TextStyle(
                                fontSize: 15, color: Colors.black),
                            children: [
                              const TextSpan(
                                  text: ' ',
                                  style: TextStyle(
                                      fontSize: 20, color: Colors.black)),
                              TextSpan(
                                recognizer: TapGestureRecognizer()
                                  ..onTap = () {
                                    Get.to(() => const SignIn());
                                  },
                                text: 'Login',
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
