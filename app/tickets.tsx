import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface Ticket {
  id: string;
  user_id: string;
  type: string;
  ticket_status: string;
  amount: number;
  created_at: Date;
}

export default function TicketsScreen() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    console.log("Fetching tickets for user:", user?.id);
    const { data, error } = await supabase
      .from('Tickets') // lowercase
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tickets:', error);
    } else {
      setTickets(data);
    //   console.log(data)
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchTickets();
    }
  }, [user]);

  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#f59e0b'; // amber
      case 'approved':
        return '#10b981'; // green
      case 'rejected':
        return '#ef4444'; // red
      default:
        return '#6b7280'; // gray
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.type}>{item.type}</Text>
        <Text
          style={[
            styles.status,
            { backgroundColor: getStatusColor(item.ticket_status) },
          ]}
        >
          {item.ticket_status}
        </Text>
      </View>
      <Text style={styles.amount}>₹{item.amount.toLocaleString('en-IN')}</Text>
      <Text style={styles.date}>
        {new Date(item.created_at).toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );
  return (
        <View style={{ flex: 1 , margin:10}}>
        {tickets.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 40 }}>No tickets found</Text>
        ) : (
            <FlatList
            data={tickets}
            keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.container}
            />
        )}
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  type: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  status: {
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
    overflow: 'hidden',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
    color: '#6b7280',
  },
});
