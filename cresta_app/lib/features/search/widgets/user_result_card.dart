import 'package:flutter/material.dart';
import 'package:cresta_app/features/profile/widgets/skill_chip.dart'; 
import 'package:cresta_app/main.dart'; 

class UserResultCard extends StatelessWidget {
  const UserResultCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shadowColor: AppColors.grisClaro,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const CircleAvatar(
                  radius: 25,
                  backgroundColor: AppColors.lavandaSuave,
                  child: Icon(Icons.person, color: Colors.white),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Jane Doe', // Dato de ejemplo
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Diseñadora UX Senior en Google', // Dato de ejemplo
                        style: TextStyle(color: AppColors.grisMedio),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const Divider(height: 24),
            const Text(
              'Habilidades destacadas:',
              style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.grisMedio),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8.0,
              runSpacing: 8.0,
              children: const [
                SkillChip(label: 'Diseño UX', isVerified: true),
                SkillChip(label: 'Figma', isVerified: true),
                SkillChip(label: 'React', isVerified: false),
              ],
            )
          ],
        ),
      ),
    );
  }
}