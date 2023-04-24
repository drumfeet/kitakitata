import Layout from "@/components/Layout"
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Textarea,
  Tooltip,
} from "@chakra-ui/react"
import { useContext } from "react"
import { AppContext } from "@/context/AppContext"

export default function CreateEvent() {
  const { addEvent, eventData, setEventData } = useContext(AppContext)

  const handleInputChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.id]: event.target.value,
    })
  }

  return (
    <>
      <Layout>
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Create awesome events! ✌️</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                learn, enjoy, and have fun with community meetups
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="title">
                  <FormLabel>Event Title</FormLabel>
                  <Input
                    placeholder="Event Title"
                    onChange={handleInputChange}
                    maxLength={"100"}
                  />
                </FormControl>
                <FormControl id="organizer">
                  <FormLabel>Organizer</FormLabel>
                  <Input
                    placeholder="Organizer"
                    onChange={handleInputChange}
                    maxLength={"100"}
                  />
                </FormControl>
                <FormControl id="location">
                  <FormLabel>Location</FormLabel>
                  <Input
                    placeholder="Location"
                    onChange={handleInputChange}
                    maxLength={"100"}
                  />
                </FormControl>
                <FormControl id="start_time">
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    placeholder="Select Start Time"
                    size="md"
                    type="datetime-local"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="end_time">
                  <FormLabel>End Time</FormLabel>
                  <Input
                    placeholder="Select End Time"
                    size="md"
                    type="datetime-local"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="event_details">
                  <FormLabel>Details</FormLabel>
                  <Textarea
                    placeholder="Details"
                    onChange={handleInputChange}
                    maxLength={"250"}
                  />
                </FormControl>
                <FormControl id="event_admins" hidden={true}>
                  <FormLabel>Event Admins</FormLabel>
                  <Tooltip label="Enter a comma-separated list of wallet addresses that is an admin of the event.">
                    <Textarea
                      placeholder="0xCFe3e0E5B16d81E03EA2c4321B95f256aCe3aB8c,0x4e79fd1Ba59111b17817093AE36E812990A2634a"
                      onChange={handleInputChange}
                      maxLength={"280"}
                    />
                  </Tooltip>
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={() => {
                      addEvent()
                    }}
                  >
                    Create Event
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Layout>
    </>
  )
}
