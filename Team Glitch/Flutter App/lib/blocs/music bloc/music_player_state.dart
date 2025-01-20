abstract class MusicPlayerState {}

class MusicPlayerInitial extends MusicPlayerState {}

class MusicPlayerPlaying extends MusicPlayerState {
  final Duration position;
  final Duration duration;

  MusicPlayerPlaying(this.position, this.duration);
}

class MusicPlayerPaused extends MusicPlayerState {}

class MusicPlayerStopped extends MusicPlayerState {}

class MusicPlayerError extends MusicPlayerState {
  final String message;

  MusicPlayerError(this.message);
}
