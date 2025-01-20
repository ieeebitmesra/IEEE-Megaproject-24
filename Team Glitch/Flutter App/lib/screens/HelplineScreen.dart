import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class HelplineScreen extends StatefulWidget {
  const HelplineScreen({super.key});

  @override
  State<HelplineScreen> createState() => _HelplineScreenState();
}

class _HelplineScreenState extends State<HelplineScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.purple.shade300,
        centerTitle: true,
        title: const Text(
          'Helpline',
          style: TextStyle(color: Colors.black, fontSize: 30),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.black),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: SingleChildScrollView(
        child: SizedBox(
          height: MediaQuery.of(context).size.height,
          child: Container(
            width: double.infinity,
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
              children: [
                Padding(
                  padding: const EdgeInsets.all(20),
                  child: Center(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Image.asset('assets/images/3lion.png',
                            height: 200, width: 200),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                Padding(
                  padding: const EdgeInsets.all(20),
                  child: ElevatedButton(
                    onPressed: () async {
                      final phone = '+919820466726';
                      final url = 'tel:$phone';
                      if (await canLaunch(url)) {
                        await launch(url);
                      } else {
                        throw 'Could not launch $url';
                      }
                    },
                    style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all(Colors.green.shade100),
                      minimumSize:
                          MaterialStateProperty.all(const Size(200, 50)),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: const [
                        Icon(Icons.phone),
                        SizedBox(width: 10),
                        Text(
                          'AASRA Helpline',
                          style: TextStyle(fontSize: 20),
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(
                  height: 10,
                ),
                Padding(
                  padding: const EdgeInsets.all(20),
                  child: ElevatedButton(
                    onPressed: () async {
                      final phone = '+912227726771';
                      final url = 'tel:$phone';
                      if (await canLaunch(url)) {
                        await launch(url);
                      } else {
                        throw 'Could not launch $url';
                      }
                    },
                    style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all(Colors.green.shade100),
                      minimumSize:
                          MaterialStateProperty.all(const Size(200, 50)),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: const [
                        Icon(Icons.phone),
                        SizedBox(width: 10),
                        Text(
                          'Snehi Helpline',
                          style: TextStyle(fontSize: 20),
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(
                  height: 10,
                ),
                Padding(
                  padding: const EdgeInsets.all(20),
                  child: ElevatedButton(
                    onPressed: () async {
                      final phone = '+912227726771';
                      final url = 'tel:$phone';
                      if (await canLaunch(url)) {
                        await launch(url);
                      } else {
                        throw 'Could not launch $url';
                      }
                    },
                    style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all(Colors.green.shade100),
                      minimumSize:
                          MaterialStateProperty.all(const Size(200, 50)),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: const [
                        Icon(Icons.phone),
                        SizedBox(width: 10),
                        Text(
                          'Vandrevala Helpline',
                          style: TextStyle(fontSize: 20),
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(
                  height: 10,
                ),
                Padding(
                  padding: const EdgeInsets.all(20),
                  child: ElevatedButton(
                    onPressed: () async {
                      final urll = 'https://manas.org.in/';
                      if (await canLaunch(urll)) {
                        await launch(urll);
                      } else {
                        throw 'Could not launch $urll';
                      }
                    },
                    style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all(Colors.green.shade100),
                      minimumSize:
                          MaterialStateProperty.all(const Size(200, 50)),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: const [
                        Icon(Icons.public),
                        SizedBox(width: 10),
                        Text(
                          'MANAS Helpline',
                          style: TextStyle(fontSize: 20),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
