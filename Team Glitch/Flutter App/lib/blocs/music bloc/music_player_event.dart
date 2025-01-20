import 'package:equatable/equatable.dart';

abstract class MusicPlayerEvent extends Equatable {
  const MusicPlayerEvent();

  @override
  List<Object?> get props => [];
}

class PlayMusic extends MusicPlayerEvent {
  final String url; // URL of the music track to play

  const PlayMusic(this.url);

  @override
  List<Object?> get props => [url];
}

class PauseMusic extends MusicPlayerEvent {}

class StopMusic extends MusicPlayerEvent {}

class SeekMusic extends MusicPlayerEvent {
  final Duration position;

  const SeekMusic(this.position);

  @override
  List<Object?> get props => [position];
}

class UpdatePosition extends MusicPlayerEvent {
  final Duration position;

  const UpdatePosition(this.position);

  @override
  List<Object?> get props => [position];
}
