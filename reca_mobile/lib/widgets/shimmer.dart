import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class Skeleton extends StatelessWidget {
  const Skeleton({Key? key, this.width, this.height, this.radius})
      : super(key: key);

  final double? height, width, radius;

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: Colors.grey[500]!,
      highlightColor: Colors.grey[100]!,
      child: Container(
        height: height,
        width: width,
        padding: const EdgeInsets.all(8.0),
        decoration: BoxDecoration(
          color: Colors.black.withOpacity(0.3),
          borderRadius: const BorderRadius.all(Radius.circular(5)),
        ),
      ),
    );
  }
}

class CircleSkeleton extends StatelessWidget {
  const CircleSkeleton({Key? key, this.width, this.height}) : super(key: key);

  final double? height, width;

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: Colors.grey[500]!,
      highlightColor: Colors.grey[100]!,
      child: Container(
        height: height,
        width: width,
        padding: const EdgeInsets.all(8.0),
        decoration: BoxDecoration(
          color: Colors.black.withOpacity(0.3),
          borderRadius: const BorderRadius.all(Radius.circular(100)),
        ),
      ),
    );
  }
}

class FeedShimmer extends StatelessWidget {
  const FeedShimmer({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              CircleSkeleton(
                height: 50,
                width: 50,
              ),
              SizedBox(
                width: 5,
              ),
              Skeleton(
                width: 100,
              ),
              Expanded(child: SizedBox()),
              Skeleton(
                width: 60,
              )
            ],
          ),
          const SizedBox(
            height: 10,
          ),
          Skeleton(
            width: MediaQuery.of(context).size.width * .9,
          ),
          const SizedBox(
            height: 3,
          ),
          Skeleton(
            width: MediaQuery.of(context).size.width * .9,
          ),
          const SizedBox(
            height: 3,
          ),
          Skeleton(
            width: MediaQuery.of(context).size.width * .5,
          ),
          const SizedBox(
            height: 10,
          ),
          Skeleton(
            width: MediaQuery.of(context).size.width * .9,
            height: 170,
          ),
          const SizedBox(
            height: 20,
          ),
          Row(
            children: const [
              CircleSkeleton(height: 15, width: 15),
              SizedBox(
                width: 5,
              ),
              CircleSkeleton(height: 15, width: 15),
              Expanded(child: SizedBox()),
              CircleSkeleton(height: 15, width: 15),
            ],
          )
        ],
      ),
    );
  }
}

class ProductShimmer extends StatelessWidget {
  const ProductShimmer({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(left: 20, right: 20, top: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Skeleton(
                width: 80,
                height: 130,
              ),
              const SizedBox(
                width: 20,
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const SizedBox(
                    height: 20,
                  ),
                  Skeleton(
                    width: MediaQuery.of(context).size.width * .4,
                  ),
                  const SizedBox(
                    height: 3,
                  ),
                  Skeleton(
                    width: MediaQuery.of(context).size.width * .3,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Skeleton(
                    width: MediaQuery.of(context).size.width * .2,
                  ),
                ],
              )
            ],
          ),
        ],
      ),
    );
  }
}

class ProductShimmerHP extends StatelessWidget {
  const ProductShimmerHP({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.max,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Skeleton(height: 150, width: 100),
        SizedBox(
          height: 5,
        ),
        Skeleton(
          width: 90,
        ),
        SizedBox(
          height: 5,
        ),
        Skeleton(
          width: 84,
        ),
        SizedBox(
          height: 5,
        ),
        Skeleton(
          width: 80,
        ),
      ],
    );
  }
}

class ProductShimmerSP extends StatelessWidget {
  const ProductShimmerSP({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 260,
      width: 100,
      child: Column(
        mainAxisSize: MainAxisSize.max,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Skeleton(height: 150, width: 100),
          SizedBox(
            height: 5,
          ),
          Skeleton(
            width: 90,
          ),
          SizedBox(
            height: 5,
          ),
          Skeleton(
            width: 84,
          ),
          SizedBox(
            height: 5,
          ),
          Skeleton(
            width: 80,
          ),
        ],
      ),
    );
  }
}
