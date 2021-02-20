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
	Text
} from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';
import React from "react";
interface FormProps {
	devices: InputDeviceInfo[];
	capture: () => void;
	setInterval: React.Dispatch<React.SetStateAction<number>>;
	interval: number;
}

export const Form:React.FC<FormProps> = ({devices, capture, setInterval, interval}): JSX.Element => {

	return (
		<form style={{ width: '100%' }}>
			<FormControl id="interval" w="100%">
				<FormLabel>Timer</FormLabel>
				<Select placeholder="Select Device">
					{
					devices.map((device, key) => <option value={device.label}>{device.label}</option>)
					}
        		</Select>
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
				<Center>
					<Button onClick={() => capture()}>Calibrate</Button>
				</Center>
				<FormHelperText>Select how frequently you want us to check your posture!</FormHelperText>
			</FormControl>
		</form>
	);
};
