import React, { useState, useEffect } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DataCovid = ({ data }) => {


  const now = new Date
  const [date, setDate] = useState(now);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    data = currentDate

  };

  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
        maximumDate={date}
      />
    </View>
  );
};

export default DataCovid