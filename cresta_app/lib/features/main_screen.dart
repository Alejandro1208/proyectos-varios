import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cresta_app/features/profile/profile_screen.dart';
import 'package:cresta_app/features/search/talent_search_screen.dart';
import 'package:cresta_app/main.dart';
import 'package:cresta_app/theme/theme_provider.dart';
import 'package:cresta_app/widgets/app_logo.dart';

// --- CAMBIO: Convertimos a ConsumerStatefulWidget para acceder a Riverpod ---
class MainScreen extends ConsumerStatefulWidget {
  const MainScreen({super.key});

  @override
  ConsumerState<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends ConsumerState<MainScreen> with TickerProviderStateMixin {
  late TabController _tabController;
  int _bottomNavIndex = 0;

  // --- CAMBIO: Añadimos las nuevas vistas ---
  static const List<Widget> _screens = <Widget>[
    TalentSearchScreen(), // Index 0
    ProfileScreen(),      // Index 1
    PlaceholderWidget(title: 'Gestionar Habilidades'), // Index 2
    PlaceholderWidget(title: 'Notificaciones'), // Index 3
  ];

  // Lista de pantallas para la TabBar de escritorio (solo las principales)
  static const List<Widget> _desktopScreens = <Widget>[
    TalentSearchScreen(),
    ProfileScreen(),
  ];

  @override
  void initState() {
    super.initState();
    // El TabController ahora solo maneja las pestañas de escritorio
    _tabController = TabController(length: _desktopScreens.length, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _onItemTapped(int index) {
    setState(() {
      _bottomNavIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    // --- CAMBIO: La lógica de tema ahora es accesible via `ref` ---
    final themeMode = ref.watch(themeProvider);
    final isDesktop = MediaQuery.of(context).size.width > 800;

    if (isDesktop) {
      // --- VISTA DE ESCRITORIO CON NUEVO MENÚ DE USUARIO ---
      return Scaffold(
        appBar: AppBar(
          toolbarHeight: 80,
          backgroundColor: Theme.of(context).cardColor,
          title: Row(
            children: [
              const AppLogo(height: 30, color: AppColors.lavandaSuave),
              const SizedBox(width: 48),
              Expanded(
                child: TabBar(
                  controller: _tabController,
                  labelColor: AppColors.lavandaSuave,
                  unselectedLabelColor: AppColors.grisMedio,
                  indicatorColor: AppColors.lavandaSuave,
                  indicatorWeight: 3,
                  tabs: const [
                    Tab(text: 'Buscar Talentos'),
                    Tab(text: 'Mi Perfil'),
                  ],
                ),
              ),
            ],
          ),
          // --- CAMBIO: Menú de usuario para acciones secundarias ---
          actions: [
            PopupMenuButton<int>(
              tooltip: 'Menú de usuario',
              onSelected: (value) {
                // Aquí iría la navegación a las pantallas correspondientes
              },
              itemBuilder: (context) => [
                const PopupMenuItem(value: 0, child: Text('Gestionar Habilidades')),
                const PopupMenuItem(value: 1, child: Text('Notificaciones')),
                const PopupMenuItem(value: 2, child: Text('Configuración')),
                const PopupMenuDivider(),
                PopupMenuItem(
                  value: 3,
                  onTap: () => ref.read(themeProvider.notifier).toggleTheme(),
                  child: Text(themeMode == ThemeMode.dark ? 'Modo Claro' : 'Modo Oscuro'),
                ),
                const PopupMenuDivider(),
                const PopupMenuItem(value: 4, child: Text('Cerrar Sesión')),
              ],
              child: const Padding(
                padding: EdgeInsets.symmetric(horizontal: 16.0),
                child: CircleAvatar(
                  radius: 18,
                  child: Icon(Icons.person, size: 20),
                ),
              ),
            ),
          ],
        ),
        body: TabBarView(
          controller: _tabController,
          children: _desktopScreens,
        ),
      );
    } else {
      // --- VISTA MÓVIL CON BOTTOMNAVBAR EXPANDIDO Y APPBAR ---
      return Scaffold(
        appBar: AppBar(
          title: Text(_getScreenTitle(_bottomNavIndex)),
          backgroundColor: Theme.of(context).cardColor,
          actions: [
            PopupMenuButton<int>(
              onSelected: (value) { /* Lógica de menú */ },
              itemBuilder: (context) => [
                const PopupMenuItem(value: 0, child: Text('Configuración')),
                PopupMenuItem(
                  value: 1,
                  onTap: () => ref.read(themeProvider.notifier).toggleTheme(),
                  child: Text(themeMode == ThemeMode.dark ? 'Modo Claro' : 'Modo Oscuro'),
                ),
                const PopupMenuDivider(),
                const PopupMenuItem(value: 2, child: Text('Cerrar Sesión')),
              ],
            ),
          ],
        ),
        body: Center(child: _screens.elementAt(_bottomNavIndex)),
        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed, // Para que se vean más de 3 items
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(icon: Icon(Icons.search), label: 'Buscar'),
            BottomNavigationBarItem(icon: Icon(Icons.person_outline), label: 'Perfil'),
            BottomNavigationBarItem(icon: Icon(Icons.star_outline), label: 'Habilidades'),
            BottomNavigationBarItem(icon: Icon(Icons.notifications_none_outlined), label: 'Alertas'),
          ],
          currentIndex: _bottomNavIndex,
          selectedItemColor: AppColors.lavandaSuave,
          onTap: _onItemTapped,
        ),
      );
    }
  }

  String _getScreenTitle(int index) {
    switch (index) {
      case 0: return 'Buscador de Talentos';
      case 1: return 'Mi Perfil';
      case 2: return 'Gestionar Habilidades';
      case 3: return 'Notificaciones';
      default: return 'Cresta';
    }
  }
}

// Widget de relleno para las vistas que aún no existen
class PlaceholderWidget extends StatelessWidget {
  final String title;
  const PlaceholderWidget({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(title, style: Theme.of(context).textTheme.headlineMedium),
    );
  }
}