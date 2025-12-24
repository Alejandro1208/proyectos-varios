import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cresta_app/features/notifications/notifications_screen.dart';
import 'package:cresta_app/features/profile/edit_profile_screen.dart';
import 'package:cresta_app/features/profile/manage_skills_screen.dart';
import 'package:cresta_app/features/profile/widgets/skill_chip.dart';
import 'package:cresta_app/features/profile/widgets/validators_sheet.dart';
import 'package:cresta_app/main.dart';
import 'package:cresta_app/theme/theme_provider.dart';
import 'package:cresta_app/widgets/app_logo.dart';
import 'package:cresta_app/features/profile/widgets/skill_chip.dart';
import 'package:shimmer/shimmer.dart';

// --- MODELOS DE DATOS PÚBLICOS ---
class Validator {
  final String name;
  final String imageUrl;
  const Validator({required this.name, required this.imageUrl});
}

class VerifiedSkill {
  final String name;
  final List<Validator> validators;
  const VerifiedSkill({required this.name, required this.validators});
}

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  // --- FUNCIÓN DE NAVEGACIÓN CORREGIDA (AHORA ES UN MÉTODO DE LA CLASE) ---
  void _navigateToEditScreen(BuildContext context) {
    // Datos de ejemplo (en una app real vendrían de un provider)
    const String bannerImageUrl =
        'https://images.unsplash.com/photo-1554147090-e1221a04a025?w=1200&q=80';
    const String profileImageUrl =
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80';
    const String userName = 'Alejandro Sabater';
    const String userTitle = 'Desarrollador Flutter Senior en Cresta Inc.';
    const String userLocation = 'Buenos Aires, Argentina';
    const String userBio =
        'Apasionado por crear experiencias de usuario fluidas y eficientes. Más de 8 años construyendo aplicaciones móviles nativas y con Flutter para startups y grandes corporaciones.';
    const String availability = 'Disponible para nuevos proyectos freelance.';
    const String userEmail = 'alejandro.sabater@email.com';
    const String userWebsite = 'alejandrosabater.dev';

    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => EditProfileScreen(
          currentBannerUrl: bannerImageUrl,
          currentProfileUrl: profileImageUrl,
          currentName: userName,
          currentTitle: userTitle,
          currentLocation: userLocation,
          currentBio: userBio,
          currentAvailability: availability,
          currentEmail: userEmail,
          currentWebsite: userWebsite,
        ),
      ),
    );
  }

  void _showValidatorsSheet(BuildContext context, VerifiedSkill skill) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => ValidatorsSheet(skill: skill),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // --- DATOS DE EJEMPLO COMPLETOS ---
    const String bannerImageUrl =
        'https://images.unsplash.com/photo-1554147090-e1221a04a025?w=1200&q=80';
    const String profileImageUrl =
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80';
    const String userName = 'Alejandro Sabater';
    const String userTitle = 'Desarrollador Flutter Senior en Cresta Inc.';
    const String userLocation = 'Buenos Aires, Argentina';
    const String userBio =
        'Apasionado por crear experiencias de usuario fluidas y eficientes. Más de 8 años construyendo aplicaciones móviles nativas y con Flutter para startups y grandes corporaciones.';
    const otherSkills = [
      'Project Management',
      'Scrum',
      'Node.js',
      'Python',
      'CI/CD'
    ];
    const languages = ['Español (Nativo)', 'Inglés (C1)'];
    const availability = 'Disponible para nuevos proyectos freelance.';
    const userEmail = 'alejandro.sabater@email.com';
    const userWebsite = 'alejandrosabater.dev';
    const List<VerifiedSkill> verifiedSkillsData = [
      VerifiedSkill(name: 'Flutter', validators: [
        Validator(
            name: 'Jane Doe',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'),
        Validator(
            name: 'John Smith',
            imageUrl:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'),
      ]),
      VerifiedSkill(name: 'Firebase', validators: [
        Validator(
            name: 'John Smith',
            imageUrl:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'),
      ]),
    ];

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(kToolbarHeight),
        child: LayoutBuilder(builder: (context, constraints) {
          if (constraints.maxWidth > 800) return const SizedBox.shrink();
          return AppBar(
              title: const AppLogo(height: 24, color: Colors.white),
              backgroundColor: Colors.transparent,
              elevation: 0,
              automaticallyImplyLeading: false,
              actions: [
                _buildAppBarButton(
                    context,
                    Icons.notifications_outlined,
                    () => Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => const NotificationsScreen()))),
                _buildAppBarButton(context, Icons.edit_outlined,
                    () => _navigateToEditScreen(context)),
              ]);
        }),
      ),
      body: LayoutBuilder(builder: (context, constraints) {
        bool isDesktop = constraints.maxWidth > 800;
        return SingleChildScrollView(
          child: Column(children: [
            _buildProfileHeader(
                context,
                bannerImageUrl,
                profileImageUrl,
                userName,
                userTitle,
                userLocation,
                isDesktop,
                () => _navigateToEditScreen(context)),
            Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 1200),
                child: Padding(
                  padding: EdgeInsets.all(isDesktop ? 32.0 : 16.0),
                  child: isDesktop
                      ? _buildDesktopLayout(
                          context,
                          ref,
                          userBio,
                          verifiedSkillsData,
                          otherSkills,
                          languages,
                          availability,
                          userEmail,
                          userWebsite)
                      : _buildMobileLayout(
                          context,
                          ref,
                          userBio,
                          verifiedSkillsData,
                          otherSkills,
                          languages,
                          availability,
                          userEmail,
                          userWebsite,
                          userLocation),
                ),
              ),
            ),
          ]),
        );
      }),
    );
  }

  Widget _buildAppBarButton(
      BuildContext context, IconData icon, VoidCallback onPressed) {
    return Container(
      margin: const EdgeInsets.all(8),
      decoration: BoxDecoration(
          color: Colors.black.withOpacity(0.3), shape: BoxShape.circle),
      child: IconButton(
          icon: Icon(icon, color: Colors.white), onPressed: onPressed),
    );
  }

  Widget _buildProfileHeader(
      BuildContext context,
      String bannerUrl,
      String profileUrl,
      String name,
      String title,
      String location,
      bool isDesktop,
      VoidCallback onEditPressed) {
    return Stack(
      clipBehavior: Clip.none,
      alignment: isDesktop ? Alignment.bottomCenter : Alignment.bottomLeft,
      children: [
        Container(
            height: 250,
            decoration: BoxDecoration(
                image: DecorationImage(
                    image: NetworkImage(bannerUrl), fit: BoxFit.cover))),
        if (isDesktop)
          Positioned(
            top: 16,
            right: 16,
            child: Row(
              children: [
                _buildAppBarButton(
                    context,
                    Icons.notifications_outlined,
                    () => Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => const NotificationsScreen()))),
                const SizedBox(width: 8),
                _buildAppBarButton(context, Icons.edit_outlined, onEditPressed),
              ],
            ),
          ),
        Positioned(
          bottom: -50,
          left: isDesktop ? null : 32,
          child: Column(
            children: [
              CircleAvatar(
                radius: 55,
                backgroundColor: Theme.of(context).scaffoldBackgroundColor,
                child: CircleAvatar(
                    radius: 50, backgroundImage: NetworkImage(profileUrl)),
              ),
              if (isDesktop) ...[
                const SizedBox(height: 16),
                Text(name,
                    style: const TextStyle(
                        fontSize: 28, fontWeight: FontWeight.bold)),
                Text(title,
                    style: TextStyle(fontSize: 16, color: AppColors.grisMedio)),
                Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Icon(Icons.location_on, color: AppColors.grisMedio, size: 16),
                  const SizedBox(width: 4),
                  Text(location, style: TextStyle(color: AppColors.grisMedio)),
                ]),
              ],
            ],
          ),
        ),
        if (!isDesktop)
          Positioned(
            bottom: 10,
            left: 155,
            right: 16,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name,
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        shadows: [Shadow(blurRadius: 2)])),
                Text(title,
                    style: const TextStyle(
                        color: Colors.white, shadows: [Shadow(blurRadius: 2)])),
              ],
            ),
          )
      ],
    );
  }

  Widget _buildMobileLayout(
      BuildContext context,
      WidgetRef ref,
      String bio,
      List<VerifiedSkill> verified,
      List<String> other,
      List<String> languages,
      String availability,
      String email,
      String website,
      String userLocation) {
    return Column(
      children: [
        const SizedBox(height: 60),
        Text(userLocation,
            style:
                TextStyle(color: Theme.of(context).textTheme.bodySmall?.color)),
        const SizedBox(height: 16),
        _buildManageSkillsButton(context),
        const SizedBox(height: 24),
        _InfoCard(
            title: 'Acerca de mí',
            child: Text(bio, style: const TextStyle(height: 1.5))),
        const SizedBox(height: 24),
        _InfoCard(title: 'Disponibilidad', child: Text(availability)),
        const SizedBox(height: 24),
        _InfoCard(title: 'Experiencia', child: _buildExperienceSection()),
        const SizedBox(height: 24),
        _InfoCard(title: 'Idiomas', child: _buildLanguagesSection(languages)),
        const SizedBox(height: 24),
        _InfoCard(
            title: 'Contacto', child: _buildContactSection(email, website)),
        const SizedBox(height: 24),
        _buildPreferencesCard(context, ref),
        const SizedBox(height: 24),
        _buildVerifiedSkillsSection(context, verified),
        const SizedBox(height: 24),
        _InfoCard(
            title: 'Otras Habilidades', child: _buildSkillsWrap(other, false)),
        const SizedBox(height: 24),
        _buildAdPlaceholder(context),
      ],
    );
  }

  Widget _buildDesktopLayout(
      BuildContext context,
      WidgetRef ref,
      String bio,
      List<VerifiedSkill> verified,
      List<String> other,
      List<String> languages,
      String availability,
      String email,
      String website) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
            flex: 2,
            child: Column(
              children: [
                const SizedBox(height: 80),
                _InfoCard(
                    title: 'Acerca de mí',
                    child: Text(bio, style: const TextStyle(height: 1.5))),
                const SizedBox(height: 24),
                _InfoCard(
                    title: 'Experiencia', child: _buildExperienceSection()),
                const SizedBox(height: 24),
                _buildVerifiedSkillsSection(context, verified),
                const SizedBox(height: 24),
                _InfoCard(
                    title: 'Otras Habilidades',
                    child: _buildSkillsWrap(other, false)),
              ],
            )),
        const SizedBox(width: 32),
        Expanded(
          flex: 1,
          child: Column(
            children: [
              const SizedBox(height: 80),
              _buildManageSkillsButton(context),
              const SizedBox(height: 24),
              _InfoCard(title: 'Disponibilidad', child: Text(availability)),
              const SizedBox(height: 24),
              _InfoCard(
                  title: 'Idiomas', child: _buildLanguagesSection(languages)),
              const SizedBox(height: 24),
              _InfoCard(
                  title: 'Contacto',
                  child: _buildContactSection(email, website)),
              const SizedBox(height: 24),
              _buildPreferencesCard(context, ref),
              const SizedBox(height: 24),
              _buildAdPlaceholder(context),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPreferencesCard(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);
    return _InfoCard(
      title: 'Preferencias',
      child: SwitchListTile(
        title: const Text('Modo Oscuro'),
        contentPadding: EdgeInsets.zero,
        secondary: Icon(
          themeMode == ThemeMode.dark
              ? Icons.dark_mode_outlined
              : Icons.light_mode_outlined,
          color: AppColors.lavandaSuave,
        ),
        value: themeMode == ThemeMode.dark,
        onChanged: (isDark) => ref.read(themeProvider.notifier).toggleTheme(),
      ),
    );
  }

  Widget _buildVerifiedSkillsSection(
      BuildContext context, List<VerifiedSkill> skills) {
    return _InfoCard(
      title: 'Habilidades Verificadas',
      child: Column(
        children: skills.map((skill) {
          return Padding(
            padding: const EdgeInsets.only(bottom: 16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    // --- CAMBIO: Aplicamos el Shimmer solo al texto del nombre ---
                    Shimmer.fromColors(
                      baseColor: Theme.of(context).textTheme.bodyLarge!.color!,
                      highlightColor: AppColors.mentaFresca,
                      period: const Duration(seconds: 3),
                      child: Text(
                        skill.name,
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    // El ícono de verificado lo dejamos fuera del shimmer para que siempre sea visible.
                    const Icon(Icons.verified,
                        color: AppColors.mentaFresca, size: 20),
                  ],
                ),
                const SizedBox(height: 12),
                // --- CAMBIO: Quitamos el Shimmer de esta sección ---
                // Ahora el InkWell y los avatares son 100% visibles.
                InkWell(
                  onTap: () => _showValidatorsSheet(context, skill),
                  borderRadius: BorderRadius.circular(8),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 4.0),
                    child: Row(
                      children: [
                        SizedBox(
                          height: 30,
                          // El ancho se calcula basado en la cantidad de avatares
                          width: (skill.validators.length * 22.0) + 8.0,
                          child: Stack(
                            children:
                                List.generate(skill.validators.length, (index) {
                              // Limita la cantidad de avatares a mostrar para evitar overflow
                              if (index > 4) return const SizedBox.shrink();
                              return Positioned(
                                left: (index * 22).toDouble(),
                                child: CircleAvatar(
                                  radius: 15,
                                  // Un borde sutil del color de la tarjeta para un mejor efecto de apilado
                                  backgroundColor: Theme.of(context).cardColor,
                                  child: CircleAvatar(
                                    radius: 13,
                                    backgroundImage: NetworkImage(
                                        skill.validators[index].imageUrl),
                                  ),
                                ),
                              );
                            }),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            'Verificada por ${skill.validators.length} colega${skill.validators.length > 1 ? 's' : ''}',
                            style: const TextStyle(color: AppColors.grisMedio),
                          ),
                        ),
                        const Icon(Icons.chevron_right,
                            color: AppColors.grisMedio),
                      ],
                    ),
                  ),
                ),
                if (skills.indexOf(skill) < skills.length - 1)
                  const Divider(height: 24),
              ],
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildManageSkillsButton(BuildContext context) {
    return ElevatedButton.icon(
      icon: const Icon(Icons.checklist_rtl_outlined),
      label: const Text('Gestionar mis habilidades'),
      onPressed: () => Navigator.of(context).push(
          MaterialPageRoute(builder: (context) => const ManageSkillsScreen())),
      style: ElevatedButton.styleFrom(
        elevation: 1,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      ),
    );
  }

  Widget _buildAdPlaceholder(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.network(
              'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&q=80',
              height: 120,
              width: double.infinity,
              fit: BoxFit.cover),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Publicidad',
                    style: Theme.of(context).textTheme.bodySmall),
                const SizedBox(height: 4),
                const Text('Flutter DevTools Pro',
                    style:
                        TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                const SizedBox(height: 8),
                const Text(
                    'Optimiza tu flujo de trabajo y debuggea como un experto.'),
                const SizedBox(height: 12),
                OutlinedButton(
                    onPressed: () {}, child: const Text('Saber más')),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSkillsWrap(List<String> skills, bool isVerified) {
    return Wrap(
        spacing: 8.0,
        runSpacing: 8.0,
        children: skills
            .map((skill) => SkillChip(label: skill, isVerified: isVerified))
            .toList());
  }

  Widget _buildExperienceSection() {
    return const Column(children: [
      ListTile(
          contentPadding: EdgeInsets.zero,
          leading: Icon(Icons.business_center, color: AppColors.lavandaSuave),
          title: Text('Lead Flutter Developer',
              style: TextStyle(fontWeight: FontWeight.bold)),
          subtitle: Text('Cresta Inc. • 2022 - Presente')),
      ListTile(
          contentPadding: EdgeInsets.zero,
          leading: Icon(Icons.business_center, color: AppColors.lavandaSuave),
          title: Text('Mobile Developer',
              style: TextStyle(fontWeight: FontWeight.bold)),
          subtitle: Text('Tech Solutions • 2019 - 2022')),
    ]);
  }

  Widget _buildLanguagesSection(List<String> languages) {
    return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: languages
            .map((lang) => Padding(
                  padding: const EdgeInsets.only(bottom: 8.0),
                  child: Text('• $lang', style: const TextStyle(fontSize: 16)),
                ))
            .toList());
  }

  Widget _buildContactSection(String email, String website) {
    return Column(children: [
      _ContactRow(icon: Icons.email_outlined, text: email),
      const SizedBox(height: 8),
      _ContactRow(icon: Icons.language, text: website),
    ]);
  }
}

class _InfoCard extends StatelessWidget {
  final String title;
  final Widget child;
  const _InfoCard({required this.title, required this.child});
  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(
            color: Theme.of(context).colorScheme.onSurface.withOpacity(0.1)),
      ),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title,
                style: Theme.of(context)
                    .textTheme
                    .titleLarge
                    ?.copyWith(fontWeight: FontWeight.bold)),
            const Divider(height: 24),
            child,
          ],
        ),
      ),
    );
  }
}

class _ContactRow extends StatelessWidget {
  final IconData icon;
  final String text;
  const _ContactRow({required this.icon, required this.text});
  @override
  Widget build(BuildContext context) {
    return Row(children: [
      Icon(icon, color: AppColors.grisMedio, size: 20),
      const SizedBox(width: 12),
      Expanded(
          child: Text(text,
              style: const TextStyle(
                  fontSize: 16, color: AppColors.lavandaSuave))),
    ]);
  }
}
