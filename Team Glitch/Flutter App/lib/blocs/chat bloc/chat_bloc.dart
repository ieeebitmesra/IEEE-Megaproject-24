import 'dart:async';
import 'dart:convert';
import 'package:bloc/bloc.dart';
import 'package:http/http.dart' as http;
import 'chat_event.dart';
import 'chat_state.dart';

class ChatBloc extends Bloc<ChatEvent, ChatState> {
  final List<Map<String, String>> _messages = [];

  ChatBloc() : super(ChatInitial()) {
    on<SendMessageEvent>(_onSendMessage);
  }

  Future<void> _onSendMessage(
      SendMessageEvent event, Emitter<ChatState> emit) async {
    emit(ChatLoading());
    print("ChatLoading emitted");

    try {
      // Add user's message
      _messages.add({"role": "user", "message": event.userMessage});
      print("User message added: ${event.userMessage}");

      // API call
      final response = await http.post(
        Uri.parse('https://chatbot-peacify3.onrender.com/chat'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({"message": event.userMessage}),
      );

      if (response.statusCode == 200) {
        final responseData = json.decode(response.body);
        final botName = responseData['bot_name'];
        final botResponse = responseData['response'];

        // Add bot's response
        _messages.add({
          "role": "bot",
          "message": "$botName says: $botResponse",
        });
        print("Bot response added: $botResponse");

        emit(ChatLoaded(List.from(_messages)));
        print("ChatLoaded emitted with messages: $_messages");
      } else {
        emit(ChatError("Failed to fetch chatbot response"));
        print("ChatError emitted: Failed to fetch chatbot response");
      }
    } catch (e) {
      emit(ChatError("An error occurred: $e"));
      print("ChatError emitted: $e");
    }
  }
}
