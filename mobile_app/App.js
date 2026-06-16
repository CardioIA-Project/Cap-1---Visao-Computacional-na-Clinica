import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

//USE O IP DO SEU COMPUTADOR (substitua pelo seu)
const API_URL = 'http://000.000.00.0:5000/predict';

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async response => {
      if (response.didCancel) {
        console.log('Usuário cancelou');
      } else if (response.error) {
        Alert.alert('Erro', response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        setImageUri(asset.uri);
        sendImageToBackend(asset.uri);
      }
    });
  };

  const sendImageToBackend = async uri => {
    setLoading(true);
    setPrediction(null);

    try {
      const formData = new FormData();
      formData.append('image', {
        uri: uri,
        type: 'image/jpeg',
        name: 'upload.jpg',
      });

      const result = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 15000,
      });

      console.log('Resposta do backend:', result.data);

      setPrediction(result.data);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Erro',
        'Falha ao comunicar com o servidor. Verifique o backend.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CardioIA</Text>
      <Text style={styles.subtitle}>Diagnóstico por Imagem</Text>

      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Selecionar Imagem Médica</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      {prediction && (
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Classificação:</Text>
          <Text
            style={[
              styles.resultValue,
              prediction.prediction === 'NORMAL'
                ? styles.normal
                : styles.pneumonia,
            ]}
          >
            {prediction.prediction}
          </Text>
          <Text style={styles.confidence}>
            Confiança: {(prediction.confidence * 100).toFixed(2)}%
          </Text>
          {prediction.scores && (
            <View style={styles.probContainer}>
              <Text style={styles.probText}>
                Prob. Normal: {(prediction.scores.NORMAL * 100).toFixed(1)}%
              </Text>
              <Text style={styles.probText}>
                Prob. Pneumonia:{' '}
                {(prediction.scores.PNEUMONIA * 100).toFixed(1)}%
              </Text>
            </View>
          )}
        </View>
      )}

      <Text style={styles.footer}>Apenas para demonstração educacional</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a237e',
    marginTop: 30,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1a237e',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: 250,
    height: 250,
    marginVertical: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
    elevation: 4,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  resultValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  normal: {
    color: '#2e7d32',
  },
  pneumonia: {
    color: '#c62828',
  },
  confidence: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  probContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    width: '100%',
    alignItems: 'center',
  },
  probText: {
    fontSize: 14,
    color: '#444',
  },
  footer: {
    marginTop: 40,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});
