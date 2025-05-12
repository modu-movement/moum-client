import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, Image, View, Dimensions, TouchableOpacity, Button } from "react-native";
import {Calendar} from "react-native-calendars";

// MarkedDate 인터페이스 정의
interface MarkedDate {
  customStyles: {
    container: {
      backgroundColor: string;
      borderRadius: number;
    };
  };
}

// 📌 DayComponent의 Props 타입 정의
interface DayComponentProps {
  date: { dateString: string };
}

const windowWidth = Dimensions.get('window').width;
const dayWidth = windowWidth / 7;

export default function Index() {
  // 현재 날짜 기준으로 기본 월 설정
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  })

  const [currentDate, setCurrentDate] = useState(new Date());

  // TODO: 날짜별 사진 데이터 => 추후 백엔드에서 불러올 수 있도록 변경
  const photos: Record<string, any> = {
    "2025-02-01": require("../assets/image1.jpeg"),
  };

  // 📌 개별 날짜 렌더링을 위한 DayComponent
  const DayComponent = ({ date }: DayComponentProps) => {
    return (
      <View style={styles.dayBox}>
        {photos[date.dateString] ? (
          <Image source={photos[date.dateString]} style={styles.photo} />
        ) : (
          <View style={styles.emptyBox} />
        )}
      </View>
    );
  };

  // 월 이동 함수
  const changeMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(
      direction === "prev" ? newDate.getMonth() - 1 : newDate.getMonth() + 1
    );
    setCurrentDate(newDate);

    const formatted = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}`;
    setSelectedMonth(formatted);
  };

  // 오늘 날짜로 이동
  const goToToday = () => {
    const now = new Date();
    const todayString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    setSelectedMonth(todayString);  
  }

  return (
    <View style={styles.container}>
      {/* Header 컴포넌트 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>기록</Text>
      </View>
      {/* Calendar 컴포넌트 */}
      <Calendar
        style={styles.calendar}
        current={selectedMonth}
        initialDate={selectedMonth}
        hideExtraDays={true}
        disableArrowLeft={false}
        disableArrowRight={false}
        renderArrow={() => null}
        markingType="custom"  // 날짜 표시하는 것  
        // TODO: 코드 이해하기
        markedDates={Object.keys(photos).reduce<Record<string, MarkedDate>>(
          (acc, date) => {
            acc[date] = {
              customStyles: {
                container: {
                  backgroundColor: "white",
                  borderRadius: 8,
                },
              },
            };
            return acc;
          }, 
          {}  // 초기값: 빈 객체 
        )}  
        onMonthChange={(month) => setSelectedMonth(month.dateString)}
        // 날짜별 사진 렌더링
        dayComponent={({date}) => <DayComponent date={date as {dateString: string}}/>}
        renderHeader={(date) => {
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
      
          return (
            <View style={styles.customHeader}>
              <TouchableOpacity onPress={() => changeMonth("prev")}>
                <Ionicons name="chevron-back" size={20} color="gray"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToToday}>
                <Text style={styles.monthText}>{year}년 {month}월</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeMonth("next")}>
                <Ionicons name="chevron-forward" size={20} color="gray"/>                
              </TouchableOpacity>
            </View>
          )
        }
        }
      />
      {/* AddButton 컴포넌트 */}
      <TouchableOpacity style={styles.recordButton} onPress={() => router.push("../new-record")}>
        <Text style={styles.recordButtonText}>+ 기록하기</Text>
      </TouchableOpacity>
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
  calendar: {
    width: '100%'
  },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  navArrow: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: "#555",
  },
  dayBox: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dayContainer: {
    width: dayWidth,
    height: dayWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 12,
    marginBottom: 2,
  },
  photo: { width: 36, height: 36, borderRadius: 5 },
  emptyBox: { width: 36, height: 36, backgroundColor: "#EEE", borderRadius: 5 },
  addButton: {

  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  recordButton: {
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // 안드로이드 그림자
  },
  recordButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#999",
  },  
})