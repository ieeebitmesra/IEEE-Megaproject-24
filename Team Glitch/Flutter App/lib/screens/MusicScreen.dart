import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:peacify/blocs/music%20bloc/music_player_bloc.dart';
import 'package:peacify/blocs/music%20bloc/music_player_event.dart';
import 'package:peacify/models/musictrackmodel.dart';
import 'package:peacify/widgets/musicplayer.dart';

class Musicscreen extends StatelessWidget {
  final List<MusicTrack> tracks = [
    MusicTrack(
      imagePath: 'assets/images/piano.jpg',
      trackTitle: 'Song 1',
      url: 'assets/music/emotional-piano-music-256262.mp3',
    ),
    MusicTrack(
      imagePath: 'assets/images/forest.jpg',
      trackTitle: 'Song 2',
      url: 'assets/music/the-beat-of-nature-122841.mp3',
    ),
    MusicTrack(
      imagePath: 'assets/images/rain.jpg',
      trackTitle: 'Song 3',
      url: 'assets/music/calming-rain-257596.mp3',
    ),
    MusicTrack(
      imagePath: 'assets/images/Nature.jpg',
      trackTitle: 'Song 4',
      url: 'assets/music/calm-nature-sounds-196258.mp3',
    ),
  ];

  Musicscreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider<MusicPlayerBloc>(
      create: (context) =>
          MusicPlayerBloc(), // Provide the MusicPlayerBloc here
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.purple.shade300,
          centerTitle: true,
          title: const Text(
            'Music',
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
                Colors.purple.shade700,
              ],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
          ),
          child: ListView.builder(
            itemCount: tracks.length,
            itemBuilder: (context, index) {
              final track = tracks[index];
              return MusicPlayerCard(
                imagePath: track.imagePath,
                trackTitle: track.trackTitle,
                onPlay: () {
                  // Trigger PlayMusic event with the track's URL
                  BlocProvider.of<MusicPlayerBloc>(context)
                      .add(PlayMusic(track.url));
                },
                onPause: () {
                  // Trigger PauseMusic event
                  BlocProvider.of<MusicPlayerBloc>(context).add(PauseMusic());
                },
                onStop: () {
                  // Trigger StopMusic event
                  BlocProvider.of<MusicPlayerBloc>(context).add(StopMusic());
                },
              );
            },
          ),
        ),
      ),
    );
  }
}
