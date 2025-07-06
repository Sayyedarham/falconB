import { View, StyleSheet, Text } from "react-native";

export default function SupportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Support Contact</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>+91 73891 79872</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>professor.369.money@gmail.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#f9f9f9",
    textAlign:'center'
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    color: "#222",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#888",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#333",
  },
});
