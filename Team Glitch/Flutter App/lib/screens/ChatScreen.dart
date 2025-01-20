import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:peacify/blocs/chat%20bloc/chat_bloc.dart';
import 'package:peacify/blocs/chat%20bloc/chat_event.dart';
import 'package:peacify/blocs/chat%20bloc/chat_state.dart';

class Chatscreen extends StatelessWidget {
  final TextEditingController _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: BlocProvider.of<ChatBloc>(context), // Reuse existing ChatBloc
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.purple.shade300,
          centerTitle: true,
          title: const Text(
            'PeaceBot',
            style: TextStyle(color: Colors.black, fontSize: 30),
          ),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back_ios, color: Colors.black),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ),
        body: Column(
          children: [
            Expanded(
              child: BlocBuilder<ChatBloc, ChatState>(
                builder: (context, state) {
                  if (state is ChatLoading) {
                    return const Center(child: CircularProgressIndicator());
                  } else if (state is ChatLoaded) {
                    return ListView.builder(
                      itemCount: state.messages.length,
                      itemBuilder: (context, index) {
                        final message = state.messages[index];
                        final isUser = message['role'] == 'user';
                        return Align(
                          alignment: isUser
                              ? Alignment.centerRight
                              : Alignment.centerLeft,
                          child: Container(
                            margin: const EdgeInsets.symmetric(
                              vertical: 5,
                              horizontal: 10,
                            ),
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color:
                                  isUser ? Colors.blue[200] : Colors.grey[300],
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Text(message['message'] ?? ""),
                          ),
                        );
                      },
                    );
                  } else if (state is ChatError) {
                    return Center(child: Text(state.errorMessage));
                  }
                  return const Center(child: Text("Start the conversation!"));
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      decoration: const InputDecoration(
                        hintText: "Type your message...",
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  ElevatedButton(
                    onPressed: () {
                      final message = _controller.text.trim();
                      if (message.isNotEmpty) {
                        BlocProvider.of<ChatBloc>(context)
                            .add(SendMessageEvent(message));
                        _controller.clear();
                      }
                    },
                    child: const Text("Send"),
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
