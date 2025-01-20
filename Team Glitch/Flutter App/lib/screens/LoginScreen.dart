import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:peacify/blocs/auth%20block/auth_bloc.dart';
import 'package:peacify/blocs/auth%20block/auth_event.dart';
import 'package:peacify/blocs/auth%20block/auth_state.dart';
import 'package:peacify/widgets/textField.dart'; // Importing the custom textField widget

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  void _onLogin() {
    final email = emailController.text;
    final password = passwordController.text;
    // Dispatch LoginRequested event
    context
        .read<AuthBloc>()
        .add(LoginRequested(email: email, password: password));
  }

  void _onResetPassword() {
    final email = emailController.text;
    // Dispatch ResetPasswordRequested event
    context.read<AuthBloc>().add(ResetPasswordRequested(email: email));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.purple.shade300,
        centerTitle: true,
        title: const Text(
          'Login',
          style: TextStyle(color: Colors.black, fontSize: 30),
        ),
      ),
      body: BlocListener<AuthBloc, AuthState>(
        listener: (context, state) {
          if (state is Authenticated) {
            // Navigate to home screen when authenticated
            Navigator.pushReplacementNamed(context, '/home');
          } else if (state is AuthError) {
            // Show error message for authentication failure
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
                        image:
                            AssetImage('assets/images/onboardingpageimage.png'),
                        fit: BoxFit.cover,
                        alignment: Alignment.topCenter,
                      ),
                    ),
                  ),
                  SizedBox(height: 30),

                  // Email Field
                  NiceTextField(
                    hintText: 'Email',
                    controller: emailController,
                  ),
                  SizedBox(height: 10),

                  // Password Field
                  NiceTextField(
                    hintText: 'Password',
                    controller: passwordController,
                    obscureText: true,
                  ),
                  SizedBox(height: 10),

                  // Login Button
                  ElevatedButton(
                    onPressed: _onLogin,
                    child: const Text('Login'),
                    style: ElevatedButton.styleFrom(
                      elevation: 5,
                      shadowColor: Colors.black,
                    ),
                  ),
                  SizedBox(height: 10),

                  // Forgot Password
                  InkWell(
                    onTap: _onResetPassword,
                    child: const Text(
                      'Forgot Password?',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 14,
                        decoration: TextDecoration.underline,
                      ),
                    ),
                  ),
                  SizedBox(height: 30),

                  // Login with Text
                  const Center(
                    child: Text(
                      '-----Login with-----',
                      style: TextStyle(fontSize: 20, color: Colors.black),
                    ),
                  ),
                  SizedBox(height: 15),

                  // Google Login Button (Optional if BLoC supports Google login)
                  GestureDetector(
                    onTap: () {
                      context.read<AuthBloc>().add(GoogleLoginRequested());
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(20),
                      child: Container(
                        height: 50,
                        width: 150,
                        decoration: BoxDecoration(
                          image: DecorationImage(
                            image: AssetImage('assets/images/google.png'),
                            fit: BoxFit.fill,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
