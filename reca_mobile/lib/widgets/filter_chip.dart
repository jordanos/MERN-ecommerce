import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reca_mobile/controller/filter_controller.dart';

class MyFilterChip extends StatefulWidget {
  final String chipName;
  final IconData chipIcon;

  MyFilterChip({Key? key, required this.chipName, required this.chipIcon})
      : super(key: key);

  @override
  _MyFilterChipState createState() => _MyFilterChipState();
}

class _MyFilterChipState extends State<MyFilterChip> {
  FilterContoller controller = Get.find<FilterContoller>();
  var _isSelected = false;
  @override
  Widget build(BuildContext context) {
    return FilterChip(
      showCheckmark: false,
      avatar: CircleAvatar(
        child: Icon(
          widget.chipIcon,
          size: 14,
          color: const Color(0xfff7921f),
        ),
      ),
      selected: _isSelected,
      padding: const EdgeInsets.all(10),
      shape: const StadiumBorder(
        side: BorderSide(color: Color(0xfff7921f)),
      ),
      backgroundColor: Colors.white,
      // disabledColor: Colors.transparent,
      selectedColor: const Color(0xfffef0e6),
      label: Text(
        widget.chipName,
        style: const TextStyle(
          fontSize: 11,
          color: Color(0xfff7921f),
        ),
      ),
      onSelected: (isSelected) {
        isSelected
            ? controller.addFilter(widget.chipName.toLowerCase())
            : controller.removeFilter(widget.chipName.toLowerCase());
        print(isSelected.toString());
        setState(() {
          _isSelected = isSelected;
        });
      },
      pressElevation: 2,
    );
  }
}
