import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:peacify/blocs/auth%20block/auth_state.dart';
import 'package:peacify/blocs/chat%20bloc/chat_bloc.dart';
// ignore: unused_import
import 'package:peacify/screens/ChatScreen.dart';
import 'package:peacify/screens/DietScreen.dart';
import 'package:peacify/screens/DoctorListScreen.dart';
import 'package:peacify/screens/HelplineScreen.dart';
import 'package:peacify/screens/MusicScreen.dart';
import 'package:peacify/screens/OnboardingScreen.dart';
import 'package:peacify/screens/LoginScreen.dart';
import 'package:peacify/screens/QuestionScreen.dart';
import 'package:peacify/screens/SignupScreen.dart';
import 'package:peacify/screens/HomeScreen.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:peacify/screens/Stress.dart';
import 'blocs/auth block/auth_bloc.dart'; // Import AuthBloc

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(
    BlocProvider(
      create: (context) => AuthBloc(FirebaseAuth.instance, GoogleSignIn()),
      child: MainApp(),
    ),
  );
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        textTheme: GoogleFonts.ptSerifTextTheme(
          Theme.of(context).textTheme,
        ),
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => BlocBuilder<AuthBloc, AuthState>(
              builder: (context, state) {
                if (state is Authenticated) {
                  return HomeScreen();
                } else {
                  return OnboardingScreen();
                }
              },
            ),
        '/onboarding': (context) => const OnboardingScreen(),
        '/login': (context) => const LoginScreen(),
        '/signup': (context) => const SignupScreen(),
        '/home': (context) => HomeScreen(),
        '/helpline': (context) => const HelplineScreen(),
        '/question': (context) => const QuestionScreen(),
        '/music': (context) => Musicscreen(),
        '/chat': (context) => BlocProvider(
              create: (context) => ChatBloc(),
              child: Chatscreen(),
            ),
        '/doc': (context) => DoctorListScreen(),
        '/stress': (context) => Stressscreen(),
        '/diet': (context) => DietScreen(),
      },
      onUnknownRoute: (settings) {
        return MaterialPageRoute(
          builder: (context) => const Scaffold(
            body: Center(child: Text('Page not found!')),
          ),
        );
      },
    );
  }
}
