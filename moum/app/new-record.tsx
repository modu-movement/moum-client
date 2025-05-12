import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableWithoutFeedback, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { format } from 'date-fns';

export default function NewRecordPage() {
  const router = useRouter();
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);
  const [memo, setMemo] = useState('');

  useLayoutEffect(() => {
    const today = format(new Date(), 'yyyy년 M월 d일');
    navigation.setOptions({
      title: today,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal: 16}}>
          <Text>뒤로가기</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if(!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === "ios" ? "padding": undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* 발레 기록 */}
          <View style={styles.card}>
            <Text style={styles.label}>발레 기록</Text>
            <TextInput
              placeholder="내용 입력 (최대 1000자)"
              value={memo}
              onChangeText={setMemo}
              style={styles.textInput}
              multiline
              maxLength={1000}
            />
          </View>

          {/* 발레 사진 */}
          <View style={styles.card}>
            <Text style={styles.label}>발레 사진</Text>
            <TouchableOpacity style={styles.photoBox} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.photo} />
              ) : (
                <Text style={styles.placeholderText}>+ 사진 추가</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View>
          {/* 저장 버튼 */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>저장하기</Text>
          </TouchableOpacity>
        </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}

const MAIN_COLOR = "#1E1E2F";
const GRAY = "#F2F2F2";
const BLACK = "#111111";
const TEXT_GRAY = "#999";

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 8,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: "violet",
    justifyContent: "center",
    alignItems: "center" 
  },
  card: {
    // backgroundColor: GRAY,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: MAIN_COLOR,
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: GRAY,
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    color: 'black',
  },
  photoBox: {
    backgroundColor: GRAY,
    borderRadius: 12,
    aspectRatio: 1, // 정사각형 비율 유지
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: TEXT_GRAY,
    fontSize: 16,
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  saveButton: {
    backgroundColor: BLACK,
    paddingVertical: 16,
    // borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: 'white'
    // color: TEXT_GRAY,
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
})