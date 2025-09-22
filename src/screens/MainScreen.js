import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import ClearDataButton from '../components/ClearDataButton';
import {simulateDataWipe} from '../services/DataWipeService';
import {generateCertificate, shareCertificate} from '../services/CertificateService';

const MainScreen = () => {
  const [isWiping, setIsWiping] = useState(false);
  const [wipeCompleted, setWipeCompleted] = useState(false);

  const handleClearData = async () => {
    try {
      setIsWiping(true);
      
      // Simulate data wipe
      const wipeResult = await simulateDataWipe();
      
      if (wipeResult.success) {
        setWipeCompleted(true);
        
        // Show success message with certificate generation option
        Alert.alert(
          '✅ Data Wiped Successfully (simulated)',
          'Device data wipe simulation completed successfully. Would you like to generate a certificate?',
          [
            {
              text: 'Generate Certificate',
              onPress: async () => {
                try {
                  const certificateResult = await generateCertificate();
                  if (certificateResult.success) {
                    // Show certificate generated dialog with share option
                    Alert.alert(
                      '📄 Certificate Generated',
                      `PDF certificate has been generated successfully.\n\nFile: ${certificateResult.fileName}`,
                      [
                        {
                          text: 'Share Certificate',
                          onPress: async () => {
                            const shareResult = await shareCertificate(certificateResult.filePath);
                            if (!shareResult.success) {
                              Alert.alert('Error', 'Failed to share certificate');
                            }
                          },
                          style: 'default',
                        },
                        {
                          text: 'OK',
                          style: 'cancel',
                        },
                      ]
                    );
                  } else {
                    Alert.alert('Error', `Failed to generate certificate: ${certificateResult.error}`);
                  }
                } catch (error) {
                  Alert.alert('Error', 'Certificate generation failed');
                }
              },
              style: 'default',
            },
            {
              text: 'Close',
              style: 'cancel',
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Data wipe simulation failed');
    } finally {
      setIsWiping(false);
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>DATA WIPE DEMO</Text>
          <Text style={styles.subtitle}>Secure Device Data Removal</Text>
        </View>

        {/* Device Info Card */}
        <View style={styles.deviceCard}>
          <Text style={styles.cardTitle}>DEVICE INFO</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Serial:</Text>
            <Text style={styles.infoValue}>09A2312B</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Model:</Text>
            <Text style={styles.infoValue}>Google Pixel 9</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={[styles.infoValue, {color: wipeCompleted ? '#00b894' : '#fdcb6e'}]}>
              {wipeCompleted ? 'WIPED' : 'READY'}
            </Text>
          </View>
        </View>

        {/* Warning Card */}
        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>WARNING</Text>
          <Text style={styles.warningText}>
            This action will wipe all data from the device. 
          </Text>
        </View>

        {/* Clear Data Button */}
        <View style={styles.buttonContainer}>
          <ClearDataButton
            onPress={handleClearData}
            isLoading={isWiping}
            disabled={isWiping}
          />
        </View>

        {/* Status */}
        {isWiping && (
          <View style={styles.statusCard}>
            <Text style={styles.statusText}>🔄 wiping data...</Text>
          </View>
        )}

        {wipeCompleted && (
          <View style={styles.successCard}>
            <Text style={styles.successText}>✅ Wipe completed successfully!</Text>
            <Text style={styles.successSubtext}>Certificate generation available</Text>
          </View>
        )}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 30,
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    fontWeight: '600',
  },
  deviceCard: {
    backgroundColor: '#74b9ff',
    borderColor: '#000000',
    borderWidth: 3,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  warningCard: {
    backgroundColor: '#fdcb6e',
    borderColor: '#000000',
    borderWidth: 3,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 6,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
    textAlign: 'center',
  },
  warningText: {
    fontSize: 14,
    color: '#2d3436',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: '#a29bfe',
    borderColor: '#000000',
    borderWidth: 3,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 6,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  successCard: {
    backgroundColor: '#00b894',
    borderColor: '#000000',
    borderWidth: 3,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 6,
    marginBottom: 20,
  },
  successText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  successSubtext: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
  demoCard: {
    backgroundColor: '#a29bfe',
    borderColor: '#000000',
    borderWidth: 3,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 6,
    marginTop: 10,
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  demoText: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 22,
  },
});

export default MainScreen;
