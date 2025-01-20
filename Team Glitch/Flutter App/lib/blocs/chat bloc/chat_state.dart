abstract class ChatState {}

class ChatInitial extends ChatState {}

class ChatLoading extends ChatState {}

class ChatLoaded extends ChatState {
  final List<Map<String, String>> messages;

  ChatLoaded(this.messages);
}

class ChatError extends ChatState {
  final String errorMessage;

  ChatError(this.errorMessage);
}
