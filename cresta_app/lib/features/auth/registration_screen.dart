import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cresta_app/features/main_screen.dart';
import 'package:cresta_app/main.dart';
import 'package:cresta_app/theme/theme_provider.dart';
import 'package:cresta_app/widgets/app_logo.dart';
import 'package:google_fonts/google_fonts.dart';

class RegistrationScreen extends ConsumerStatefulWidget {
  const RegistrationScreen({super.key});

  @override
  ConsumerState<RegistrationScreen> createState() => _RegistrationScreenState();
}

class _RegistrationScreenState extends ConsumerState<RegistrationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isPasswordVisible = false;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _submitForm() {
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (context) => const MainScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width > 800;

    return Scaffold(
      backgroundColor: isDesktop ? Theme.of(context).cardColor : Theme.of(context).scaffoldBackgroundColor,
      appBar: isDesktop
          ? null
          // Esta AppBar ya es correcta para móvil, la flecha aparecerá con la navegación corregida.
          : AppBar(
              title: const Text('Crea tu Cuenta'),
              backgroundColor: Colors.transparent,
              elevation: 0,
            ),
      floatingActionButton: isDesktop
          ? null
          : FloatingActionButton(
              onPressed: () => ref.read(themeProvider.notifier).toggleTheme(),
              backgroundColor: Theme.of(context).cardColor,
              elevation: 1,
              child: Icon(
                ref.watch(themeProvider) == ThemeMode.dark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
                color: AppColors.lavandaSuave,
              ),
            ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          if (isDesktop) {
            return Row(
              children: [
                Expanded(child: _buildBrandingPanel()),
                Expanded(child: _buildFormPanel(isDesktop: true)), // Pasamos el flag
              ],
            );
          } else {
            return SingleChildScrollView(child: _buildFormPanel(isDesktop: false));
          }
        },
      ),
    );
  }

  Widget _buildBrandingPanel() {
    return Container(
      color: AppColors.lavandaSuave,
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const AppLogo(height: 60, color: Colors.white),
            const SizedBox(height: 16),
            Text(
              'Un perfil,\ninfinitas oportunidades.',
              textAlign: TextAlign.center,
              style: GoogleFonts.inter(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }

Widget _buildFormPanel({required bool isDesktop}) {
  return Stack(
    alignment: Alignment.center,
    children: [
      Padding(
        padding: const EdgeInsets.symmetric(horizontal: 40.0),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'Crea tu Cuenta',
                textAlign: TextAlign.center,
                style: GoogleFonts.inter(fontSize: 28, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 32),
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Nombre Completo'),
                validator: (v) => v == null || v.trim().isEmpty ? 'Ingresa tu nombre.' : null,
              ),
              const SizedBox(height: 24),
              TextFormField(
                controller: _emailController,
                decoration: const InputDecoration(labelText: 'Email'),
                keyboardType: TextInputType.emailAddress,
                validator: (v) => v == null || !v.contains('@') ? 'Ingresa un email válido.' : null,
              ),
              const SizedBox(height: 24),
              TextFormField(
                controller: _passwordController,
                obscureText: !_isPasswordVisible,
                decoration: InputDecoration(
                  labelText: 'Contraseña (mín. 8 caracteres)',
                  suffixIcon: IconButton(
                    icon: Icon(_isPasswordVisible ? Icons.visibility_off : Icons.visibility),
                    onPressed: () => setState(() => _isPasswordVisible = !_isPasswordVisible),
                  ),
                ),
                validator: (v) => v == null || v.length < 8 ? 'La contraseña es muy corta.' : null,
              ),
              const SizedBox(height: 48),
              ElevatedButton(
                onPressed: _submitForm,
                style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(vertical: 20)),
                child: const Text('Registrarme'),
              ),
              const SizedBox(height: 24),
              Text(
                'Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad.',
                textAlign: TextAlign.center,
                style: TextStyle(color: AppColors.grisMedio, fontSize: 12),
              ),
            ],
          ),
        ),
      ),
      if (isDesktop)
        Positioned(
          top: 20, // Ajustamos la posición para que no sea negativa
          left: 20,
          child: IconButton(
            icon: const Icon(Icons.arrow_back),
            tooltip: 'Volver',
            onPressed: () => Navigator.of(context).pop(),
          ),
        ),
    ],
  );
  // --- FIN DE LA CORRECCIÓN ---
}
}