



import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useStripe, CardField } from '@stripe/stripe-react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';

const Payment = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet, confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState('');

  const fetchPaymentSheetParams = async () => {
    // Your code to fetch payment sheet parameters
    try {
      const response = await fetch(`${API_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer } = await response.json();

      setPaymentIntentClientSecret(paymentIntent);

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.error('Error fetching payment sheet params:', error);
      throw error;
    }
  };

  const initializePaymentSheet = async () => {
    try {
      const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        },
      });

      if (error) {
        console.error('Error initializing payment sheet:', error);
        throw error;
      }

      setLoading(true);
    } catch (error) {
      console.error('Error initializing payment sheet:', error);
    }
  };

  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet({
        confirmPayment: async ({ paymentMethodId }) => {
          try {
            const { paymentIntent, error } = await confirmPayment(paymentIntentClientSecret, {
              type: 'Card',
              paymentMethodId,
            });

            if (error) {
              console.error('Error confirming payment:', error);
            } else if (paymentIntent) {
              console.log('Payment succeeded:', paymentIntent);
              Alert.alert('Success', 'Your order is confirmed!');
            }
          } catch (error) {
            console.error('Unexpected error during payment confirmation:', error);
          }
        },
      });

      if (error) {
        console.error('Error presenting payment sheet:', error);
      }
    } catch (error) {
      console.error('Unexpected error during payment sheet presentation:', error);
    }
  };

  useFocusEffect(() => {
    initializePaymentSheet();
  });

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.paymentContainer}>
        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
            borderWidth: 1,
            borderColor: '#38447E',
          }}
          style={{
            width: '90%',
            height: 80,
            marginVertical: 30,
          }}
          onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={openPaymentSheet}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PayPalScreen')}
        >
          <Text style={styles.buttonText}>Pay with PayPal</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentContainer: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#38447E',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '70%',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#38447E',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Payment;
