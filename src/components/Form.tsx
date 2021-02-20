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
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import React, {useEffect} from "react";
interface FormProps {
  devices: InputDeviceInfo[];
  capture: () => void;
  setInterval: React.Dispatch<React.SetStateAction<number>>;
  interval: number;
  webcamid: string;
  setwebcamid: React.Dispatch<React.SetStateAction<string>>;
}


export const Form: React.FC<FormProps> = ({
  devices,
  capture,
  setInterval,
  interval,
  webcamid,
  setwebcamid
}): JSX.Element => {

  
  useEffect(() => {
		if(devices.length > 0) {
			setwebcamid(devices[0].deviceId);
		}
  }, [devices]);

  return (
    <form style={{ width: "100%" }}>
      <VStack spacing={4} p={5} shadow="md" borderWidth="1px" m={4}>
        <FormControl id="selectdevice" w="100%">
          <FormLabel>Webcam</FormLabel>
          <Select value={webcamid} onChange={e => setwebcamid(e.currentTarget.value)}>
            {devices.map((device, key) => <option key={device.label} value={device.deviceId}>{device.label}</option>)}
          </Select>
        </FormControl>
        <FormControl id="interval" w="100%">
          <FormLabel>Timer</FormLabel>
          <Slider
            aria-label="slider-ex-4"
            min={60}
            max={120}
            value={interval}
            onChange={(val) => setInterval(val)}
          >
            <SliderTrack bg="red.100">
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Box color="tomato" as={TimeIcon} />
            </SliderThumb>
          </Slider>
          <Center>
            <Text>{interval} seconds</Text>
          </Center>
          <FormHelperText>
            Select how frequently you want us to check your posture!
          </FormHelperText>
        </FormControl>
        <Center>
          <Button onClick={() => capture()}>Calibrate</Button>
        </Center>
      </VStack>
    </form>
  );
};
