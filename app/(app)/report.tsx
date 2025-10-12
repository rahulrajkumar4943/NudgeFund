import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';

// ---------------------------------------------------------------
// 1. SUPABASE/AUTH IMPORTS
// ---------------------------------------------------------------
import { supabase } from '@/lib/supabaseClient'; // Adjust path as necessary
import { useAuth } from '@/lib/AuthContext';    // Adjust path as necessary
// ---------------------------------------------------------------

// Define the precise structure from your Purchases table
type PurchaseDecision = {
  id: string;
  created_at: string;
  name: string;
  amount: number;
  category: string;
  emotion: 'positive' | 'neutral' | 'negative';
  final_name: string;
  final_amount: number;
  userId: string; // Including userId since it's in the DB
};

export default function ReportScreen() {
  const { session } = useAuth();
  const [reportData, setReportData] = useState<PurchaseDecision[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from Supabase
  const fetchAllData = async () => {
    if (!session?.user?.id) {
      setError("User session not found.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    // Select ONLY the exact columns specified by the user
    const { data, error: fetchError } = await supabase
      .from('Purchases')
      .select('id, created_at, name, amount, category, emotion, final_name, final_amount, userId')
      .eq('userId', session.user.id)
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching report data:', fetchError);
      setError(`Failed to fetch data: ${fetchError.message}`);
    } else if (data) {
      setReportData(data as PurchaseDecision[]);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllData();
      return () => { };
    }, [session])
  );
  
  // Use JSON.stringify to format the data
  // The '2' argument provides a clean 2-space indentation
  const jsonReport = reportData 
    ? JSON.stringify(reportData, null, 2) 
    : (error ? `// Error: ${error}` : '// Loading...');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Full Data Report (JSON)</Text>
      
      {loading && !error && (
        <View style={styles.centerContent}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading data from Supabase...</Text>
        </View>
      )}

      {error && (
        <View style={styles.centerContent}>
            <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!loading && (
        <ScrollView style={styles.jsonContainer} contentContainerStyle={styles.scrollContent}>
          {/* Display the JSON string */}
          <Text style={styles.jsonText}>{jsonReport}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  jsonContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Dark background for code
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 15,
  },
  jsonText: {
    fontFamily: 'Menlo', // Monospaced font for code readability (ensure this font is available or use a fallback like 'Courier New')
    fontSize: 12,
    color: '#D4D4D4', // Light gray/white text
    lineHeight: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#6B6B6B',
  },
  errorText: {
    marginTop: 10,
    color: '#D80032',
    textAlign: 'center',
    fontWeight: '600',
  }
});
