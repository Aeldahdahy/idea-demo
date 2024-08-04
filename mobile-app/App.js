import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import IDEALogo from './assets/idea.png';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>
        Hello from 1st IDEA Application :D
      </Text>
      <Image source={IDEALogo} style={styles.logo} />
      <TouchableOpacity style={styles.button} onPress={() => alert('idiot xD')}>
        <Text style={styles.buttonText}>Click Me!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 18, // Adjust the font size as needed
    marginBottom: 20, // Add spacing below the text
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    resizeMode: 'contain', // Adjust how the image should be resized
    marginBottom: 20, // Add spacing below the image
  },
  button: {
    backgroundColor: '#007BFF', // Button background color
    padding: 10, // Padding inside the button
    borderRadius: 5, // Rounded corners
  },
  buttonText: {
    color: '#fff', // Button text color
    fontSize: 16, // Adjust the font size as needed
  },
});
