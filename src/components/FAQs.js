import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I book a parking slot?',
      answer: 'To book a parking slot, go to the "Select Preferred Space" section and choose your preferred level. Then, tap on the available slot you want to book.',
    },
    {
      question: 'Can I cancel a booked slot?',
      answer: 'Yes, you can cancel a booked slot. Go to the "My Bookings" section and find your booked slot. Tap on it and choose the cancel option.',
    },
    {
      question: 'Is my personal information secure?',
      answer: 'We take the security of your personal information seriously. Our application employs security measures to protect your data.',
    },
    {
      question: 'What happens if I arrive late for my booked slot?',
      answer: 'If you arrive late, your booked slot may be released for others to use. It is recommended to arrive on time to ensure your parking space.',
    },
    {
      question: 'How can I contact customer support?',
      answer: 'For customer support, you can reach out to us at support@smartparking.com. Our team will be happy to assist you with any inquiries or issues.',
    },
    
  ];

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Frequently Asked Questions</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: '#4595E0',
    top: 100, 
  },
  scrollContainer: {
    width: '100%',
  },
  card: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 30,
    marginRight: 10,
    width: 200,
    top: 250,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4595E0',

  },
  answer: {
    fontSize: 14,
    color: '#38447E',
    marginTop: 5,
  },
});

export default FAQ;
