import 'package:flutter/material.dart';
import 'package:cresta_app/features/profile/widgets/request_verification_sheet.dart';
import 'package:cresta_app/main.dart'; // Para AppColors

// Modelo simple para los datos
class Skill {
  final String name;
  final bool isVerified;
  Skill({required this.name, required this.isVerified});
}

class ManageSkillsScreen extends StatefulWidget {
  const ManageSkillsScreen({super.key});

  @override
  State<ManageSkillsScreen> createState() => _ManageSkillsScreenState();
}

class _ManageSkillsScreenState extends State<ManageSkillsScreen> {
  // Movemos la lista de habilidades al estado del widget para poder modificarla
  final List<Skill> _skills = [
    Skill(name: 'Flutter', isVerified: true),
    Skill(name: 'Riverpod', isVerified: true),
    Skill(name: 'Firebase', isVerified: false),
    Skill(name: 'Project Management', isVerified: false),
    Skill(name: 'Node.js', isVerified: false),
  ];

  // --- FUNCIÓN PARA MOSTRAR EL MODAL DE SOLICITUD ---
  void _showRequestSheet(BuildContext context, String skillName) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return RequestVerificationSheet(skillName: skillName);
      },
    );
  }

  // --- FUNCIÓN PARA MOSTRAR EL DIÁLOGO DE AGREGAR HABILIDAD ---
  void _showAddSkillDialog(BuildContext context) {
    final skillNameController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Agregar Nueva Habilidad'),
          content: TextField(
            controller: skillNameController,
            autofocus: true,
            decoration: const InputDecoration(hintText: "Nombre de la habilidad"),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancelar'),
            ),
            ElevatedButton(
              onPressed: () {
                if (skillNameController.text.isNotEmpty) {
                  setState(() {
                    _skills.add(Skill(name: skillNameController.text, isVerified: false));
                  });
                  Navigator.of(context).pop();
                }
              },
              child: const Text('Agregar'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gestionar Habilidades'),
      ),
      body: ListView.separated(
        itemCount: _skills.length,
        separatorBuilder: (context, index) => const Divider(height: 1),
        itemBuilder: (context, index) {
          final skill = _skills[index];
          return ListTile(
            contentPadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
            leading: Icon(
              skill.isVerified ? Icons.verified : Icons.circle_outlined,
              color: skill.isVerified ? AppColors.mentaFresca : AppColors.grisMedio,
            ),
            title: Text(skill.name, style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text(
              skill.isVerified ? 'Verificada' : 'Pendiente de verificación',
              style: TextStyle(color: AppColors.grisMedio, fontSize: 12),
            ),
            trailing: skill.isVerified
                ? null
                : OutlinedButton(
                    onPressed: () => _showRequestSheet(context, skill.name),
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: AppColors.lavandaSuave),
                      foregroundColor: AppColors.lavandaSuave,
                    ),
                    child: const Text('Solicitar'),
                  ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showAddSkillDialog(context), // Ahora llama a la función del diálogo
        tooltip: 'Agregar una nueva habilidad',
        backgroundColor: AppColors.lavandaSuave,
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }
}