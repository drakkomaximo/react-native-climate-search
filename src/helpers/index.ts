/* eslint-disable prettier/prettier */
export const kelvinToCelcius = ({
  tempratureInKelvin,
}: {
  tempratureInKelvin: number;
}) => {
  const kelvin = 273.15;
  return Math.ceil(tempratureInKelvin - kelvin);
};
