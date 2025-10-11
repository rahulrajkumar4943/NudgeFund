import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Stack, router } from 'expo-router'; // Import Stack and router
import Ionicons from '@expo/vector-icons/Ionicons';

// ----------------------------------------------------------------------
// NOTE: This component is your existing form, slightly styled and using 
// a custom header for the modal close button.
// ----------------------------------------------------------------------

export default function NewPurchaseModal() {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState(['', '', '']);
  const [suggestion, setSuggestion] = useState('');
  const [finalDecision, setFinalDecision] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    if (!item || !amount) {
      Alert.alert('Missing Info', 'Please enter both item and amount.');
      return;
    }
    setStarted(true);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const handleGenerateSuggestion = () => {
    if (questions.some(q => !q.trim())) {
      Alert.alert('Incomplete', 'Please answer all questions.');
      return;
    }

    setLoading(true);
    // Use a delay for a realistic loading state
    setTimeout(() => {
      const isSignificant = parseFloat(amount) > 100;
      setSuggestion(
        `Spending $${amount} on "${item}" seems ${isSignificant ? 'significant' : 'reasonable'}. ` +
        `Based on your answers, consider waiting if it's not urgent or will stretch your budget.`
      );
      setLoading(false);
    }, 1200);
  };

  const handleSave = () => {
    if (!finalDecision.trim()) {
      Alert.alert('Missing Decision', 'Please enter your final decision.');
      return;
    }

    // Simulate saving and close the modal
    console.log({ item, amount, answers: questions, suggestion, finalDecision });
    Alert.alert('Saved!', 'Your decision has been recorded.');
    
    // Use router.back() to close the modal and return to the budget screen
    router.back(); 
  };

  return (
    // Stack.Screen is used to configure the header inside the component
    <View style={{ flex: 1 }}>
      <Stack.Screen 
        options={{
          // Use presentation: 'modal' to show it as a sheet/modal
          presentation: 'modal', 
          title: 'New Purchase Analysis',
          // Add a custom close button on the left for a good UX
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/budget')} style={{ marginLeft: 10 }}>
              <Ionicons name="close" size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
          headerShown: true, // Ensure the header is visible
        }} 
      />
      <ScrollView contentContainerStyle={styles.container}>
        {!started ? (
          <>
            <Text style={styles.title}>What are you budgeting for?</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 2, marginRight: 10 }]}
                placeholder="Item (e.g. New Shoes)"
                placeholderTextColor="#888"
                value={item}
                onChangeText={setItem}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Amount ($)"
                placeholderTextColor="#888"
                value={amount}
                onChangeText={text => setAmount(text.replace(/[^0-9.]/g, ''))} // Only allow numbers
                keyboardType="numeric"
              />
            </View>
            <Button title="Start Analysis" onPress={handleStart} color="#10b981" />
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>Answer these 3 questions:</Text>

            <Text style={styles.question}>1. Is this essential or optional?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Essential for work"
              value={questions[0]}
              onChangeText={(text) => handleQuestionChange(0, text)}
            />

            <Text style={styles.question}>2. Can you afford this without impacting essentials?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Yes, I saved for it."
              value={questions[1]}
              onChangeText={(text) => handleQuestionChange(1, text)}
            />

            <Text style={styles.question}>3. Will it provide long-term value or satisfaction?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Yes, long-term hobby satisfaction."
              value={questions[2]}
              onChangeText={(text) => handleQuestionChange(2, text)}
            />

            <Button title="Generate Suggestion" onPress={handleGenerateSuggestion} />

            {loading && <ActivityIndicator size="large" color="#10b981" style={{ marginVertical: 20 }} />}

            {suggestion && (
              <>
                <Text style={styles.subtitle}>AI Suggestion:</Text>
                <View style={styles.suggestionBox}>
                  <Text style={{ fontStyle: 'italic', color: '#374151' }}>{suggestion}</Text>
                </View>

                <Text style={styles.question}>Your Final Decision:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. I'll wait until next month"
                  value={finalDecision}
                  onChangeText={setFinalDecision}
                />

                <Button title="Save Decision" onPress={handleSave} color="#007AFF" />
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#1f2937',
  },
  question: {
    fontSize: 16,
    marginBottom: 5,
    color: '#374151',
    fontWeight: '500',
  },
  input: {
    height: 45,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#1f2937',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  suggestionBox: {
    backgroundColor: '#d1fae5', // Light green background
    padding: 15,
    borderRadius: 8,
    marginBottom: 25,
    borderColor: '#34d399',
    borderLeftWidth: 4,
  },
});
