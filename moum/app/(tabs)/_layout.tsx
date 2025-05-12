
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "gray",
    }}>
      <Tabs.Screen
        name="explore"
        options={{
          title: '찾기',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Feather
              name='map-pin' 
              color={focused ? "#000000" : "#999999"}
              size={20}/>
          )
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '기록',
          headerTitleAlign: "left",
          tabBarIcon: ({focused}) => (
            <Feather
              name='calendar'
              color={focused ? "#000000" : "#999999"}
              size={20}/>
          )
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: 'MY',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Feather 
              name="user" 
              color={focused ? "#000000" : "#999999"}
              size={20}/>
          )
        }}
      />      
    </Tabs>
  );
}
