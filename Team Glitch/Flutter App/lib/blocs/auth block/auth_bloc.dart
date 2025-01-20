import 'package:bloc/bloc.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'auth_event.dart';
import 'auth_state.dart';
import 'package:firebase_auth/firebase_auth.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final FirebaseAuth _auth;
  final GoogleSignIn _googleSignIn;

  AuthBloc(this._auth, this._googleSignIn) : super(AuthInitial()) {
    on<LoginRequested>((event, emit) async {
      emit(AuthLoading());
      try {
        final userCredential = await _auth.signInWithEmailAndPassword(
            email: event.email, password: event.password);
        emit(Authenticated(userId: userCredential.user!.uid));
      } catch (e) {
        emit(AuthError(error: e.toString()));
      }
    });

    on<SignupRequested>((event, emit) async {
      emit(AuthLoading());
      try {
        final userCredential = await _auth.createUserWithEmailAndPassword(
          email: event.email,
          password: event.password,
        );
        emit(Authenticated(userId: userCredential.user!.uid));
      } catch (e) {
        emit(AuthError(error: e.toString()));
      }
    });

    on<LogoutRequested>((event, emit) async {
      print("LogoutRequested event received");
      await _auth.signOut();
      await _googleSignIn.signOut(); // Ensure Google sign-out as well
      print("Firebase and Google signOut called");
      emit(Unauthenticated());
      print("Unauthenticated state emitted");
    });

    on<ResetPasswordRequested>((event, emit) async {
      emit(AuthLoading());
      try {
        await _auth.sendPasswordResetEmail(email: event.email);
        emit(PasswordResetSuccess());
      } catch (e) {
        emit(PasswordResetError(error: e.toString()));
      }
    });

    on<GoogleLoginRequested>((event, emit) async {
      emit(AuthLoading());
      try {
        // Trigger Google SignIn flow
        final googleUser = await _googleSignIn.signIn();
        if (googleUser == null) {
          emit(AuthError(error: "Google Sign-In canceled"));
          return;
        }

        // Obtain the Google authentication details
        final googleAuth = await googleUser.authentication;

        // Create a credential from the Google authentication details
        final credential = GoogleAuthProvider.credential(
          accessToken: googleAuth.accessToken,
          idToken: googleAuth.idToken,
        );

        // Sign in with the credential
        final userCredential = await _auth.signInWithCredential(credential);
        emit(Authenticated(userId: userCredential.user!.uid));
      } catch (e) {
        emit(AuthError(error: e.toString()));
      }
    });
  }
}
