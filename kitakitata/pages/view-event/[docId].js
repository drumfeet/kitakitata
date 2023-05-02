import { useContext, useEffect } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import { useState } from "react"
import { Box, Button, Container, Text } from "@chakra-ui/react"
import { isNil, not } from "ramda"
import { toast } from "react-toastify"

export default function ViewEvent() {
  const {
    initDB,
    getEvent,
    user,
    setUserRsvpForEvent,
    getUserRsvpForEvent,
    setIsLoginModalOpen,
  } = useContext(AppContext)
  const router = useRouter()
  const { docId } = router.query
  const [eventData, setEventData] = useState({})
  const [userRsvpData, setUserRsvpData] = useState({})
  const [isEventOwner, setIsEventOwner] = useState(false)

  const handleRsvpClick = async () => {
    if (isNil(user)) {
      setIsLoginModalOpen(true)
    } else {
      const isGoing = not(userRsvpData?.isGoing)
      console.log("handleRsvpClick() isGoing", isGoing)
      setUserRsvpForEvent(eventData, isGoing)
      setUserRsvpData({ ...userRsvpData, isGoing: isGoing })
    }
  }

  const handleViewAttendeesClick = () => {
    window.open(`/view-attendees/${eventData?.data.event_id}`, "_blank")
  }

  const handleEditEventClick = () => {
    toast("handleEditEventClick WIP")
  }

  const handleDeleteEventClick = () => {
    toast("handleDeleteEventClick WIP")
  }

  useEffect(() => {
    ;(async () => {
      if (initDB) {
        const _eventData = await getEvent(docId)
        setEventData(_eventData)
        console.log("ViewEvent _eventData", _eventData)
      }
    })()
  }, [initDB])

  useEffect(() => {
    ;(async () => {
      if (user && initDB && eventData) {
        const _userRsvp = await getUserRsvpForEvent(
          user.wallet.toLowerCase(),
          eventData?.data?.event_id
        )
        console.log("ViewEvent _userRsvp", _userRsvp)
        setUserRsvpData(_userRsvp)
      }
    })()
  }, [eventData])

  useEffect(() => {
    ;(async () => {
      setIsEventOwner(!!user && user.wallet.toLowerCase() === eventData?.setter)
    })()
  }, [user, eventData])

  return (
    <>
      <Layout>
        <Container maxW={"6xl"} my={28}>
          <Text>ViewEvent Page</Text>
          <Text>eventData.data.event_id: {eventData?.data?.event_id}</Text>
          <Text>
            eventData.data.user_address: {eventData?.data?.user_address}
          </Text>
          <Text>eventData.data.date: {eventData?.data?.date}</Text>
          <Text>eventData.data.title: {eventData?.data?.title}</Text>
          <Text>eventData.data.organizer: {eventData?.data?.organizer}</Text>
          <Text>eventData.data.location: {eventData?.data?.location}</Text>
          <Text>eventData.data.start_time: {eventData?.data?.start_time}</Text>
          <Text>eventData.data.end_time: {eventData?.data?.end_time}</Text>
          <Text>
            eventData.data.event_details: {eventData?.data?.event_details}
          </Text>
          <Text>Is User Going? {String(userRsvpData?.isGoing)}</Text>
          <Text>Is Event Owner? {String(isEventOwner)}</Text>
          <Button
            onClick={() => {
              handleRsvpClick()
            }}
          >
            RSVP
          </Button>
          <Box>
            {isEventOwner && (
              <Button onClick={() => handleViewAttendeesClick()}>
                View Attendees
              </Button>
            )}
          </Box>
          <Box>
            {isEventOwner && (
              <Button onClick={() => handleEditEventClick()}>Edit Event</Button>
            )}
          </Box>
          <Box>
            {isEventOwner && (
              <Button onClick={() => handleDeleteEventClick()}>
                Delete Event
              </Button>
            )}
          </Box>
        </Container>
      </Layout>
    </>
  )
}
