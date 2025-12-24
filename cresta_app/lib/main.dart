import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cresta_app/features/onboarding/onboarding_screen.dart';
import 'package:cresta_app/features/verification/verification_screen.dart';
import 'package:cresta_app/theme/theme_provider.dart';
import 'package:google_fonts/google_fonts.dart';


class AppColors {
  static const Color lavandaSuave = Color(0xFFA08BDB);
  static const Color mentaFresca = Color(0xFF87DCC0);
  static const Color grisOscuro = Color(0xFF333333);
  static const Color grisMedio = Color(0xFF6B7280);
  static const Color grisClaro = Color(0xFFF0F2F5);
  static const Color blancoPuro = Color(0xFFFFFFFF);
  static const Color rojoError = Color(0xFFEF4444);
}

class AppColorsDark {
  static const Color charcoalsof = Color(0xFF2D2D2D); 
  static const Color grisOscuroCard = Color(0xFF333333); 
}

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized(); 
  runApp(const ProviderScope(child: CrestaApp()));
}

class CrestaApp extends ConsumerWidget {
  const CrestaApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);

    final lightTheme = ThemeData(
      brightness: Brightness.light,
      primaryColor: AppColors.lavandaSuave,
      scaffoldBackgroundColor: AppColors.grisClaro,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.lavandaSuave,
        primary: AppColors.lavandaSuave,
        secondary: AppColors.mentaFresca,
        error: AppColors.rojoError,
        background: AppColors.grisClaro,
        brightness: Brightness.light,
      ),
      textTheme: GoogleFonts.interTextTheme(ThemeData.light().textTheme.apply(bodyColor: AppColors.grisOscuro)),
      cardColor: AppColors.blancoPuro,
    );

    final darkTheme = ThemeData(
      brightness: Brightness.dark,
      primaryColor: AppColors.lavandaSuave,
      scaffoldBackgroundColor: AppColorsDark.charcoalsof,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.lavandaSuave,
        primary: AppColors.lavandaSuave,
        secondary: AppColors.mentaFresca,
        error: AppColors.rojoError,
        background: AppColorsDark.charcoalsof,
        brightness: Brightness.dark,
      ),
      textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme.apply(bodyColor: AppColors.grisClaro)),
      cardColor: AppColorsDark.grisOscuroCard,
    );

    return MaterialApp(
      title: 'Cresta',
      debugShowCheckedModeBanner: false,
      theme: lightTheme,
      darkTheme: darkTheme,
      themeMode: themeMode,
      home: const OnboardingScreen(),
      //home: const VerificationScreen(),
    );
  }
}