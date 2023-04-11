/* eslint-disable prettier/prettier */
import React, {FC, useState} from 'react';
import {
  Alert,
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import {citiesOptionsPicker} from './constants';
import {Search} from '../../../App';

export type FormProps = {
  search: Search;
  handlesearch: ({value}: {value: Search}) => void;
  handleStartConsult: ({value}: {value: boolean}) => void;
};

const Form: FC<FormProps> = ({handlesearch, search, handleStartConsult}) => {
  const {city, country} = search;
  const [animatedBtn] = useState(new Animated.Value(1));

  const animationIn = () => {
    Animated.spring(animatedBtn, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };
  const animationOut = () => {
    Animated.spring(animatedBtn, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: true,
    }).start();
  };
  const searchClimate = () => {
    if (country.trim() === '' || city.trim() === '') {
      Alert.alert('Error...', 'Add country and city to start the search');
      return;
    }

    handleStartConsult({value: true});
  };
  const animationStyle = {
    transform: [{scale: animatedBtn}],
  };

  return (
    <>
      <View>
        <View>
          <TextInput
            value={city}
            style={styles.input}
            placeholder="City"
            placeholderTextColor={'#666'}
            onChangeText={cityValue =>
              handlesearch({
                value: {
                  ...search,
                  city: cityValue,
                },
              })
            }
          />
        </View>

        <View style={styles.picker}>
          <Picker
            selectedValue={country}
            onValueChange={countryValue =>
              handlesearch({
                value: {
                  ...search,
                  country: countryValue,
                },
              })
            }>
            {citiesOptionsPicker.map(cityOption => (
              <Picker.Item
                key={cityOption.id}
                label={cityOption.label}
                value={cityOption.code}
              />
            ))}
          </Picker>
        </View>

        <TouchableWithoutFeedback
          onPressIn={animationIn}
          onPressOut={animationOut}
          onPress={searchClimate}>
          <Animated.View style={[styles.btnSearch, animationStyle]}>
            <Text style={styles.btnSearchText}>Search Climate</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default Form;
