import 'package:flutter/material.dart';

class NiceTextField extends StatelessWidget {
  final String hintText;
  final TextEditingController controller;
  final bool obscureText;
  final IconData? icon;
  final String? labelText;

  NiceTextField({
    required this.hintText,
    required this.controller,
    this.obscureText = false,
    this.icon,
    this.labelText,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.grey[200],
          borderRadius: BorderRadius.circular(15.0),
          boxShadow: [
            BoxShadow(
              color: Colors.black26,
              blurRadius: 6.0,
              offset: Offset(0, 3), // Shadow position
            ),
          ],
        ),
        child: TextField(
          controller: controller,
          obscureText: obscureText,
          decoration: InputDecoration(
            labelText: labelText, // Optional label text
            labelStyle: TextStyle(color: Colors.black38),
            hintText: hintText,
            hintStyle: TextStyle(color: Colors.black38),
            filled: true,
            fillColor: Colors.grey[200],
            prefixIcon: icon != null
                ? Icon(
                    icon,
                    color: Colors.black38,
                  )
                : null,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(15.0),
              borderSide: BorderSide.none,
            ),
            contentPadding:
                EdgeInsets.symmetric(vertical: 15.0, horizontal: 20.0),
          ),
        ),
      ),
    );
  }
}
