import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class Stressscreen extends StatefulWidget {
  @override
  _StressscreenState createState() => _StressscreenState();
}

class _StressscreenState extends State<Stressscreen> {
  final _formKey = GlobalKey<FormState>();

  // Controllers for the input fields
  final Map<String, TextEditingController> _controllers = {
    'Age': TextEditingController(),
    'Pulse_Rate': TextEditingController(),
    'Systolic_BP': TextEditingController(),
    'Diastolic_BP': TextEditingController(),
    'Financial_Stress': TextEditingController(),
    'Work_Hours': TextEditingController(),
    'Sleep_Hours': TextEditingController(),
    'Illness_Severity': TextEditingController(),
    'Social_Interaction': TextEditingController(),
    'Exercise_Hours': TextEditingController(),
    'Diet_Quality': TextEditingController(),
    'Life_Satisfaction': TextEditingController(),
    'Substance_Use': TextEditingController(),
  };

  double? _stressScore;

  Future<void> _submitData() async {
    if (_formKey.currentState!.validate()) {
      // Collect data from controllers
      List<int> features = _controllers.values
          .map((controller) => int.parse(controller.text))
          .toList();

      final url = Uri.parse('http://192.168.113.62:5000/predict');
      final body = jsonEncode({'features': features});

      try {
        final response = await http.post(
          url,
          headers: {'Content-Type': 'application/json'},
          body: body,
        );

        if (response.statusCode == 200) {
          final result = jsonDecode(response.body);
          setState(() {
            _stressScore = result['prediction']?.toDouble();
          });
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Error: ${response.reasonPhrase}')),
          );
        }
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to connect to the API: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.purple.shade300,
        centerTitle: true,
        title: const Text(
          'Stress Survey',
          style: TextStyle(color: Colors.black, fontSize: 30),
        ),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Column(
              children: [
                ..._controllers.entries.map((entry) {
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                    child: TextFormField(
                      controller: entry.value,
                      decoration: InputDecoration(
                        labelText: entry.key,
                        border: OutlineInputBorder(),
                      ),
                      keyboardType: TextInputType.number,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter ${entry.key}';
                        }
                        if (int.tryParse(value) == null) {
                          return 'Enter a valid number';
                        }
                        return null;
                      },
                    ),
                  );
                }).toList(),
                SizedBox(height: 16.0),
                ElevatedButton(
                  onPressed: _submitData,
                  child: Text('Analyze Stress'),
                ),
                if (_stressScore != null)
                  Padding(
                    padding: const EdgeInsets.only(top: 16.0),
                    child: Text(
                      'Stress Score: ${_stressScore!.toStringAsFixed(1)}/20',
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    // Dispose of the controllers to avoid memory leaks
    _controllers.values.forEach((controller) => controller.dispose());
    super.dispose();
  }
}
