import { StyleSheet, Text, View } from "react-native";

export default function MyPage() {
  return (
    <View style={styles.container}>
        <Text>My page!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center" 
  }
})