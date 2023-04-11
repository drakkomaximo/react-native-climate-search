/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {ClimateResult} from '../../../App';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import {kelvinToCelcius} from '../../helpers';

export type ClimateProps = {
  climateResult: ClimateResult;
};

const Climate: FC<ClimateProps> = ({climateResult}) => {
  const {main, weather} = climateResult;
  const uri = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
  return (
    <View style={styles.climate}>
      <Text style={[styles.text, styles.current]}>
        {kelvinToCelcius({tempratureInKelvin: main.temp})}
        <Text style={styles.temperature}>&#x2103;</Text>
        <Image source={{uri}} style={styles.image} />
      </Text>

      <View style={styles.temperatures}>
        <Text style={styles.text}> Min {' '}
          <Text style={styles.temperature}>{kelvinToCelcius({tempratureInKelvin: main.temp_min})} &#x2103;</Text>
        </Text>
        <Text style={styles.text}> Max {' '}
          <Text style={styles.temperature}>{kelvinToCelcius({tempratureInKelvin: main.temp_max})} &#x2103;</Text>
        </Text>
      </View>
    </View>
  );
};

export default Climate;
