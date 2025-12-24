import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cresta_app/features/auth/login_screen.dart';
import 'package:cresta_app/features/auth/registration_screen.dart';
import 'package:cresta_app/features/onboarding/onboarding_screen.dart';
import 'package:cresta_app/main.dart';
import 'package:cresta_app/theme/theme_provider.dart';
import 'package:cresta_app/widgets/app_logo.dart';
import 'package:google_fonts/google_fonts.dart';

class AccessScreen extends ConsumerWidget {
  const AccessScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDesktop = MediaQuery.of(context).size.width > 800;

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.help_outline_rounded),
            tooltip: 'Ver tutorial de nuevo',
            color: isDesktop ? Theme.of(context).iconTheme.color : Colors.white,
            onPressed: () {
              ref.read(onboardingPageIndexProvider.notifier).state = 0;
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(
                    builder: (context) => const OnboardingScreen()),
              );
            },
          ),
        ],
      ),
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      floatingActionButton: FloatingActionButton(
        onPressed: () => ref.read(themeProvider.notifier).toggleTheme(),
        backgroundColor: Theme.of(context).cardColor,
        elevation: 1,
        child: Icon(
          ref.watch(themeProvider) == ThemeMode.dark
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
                Expanded(child: _buildActionsPanel(context)),
              ],
            );
          } else {
            return Column(
              children: [
                Expanded(flex: 2, child: _buildBrandingPanel()),
                Expanded(
                  flex: 3,
                  child: Container(
                    decoration: BoxDecoration(
                      color: Theme.of(context).cardColor,
                      borderRadius:
                          const BorderRadius.vertical(top: Radius.circular(30)),
                    ),
                    child: _buildActionsPanel(context),
                  ),
                ),
              ],
            );
          }
        },
      ),
    );
  }

  Widget _buildBrandingPanel() {
    return Container(
      decoration: const BoxDecoration(
        color: AppColors.lavandaSuave,
        image: DecorationImage(
          image: NetworkImage(
              'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80'),
          fit: BoxFit.cover,
          opacity: 0.1,
        ),
      ),
      child: Center(
        child: Padding(
          padding: const EdgeInsets.all(32.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const AppLogo(height: 80, color: Colors.white),
              const SizedBox(height: 24),
              Text(
                'Cresta',
                style: GoogleFonts.inter(
                  fontSize: 48,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                'Credibilidad profesional, demostrada.',
                textAlign: TextAlign.center,
                style: GoogleFonts.inter(
                  fontSize: 18,
                  color: Colors.white.withOpacity(0.9),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildActionsPanel(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(40.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            'Únete a la red de talento verificado',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            'Crea tu perfil, solicita verificaciones y deja que las mejores oportunidades te encuentren.',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(
              fontSize: 16,
              color: AppColors.grisMedio,
            ),
          ),
          const SizedBox(height: 48),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 20),
            ),
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                    builder: (context) => const RegistrationScreen()),
              );
            },
            child: const Text('Crear Cuenta'),
          ),
          const SizedBox(height: 16),
          TextButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => const LoginScreen()),
              );
            },
            child: Text(
              '¿Ya tienes cuenta? Inicia Sesión',
              style: GoogleFonts.inter(
                color: AppColors.lavandaSuave,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
