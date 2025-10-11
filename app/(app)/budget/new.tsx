import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Stack, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

// Mock list of categories for the future dropdown
const CATEGORIES = ['Groceries', 'Dining Out', 'Shopping', 'Travel', 'Bills', 'Miscellaneous'];

export default function NewPurchaseModal() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  // We'll use a string for the selected category for now
  const [category, setCategory] = useState(''); 

  // --- No functionality needed yet, so these handlers are placeholders ---
  const handleSave = () => {
    // In the future, this is where you'd validate and save the {name, amount, category}
    console.log(`Simulating Save: ${name}, $${amount}, ${category}`);
    router.back(); 
  };
  
  // Placeholder for when you implement a dropdown picker/modal
  const handleSelectCategory = (cat: string) => {
    setCategory(cat);
  };

  return (
    <View style={styles.outerContainer}>
      <Stack.Screen 
        options={{
          presentation: 'modal', 
          title: 'Log New Purchase', // Updated Modal Title
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              {/* Using router.back() is better than router.replace('/budget') for modals */}
              <Ionicons name="close" size={24} color="#333" /> 
            </TouchableOpacity>
          ),
          headerShown: true,
        }} 
      />
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Main Input Panel */}
        <View style={styles.inputPanel}>
          <Text style={styles.label}>Item Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., New Running Shoes"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Amount Spent ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            value={amount}
            onChangeText={text => setAmount(text.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Category</Text>
          
          {/* CATEGORY DROPDOWN SIMULATION */}
          <View style={styles.categoryPicker}>
            <Text style={styles.categoryText}>
              {category || 'Select a Category...'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#777" />
          </View>
          
          {/* Mock Buttons for Category Selection (Future Dropdown) */}
          <View style={styles.categoryTags}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.tag,
                  category === cat && styles.tagSelected,
                ]}
                onPress={() => handleSelectCategory(cat)}
              >
                <Text style={[
                  styles.tagText, 
                  category === cat && styles.tagTextSelected
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>

        <View style={styles.saveButtonContainer}>
          <Button 
            title="Log Purchase" 
            onPress={handleSave} 
            color="#007AFF" 
          />
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Very light background
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  
  // --- Input Panel Styling ---
  inputPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 15,
  },

  // --- Category Picker Styling (Dropdown Simulation) ---
  categoryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#F7F7F7',
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 16,
    color: '#666',
  },
  
  // --- Category Tags (Visuals for selection) ---
  categoryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#EAEAEA',
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  tagSelected: {
    backgroundColor: '#E0EEFF', // Light primary color background
    borderColor: '#007AFF',
  },
  tagText: {
    fontSize: 13,
    color: '#555',
  },
  tagTextSelected: {
    color: '#007AFF', // Primary color text
    fontWeight: '600',
  },

  saveButtonContainer: {
    marginTop: 20,
  }
});
