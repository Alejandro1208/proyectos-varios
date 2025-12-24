import 'package:flutter/material.dart';
import 'package:cresta_app/main.dart';
import 'package:cresta_app/features/profile/profile_screen.dart'; 

class ValidatorsSheet extends StatelessWidget {
  final VerifiedSkill skill;

  const ValidatorsSheet({
    super.key,
    required this.skill,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Validado por:',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
          ),
          Text(
            'Personas que pueden dar fe de tu habilidad en "${skill.name}"',
            style: const TextStyle(color: AppColors.grisMedio, fontSize: 16),
          ),
          const Divider(height: 32),
          Flexible(
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: skill.validators.length,
              itemBuilder: (context, index) {
                final validator = skill.validators[index];
                return ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: CircleAvatar(
                    radius: 25,
                    backgroundImage: NetworkImage(validator.imageUrl),
                  ),
                  title: Text(validator.name, style: const TextStyle(fontWeight: FontWeight.bold)),
                  subtitle: const Text('Senior Developer @ Tech Corp'),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}