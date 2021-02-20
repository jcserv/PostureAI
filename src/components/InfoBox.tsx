import {
  ListItem,
  VStack,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";

export const InfoBox = (): JSX.Element => {
  return (
    <VStack p={5} shadow="md" borderWidth="1px" m={4}>
      <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }}>
        <Text as="strong">posture</Text>
        <Text as="strong" color={useColorModeValue("purple.500", "purple.300")}>
          .ai
        </Text>{" "}
        analyzes your posture & notifies you in real-time!
      </Text>
      <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }} mt="6">
        Get into an ergonomic position, click calibrate, set your timer, and get
        cracking! posture.ai will notify you if your posture changes negatively,
        allowing you to correct it quickly.
      </Text>
      <Text
        as="strong"
        opacity={0.8}
        fontSize={{ base: "lg", lg: "xl" }}
        alignSelf="start"
      >
        Ergonomic guidelines:
      </Text>
      <UnorderedList alignItems="start" pl={8}>
        <ListItem>
          <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }}>
            Sit back in your chair.
          </Text>
        </ListItem>
        <ListItem>
          <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }}>
            Maximize the contact of your back with the chair back using chair
            adjustments or cushions as needed.
          </Text>
        </ListItem>
        <ListItem>
          <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }}>
            Position the monitor at a comfortable height that doesn't make you
            bend your head up down to see the screen.
          </Text>
        </ListItem>
        <ListItem>
          <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }}>
            Place your feet flat on the floor or on a footrest.
          </Text>
        </ListItem>
      </UnorderedList>
    </VStack>
  );
};
