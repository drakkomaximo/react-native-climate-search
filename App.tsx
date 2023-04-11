import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Form from './src/components/Form';
import Climate from './src/components/Climate';
import {kelvinToCelcius} from './src/helpers';

export type Search = {
  country: string;
  city: string;
};

export const initValue = {
  city: '',
  country: '',
};

export type ClimateResult = {
  cod: string;
  name: string;
  weather: [
    {
      description: string;
      icon: string;
      id: string;
      main: string;
    },
  ];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
};

const App = (): JSX.Element => {
  const [search, setSearch] = useState<Search>(initValue);
  const [startConsult, setStartConsult] = useState(false);
  const [climateResult, setClimateResult] = useState<ClimateResult>();
  const [bgColor, setBgColor] = useState('rgb(71, 149, 212)');
  const {city, country} = search;
  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const handlesearch = ({value}: {value: Search}) => {
    setSearch(value);
  };

  const handleStartConsult = ({value}: {value: boolean}) => {
    setStartConsult(value);
  };

  const bgColorApp = {
    backgroundColor: bgColor,
  };

  useEffect(() => {
    const searchClimateWithApi = async () => {
      if (startConsult) {
        const appId = '1ac7f61a84ee14f37b3394a2612b7bb9';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

        try {
          const response = await fetch(url);
          const result: ClimateResult = await response.json();
          if (result.cod === '404') {
            throw new Error('fail');
          } else {
            setClimateResult(result);
            setStartConsult(false);

            const {main} = result;
            const currentClimate = kelvinToCelcius({
              tempratureInKelvin: main.temp,
            });

            if (currentClimate < 10) {
              setBgColor('rgb(105, 108, 149)');
            } else if (currentClimate >= 10 && currentClimate < 25) {
              setBgColor('rgb(71, 149, 212)');
            } else {
              setBgColor('rgb(178, 28, 61)');
            }
          }
        } catch (error) {
          setClimateResult(undefined);
          setStartConsult(false);
          Alert.alert(
            'Error...',
            'You must write a valid city of that selected country',
          );
        }
      }
    };
    searchClimateWithApi();
  }, [startConsult, city, country]);

  return (
    <>
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.content}>
            {climateResult && <Climate climateResult={climateResult} />}
            <Form
              search={search}
              handlesearch={handlesearch}
              handleStartConsult={handleStartConsult}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: '2.5%',
  },
});

export default App;
