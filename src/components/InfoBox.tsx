import { VStack, Text, useColorModeValue } from "@chakra-ui/react";

export const InfoBox = (): JSX.Element => {
  return (
    <VStack p={5} shadow="md" borderWidth="1px" m={4}>
      <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }}>
        <Text as="strong">UofT</Text>
        <Text as="strong" color={useColorModeValue("purple.500", "purple.300")}>
          Hacks
        </Text>{" "}
        analyzes your posture & notifies you in real-time!
      </Text>
      <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }} mt="6">
        Click calibrate, select your time, lorem ipsum lorem ipsum, lorem ipsum,
        lorem ipsum, lorem ipsum
      </Text>
    </VStack>
  );
};
