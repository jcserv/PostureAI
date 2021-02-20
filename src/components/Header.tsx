import { Box, VStack, Text, useColorModeValue, chakra } from "@chakra-ui/react";

export const Header = (): JSX.Element => {
  return (
    <VStack>
      <chakra.h1
        fontSize={{ base: "2.25rem", sm: "3rem", lg: "3.75rem" }}
        letterSpacing="tight"
        fontWeight="bold"
        lineHeight="1.2"
      >
        posture
        <Box as="span" color={useColorModeValue("purple.500", "purple.300")}>
          .ai
        </Box>
      </chakra.h1>
      <Text opacity={0.5} fontSize={{ base: "sm", lg: "md" }}>
        AI powered posture improvement
      </Text>
    </VStack>
  );
};
