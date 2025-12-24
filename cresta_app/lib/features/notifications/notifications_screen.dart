import 'package:flutter/material.dart';
import 'package:cresta_app/main.dart';

class NotificationItem {
  final String verifierName;
  final String skillName;
  final String timestamp;

  NotificationItem({
    required this.verifierName,
    required this.skillName,
    required this.timestamp,
  });
}

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final List<NotificationItem> notifications = [
      NotificationItem(verifierName: 'Jane Doe', skillName: 'Flutter', timestamp: 'hace 2 horas'),
      NotificationItem(verifierName: 'John Smith', skillName: 'Riverpod', timestamp: 'hace 1 día'),
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Notificaciones'),
      ),
      body: notifications.isEmpty
          ? _buildEmptyState(context)
          : _buildNotificationList(notifications),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.notifications_paused_outlined,
              size: 80,
              color: AppColors.grisMedio,
            ),
            const SizedBox(height: 24),
            Text(
              'Todo al día',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              'Aquí aparecerán las nuevas verificaciones y actualizaciones de tu perfil.',
              textAlign: TextAlign.center,
              style: TextStyle(color: AppColors.grisMedio, fontSize: 16),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNotificationList(List<NotificationItem> notifications) {
    return ListView.separated(
      itemCount: notifications.length,
      separatorBuilder: (context, index) => const Divider(height: 1, indent: 24, endIndent: 24),
      itemBuilder: (context, index) {
        final notification = notifications[index];
        return ListTile(
          contentPadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          leading: const CircleAvatar(
            backgroundColor: AppColors.mentaFresca,
            child: Icon(Icons.check, color: Colors.white),
          ),
          title: RichText(
            text: TextSpan(
              style: TextStyle(color: AppColors.grisOscuro, fontSize: 16),
              children: [
                const TextSpan(text: '¡Felicidades! '),
                TextSpan(
                  text: notification.verifierName,
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                const TextSpan(text: ' ha verificado tu habilidad en '),
                TextSpan(
                  text: notification.skillName,
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                const TextSpan(text: '.'),
              ],
            ),
          ),
          subtitle: Padding(
            padding: const EdgeInsets.only(top: 4.0),
            child: Text(
              notification.timestamp,
              style: TextStyle(color: AppColors.grisMedio, fontSize: 12),
            ),
          ),
        );
      },
    );
  }
}