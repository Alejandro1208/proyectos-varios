import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:cresta_app/main.dart';
class AppLogo extends StatelessWidget {
  final double? height;
  final Color? color;

  const AppLogo({
    super.key,
    this.height,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return SvgPicture.asset(
      'assets/images/logo.svg',
      height: height,
      colorFilter: ColorFilter.mode(
        color ?? AppColors.lavandaSuave,
        BlendMode.srcIn,
      ),
      placeholderBuilder: (BuildContext context) => const SizedBox.shrink(),
    );
  }
}