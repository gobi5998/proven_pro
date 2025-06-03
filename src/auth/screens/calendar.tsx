import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome'; // for calendar icon

const WorkExperienceForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowStartPicker(true)}>
        <Text style={styles.dateText}>{startDate ? formatDate(startDate) : 'mm/dd/yyyy'}</Text>
        <Icon name="calendar" size={18} color="#888" />
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={(e, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowEndPicker(true)}>
        <Text style={styles.dateText}>{endDate ? formatDate(endDate) : 'mm/dd/yyyy'}</Text>
        <Icon name="calendar" size={18} color="#888" />
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={(e, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginTop: 2,
    fontWeight: 'bold',
    fontSize: 14,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    marginTop: 6,
  },
  dateText: {
    color: '#444',
    fontSize: 15,
  },
});

export default WorkExperienceForm;
