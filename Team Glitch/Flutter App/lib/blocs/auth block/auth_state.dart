import 'package:equatable/equatable.dart';

abstract class AuthState extends Equatable {
  @override
  List<Object> get props => [];
}

class AuthInitial extends AuthState {}

class AuthLoading extends AuthState {}

class Authenticated extends AuthState {
  final String userId;

  Authenticated({required this.userId});

  @override
  List<Object> get props => [userId];
}

class Unauthenticated extends AuthState {}

class AuthError extends AuthState {
  final String error;

  AuthError({required this.error});

  @override
  List<Object> get props => [error];
}

class PasswordResetSuccess extends AuthState {
  PasswordResetSuccess();
}

class PasswordResetError extends AuthState {
  final String error;

  PasswordResetError({required this.error});

  @override
  List<Object> get props => [error];
}
