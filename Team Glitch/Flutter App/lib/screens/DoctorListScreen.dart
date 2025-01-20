import 'package:flutter/material.dart';
import 'package:peacify/widgets/DoctorCard.dart';

class DoctorListScreen extends StatelessWidget {
  final List<Map<String, String>> doctors = [
    {
      'name': 'Dr. ABC',
      'email': 'abc@example.com',
      'contactNumber': '+123 456 7890'
    },
    {
      'name': 'Dr. DEF',
      'email': 'def@example.com',
      'contactNumber': '+987 654 3210'
    },
    {
      'name': 'Dr. GHI',
      'email': 'ghi@example.com',
      'contactNumber': '+456 123 7890'
    },
    {
      'name': 'Dr. JKL',
      'email': 'jkl@example.com',
      'contactNumber': '+321 654 9870'
    },
    {
      'name': 'Dr. MNO',
      'email': 'mno@example.com',
      'contactNumber': '+654 321 9870'
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.purple.shade300,
        centerTitle: true,
        title: const Text(
          'Your Doctors',
          style: TextStyle(color: Colors.black, fontSize: 30),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.black),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Colors.purple.shade400,
              Colors.purple.shade300,
              Colors.purple.shade500,
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: ListView.builder(
          itemCount: doctors.length,
          itemBuilder: (context, index) {
            final doctor = doctors[index];
            return Padding(
              padding: const EdgeInsets.all(8.0),
              child: DoctorCard(
                name: doctor['name']!,
                email: doctor['email']!,
                contactNumber: doctor['contactNumber']!,
              ),
            );
          },
        ),
      ),
    );
  }
}
