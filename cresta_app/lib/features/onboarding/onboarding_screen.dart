import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cresta_app/features/auth/access_screen.dart';
import 'package:cresta_app/features/onboarding/widgets/onboarding_slide_widget.dart';
import 'package:cresta_app/features/onboarding/widgets/page_indicator_widget.dart';
// 1. Falta este import para el tema
import 'package:cresta_app/theme/theme_provider.dart';
import 'package:google_fonts/google_fonts.dart';

final onboardingPageIndexProvider = StateProvider<int>((ref) => 0);

class OnboardingSlideData {
  final String imageUrl;
  final String title;
  final String description;
  final List<String> keyFeatures;

  OnboardingSlideData({
    required this.imageUrl,
    required this.title,
    required this.description,
    required this.keyFeatures,
  });
}

final onboardingSlides = [
  OnboardingSlideData(
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
    title: 'Tu Perfil Profesional, Verificado',
    description: 'Crea un perfil que demuestre tu talento con validaciones de personas que han trabajado contigo.',
    keyFeatures: ['Validación por pares', 'Credibilidad aumentada', 'Perfil profesional completo'],
  ),
  OnboardingSlideData(
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    title: 'Consigue el Sello de Confianza',
    description: 'Solicita verificaciones de tus habilidades clave y haz que tu perfil destaque ante los reclutadores.',
    keyFeatures: ['Solicitudes simples por email', 'Sello de verificación visual', 'Destaca en búsquedas'],
  ),
  OnboardingSlideData(
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
    title: 'Encuentra y Sé Encontrado',
    description: 'Busca talento con credenciales reales o deja que las mejores oportunidades te encuentren a ti.',
    keyFeatures: ['Buscador de talento por habilidad', 'Resultados confiables', 'Conecta con profesionales'],
  ),
];

// 2. El widget debe ser Stateful para manejar el PageController correctamente
class OnboardingScreen extends ConsumerStatefulWidget {
  const OnboardingScreen({super.key});

  @override
  ConsumerState<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends ConsumerState<OnboardingScreen> {
  // El PageController ahora se crea una sola vez aquí
  late final PageController _pageController;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: ref.read(onboardingPageIndexProvider));
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final currentPageIndex = ref.watch(onboardingPageIndexProvider);
    // Definimos la variable themeMode que te faltaba
    final themeMode = ref.watch(themeProvider);
    final isDesktop = MediaQuery.of(context).size.width > 800;

    Widget buildKeyFeatures(OnboardingSlideData slide) {
      return Column(
        crossAxisAlignment: isDesktop ? CrossAxisAlignment.center : CrossAxisAlignment.start,
        children: slide.keyFeatures.map((feature) => Padding(
          padding: const EdgeInsets.only(bottom: 12.0),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.check_circle_outline, color: Theme.of(context).colorScheme.secondary, size: 20),
              const SizedBox(width: 12),
              Text(feature, style: const TextStyle(fontSize: 16)),
            ],
          ),
        )).toList(),
      );
    }
    
    // 3. Creamos un widget para los botones de navegación (Atrás y Siguiente)
    Widget buildNavigationButtons() {
      return Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Botón "Atrás" que aparece solo si no es la primera página
          if (currentPageIndex > 0)
            TextButton(
              onPressed: () {
                _pageController.previousPage(duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
              },
              child: const Text('Atrás'),
            )
          else
            const SizedBox(width: 60), // Espaciador para mantener el equilibrio

          ElevatedButton(
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 20),
              textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            onPressed: () {
              if (currentPageIndex == onboardingSlides.length - 1) {
                Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) => const AccessScreen()));
              } else {
                _pageController.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
              }
            },
            child: Text(currentPageIndex == onboardingSlides.length - 1 ? 'Comenzar' : 'Siguiente'),
          ),
        ],
      );
    }

    Widget buildContentColumn(OnboardingSlideData slide, {required bool isCentered}) {
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: isCentered ? CrossAxisAlignment.center : CrossAxisAlignment.start,
        children: [
          Text(
            slide.title,
            textAlign: isCentered ? TextAlign.center : TextAlign.left,
            style: GoogleFonts.inter(fontSize: isDesktop ? 32 : 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          Text(
            slide.description,
            textAlign: isCentered ? TextAlign.center : TextAlign.left,
            style: GoogleFonts.inter(fontSize: isDesktop ? 18 : 16, color: Theme.of(context).textTheme.bodySmall?.color, height: 1.5),
          ),
          const SizedBox(height: 32),
          buildKeyFeatures(slide),
          const SizedBox(height: 48),
          PageIndicatorWidget(pageCount: onboardingSlides.length, currentPage: currentPageIndex),
          const SizedBox(height: 32),
          // Usamos el nuevo widget de botones
          buildNavigationButtons(),
        ],
      );
    }

    Widget buildImageArea() {
      return PageView.builder(
        controller: _pageController,
        onPageChanged: (index) => ref.read(onboardingPageIndexProvider.notifier).state = index,
        itemBuilder: (context, index) => OnboardingSlideWidget(imageUrl: onboardingSlides[index].imageUrl),
        itemCount: onboardingSlides.length,
      );
    }

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(themeMode == ThemeMode.dark ? Icons.light_mode : Icons.dark_mode),
            color: isDesktop ? null : Colors.white,
            onPressed: () => ref.read(themeProvider.notifier).toggleTheme(),
            tooltip: 'Cambiar tema',
          )
        ],
      ),
      body: isDesktop
          ? Row(
              children: [
                Expanded(flex: 1, child: buildImageArea()),
                Expanded(
                  flex: 1,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 48.0),
                    child: buildContentColumn(onboardingSlides[currentPageIndex], isCentered: true),
                  ),
                ),
              ],
            )
          : Stack(
              children: [
                buildImageArea(),
                Positioned(
                  bottom: 0, left: 0, right: 0,
                  child: Container(
                    padding: const EdgeInsets.fromLTRB(24, 32, 24, 48),
                    decoration: BoxDecoration(
                      color: Theme.of(context).cardColor,
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(30)),
                    ),
                    child: buildContentColumn(onboardingSlides[currentPageIndex], isCentered: false),
                  ),
                ),
              ],
            ),
    );
  }
}