import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cresta_app/main.dart';
import 'package:cresta_app/theme/theme_provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:cresta_app/widgets/app_logo.dart';

class TalentSearchScreen extends ConsumerWidget {
  const TalentSearchScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDesktop = MediaQuery.of(context).size.width > 800;

    return Scaffold(
      backgroundColor: Theme.of(context).cardColor,
      appBar: AppBar(
        title: const Text('Buscador de Talentos'),
        backgroundColor: Theme.of(context).cardColor,
        elevation: 1,
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          if (isDesktop) {
            return Row(
              children: [
                Expanded(child: _buildBrandingPanel(context)),
                Expanded(flex: 2, child: _buildSearchPanel(context)),
              ],
            );
          } else {
            return _buildSearchPanel(context);
          }
        },
      ),
    );
  }

  Widget _buildBrandingPanel(BuildContext context) {
    return Container(
      color: Theme.of(context).scaffoldBackgroundColor,
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const AppLogo(height: 80),
            const SizedBox(height: 24),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Text(
                'Encuentra profesionales con credibilidad demostrada.',
                textAlign: TextAlign.center,
                style: GoogleFonts.inter(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSearchPanel(BuildContext context) {
    final popularTags = ['React', 'Diseño UX', 'Gestión de Proyectos', 'Node.js', 'Flutter'];

    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(40.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Campo de búsqueda
            TextField(
              decoration: InputDecoration(
                hintText: 'Buscar habilidad, puesto o tecnología...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: Theme.of(context).scaffoldBackgroundColor,
              ),
            ),
            const SizedBox(height: 48),

            // Búsquedas populares
            Text(
              'Búsquedas Populares',
              style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 12.0,
              runSpacing: 12.0,
              children: popularTags.map((tag) => Chip(
                label: Text(tag),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              )).toList(),
            ),
          ],
        ),
      ),
    );
  }
}