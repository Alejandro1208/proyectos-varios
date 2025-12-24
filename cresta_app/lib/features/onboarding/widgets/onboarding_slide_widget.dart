import 'package:flutter/material.dart';

class OnboardingSlideWidget extends StatelessWidget {
  final String imageUrl;

  const OnboardingSlideWidget({
    super.key,
    required this.imageUrl,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        image: DecorationImage(
          image: NetworkImage(imageUrl),
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}