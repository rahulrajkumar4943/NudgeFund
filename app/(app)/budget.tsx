import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
// Mock data for display
const mockDecisions = [
  { id: '1', item: 'New Gaming PC', amount: 1200, status: 'Deferred', date: 'Oct 1, 2025' },
  { id: '2', item: 'Coffee Machine', amount: 150, status: 'Approved', date: 'Sep 25, 2025' },
  { id: '3', item: 'Vacation Tickets', amount: 800, status: 'Deferred', date: 'Sep 10, 2025' },
];

export default function BudgetScreen() {

  const renderItem = ({ item }: { item: typeof mockDecisions[0] }) => (
    <View style={styles.decisionCard}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.item}</Text>
        <Text style={styles.cardAmount}>${item.amount.toLocaleString()}</Text>
      </View>
      
      <View style={styles.cardFooter}>
        <Text style={styles.cardDate}>{item.date}</Text>
        <View style={[
          styles.statusBadge, 
          // Dynamic status colors based on the decision
          item.status === 'Approved' ? styles.statusApproved : styles.statusDeferred
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      
      {/* List of Previous Decisions */}
      <FlatList
        data={mockDecisions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <Text style={styles.listHeaderTitle}>Recent Purchase Analyses</Text>
        )}
        ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No decisions recorded yet. Tap '+' to start.</Text>
        )}
      />

      {/* Floating Action Button (FAB) using Expo Router Link */}
      <Link href="/budget/new" asChild>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7', // Light gray background for the screen
  },
  listContent: {
    padding: 15,
  },
  listHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginLeft: 5,
  },
  // --- CARD STYLES (Simplified) ---
  decisionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    // Use a very light, subtle shadow instead of a heavy one
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
    borderWidth: 1, // Added a subtle border
    borderColor: '#E5E5E5', 
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10, // Increased space
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  cardAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF', // Primary color for amounts
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cardDate: {
    fontSize: 13,
    color: '#6B6B6B',
  },
  // --- STATUS BADGE STYLES (Muted) ---
  statusBadge: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusApproved: {
    backgroundColor: '#E6F7ED', // Very light green
    color: '#00A86B',          // Darker, professional green
  },
  statusDeferred: {
    backgroundColor: '#FBEBEB', // Very light red
    color: '#D80032',          // Darker, professional red
  },
  emptyText: {
      textAlign: 'center',
      marginTop: 50,
      color: '#A0A0A0',
      fontStyle: 'italic',
  },
  // --- FAB STYLES ---
  fab: {
    position: 'absolute',
    width: 56, // Slightly smaller
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 25,
    backgroundColor: '#007AFF',
    borderRadius: 28, // Perfect circle
    // Subtler shadow for a lift effect
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
});
