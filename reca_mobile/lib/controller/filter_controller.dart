import 'package:get/get.dart';

class FilterContoller extends GetxController {
  List selectedFilters = [].obs;

  void addFilter(String category) {
    selectedFilters.add(category);
    update();
  }

  void removeFilter(String category) {
    selectedFilters.remove(category);
    update();
  }
}
