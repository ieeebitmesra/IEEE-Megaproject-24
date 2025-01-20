import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:peacify/blocs/auth%20block/auth_bloc.dart';
import 'package:peacify/blocs/auth%20block/auth_event.dart';
import 'package:peacify/blocs/auth%20block/auth_state.dart';
import 'package:peacify/widgets/textField.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  void _onSignup() {
    final email = emailController.text.trim();
    final password = passwordController.text.trim();

    // Dispatch SignupRequested event
    context
        .read<AuthBloc>()
        .add(SignupRequested(email: email, password: password));
  }

  void _showSuccessPopup() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Account Created'),
          content: const Text('Your account has been successfully created!'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.pushReplacementNamed(
                    context, '/login'); // Navigate to home screen
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.purple.shade300,
        centerTitle: true,
        title: const Text(
          'SignUp',
          style: TextStyle(color: Colors.black, fontSize: 30),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () {
            Navigator.pop(context); // Pop the screen from navigation stack
          },
        ),
      ),
      body: BlocListener<AuthBloc, AuthState>(
        listener: (context, state) {
          if (state is Authenticated) {
            _showSuccessPopup(); // Show success popup when authenticated
          } else if (state is AuthError) {
            // Show error message if signup fails
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(state.error)),
            );
          }
        },
        child: SingleChildScrollView(
          child: SizedBox(
            height: MediaQuery.of(context).size.height,
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
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  // Top Image
                  Container(
                    width: MediaQuery.of(context).size.width,
                    height: MediaQuery.of(context).size.height * 0.3,
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: const AssetImage(
                            'assets/images/onboardingpageimage.png'),
                        fit: BoxFit.cover,
                        alignment: Alignment.topCenter,
                      ),
                    ),
                  ),
                  const SizedBox(height: 30),

                  // Email Field
                  NiceTextField(
                    hintText: 'Email',
                    controller: emailController,
                    icon: Icons.email,
                  ),
                  const SizedBox(height: 10),

                  // Password Field
                  NiceTextField(
                    hintText: 'Create Password',
                    controller: passwordController,
                    obscureText: true,
                    icon: Icons.password,
                  ),
                  const SizedBox(height: 10),

                  // Signup Button
                  ElevatedButton(
                    onPressed: _onSignup,
                    child: const Text(
                      'Signup',
                      style: TextStyle(color: Colors.black),
                    ),
                    style: ElevatedButton.styleFrom(
                      elevation: 5,
                      shadowColor: Colors.black,
                    ),
                  ),
                  const SizedBox(height: 10),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
