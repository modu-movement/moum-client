import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>기록</Text>
      </View>
      <View style={styles.content}>
        <Text>Diary</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "violet",
  },
  header: {
    height: 80,
    backgroundColor: "yellow",
    justifyContent: "flex-end", // 타이틀을 헤더 아래쪽에 배치
    shadowColor: "#000",
    paddingHorizontal: 16,
    paddingBottom: 20, // 아래쪽 여백 추가
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})