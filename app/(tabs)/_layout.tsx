import { Tabs } from 'expo-router';
import React from 'react';
import {CalendarIcon} from "react-native-heroicons/outline";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          height: 91
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, focused }) => (
            <CalendarIcon color={color} /> 
          ),
          tabBarLabelStyle: {
            marginTop: -20,
            paddingBottom: 25,
            fontSize: 9,
          }
        }}
      />
    </Tabs>
  );
}
