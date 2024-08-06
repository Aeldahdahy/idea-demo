import { View, Text, StyleSheet } from "react-native";

export default function OnBoard() {
  return (
    <View style={styles.OnBoardContainer}>
      <View style={styles.TextContainer}>
        <Text style={styles.OnBoardHeader}>
          Welcome to
        </Text>
        <Text style={styles.OnBoardHeaderBold}>
            IDEA.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  OnBoardContainer: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 16, // Add some padding around
  },
  TextContainer: {
    flex: 1,
    paddingTop:100,
    width: '100%', // Ensure container spans full width
    alignItems: 'center',
},
OnBoardHeader: {
    fontSize: 24, // Set font size
    fontWeight: 'normal', // Normal weight for regular text
    color: '#000', // Text color
    textAlign: 'center', // Center text within the container
},
OnBoardHeaderBold: {
    fontSize: 24, // Set font size to match
    fontWeight: 'bold', // Bold weight for emphasis
    color: '#000', // Bold text color
  }
});
