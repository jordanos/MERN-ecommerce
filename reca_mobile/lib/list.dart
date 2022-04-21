import 'package:flutter/material.dart';

List labels = [
  {
    'text': 'All',
    'icon': Icons.category_outlined,
    'iconcolor': const Color(0xfff7921f),
    'bgcolor': const Color(0xfffef0e6),
    'category': 'all',
  },
  {
    'text': 'Sports',
    'icon': Icons.sports_basketball_outlined,
    'iconcolor': const Color(0xffe0466c),
    'bgcolor': const Color(0xfffee6ec),
    'category': 'sports',
  },
  {
    'text': 'Gaming',
    'icon': Icons.gamepad_outlined,
    'iconcolor': const Color(0xff5633ed),
    'bgcolor': const Color(0xffedeafe),
    'category': 'phone',
  },
  {
    'text': 'Computers',
    'icon': Icons.computer_outlined,
    'iconcolor': const Color(0xff36cd70),
    'bgcolor': const Color(0xffd1f6e4),
    'category': 'dress',
  },
  {
    'text': 'Automotives',
    'icon': Icons.car_repair_outlined,
    'iconcolor': const Color(0xff1ca5eb),
    'bgcolor': const Color(0xffe7f7fe),
    'category': 'shoes',
  },
];

// {
//   'text': 'Notification',
//   'icon': Icons.notifications_none_outlined,
//   'iconcolor': const Color(0xffe0466c),
//   'bgcolor': const Color(0xfffee6ec),
//   'following': Switch(
//     activeColor: const Color(0xfff7921f),
//     value: true,
//     onChanged: (value) {},
//   ),
// },
List profile1 = [
  {
    'text': 'My Feed',
    'icon': Icons.feed_outlined,
    'iconcolor': const Color(0xfff7921f),
    'bgcolor': const Color(0xfffef0e6),
    'following': const Icon(Icons.chevron_right_outlined),
  },
  {
    'text': 'Wallet',
    'icon': Icons.wallet_giftcard_outlined,
    'iconcolor': const Color(0xff36cd70),
    'bgcolor': const Color(0xffd1f6e4),
    'following': const Icon(Icons.chevron_right_outlined),
  },
  {
    'text': 'Security',
    'icon': Icons.lock_outline,
    'iconcolor': const Color(0xff5633ed),
    'bgcolor': const Color(0xffedeafe),
    'following': const Icon(Icons.chevron_right_outlined),
  },
  {
    'text': 'Help',
    'icon': Icons.help_outline_outlined,
    'iconcolor': const Color(0xff1ca5eb),
    'bgcolor': const Color(0xffe7f7fe),
    'following': const Icon(Icons.chevron_right_outlined),
  },
  {
    'text': 'About',
    'icon': Icons.info_outline,
    'iconcolor': Colors.grey[200],
    'bgcolor': Colors.grey[400],
    'following': const Icon(Icons.chevron_right_outlined),
  },
  {
    'text': 'Logout',
    'icon': Icons.logout_outlined,
    'iconcolor': Colors.red[400],
    'bgcolor': Colors.red[50],
    'following': const Icon(Icons.chevron_right_outlined),
  }
];

List package = [
  {
    'text': 'MEMBERSHIP FREE PLAN',
    'plan': 'FREE',
    'color': const Color(0xfff7921f),
    'bgcolor': const Color(0xfffef0e6),
  },
  {
    'text': 'MEMBERSHIP FOR 1 WEEK PLAN',
    'plan': '100 ETB',
    'color': const Color(0xffe0466c),
    'bgcolor': const Color(0xfffee6ec),
  },
  {
    'text': 'MEMBERSHIP FOR 1 MONTH PLAN',
    'plan': '3000 ETB',
    'color': const Color(0xff36cd70),
    'bgcolor': const Color(0xffd1f6e4),
  },
  {
    'text': 'MEMBERSHIP FOR 1 YEAR PLAN',
    'plan': '10000 ETB',
    'color': const Color(0xff5633ed),
    'bgcolor': const Color(0xffedeafe),
  },
];

List filter = [
  {
    'text': 'Electronics',
    'icon': Icons.laptop_chromebook_outlined,
    'ontap': () {},
  },
  {
    'text': 'Toys',
    'icon': Icons.toys_outlined,
    'ontap': () {},
  },
  {
    'text': 'Pet',
    'icon': Icons.pets_outlined,
    'ontap': () {},
  },
  {
    'text': 'Shoes',
    'icon': Icons.ice_skating_outlined,
    'ontap': () {},
  },
  {
    'text': 'Sports',
    'icon': Icons.sports_basketball_outlined,
    'ontap': () {},
  },
  {
    'text': 'Cloth',
    'icon': Icons.shopping_cart_rounded,
    'ontap': () {},
  },
  {
    'text': 'Furniture',
    'icon': Icons.handyman_outlined,
    'ontap': () {},
  },
];
