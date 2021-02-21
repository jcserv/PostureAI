import { VStack, Text, useColorModeValue } from "@chakra-ui/react";
import { ErgonomicGuidelines } from "./ErgonomicGuidelines";

export const InfoBox = (): JSX.Element => {
  return (
    <VStack p={5} shadow="md" borderWidth="1px" m={4}>
      <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }}>
        <Text as="strong">Posture</Text>
        <Text as="strong" color={useColorModeValue("purple.500", "purple.300")}>
          AI
        </Text>{" "}
        analyzes your posture & notifies you in real-time!
      </Text>
      <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }} mt="6">
        Get into an ergonomic position, click calibrate, set your timer, and get
        cracking! PostureAI will notify you if your posture changes negatively,
        allowing you to correct it quickly.
      </Text>
      <ErgonomicGuidelines />
    </VStack>
  );
};
