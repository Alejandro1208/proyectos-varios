import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cresta_app/main.dart';
import 'package:cresta_app/features/search/talent_search_screen.dart'; // Importamos la nueva pantalla
import 'package:cresta_app/theme/theme_provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:cresta_app/widgets/app_logo.dart';

final declineReasonProvider = StateProvider<String?>((ref) => null);

class VerificationDeclineScreen extends ConsumerWidget {
  const VerificationDeclineScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDesktop = MediaQuery.of(context).size.width > 800;

    final declineOptions = [
      'No conozco a esta persona.',
      'No trabajé directamente con esta persona en esta habilidad.',
      'No me siento cómodo/a validando esta habilidad.',
      'Otro motivo.',
    ];

    return Scaffold(
      backgroundColor: Theme.of(context).cardColor,
      // --- CAMBIO: AÑADIMOS LA APPBAR ---
      // Con esto, Flutter añadirá la flecha de "atrás" automáticamente.
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        // Hacemos que la flecha se vea bien tanto en fondos claros como oscuros
        foregroundColor: Theme.of(context).textTheme.bodyLarge?.color,
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          if (isDesktop) {
            return Row(
              children: [
                Expanded(child: _buildBrandingPanel(context)),
                Expanded(child: _buildDeclinePanel(context, ref, declineOptions)),
              ],
            );
          } else {
            return Column(
              children: [
                _buildBrandingPanel(context, isMobile: true),
                Expanded(child: SingleChildScrollView(child: _buildDeclinePanel(context, ref, declineOptions))),
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
      color: AppColors.lavandaSuave,
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const AppLogo(height: 80, color: Colors.white),
            const SizedBox(height: 24),
            Text(
              'Feedback Confidencial',
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

  Widget _buildDeclinePanel(BuildContext context, WidgetRef ref, List<String> options) {
    final selectedReason = ref.watch(declineReasonProvider);
    return Padding(
      padding: const EdgeInsets.all(40.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            '¿Por qué no puedes verificar la habilidad?',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          Text(
            'Tu respuesta es anónima y nos ayuda a mantener la calidad de la red.',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(fontSize: 16, color: Theme.of(context).textTheme.bodyMedium?.color),
          ),
          const SizedBox(height: 32),
          ...options.map((reason) => RadioListTile<String>(
            title: Text(reason),
            value: reason,
            groupValue: selectedReason,
            onChanged: (value) {
              ref.read(declineReasonProvider.notifier).state = value;
            },
          )),
          const SizedBox(height: 32),
          ElevatedButton(
            onPressed: selectedReason == null ? null : () {
              // Lógica para enviar respuesta y navegar
            },
            child: const Text('Enviar Respuesta'),
          ),
          const SizedBox(height: 16),
          TextButton(
            onPressed: () {
              // --- CAMBIO: NAVEGAR AL BUSCADOR ---
              Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(builder: (context) => const TalentSearchScreen()),
                (route) => false, // Elimina todas las rutas anteriores
              );
            },
            child: const Text('Explorar Talentos Verificados'),
          ),
        ],
      ),
    );
  }
}