import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { RepeatIcon, TimeIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
interface FormProps {
  calibrate: () => void;
  devices: InputDeviceInfo[];
  interval: number;
  sensitivity: number;
  setInterval: React.Dispatch<React.SetStateAction<number>>;
  setSensitivity: React.Dispatch<React.SetStateAction<number>>;
  setwebcamId: React.Dispatch<React.SetStateAction<string>>;
  webcamId: string;
}

export const Form: React.FC<FormProps> = ({
  calibrate,
  devices,
  interval,
  sensitivity,
  setInterval,
  setSensitivity,
  setwebcamId,
  webcamId,
}): JSX.Element => {
  const [sliderVal, setSliderVal] = useState(interval);
  const [sensVal, setSensVal] = useState(sensitivity);
  useEffect(() => {
    if (devices.length > 0) {
      setwebcamId(devices[0].deviceId);
    }
  }, [devices, setwebcamId]);

  const color = useColorModeValue("purple.500", "purple.300");

  return (
    <form style={{ width: "100%" }}>
      <VStack spacing={4} p={5} shadow="md" borderWidth="1px" m={4}>
        <FormControl id="selectdevice" w="100%">
          <FormLabel>Webcam</FormLabel>
          <Select
            value={webcamId}
            onChange={(e) => setwebcamId(e.currentTarget.value)}
          >
            {devices.map((device, key) => (
              <option key={device.label} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="interval" w="100%">
          <FormLabel>Timer</FormLabel>
          <Slider
            aria-label="slider-ex-4"
            min={1}
            max={120}
            value={sliderVal}
            onChange={(val) => setSliderVal(val)}
          >
            <SliderTrack bg={color}>
              <SliderFilledTrack bg={color} />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Box color={color} as={TimeIcon} />
            </SliderThumb>
          </Slider>
          <Center>
            <Text>{sliderVal} seconds</Text>
          </Center>
          <FormHelperText>
            Select how frequently you want us to check your posture!
          </FormHelperText>
        </FormControl>
        <FormControl id="sensitivity" w="100%">
          <FormLabel>Sensitivity</FormLabel>
          <Slider
            aria-label="slider-ex-4"
            min={1}
            max={10}
            value={sensVal}
            onChange={(val) => setSensVal(val)}
          >
            <SliderTrack bg={color}>
              <SliderFilledTrack bg={color} />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Box color={color} as={RepeatIcon} />
            </SliderThumb>
          </Slider>
          <Center>
            <Text>{sensVal}</Text>
          </Center>
          <FormHelperText>Select the sensitivity</FormHelperText>
        </FormControl>
        <Center>
          <Button
            onClick={() => {
              setInterval(sliderVal);
              setSensitivity(sensVal);
              calibrate();
            }}
          >
            Calibrate
          </Button>
        </Center>
      </VStack>
    </form>
  );
};
