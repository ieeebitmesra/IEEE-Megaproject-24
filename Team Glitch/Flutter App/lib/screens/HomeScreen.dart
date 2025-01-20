import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:peacify/blocs/auth%20block/auth_bloc.dart';
import 'package:peacify/blocs/auth%20block/auth_event.dart';
import 'package:peacify/blocs/auth%20block/auth_state.dart';
import 'package:peacify/widgets/CustomCard.dart';
// import 'package:peacify/main.dart';

class HomeScreen extends StatefulWidget {
  final List<Map<String, dynamic>> cardData = [
    {
      'title': 'Depression Detection ',
      'imagePath': 'assets/images/stress.jpg',
      'icon': Icons.error_outline,
      'onTap': (BuildContext context) {
        Navigator.pushNamed(context, '/question');
      },
    },
    {
      'title': 'Stress Level Detection',
      'imagePath': 'assets/images/mentalhealth.webp',
      'icon': Icons.error_outline,
      'onTap': (BuildContext context) {
        Navigator.pushNamed(context, '/stress');
      },
    },
    {
      'title': 'Peacify ChatBot',
      'imagePath': 'assets/images/chatbot.webp',
      'icon': Icons.message_outlined,
      'onTap': (BuildContext context) {
        Navigator.pushNamed(context, '/chat');
      },
    },
    {
      'title': 'National Helpline',
      'imagePath': 'assets/images/helpline.webp',
      'icon': Icons.help_center_outlined,
      'onTap': (BuildContext context) {
        Navigator.pushNamed(context, '/helpline');
      },
    },
    {
      'title': 'Your Doctors',
      'imagePath': 'assets/images/doctors.webp',
      'icon': Icons.local_hospital_outlined,
      'onTap': (BuildContext context) {
        Navigator.pushNamed(context, '/doc');
      },
    },
    {
      'title': 'Diet Plan',
      'imagePath': 'assets/images/diet.webp',
      'icon': Icons.access_time,
      'onTap': (BuildContext context) {
        Navigator.pushNamed(context, '/diet');
      },
    },
    {
      'title': 'Melodies',
      'imagePath': 'assets/images/music.webp',
      'icon': Icons.music_note,
      'onTap': (BuildContext context) {
        Navigator.pushNamed(context, '/music');
      },
    },
  ];

  HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return BlocListener<AuthBloc, AuthState>(
      listener: (context, state) {
        if (state is Unauthenticated) {
          Navigator.pushReplacementNamed(context, '/onboarding');
        }
      },
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.purple.shade300,
          centerTitle: true,
          title: const Text(
            'Peacify',
            style: TextStyle(color: Colors.black, fontSize: 30),
          ),
          leading: IconButton(
            icon: const Icon(Icons.exit_to_app, color: Colors.black),
            onPressed: () {
              context.read<AuthBloc>().add(LogoutRequested());
            },
          ),
        ),
        body: SingleChildScrollView(
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Colors.purple.shade400,
                  Colors.purple.shade300,
                  Colors.purple.shade500,
                  Colors.purple.shade700,
                ],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
            ),
            child: ListView.builder(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              itemCount: widget.cardData.length,
              itemBuilder: (context, index) {
                var card = widget.cardData[index];
                return CustomCard(
                  title: card['title'],
                  imagePath: card['imagePath'],
                  icon: card['icon'],
                  onTap: () => card['onTap'](context),
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}
