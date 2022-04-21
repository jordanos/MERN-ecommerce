










          // DefaultTabController(
          //   length: 2,
          //   child: NestedScrollView(
          //   headerSliverBuilder: (context, _) {
          //   return [
          //     SliverList(
          //       delegate: SliverChildListDelegate(
          //         [
          //           Stack(
          //             clipBehavior: Clip.none,
          //             alignment: Alignment.center,
          //             children: [
          //               const SizedBox(
          //                 height: 10,
          //               ),
          //               Container(
          //                 margin: const EdgeInsets.only(bottom: 15),
          //                 height: 120,
          //                 child: Image.network(
          //                   data!.data.coverimage,
          //                   errorBuilder:
          //                       (context, exception, stacktrace) {
          //                     return Image.asset(
          //                       'assets/images/grey.jpg',
          //                       width:
          //                           MediaQuery.of(context).size.width,
          //                       fit: BoxFit.fitWidth,
          //                     );
          //                   },
          //                   width: MediaQuery.of(context).size.width,
          //                   height: 120,
          //                   fit: BoxFit.fitWidth,
          //                 ),
          //               ),
          //               Positioned(
          //                 top: 105,
          //                 child: CircleAvatar(
          //                   backgroundImage:
          //                       NetworkImage(data.data.profileimage),
          //                   // onBackgroundImageError: (exception, stackTrace) =>
          //                   //     Center(child: Text('data')),
          //                   radius: 30,
          //                 ),
          //               ),
          //             ],
          //           ),
          //           Flexible(
          //             flex: 1,
          //             child: Container(
          //               width: MediaQuery.of(context).size.width,
          //               padding: const EdgeInsets.only(
          //                 top: 30,
          //               ),
          //               // color: Colors.grey,
          //               child: Column(
          //                 children: [
          //                   const SizedBox(
          //                     height: 10,
          //                   ),
          //                   Text(
          //                     data.data.fullname,
          //                     style: const TextStyle(
          //                         fontSize: 18,
          //                         fontWeight: FontWeight.bold),
          //                   ),
          //                   const SizedBox(
          //                     height: 15,
          //                   ),
          //                   FutureBuilder<ProfileByIdWithFollower>(
          //                       future: ApiServices()
          //                           .getUserByIdWithFollowStatus(
          //                               controller.id, pId),
          //                       builder: (context, snapshot) {
          //                         final data = snapshot.data;

          //                         if (snapshot.connectionState ==
          //                             ConnectionState.waiting) {
          //                           return const CircularProgressIndicator
          //                               .adaptive(
          //                             backgroundColor:
          //                                 Color(0xfff7921f),
          //                           );
          //                         } else if (snapshot
          //                                 .connectionState ==
          //                             ConnectionState.done) {
          //                           var isFollowing =
          //                               data!.data.isfollowing;
          //                           return SizedBox(
          //                             height: 50,
          //                             child: Row(
          //                                 mainAxisAlignment:
          //                                     MainAxisAlignment
          //                                         .spaceAround,
          //                                 children: [
          //                                   Column(
          //                                     mainAxisAlignment:
          //                                         MainAxisAlignment
          //                                             .center,
          //                                     children: [
          //                                       Text(
          //                                         data.data.product
          //                                             .toString(),
          //                                         style: const TextStyle(
          //                                             fontSize: 20,
          //                                             fontWeight:
          //                                                 FontWeight
          //                                                     .bold),
          //                                       ),
          //                                       const Text(
          //                                         'Products',
          //                                         style: TextStyle(
          //                                             fontSize: 11),
          //                                       ),
          //                                     ],
          //                                   ),
          //                                   Column(
          //                                     mainAxisAlignment:
          //                                         MainAxisAlignment
          //                                             .center,
          //                                     children: [
          //                                       Text(
          //                                         data.data.post
          //                                             .toString(),
          //                                         style: const TextStyle(
          //                                             fontSize: 20,
          //                                             fontWeight:
          //                                                 FontWeight
          //                                                     .bold),
          //                                       ),
          //                                       const Text(
          //                                         'Posts',
          //                                         style: TextStyle(
          //                                             fontSize: 11),
          //                                       ),
          //                                     ],
          //                                   ),
          //                                   Column(
          //                                     mainAxisAlignment:
          //                                         MainAxisAlignment
          //                                             .center,
          //                                     children: [
          //                                       Text(
          //                                         data.data.follower
          //                                             .toString(),
          //                                         style: const TextStyle(
          //                                             fontSize: 20,
          //                                             fontWeight:
          //                                                 FontWeight
          //                                                     .bold),
          //                                       ),
          //                                       const Text(
          //                                         'Followers',
          //                                         style: TextStyle(
          //                                             fontSize: 11),
          //                                       ),
          //                                     ],
          //                                   ),
          //                                   Column(
          //                                     mainAxisAlignment:
          //                                         MainAxisAlignment
          //                                             .center,
          //                                     children: [
          //                                       Text(
          //                                         data.data.following
          //                                             .toString(),
          //                                         style: const TextStyle(
          //                                             fontSize: 20,
          //                                             fontWeight:
          //                                                 FontWeight
          //                                                     .bold),
          //                                       ),
          //                                       const Text(
          //                                         'Following',
          //                                         style: TextStyle(
          //                                             fontSize: 11),
          //                                       ),
          //                                     ],
          //                                   ),
          //                                 ]),
          //                           );
          //                         } else {
          //                           return const Center(
          //                             child: Text(
          //                                 'There seems to be a problem'),
          //                           );
          //                         }
          //                       }),
          //                   const SizedBox(
          //                     height: 15,
          //                   ),
          //                   Row(
          //                     mainAxisAlignment:
          //                         MainAxisAlignment.spaceEvenly,
          //                     children: [
          //                       data.data.isfollowing
          //                           ? ElevatedButton(
          //                               onPressed: () async {
          //                                 // setState(() {
          //                                 //   isFollowing = false;
          //                                 // });
          //                                 var res =
          //                                     await ApiServices()
          //                                         .unfollowUser(
          //                                             controller.id,
          //                                             controller.jwt,
          //                                             data.data
          //                                                 .userid);

          //                                 if (res.status == 200) {
          //                                   setState(() {
          //                                     userProfileFuture =
          //                                         ApiServices()
          //                                             .getUserByIdWithFollowStatus(
          //                                                 controller
          //                                                     .id,
          //                                                 data.data
          //                                                     .userid);
          //                                   });
          //                                 } else {
          //                                   Get.snackbar('Follow',
          //                                       'Something went wrong, please try again');
          //                                 }
          //                               },
          //                               child: const Text(
          //                                 'UNFOLLOW',
          //                                 style: TextStyle(
          //                                   fontSize: 10,
          //                                   fontWeight:
          //                                       FontWeight.w600,
          //                                 ),
          //                               ),
          //                               style:
          //                                   ElevatedButton.styleFrom(
          //                                 elevation: 0,
          //                                 onPrimary: Colors.grey[800],
          //                                 primary: Colors.transparent,
          //                                 minimumSize:
          //                                     const Size(90, 35),
          //                                 maximumSize:
          //                                     const Size(90, 35),
          //                                 shape:
          //                                     RoundedRectangleBorder(
          //                                         borderRadius:
          //                                             BorderRadius
          //                                                 .circular(
          //                                                     5)),
          //                                 side: const BorderSide(
          //                                   width: 0.5,
          //                                   color: Colors.grey,
          //                                 ),
          //                               ),
          //                             )
          //                           : ElevatedButton(
          //                               onPressed: () async {
          //                                 // setState(() {
          //                                 //   isFollowing = true;
          //                                 // });

          //                                 var res =
          //                                     await ApiServices()
          //                                         .followUser(
          //                                             controller.id,
          //                                             controller.jwt,
          //                                             data.data
          //                                                 .userid);

          //                                 if (res.status == 200) {
          //                                   setState(() {
          //                                     userProfileFuture =
          //                                         ApiServices()
          //                                             .getUserByIdWithFollowStatus(
          //                                                 controller
          //                                                     .id,
          //                                                 data.data
          //                                                     .userid);
          //                                   });
          //                                 } else {
          //                                   Get.snackbar('Follow',
          //                                       'Something went wrong, please try again');
          //                                 }
          //                               },
          //                               child: const Text(
          //                                 'FOLLOW',
          //                                 style: TextStyle(
          //                                   fontSize: 10,
          //                                   fontWeight:
          //                                       FontWeight.w600,
          //                                 ),
          //                               ),
          //                               style:
          //                                   ElevatedButton.styleFrom(
          //                                 elevation: 0,
          //                                 onPrimary: Colors.white,
          //                                 primary:
          //                                     const Color(0xfff7921f),
          //                                 minimumSize:
          //                                     const Size(90, 35),
          //                                 maximumSize:
          //                                     const Size(90, 35),
          //                                 shape:
          //                                     RoundedRectangleBorder(
          //                                         borderRadius:
          //                                             BorderRadius
          //                                                 .circular(
          //                                                     5)),
          //                               ),
          //                             ),
          //                       FutureBuilder<
          //                               List<AllConversationNew>>(
          //                           future: ApiServices()
          //                               .createNewCoversation(
          //                                   controller.id,
          //                                   data.data.userid),
          //                           builder: (context, snapshot) {
          //                             if (snapshot.hasData) {
          //                               // print(
          //                               //     'Product detail page text future output: ${snapshot.data!}');
          //                               var data = snapshot.data![0];

          //                               var finalId;
          //                               data.senderid.toString() ==
          //                                       controller.id
          //                                           .toString()
          //                                   ? finalId = data.reciverid
          //                                   : finalId = data.senderid;
          //                               return ElevatedButton(
          //                                 onPressed: () {
          //                                   Get.to(
          //                                       () => MessagePage(),
          //                                       arguments: [
          //                                         data.conversationid,
          //                                         finalId
          //                                       ]);
          //                                 },
          //                                 child: const Text(
          //                                   'MESSAGE',
          //                                   style: TextStyle(
          //                                     fontSize: 10,
          //                                     fontWeight:
          //                                         FontWeight.w600,
          //                                   ),
          //                                 ),
          //                                 style: ElevatedButton
          //                                     .styleFrom(
          //                                   elevation: 0,
          //                                   onPrimary: Colors.black,
          //                                   primary: Colors.white,
          //                                   minimumSize:
          //                                       const Size(90, 35),
          //                                   maximumSize:
          //                                       const Size(90, 35),
          //                                   shape:
          //                                       RoundedRectangleBorder(
          //                                           borderRadius:
          //                                               BorderRadius
          //                                                   .circular(
          //                                                       5)),
          //                                   side: const BorderSide(
          //                                     width: 0.5,
          //                                     color: Colors.grey,
          //                                   ),
          //                                 ),
          //                               );
          //                             } else {
          //                               return Skeleton(
          //                                 width: 95,
          //                                 height: 35,
          //                               );
          //                             }
          //                           }),
          //                       ElevatedButton(
          //                         onPressed: () {
          //                           launch(
          //                               'tel://+251${data.data.phonenumber.toString()}');
          //                         },
          //                         child: const Text(
          //                           'CALL',
          //                           style: TextStyle(
          //                             fontSize: 10,
          //                             fontWeight: FontWeight.w600,
          //                           ),
          //                         ),
          //                         style: ElevatedButton.styleFrom(
          //                           elevation: 0,
          //                           onPrimary: Colors.black,
          //                           primary: Colors.white,
          //                           minimumSize: const Size(90, 35),
          //                           maximumSize: const Size(90, 35),
          //                           shape: RoundedRectangleBorder(
          //                               borderRadius:
          //                                   BorderRadius.circular(5)),
          //                           side: const BorderSide(
          //                             width: 0.5,
          //                             color: Colors.grey,
          //                           ),
          //                         ),
          //                       ),
          //                     ],
          //                   ),
          //                 ],
          //               ),
          //             ),
          //           );
          //         ],
          //       ),
          //     ),
          //   ];
          // },
          //   body: Column(
          //   children: <Widget>[
          //     Material(
          //       color: Colors.white,
          //       child: TabBar(
          //         labelColor: Colors.black,
          //         unselectedLabelColor: Colors.grey[400],
          //         indicatorWeight: 1,
          //         indicatorColor: Colors.black,
          //         tabs: [
          //           Tab(
          //             icon: Icon(
          //               Icons.grid_on_sharp,
          //               color: Colors.black,
          //             ),
          //           ),
          //           Tab(
          //             icon: Image.asset(
          //               'assets/icons/igtv.png',
          //               height: 30,
          //               width: 30,
          //             ),
          //           ),
          //           Tab(
          //             icon: Image.asset(
          //               'assets/icons/reels.png',
          //               height: 25,
          //               width: 25,
          //             ),
          //           ),
          //         ],
          //       ),
          //     ),
          //     Expanded(
          //       child: TabBarView(
          //         children: [
          //          FeedById(
          //                                     userId: data.data.userid,
          //                                     controller: scrollController),
          //                                 ProductById(
          //                                     userId: data.data.userid,
          //                                     controller: scrollController),
          //         ],
          //       ),
          //     ),
          //   ],
          // ),),
          // );