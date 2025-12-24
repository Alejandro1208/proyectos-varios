import 'package:flutter/material.dart';
import 'package:cresta_app/main.dart'; 

class SkillChip extends StatelessWidget {
  final String label;
  final bool isVerified;

  const SkillChip({
    super.key,
    required this.label,
    this.isVerified = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: isVerified ? AppColors.mentaFresca.withOpacity(0.15) : AppColors.grisMedio.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isVerified ? AppColors.mentaFresca : AppColors.grisMedio.withOpacity(0.2),
          width: 1,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (isVerified)
            Padding(
              padding: const EdgeInsets.only(right: 6.0),
              child: Icon(
                Icons.verified,
                size: 16,
                color: AppColors.mentaFresca,
              ),
            ),
          Text(
            label,
            style: TextStyle(
              color: isVerified ? AppColors.grisOscuro : AppColors.grisMedio,
              fontWeight: isVerified ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }
}