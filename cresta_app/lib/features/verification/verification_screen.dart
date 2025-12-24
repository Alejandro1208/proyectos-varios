import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cresta_app/main.dart';
import 'package:cresta_app/theme/theme_provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:cresta_app/widgets/app_logo.dart';
import 'package:cresta_app/features/verification/verification_success_screen.dart';
import 'package:cresta_app/features/verification/verification_decline_screen.dart';

class VerificationScreen extends ConsumerWidget {
  final String applicantName = 'Alejandro Sabater';
  final String applicantTitle = 'Desarrollador Flutter';
  final String applicantImageUrl =
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80';
  final String skillName = 'Flutter';

  const VerificationScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDesktop = MediaQuery.of(context).size.width > 800;
    final themeMode = ref.watch(themeProvider);

    return Scaffold(
      backgroundColor: Theme.of(context).cardColor,
      floatingActionButton: FloatingActionButton(
        onPressed: () => ref.read(themeProvider.notifier).toggleTheme(),
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        elevation: 2,
        child: Icon(
          themeMode == ThemeMode.dark
              ? Icons.light_mode_outlined
              : Icons.dark_mode_outlined,
          color: AppColors.lavandaSuave,
        ),
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          if (isDesktop) {
            return Row(
              children: [
                Expanded(child: _buildBrandingPanel()),
                Expanded(child: _buildActionsPanel(context, isDesktop: true)),
              ],
            );
          } else {
            return SingleChildScrollView(
              child: Column(
                children: [
                  _buildBrandingPanel(isMobile: true),
                  _buildActionsPanel(context, isDesktop: false),
                ],
              ),
            );
          }
        },
      ),
    );
  }

  Widget _buildBrandingPanel({bool isMobile = false}) {
    return Container(
      padding: const EdgeInsets.all(32.0),
      height: isMobile ? 300 : null,
      decoration: const BoxDecoration(
        color: AppColors.lavandaSuave,
        gradient: LinearGradient(
          colors: [AppColors.lavandaSuave, Color(0xFF8E7AC5)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const AppLogo(height: 80, color: Colors.white),
            const SizedBox(height: 24),
            Text(
              'Solicitud de Verificación de Cresta',
              textAlign: TextAlign.center,
              style: GoogleFonts.inter(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
                shadows: [
                  Shadow(blurRadius: 2, color: Colors.black.withOpacity(0.2))
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionsPanel(BuildContext context, {required bool isDesktop}) {
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 450),
        child: Padding(
          padding: const EdgeInsets.all(40.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // --- CAMBIO: APLICAMOS EL ESTILO DE AVATAR DEL PERFIL ---
              Center(
                child: CircleAvatar(
                  radius: 40, // Radio exterior para el borde
                  backgroundColor: Theme.of(context).cardColor,
                  child: CircleAvatar(
                    radius: 38, // Radio interior para la imagen
                    backgroundImage: NetworkImage(applicantImageUrl),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              RichText(
                textAlign: TextAlign.center,
                text: TextSpan(
                  style: GoogleFonts.inter(
                      fontSize: 24,
                      color: Theme.of(context).textTheme.bodyLarge?.color),
                  children: [
                    TextSpan(
                      text: applicantName,
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    const TextSpan(text: ' solicita tu validación.'),
                  ],
                ),
              ),
              const SizedBox(height: 32),
              Text(
                '¿Confirmas que demostró un dominio profesional de la siguiente habilidad?',
                textAlign: TextAlign.center,
                style: GoogleFonts.inter(
                    fontSize: 16,
                    color: Theme.of(context).textTheme.bodyMedium?.color,
                    height: 1.5),
              ),
              const SizedBox(height: 20),
              Center(
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                  decoration: BoxDecoration(
                    color: Theme.of(context).primaryColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(30),
                    border: Border.all(
                        color: Theme.of(context).primaryColor.withOpacity(0.2)),
                  ),
                  child: Text(
                    skillName,
                    style: GoogleFonts.inter(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Theme.of(context).primaryColor,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 48),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pushReplacement(
                    MaterialPageRoute(
                        builder: (context) =>
                            const VerificationSuccessScreen()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 20),
                ),
                child: const Text('Sí, confirmo esta habilidad'),
              ),
              const SizedBox(height: 16),
              TextButton(
                onPressed: () {
                  // --- CAMBIO: USAMOS PUSH EN LUGAR DE PUSHREPLACEMENT ---
                  // Esto añade la pantalla de decline encima, permitiendo volver.
                  Navigator.of(context).push(
                    MaterialPageRoute(
                        builder: (context) =>
                            const VerificationDeclineScreen()),
                  );
                },
                child: Text('No puedo verificarlo',
                    style: TextStyle(
                        color: Theme.of(context).textTheme.bodySmall?.color)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
