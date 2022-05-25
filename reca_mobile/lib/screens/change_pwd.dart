import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/screens/main_page.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/app_bar.dart';

class ChangePassword extends StatefulWidget {
  const ChangePassword({Key? key}) : super(key: key);

  @override
  State<ChangePassword> createState() => _ChangePasswordState();
}

class _ChangePasswordState extends State<ChangePassword> {
  StorageController controller = Get.find<StorageController>();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  var passwordController = TextEditingController();
  var newPasswordController = TextEditingController();

  var passwordConfirmationController = TextEditingController();

  bool _isObscure = true;
  bool _isObscure2 = true;
  bool _isObscure3 = true;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
        child: Scaffold(
          resizeToAvoidBottomInset: true,
          backgroundColor: Colors.white,
          appBar: MyAppBar(
            height: 50,
            isBackButton: true,
            isSearchPage: false,
          ),
          body: SingleChildScrollView(
            child: Form(
              key: _formKey,
              autovalidateMode: AutovalidateMode.onUserInteraction,
              child: Container(
                  padding: const EdgeInsets.only(top: 20, left: 20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      const Align(
                        alignment: Alignment.center,
                        child: Text(
                          'Change Password',
                          style: TextStyle(
                              fontSize: 20, fontWeight: FontWeight.bold),
                        ),
                      ),
                      const SizedBox(
                        height: 15,
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
                            hintText: 'Previous Password',
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
                          },
                          controller: newPasswordController,
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
                            hintText: 'New Password',
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
                          controller: passwordConfirmationController,
                          obscureText: _isObscure3,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Password can\'t be empty';
                            }
                            if (value.toString() !=
                                newPasswordController.text.toString()) {
                              return 'Passwords must match';
                            }
                            // else if (value != passwordController.value) {
                            //   return 'Make sure both passwords are the same';
                            // }
                          },

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
                                  _isObscure3
                                      ? Icons.visibility
                                      : Icons.visibility_off,
                                  color: Colors.grey,
                                ),
                                onPressed: () {
                                  setState(() {
                                    _isObscure3 = !_isObscure3;
                                  });
                                }),
                            contentPadding:
                                const EdgeInsets.symmetric(horizontal: 15),
                            hintText: 'Confirm New Password',
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
                          if (form!.validate() &&
                              passwordController.text ==
                                  passwordConfirmationController.text) {
                            try {
                              var response = await ApiServices().changePassword(
                                  passwordConfirmationController.text);
                              Get.snackbar('Password',
                                  'Success! Password Changed Successfully',
                                  duration: const Duration(seconds: 5));
                            } catch (e) {
                              Get.snackbar('Password',
                                  'Password change unsuccessful. $e',
                                  duration: const Duration(seconds: 5));
                            }
                          } else {
                            Get.snackbar('Validation',
                                'Please correct the data you entered and try again',
                                duration: const Duration(seconds: 5));
                          }
                        },
                        child: const Text(
                          'Change Password',
                          style: TextStyle(fontSize: 17),
                        ),
                      ),
                      const SizedBox(
                        height: 12,
                      ),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            elevation: 0,
                            onPrimary: Colors.black,
                            primary: Colors.white,
                            minimumSize: const Size(290, 45),
                            maximumSize: const Size(290, 45),
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(32.0)),
                            side: const BorderSide(
                              width: 1.0,
                              color: Color(0xfff7921f),
                            )),
                        onPressed: () async {
                          Get.offAll(() => MainPage());
                          print('Cancel button pressed');
                        },
                        child: const Text(
                          'Cancel',
                          style: TextStyle(
                              fontSize: 17, fontWeight: FontWeight.w300),
                        ),
                      ),
                    ],
                  )),
            ),
          ),
        ));
  }
}
