import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const swipeThreshold = screenWidth / 3;

const eventsData = [
  {
    author_id: 'Lily',
    title: "Lily's Birthday Bash!",
    location: "Mississauga at your mom's house",
    time: 'August 14, 2024',
    description: 'Come join me to celebrate my 19th bday'
  },
  {
    author_id: 'William',
    title: "Come to the gym with me",
    location: "PAC",
    time: 'in 30 min',
    description: 'i need a workout buddy'
  },
  {
    author_id: 'Sleepy Rita',
    title: "I'm sleepy",
    location: "Owen's couch",
    time: 'Right now',
    description: 'I\'m sleeping on the couch rn lol'
  },
  {
    author_id: 'Sally',
    title: "hey",
    location: "costco",
    time: '3:30 pm',
    description: 'come shopping with me'
  },
  {
    author_id: 'richard',
    title: "work on map",
    location: "ping pong table",
    time: 'Right now',
    description: 'I\'m cooking with the backend'
  },
  {
    author_id: 'Owen',
    title: "hackathon",
    location: "Owen's house",
    time: 'tomorrow',
    description: 'join the fun in my basement'
  }
   // {
  //   author_id: event.user_id,
  //   title: event.title,
  //   location: event.location,
  //   time: event.date_expected,
  //   description: event.description
  // }
];

const EventItem = ({ event }) => {
  const renderLeftActions = () => {
    return (
      <View style={styles.swipeLeftActionContainer}>
        <TouchableOpacity style={styles.swipeAction}>
          <Text style={styles.swipeActionText}>Accept Invite</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderRightActions = () => {
    return (
      <View style={styles.swipeRightActionContainer}>
        <TouchableOpacity style={styles.swipeAction}>
          <Text style={styles.swipeActionText}>Decline Invite</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      leftThreshold={swipeThreshold}
      rightThreshold={swipeThreshold}
    >
      <View style={styles.eventBlock}>
        <View style={styles.inviteBox}>
          <Text style={styles.inviteText}>{event.author_id} invites you to</Text>
        </View>
        <View style={styles.eventItem}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDetails}>{event.location}, {event.time}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonGoing}>
              <Text style={styles.buttonText}>Ppl going</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNotGoing}>
              <Text style={styles.buttonText}>ppl Not Going</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const EventsScreen = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://beacon-9ob2.onrender.com/event/');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        Alert.alert('Error', 'Could not fetch events');
      }
    };

    fetchEvents();
  }, []);

  const handleDecision = async (eventId, action) => {
    try {
      const response = await fetch('https://beacon-9ob2.onrender.com/event/decide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: action,
          id: userId,
          event: eventId,
        }),
      });
      // Handle response as needed
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Could not perform the action');
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }} // Added padding at the bottom for better scrolling
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Beacons</Text>
        </View>
        {events.map((event, index) => (
          <EventItem key={index} event={event} />
        ))}
      </ScrollView>
    </>
  );
};

export const EventsProfile = ({children}) => {
  return (
    <>
      <ScrollView style={styles.container}>
        {children}
        {events.map((event, index) => (
          <EventItem key={index} event={event} handleDecision={handleDecision} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C8BFFF',
  },
  headerContainer: {
    paddingTop: 80,
    paddingBottom: 20,
    backgroundColor: '#C8BFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  swipeAction: {
    padding: 20,
    width: 100, 
  },
  swipeActionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16, 
  },
  swipeLeftActionContainer: {
    backgroundColor: 'green', 
    justifyContent: 'center',
  },
  swipeRightActionContainer: {
    backgroundColor: 'red', 
    justifyContent: 'center',
  },
  eventBlock: {
    marginVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 5,
  },
  eventItem: {
    backgroundColor: '#8D62C5',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    elevation: 5,
  },
  inviteBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b488fc',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
  },
  inviteText: {
    backgroundColor: '#b488fc',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonGoing: {
    backgroundColor: '#BE97FF', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonNotGoing: {
    backgroundColor: '#BE97FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default EventsScreen;
