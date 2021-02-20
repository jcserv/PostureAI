import {
	Box,
	Center,
	FormControl,
	FormHelperText,
	FormLabel,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Text
} from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';
import { useState } from 'react';

export const Form = (): JSX.Element => {
	const [ interval, setInterval ] = useState(90);

	return (
		<form style={{ width: '100%' }}>
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
				<FormHelperText>Select how frequently you want us to check your posture!</FormHelperText>
			</FormControl>
		</form>
	);
};
