import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/models/category_list.dart';
import 'package:reca_mobile/models/product_response_model.dart';
import 'package:reca_mobile/screens/product_detail.dart';
import 'package:reca_mobile/services/api_services.dart';
import 'package:reca_mobile/widgets/app_bar.dart';
import 'package:reca_mobile/widgets/rating.dart';
import 'package:reca_mobile/widgets/shimmer.dart';

class CategoryPage extends StatefulWidget {
  dynamic category;
  CategoryPage({Key? key, required this.category}) : super(key: key);

  @override
  _CategoryPageState createState() => _CategoryPageState();
}

class _CategoryPageState extends State<CategoryPage> {
  dynamic category;
  String? init;
  String categoryController = '';
  late List<String> categoryList;
  late List<CategoryData> future;

  @override
  void initState() {
    getCategoryList();
    // TODO: implement initState
    super.initState();
    setState(() {
      category = widget.category;
    });
  }

  getCategoryList() async {
    future = await ApiServices().getCategoryList();
    if (future.isEmpty) {
      categoryList.add('No Categories to display');
    } else {
      for (var item in future) {
        categoryList.add(item.category);
      }
    }
  }

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
          // height: MediaQuery.of(context).size.height,
          color: Colors.white,
          padding: const EdgeInsets.only(
            // left: 10,
            top: 10,
            right: 20,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.end,
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Padding(
                    padding: EdgeInsets.only(
                      left: 20,
                      bottom: 10,
                    ),
                    child: Text(
                      'Category         ',
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.w500),
                    ),
                  ),
                  FutureBuilder(
                      future: ApiServices().getCategoryList(),
                      builder: (context, snapshot) {
                        switch (snapshot.connectionState) {
                          case ConnectionState.none:
                            return Container();
                          case ConnectionState.waiting:
                            return const Center(
                                child: CircularProgressIndicator());
                          case ConnectionState.active:
                            return Container();
                          case ConnectionState.done:
                            if (snapshot.hasError) {
                              return Container();
                            } else {
                              return SizedBox(
                                height: 40,
                                width: MediaQuery.of(context).size.width / 2,
                                child: DropdownButton<String>(
                                  elevation: 0,
                                  iconSize: 26,
                                  isExpanded: true,
                                  hint: init == null
                                      ? const Text(
                                          'Select Category',
                                          style: TextStyle(color: Colors.grey),
                                        )
                                      : null,
                                  value: init,
                                  items: categoryList.map((String value) {
                                    return DropdownMenuItem<String>(
                                      value: value,
                                      child: Text(
                                        value,
                                        style: const TextStyle(
                                            color: Colors.black),
                                      ),
                                    );
                                  }).toList(),
                                  onChanged: (newValue) {
                                    setState(() {
                                      init = newValue;
                                      categoryController =
                                          newValue.toString().toLowerCase();
                                      category = categoryController;
                                    });
                                  },
                                ),
                              );
                            }
                        }
                      })
                ],
              ),
              Expanded(
                child: getProductByCategory(category: category),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class getProductByCategory extends StatelessWidget {
  const getProductByCategory({
    Key? key,
    required this.category,
  }) : super(key: key);

  final category;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<ProductData>>(
      future: ApiServices().getProductsByCategory(category),
      builder: (context, snapshot) {
        final data = snapshot.data;
        if (snapshot.data == null) {
          return SizedBox(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height,
            child: const Center(
              child: CircularProgressIndicator.adaptive(
                backgroundColor: Color(0xfff7921f),
              ),
            ),
          );
        } else {
          // print('Category product data ${(data!).toString()}');
          final orientation = MediaQuery.of(context).orientation;
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Container(
              margin: const EdgeInsets.only(left: 20),
              child: GridView.builder(
                  physics: const ScrollPhysics(),
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount:
                          (orientation == Orientation.portrait) ? 3 : 4,
                      mainAxisSpacing: 10,
                      crossAxisSpacing: 0,
                      childAspectRatio: 1 / 2),
                  itemBuilder: (context, index) => const ProductShimmerSP(),
                  itemCount: 7),
            );
          } else if (snapshot.connectionState == ConnectionState.none) {
            return Center(
              child: SizedBox(
                // height: 240,
                width: MediaQuery.of(context).size.width,
                child: const Text('Server Error'),
              ),
            );
          } else if (snapshot.connectionState == ConnectionState.done) {
            if (snapshot.hasData) {
              // print('snapshot has data data category: ${snapshot.data}');
              return GridView.builder(
                  shrinkWrap: false,
                  physics: const ScrollPhysics(),
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount:
                          (orientation == Orientation.portrait) ? 3 : 4,
                      mainAxisSpacing: 0,
                      crossAxisSpacing: 5,
                      childAspectRatio: 1 / 2),
                  itemCount: data!.length,
                  itemBuilder: (context, index) {
                    var productData = data[index];

                    return GestureDetector(
                      onTap: () {
                        print(snapshot.data);
                        Get.to(() => ProductDetail(), arguments: [productData]);
                      },
                      child: Container(
                        width: 100,
                        margin: const EdgeInsets.only(left: 20),
                        // alignment: Alignment,
                        child: Column(
                          // mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Container(
                              width: 100,
                              height: 150,
                              decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(10),
                                  border: Border.all(
                                    width: 1,
                                    color: Colors.white30,
                                  ),
                                  image: DecorationImage(
                                      fit: BoxFit.cover,
                                      image:
                                          NetworkImage(productData.image[0]))),
                            ),
                            const SizedBox(
                              height: 8,
                            ),
                            SizedBox(
                              width: 155,
                              child: Text(
                                productData.name,
                                maxLines: 1,
                                style: const TextStyle(fontSize: 15),
                              ),
                            ),
                            const SizedBox(
                              height: 2,
                            ),
                            StarRating(
                              rating: productData.rate == null
                                  ? 0
                                  : productData.rate.toDouble(),
                            ),
                            const SizedBox(
                              height: 2,
                            ),
                            Row(
                              children: [
                                Text(
                                  productData.price.toString(),
                                  style: const TextStyle(
                                    color: Colors.black,
                                    fontSize: 18,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                                const Text(' '),
                                const Text('ETB',
                                    textAlign: TextAlign.right,
                                    style: TextStyle(
                                        fontSize: 10,
                                        fontWeight: FontWeight.normal)),
                              ],
                            ),
                          ],
                        ),
                      ),
                    );
                  });
            } else {
              return Container(
                margin: const EdgeInsets.only(left: 20),
                child: GridView.builder(
                    physics: const ScrollPhysics(),
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount:
                            (orientation == Orientation.portrait) ? 3 : 4,
                        mainAxisSpacing: 0,
                        crossAxisSpacing: 5,
                        childAspectRatio: 1 / 2),
                    itemBuilder: (context, index) => const ProductShimmerSP(),
                    itemCount: 7),
              );
            }
          } else {
            return const Center(child: (Text('Error')));
          }
        }
      },
    );
  }
}
