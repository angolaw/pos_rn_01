import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function Home() {
  const [peso, setPeso] = useState('0');
  const [altura, setAltura] = useState('0');
  const [imc, setImc] = useState(0);
  //evaluation message
  const [message, setMessage] = useState('');
  //error message state
  interface ImcProps {
    pesoIMC: number;
    alturaIMC: number;
  }
  function clearInputs() {
    setPeso('0');
    setAltura('0');
  }
  function classifyIMC() {
    //classify user bmi by value

    if (imc === 0) {
      setMessage('');
    } else if (imc < 17) {
      setMessage('Muito abaixo do peso');
    } else if (imc > 17 && imc < 18.5) {
      setMessage('Abaixo do peso');
    } else if (imc > 18.5 && imc < 25) {
      setMessage('Peso normal');
    } else if (imc > 25 && imc < 30) {
      setMessage('Acima do peso');
    } else if (imc > 30 && imc < 35) {
      setMessage('Obesidade I');
    } else if (imc > 35 && imc < 40) {
      setMessage('Obesidade II');
    } else {
      setMessage('Obesidade III');
    }
  }

  function validateData() {
    const alturaDouble = parseFloat(altura);
    const pesoDouble = parseFloat(peso);
    if (
      alturaDouble > 2.46 ||
      alturaDouble < 0 ||
      pesoDouble > 635 ||
      pesoDouble < 0
    ) {
      setImc(0);
      clearInputs();
    } else {
      const data: ImcProps = {pesoIMC: pesoDouble, alturaIMC: alturaDouble};
      clearInputs();
      handleCalculateImc(data);
    }
  }

  function handleCalculateImc({pesoIMC, alturaIMC}: ImcProps) {
    try {
      //calculate imc
      const bmi = pesoIMC / (alturaIMC * alturaIMC);
      //set imc
      setImc(Object.is(bmi, NaN) ? 0 : bmi);
      classifyIMC();
      clearInputs();
    } catch (e) {
      console.log(e);
      setImc(0);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>
      <Text style={styles.label}>Peso</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPeso(text)}
        value={peso}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Altura</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setAltura(text)}
        value={altura}
        keyboardType="numeric"
      />

      <TouchableOpacity style={[styles.button]} onPress={validateData}>
        <Text style={styles.buttonText}>Calcular!</Text>
      </TouchableOpacity>
      <Text style={styles.imc}>IMC: {imc.toFixed(2)}</Text>
      <Text>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  imc: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },
  error: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    color: 'red',
  },
  button: {
    height: 56,
    width: 200,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  label: {
    fontSize: 24,
    textAlign: 'left',
    justifyContent: 'flex-start',
    margin: 10,
    marginTop: 50,
  },
  input: {
    height: 56,
    width: '70%',
    borderWidth: 1.5,
    borderColor: '#7159c1',
    borderRadius: 8,
    marginBottom: 10,
    padding: 20,
  },
});
export default Home;
