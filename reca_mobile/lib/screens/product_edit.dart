import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/storage_controller.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/app_bar.dart';

class ProductEdit extends StatefulWidget {
  const ProductEdit({Key? key}) : super(key: key);

  @override
  State<ProductEdit> createState() => _ProductEditState();
}

class _ProductEditState extends State<ProductEdit> {
  var argument = Get.arguments;
  StorageController controller = Get.find<StorageController>();

  @override
  void initState() {
    super.initState();
    getData();
  }

  TextEditingController priceContoller = TextEditingController();
  TextEditingController quantityContoller = TextEditingController();
  TextEditingController descContoller = TextEditingController();
  // TextEditingController conditionContoller = TextEditingController();
  var price;
  var desc;
  var quantity;
  void getData() async {
    price = argument.price;
    desc = argument.description;
    quantity = argument.quantity;

    // print('Profile Name ${price.toString()}');
    // print('Profile phone ${desc.toString()}');
    setState(() {
      priceContoller = TextEditingController(text: price.toString());
      quantityContoller = TextEditingController(text: quantity.toString());
      descContoller = TextEditingController(text: desc.toString());
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
          backgroundColor: Colors.white,
          appBar: MyAppBar(height: 50, isBackButton: true, isSearchPage: false),
          resizeToAvoidBottomInset: false,
          body: SingleChildScrollView(
            child: Container(
              height: MediaQuery.of(context).size.height,
              color: Colors.white,
              alignment: Alignment.center,
              padding: const EdgeInsets.all(40),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  const SizedBox(
                    height: 10,
                  ),
                  TextField(
                    controller: priceContoller,
                    autocorrect: false,
                    style: const TextStyle(
                      fontSize: 14,
                      height: 0.8,
                    ),
                    decoration: InputDecoration(
                      border: UnderlineInputBorder(
                        borderSide: BorderSide(
                          width: 0.5,
                          color: Colors.grey.withOpacity(0.5),
                        ),
                      ),
                      focusedBorder: UnderlineInputBorder(
                          borderSide: BorderSide(
                              width: 0.5,
                              color: const Color(0xfff7921f).withOpacity(0.7))),
                      label: const Text(
                        'Price',
                        style: TextStyle(color: Colors.grey),
                      ),
                      labelStyle: const TextStyle(
                        color: Colors.grey,
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  TextField(
                    controller: descContoller,
                    onEditingComplete: () {},
                    autocorrect: false,
                    style: const TextStyle(
                      fontSize: 14,
                      height: 1.2,
                    ),
                    decoration: InputDecoration(
                      border: UnderlineInputBorder(
                        borderSide: BorderSide(
                          width: 0.5,
                          color: Colors.grey.withOpacity(0.5),
                        ),
                      ),
                      focusedBorder: UnderlineInputBorder(
                          borderSide: BorderSide(
                              width: 0.5,
                              color: const Color(0xfff7921f).withOpacity(0.7))),
                      label: const Text(
                        'Description',
                        style: TextStyle(color: Colors.grey),
                      ),
                      labelStyle: const TextStyle(
                        color: Colors.grey,
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  TextField(
                    controller: quantityContoller,
                    autocorrect: false,
                    style: const TextStyle(
                      fontSize: 14,
                      height: 1.2,
                    ),
                    decoration: InputDecoration(
                      border: UnderlineInputBorder(
                        borderSide: BorderSide(
                          width: 0.5,
                          color: Colors.grey.withOpacity(0.5),
                        ),
                      ),
                      focusedBorder: UnderlineInputBorder(
                          borderSide: BorderSide(
                              width: 0.5,
                              color: const Color(0xfff7921f).withOpacity(0.7))),
                      label: const Text(
                        'Quantity',
                        style: TextStyle(color: Colors.grey),
                      ),
                      labelStyle: const TextStyle(
                        color: Colors.grey,
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  const SizedBox(
                    height: 30,
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      try {
                        var res = await ApiServices().editProduct(
                          argument.productid,
                          controller.id,
                          controller.jwt,
                          priceContoller.text.toString(),
                          descContoller.text.toString(),
                          quantityContoller.text.toString(),
                        );
                        Get.back();
                        Get.snackbar('Product', 'Product edited successfully',
                            duration: const Duration(seconds: 3));
                      } catch (e) {
                        Get.snackbar('Product', 'Product not edited, $e',
                            duration: const Duration(seconds: 5));
                      }
                    },
                    child: const Text(
                      'Save',
                      style: TextStyle(fontSize: 14),
                    ),
                    style: ElevatedButton.styleFrom(
                      elevation: 0,
                      onPrimary: Colors.white,
                      primary: const Color(0xfff7921f),
                      minimumSize: const Size(155, 45),
                      maximumSize: const Size(155, 45),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(1.0)),
                      // side: const BorderSide(
                      //   width: 0.3,
                      //   color: Colors.grey,
                      // ),
                    ),
                  ),
                ],
              ),
            ),
          )),
    );
  }
}
