import 'package:flutter/material.dart';
import 'package:cresta_app/main.dart';

class PageIndicatorWidget extends StatelessWidget {
  final int pageCount;
  final int currentPage;

  const PageIndicatorWidget({
    super.key,
    required this.pageCount,
    required this.currentPage,
  });

  Widget _buildIndicator(bool isActive) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 150),
      margin: const EdgeInsets.symmetric(horizontal: 4.0),
      height: 8.0,
      width: isActive ? 24.0 : 8.0,
      decoration: BoxDecoration(
        color: isActive ? AppColors.lavandaSuave : AppColors.grisMedio.withOpacity(0.5),
        borderRadius: const BorderRadius.all(Radius.circular(12)),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> indicators = [];
    for (int i = 0; i < pageCount; i++) {
      indicators.add(_buildIndicator(i == currentPage));
    }
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: indicators,
    );
  }
}