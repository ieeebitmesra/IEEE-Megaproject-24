import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:just_audio/just_audio.dart';
import 'package:peacify/blocs/music%20bloc/music_player_event.dart';
import 'package:peacify/blocs/music%20bloc/music_player_state.dart';

class MusicPlayerBloc extends Bloc<MusicPlayerEvent, MusicPlayerState> {
  final AudioPlayer _audioPlayer = AudioPlayer();

  MusicPlayerBloc() : super(MusicPlayerInitial()) {
    // Registering events
    on<PlayMusic>(_onPlayMusic);
    on<PauseMusic>(_onPauseMusic);
    on<StopMusic>(_onStopMusic);
    on<SeekMusic>(_onSeekMusic);
    on<UpdatePosition>(_onUpdatePosition);

    // Listen to the position stream of the audio player
    _audioPlayer.positionStream.listen((position) {
      if (_audioPlayer.playing) {
        try {
          add(UpdatePosition(position));
        } catch (e) {
          // Handle errors safely
          print('Error adding UpdatePosition event: $e');
        }
      }
    });
  }

  Future<void> _onPlayMusic(
      PlayMusic event, Emitter<MusicPlayerState> emit) async {
    try {
      if (event.url.startsWith('assets/')) {
        await _audioPlayer.setAsset(event.url); // For assets
      } else {
        await _audioPlayer.setUrl(event.url); // For network URLs
      }
      _audioPlayer.play();
      emit(MusicPlayerPlaying(
          _audioPlayer.position, _audioPlayer.duration ?? Duration.zero));
    } catch (e) {
      emit(MusicPlayerError(e.toString()));
    }
  }

  Future<void> _onPauseMusic(
      PauseMusic event, Emitter<MusicPlayerState> emit) async {
    _audioPlayer.pause();
    emit(MusicPlayerPaused());
  }

  Future<void> _onStopMusic(
      StopMusic event, Emitter<MusicPlayerState> emit) async {
    _audioPlayer.stop();
    emit(MusicPlayerStopped());
  }

  Future<void> _onSeekMusic(
      SeekMusic event, Emitter<MusicPlayerState> emit) async {
    _audioPlayer.seek(event.position);
    emit(MusicPlayerPlaying(
        event.position, _audioPlayer.duration ?? Duration.zero));
  }

  void _onUpdatePosition(UpdatePosition event, Emitter<MusicPlayerState> emit) {
    emit(MusicPlayerPlaying(
        event.position, _audioPlayer.duration ?? Duration.zero));
  }

  @override
  Future<void> close() {
    _audioPlayer.dispose();
    return super.close();
  }
}
