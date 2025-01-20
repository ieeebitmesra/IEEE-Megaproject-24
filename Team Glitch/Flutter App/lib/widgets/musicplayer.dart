import 'package:flutter/material.dart';

class MusicPlayerCard extends StatelessWidget {
  final String imagePath; // Path for the music cover image
  final String trackTitle; // Title of the track
  final VoidCallback onPlay; // Callback for play action
  final VoidCallback onPause; // Callback for pause action
  final VoidCallback onStop; // Callback for stop action

  MusicPlayerCard({
    required this.imagePath,
    required this.trackTitle,
    required this.onPlay,
    required this.onPause,
    required this.onStop,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(15.0),
          boxShadow: [
            BoxShadow(
              color: Colors.black26,
              blurRadius: 6.0,
              offset: Offset(0, 3), // Shadow position
            ),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Music Cover Image
            ClipRRect(
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(15.0),
              ),
              child: Image.asset(
                imagePath,
                height: 120,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),

            // Track Title
            Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 10.0, vertical: 10.0),
              child: Text(
                trackTitle,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),

            // Playback Controls
            Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  IconButton(
                    onPressed: onPlay,
                    icon: const Icon(Icons.play_arrow),
                    color: Colors.green,
                    iconSize: 30.0,
                  ),
                  IconButton(
                    onPressed: onPause,
                    icon: const Icon(Icons.pause),
                    color: Colors.orange,
                    iconSize: 30.0,
                  ),
                  IconButton(
                    onPressed: onStop,
                    icon: const Icon(Icons.stop),
                    color: Colors.red,
                    iconSize: 30.0,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
