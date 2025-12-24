import 'package:flutter/material.dart';
import 'package:cresta_app/main.dart';
import 'package:cresta_app/features/profile/profile_screen.dart'; 

class EditProfileScreen extends StatefulWidget {

  final String currentBannerUrl;
  final String currentProfileUrl;
  final String currentName;
  final String currentTitle;
  final String currentLocation;
  final String currentBio;
  final String currentAvailability;
  final String currentEmail;
  final String currentWebsite;
  
  const EditProfileScreen({
    super.key,
    required this.currentBannerUrl,
    required this.currentProfileUrl,
    required this.currentName,
    required this.currentTitle,
    required this.currentLocation,
    required this.currentBio,
    required this.currentAvailability,
    required this.currentEmail,
    required this.currentWebsite,
  });

  @override
  State<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  late final TextEditingController _nameController;
  late final TextEditingController _titleController;
  late final TextEditingController _locationController;
  late final TextEditingController _bioController;
  late final TextEditingController _availabilityController;
  late final TextEditingController _emailController;
  late final TextEditingController _websiteController;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.currentName);
    _titleController = TextEditingController(text: widget.currentTitle);
    _locationController = TextEditingController(text: widget.currentLocation);
    _bioController = TextEditingController(text: widget.currentBio);
    _availabilityController = TextEditingController(text: widget.currentAvailability);
    _emailController = TextEditingController(text: widget.currentEmail);
    _websiteController = TextEditingController(text: widget.currentWebsite);
  }

  @override
  void dispose() {
    _nameController.dispose();
    _titleController.dispose();
    _locationController.dispose();
    _bioController.dispose();
    _availabilityController.dispose();
    _emailController.dispose();
    _websiteController.dispose();
    super.dispose();
  }

  void _saveChanges() {
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Editar Perfil'),
        actions: [
          TextButton(
            onPressed: _saveChanges,
            child: const Text('Guardar Cambios', style: TextStyle(color: AppColors.lavandaSuave, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildImageEditors(),
            const SizedBox(height: 24),
            const Divider(),
            const SizedBox(height: 24),
            _buildSectionTitle('Información Principal'),
            const SizedBox(height: 16),
            TextFormField(controller: _nameController, decoration: const InputDecoration(labelText: 'Nombre Completo')),
            const SizedBox(height: 16),
            TextFormField(controller: _titleController, decoration: const InputDecoration(labelText: 'Puesto Actual')),
            const SizedBox(height: 16),
            TextFormField(controller: _locationController, decoration: const InputDecoration(labelText: 'Ubicación')),
            const SizedBox(height: 32),
            _buildSectionTitle('Acerca de mí'),
            const SizedBox(height: 16),
            TextFormField(controller: _bioController, decoration: const InputDecoration(alignLabelWithHint: true, labelText: 'Biografía'), maxLines: 5),
            const SizedBox(height: 32),
            _buildSectionTitle('Disponibilidad'),
            const SizedBox(height: 16),
            TextFormField(controller: _availabilityController, decoration: const InputDecoration(labelText: 'Ej: Disponible para proyectos freelance')),
            const SizedBox(height: 32),
            _buildSectionTitle('Contacto'),
            const SizedBox(height: 16),
            TextFormField(controller: _emailController, decoration: const InputDecoration(labelText: 'Email de contacto'), keyboardType: TextInputType.emailAddress),
            const SizedBox(height: 16),
            TextFormField(controller: _websiteController, decoration: const InputDecoration(labelText: 'Sitio Web o Portfolio'), keyboardType: TextInputType.url),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(title, style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold));
  }
  
  Widget _buildImageEditors() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        Column(
          children: [
            const Text('Foto de Perfil', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Stack(
              alignment: Alignment.bottomRight,
              children: [
                CircleAvatar(radius: 50, backgroundImage: NetworkImage(widget.currentProfileUrl)),
                _EditIconButton(onPressed: () {}),
              ],
            ),
          ],
        ),
        Column(
          children: [
            const Text('Banner', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Stack(
              alignment: Alignment.bottomRight,
              children: [
                Container(
                  width: 150, height: 100,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8),
                    image: DecorationImage(image: NetworkImage(widget.currentBannerUrl), fit: BoxFit.cover),
                  ),
                ),
                _EditIconButton(onPressed: () {}),
              ],
            ),
          ],
        ),
      ],
    );
  }
}

class _EditIconButton extends StatelessWidget {
  final VoidCallback onPressed;
  const _EditIconButton({required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: AppColors.grisOscuro.withOpacity(0.7),
      shape: const CircleBorder(),
      child: InkWell(
        onTap: onPressed,
        customBorder: const CircleBorder(),
        child: const Padding(
          padding: EdgeInsets.all(8.0),
          child: Icon(Icons.edit, color: Colors.white, size: 20),
        ),
      ),
    );
  }
}