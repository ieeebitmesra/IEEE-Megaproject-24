import 'package:flutter/material.dart';
import 'package:peacify/widgets/DietCard.dart';

class DietScreen extends StatelessWidget {
  final List<Map<String, dynamic>> dietPlans = [
    {
      'title': 'Stress',
      'points': [
        'Magnesium-Rich Foods: Spinach, almonds, cashews, pumpkin seeds, avocados.',
        'Vitamin C-Rich Foods: Oranges, kiwis, bell peppers, strawberries.',
        'Omega-3 Fatty Acids: Salmon, walnuts, chia seeds, flaxseeds.',
        'Herbal Teas: Chamomile, green tea (contains L-theanine to promote calmness).',
        'Complex Carbohydrates: Whole grains (oats, quinoa, brown rice) to stabilize blood sugar levels.'
      ],
    },
    {
      'title': 'Depression',
      'points': [
        'Omega-3 Fatty Acids: Fatty fish (salmon, sardines, mackerel), walnuts, chia seeds.',
        'Folate-Rich Foods: Dark leafy greens (spinach, kale), lentils, asparagus.',
        'Tryptophan-Rich Foods: Turkey, eggs, cheese, soy, nuts, and seeds (helps in serotonin production).',
        'Fermented Foods: Yogurt, kefir, kimchi, sauerkraut, and miso (supports gut-brain connection).',
        'Dark Chocolate: Contains flavonoids that may improve mood.',
        'Vitamin D: Eggs, fortified cereals, mushrooms, sunlight exposure.'
      ],
    },
    {
      'title': 'Anxiety',
      'points': [
        'Magnesium and Zinc-Rich Foods: Spinach, pumpkin seeds, chickpeas, dark chocolate.',
        'Probiotic Foods: Yogurt, kombucha, pickles (helps gut-brain axis).',
        'L-theanine Sources: Green tea, matcha.',
        'Low-Glycemic Index Foods: Sweet potatoes, whole grains (to reduce blood sugar spikes that can worsen anxiety).',
        'Vitamin B Complex Foods: Eggs, lean meats, bananas, nutritional yeast.',
      ],
    },
  ];

  DietScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.purple.shade300,
        centerTitle: true,
        title: const Text(
          'Recommended Diet',
          style: TextStyle(color: Colors.black, fontSize: 30),
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
          padding: const EdgeInsets.all(16.0),
          itemCount: dietPlans.length,
          itemBuilder: (context, index) {
            final diet = dietPlans[index];
            return Padding(
              padding: const EdgeInsets.only(bottom: 12.0),
              child: DietCard(
                title: diet['title'],
                points: List<String>.from(diet['points']),
              ),
            );
          },
        ),
      ),
    );
  }
}
