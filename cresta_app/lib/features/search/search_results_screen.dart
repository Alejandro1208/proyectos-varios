import 'package:flutter/material.dart';
import 'package:cresta_app/features/search/widgets/user_result_card.dart';
import 'package:cresta_app/main.dart';

class SearchResultsScreen extends StatelessWidget {
  final String searchTerm;

  const SearchResultsScreen({
    super.key,
    required this.searchTerm,
  });

  @override
  Widget build(BuildContext context) {
    final bool hasResults = true;

    return Scaffold(
      appBar: AppBar(
        title: Text("Resultados para '$searchTerm'"),
      ),
      body: hasResults
          ? _buildResultsList()
          : _buildNoResultsState(context),
    );
  }

  Widget _buildResultsList() {
    return ListView.separated(
      padding: const EdgeInsets.all(16.0),
      itemCount: 5, 
      separatorBuilder: (context, index) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        return const UserResultCard();
      },
    );
  }
  
  Widget _buildNoResultsState(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.search_off, size: 80, color: AppColors.grisMedio),
            const SizedBox(height: 24),
            Text(
              'No se encontraron perfiles',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              'Intenta con otra habilidad o revisa si hay errores de tipeo.',
              textAlign: TextAlign.center,
              style: TextStyle(color: AppColors.grisMedio, fontSize: 16),
            ),
          ],
        ),
      ),
    );
  }
}