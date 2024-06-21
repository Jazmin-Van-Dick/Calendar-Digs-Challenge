import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, SectionList } from 'react-native';
import CalendarItem from '@/components/CalendarItem';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ChallengeData, Action } from '@/app/models/ChallengeData';

const API_URL = 'https://xjvq5wtiye.execute-api.us-east-1.amazonaws.com/interview/api/v1/challenge';

interface GroupedActions {
  title: string;
  data: Action[];
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Calendar: React.FC = () => {
  const colorScheme = useColorScheme();
  const [data, setData] = useState<GroupedActions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((json: ChallengeData) => {
        const groupedActions: GroupedActions[] = json.calendar.map(calendarItem => ({
          title: `${monthNames[calendarItem.month]} ${calendarItem.year}`,
          data: calendarItem.actions,
        }));
        setData(groupedActions);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const styles = StyleSheet.create({
    Page: {
      paddingHorizontal: 16,
      paddingTop: 60,
      paddingBottom: 60,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
    Title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].text,
      marginBottom: 15,
      textAlign: 'center',
      
    },
    SectionHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].text,
      marginBottom: 25,
      marginTop: 21,
    },
  });

  if (loading) {
    return (
      <View style={[styles.Page, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].text} />
      </View>
    );
  }

  return (
    <View style={styles.Page}>
      <Text style={styles.Title}>Calendar</Text>
      <SectionList
        sections={data}
        renderItem={({ item }) => <CalendarItem action={item} />}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={({ section }) => (
          <View>
            <Text style={styles.SectionHeader}>{section.title}</Text>
            
            {!section.data.length && (
              <CalendarItem />
            )}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default Calendar;