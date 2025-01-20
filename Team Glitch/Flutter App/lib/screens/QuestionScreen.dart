import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class QuestionScreen extends StatefulWidget {
  const QuestionScreen({super.key});

  @override
  State<QuestionScreen> createState() => _QuestionScreenState();
}

class _QuestionScreenState extends State<QuestionScreen> {
  final TextEditingController _ageController = TextEditingController();
  final TextEditingController _sleepHoursController = TextEditingController();
  final TextEditingController _exerciseHoursController =
      TextEditingController();
  final TextEditingController _dietQualityController = TextEditingController();
  final TextEditingController _socialInteractionScoreController =
      TextEditingController();
  final TextEditingController _stressLevelController = TextEditingController();
  final TextEditingController _workHoursController = TextEditingController();
  final TextEditingController _screenTimeController = TextEditingController();
  final TextEditingController _financialStressController =
      TextEditingController();
  final TextEditingController _familySupportController =
      TextEditingController();
  final TextEditingController _therapySessionsController =
      TextEditingController();

  String? _gender;
  String? _chronicIllness;
  bool _isLoading = false;
  String _predictedStressLevel = '';

  Future<void> sendSurveyData() async {
    final Map<String, dynamic> surveyData = {
      "Age": int.tryParse(_ageController.text) ?? 0,
      "Gender": _gender ?? "Male",
      "Sleep Hours": int.tryParse(_sleepHoursController.text) ?? 0,
      "Exercise Hours": int.tryParse(_exerciseHoursController.text) ?? 0,
      "Diet Quality": int.tryParse(_dietQualityController.text) ?? 0,
      "Social Interaction Score":
          int.tryParse(_socialInteractionScoreController.text) ?? 0,
      "Stress Level": int.tryParse(_stressLevelController.text) ?? 0,
      "Work Hours": int.tryParse(_workHoursController.text) ?? 0,
      "Screen Time": int.tryParse(_screenTimeController.text) ?? 0,
      "Financial Stress": int.tryParse(_financialStressController.text) ?? 0,
      "Chronic Illness": _chronicIllness ?? "No",
      "Family Support": int.tryParse(_familySupportController.text) ?? 0,
      "Therapy Sessions": int.tryParse(_therapySessionsController.text) ?? 0,
    };

    setState(() {
      _isLoading = true;
      _predictedStressLevel = '';
    });

    try {
      final url = Uri.parse(
          'https://peacify-api.onrender.com/predict'); // Replace with your API endpoint
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(surveyData),
      );

      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        setState(() {
          _predictedStressLevel =
              responseData['Predicted Stress Level'] ?? 'No data available';
        });
      } else {
        setState(() {
          _predictedStressLevel =
              'Error: ${response.statusCode} - ${response.reasonPhrase}';
        });
      }
    } catch (e) {
      setState(() {
        _predictedStressLevel = 'Error: $e';
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.purple.shade300,
        centerTitle: true,
        title: const Text(
          'Health Survey',
          style: TextStyle(color: Colors.black, fontSize: 30),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              _buildTextInputField('Age', _ageController),
              _buildDropdownField('Gender', ['Male', 'Female', 'Other'],
                  (value) => _gender = value),
              _buildTextInputField('Sleep Hours', _sleepHoursController),
              _buildTextInputField('Exercise Hours', _exerciseHoursController),
              _buildTextInputField(
                  'Diet Quality (1-10)', _dietQualityController),
              _buildTextInputField('Social Interaction Score (1-10)',
                  _socialInteractionScoreController),
              _buildTextInputField(
                  'Stress Level (1-10)', _stressLevelController),
              _buildTextInputField('Work Hours', _workHoursController),
              _buildTextInputField(
                  'Screen Time (hours)', _screenTimeController),
              _buildTextInputField(
                  'Financial Stress (1-10)', _financialStressController),
              _buildDropdownField('Chronic Illness', ['Yes', 'No'],
                  (value) => _chronicIllness = value),
              _buildTextInputField(
                  'Family Support (1-10)', _familySupportController),
              _buildTextInputField(
                  'Therapy Sessions', _therapySessionsController),
              const SizedBox(height: 24),
              _isLoading
                  ? const CircularProgressIndicator()
                  : ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.purple.shade300,
                        padding: const EdgeInsets.symmetric(
                            horizontal: 32, vertical: 12),
                      ),
                      onPressed: sendSurveyData,
                      child: const Text('Submit',
                          style: TextStyle(fontSize: 18, color: Colors.black)),
                    ),
              const SizedBox(height: 24),
              if (_predictedStressLevel.isNotEmpty)
                Text(
                  'Predicted Stress Level: $_predictedStressLevel',
                  style: const TextStyle(
                      fontSize: 18, fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center,
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTextInputField(String label, TextEditingController controller) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: TextField(
        controller: controller,
        keyboardType: TextInputType.number,
        decoration: InputDecoration(
          labelText: label,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
        ),
      ),
    );
  }

  Widget _buildDropdownField(
      String label, List<String> items, ValueChanged<String?> onChanged) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: DropdownButtonFormField<String>(
        decoration: InputDecoration(
          labelText: label,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
        ),
        items: items
            .map((item) => DropdownMenuItem(
                  value: item,
                  child: Text(item),
                ))
            .toList(),
        onChanged: onChanged,
      ),
    );
  }
}
