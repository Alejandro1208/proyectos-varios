import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cresta_app/main.dart';
import 'package:cresta_app/theme/theme_provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:cresta_app/widgets/app_logo.dart';
import 'package:cresta_app/features/search/talent_search_screen.dart';

class VerificationSuccessScreen extends ConsumerWidget {
  final String applicantName = 'Alejandro Sabater';
  final String applicantImageUrl =
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80';

  const VerificationSuccessScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDesktop = MediaQuery.of(context).size.width > 800;

    return Scaffold(
      backgroundColor: Theme.of(context).cardColor,
      body: LayoutBuilder(
        builder: (context, constraints) {
          if (isDesktop) {
            return Row(
              children: [
                Expanded(child: _buildBrandingPanel(context)),
                Expanded(child: _buildSuccessPanel(context)),
              ],
            );
          } else {
            return Column(
              children: [
                _buildBrandingPanel(context, isMobile: true),
                Expanded(child: _buildSuccessPanel(context)),
              ],
            );
          }
        },
      ),
    );
  }

  Widget _buildBrandingPanel(BuildContext context, {bool isMobile = false}) {
    return Container(
      padding: const EdgeInsets.all(32.0),
      height: isMobile ? 250 : null,
      width: double.infinity,
      decoration: BoxDecoration(
        color: AppColors.mentaFresca, // Usamos el color de "éxito"
        gradient: LinearGradient(
          colors: [AppColors.mentaFresca, const Color(0xFF6EC6AD)],
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
              '¡Gracias por tu Aporte!',
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

  Widget _buildSuccessPanel(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(40.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Icon(Icons.check_circle_outline_rounded,
              color: AppColors.mentaFresca, size: 80),
          const SizedBox(height: 24),
          Text(
            'Habilidad Verificada',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(fontSize: 28, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          Center(
            child: CircleAvatar(
              radius: 30,
              backgroundImage: NetworkImage(applicantImageUrl),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Has confirmado la habilidad de $applicantName.',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(
                fontSize: 16,
                color: Theme.of(context).textTheme.bodyMedium?.color),
          ),
          const SizedBox(height: 12),
          Text(
            'Tu validación ayuda a construir una red de profesionales más confiable.',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(
                fontSize: 16,
                color: Theme.of(context).textTheme.bodyMedium?.color),
          ),
          const SizedBox(height: 48),
          ElevatedButton(
            onPressed: () {
              // --- CAMBIO: NAVEGAR AL BUSCADOR Y LIMPIAR LA PILA ---
              Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(
                    builder: (context) => const TalentSearchScreen()),
                (route) =>
                    false, // Elimina el historial de navegación (éxito, verificación, etc.)
              );
            },
            child: const Text('Explorar Talentos Verificados'),
          ),
        ],
      ),
    );
  }
}
