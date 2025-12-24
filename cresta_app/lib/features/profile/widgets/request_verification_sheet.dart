import 'package:flutter/material.dart';
import 'package:cresta_app/main.dart'; 

class RequestVerificationSheet extends StatefulWidget {
  final String skillName;

  const RequestVerificationSheet({
    super.key,
    required this.skillName,
  });

  @override
  State<RequestVerificationSheet> createState() => _RequestVerificationSheetState();
}

class _RequestVerificationSheetState extends State<RequestVerificationSheet> {
  final _emailController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }
  
  void _sendRequest() {
    if (_emailController.text.isNotEmpty && _emailController.text.contains('@')) {
      Navigator.of(context).pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(24, 24, 24, MediaQuery.of(context).viewInsets.bottom + 24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            'Solicitar Verificación',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          Text(
            'Ingresa el email de un colega, cliente o manager que pueda dar fe de tu habilidad en [${widget.skillName}].',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.grisMedio),
          ),
          const SizedBox(height: 24),
          TextField(
            controller: _emailController,
            autofocus: true,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(
              labelText: 'Email del verificador',
            ),
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: _sendRequest,
            child: const Text('Enviar Solicitud'),
          ),
        ],
      ),
    );
  }
}