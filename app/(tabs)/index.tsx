import { useAudioPlayer } from "expo-audio";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./index.style";

export default function FormScreen() {
  const [altura, setAltura] = useState("");
  const [genero, setGenero] = useState<"masculino" | "feminino" | null>(null);
  const [minutos, setMinutos] = useState("");
  const [segundos, setSegundos] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [numero, setNumero] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [ritmoPassos, setRitmoPassos] = useState<number>(0);
  const player1 = useAudioPlayer(require('../../assets/sounds/steps1.mp3'));
  const player2 = useAudioPlayer(require('../../assets/sounds/steps2.mp3'));

  const calcularComprimentoPasso = () => {
    const constante = genero == "masculino" ? 0.415 : 0.413;
    const comprimento = (parseInt(altura || "0") / 100) * constante;
    return comprimento;
  };

  const calcularQuantidadePassos = (compPasso: number) => {
    const qtdPassos = 1000 / compPasso;
    return qtdPassos;
  };

  const calcularPassosPorSegundo = (qtdPassos: number) => {
    const tempoSeg = parseInt(minutos || "0") * 60 + parseInt(segundos || "0");
    const passosSeg = qtdPassos / tempoSeg;
    return passosSeg;
  };

  const calcularRitmoPassos = (passosPSeg: number) => {
    return 1 / passosPSeg;
  };

  const calcularResultado = () => {
    if (!altura || !genero || (!minutos && !segundos)) {
      Alert.alert("Erro", "Preencha todos os campos antes de calcular.");
      return;
    }

    const compPasso = calcularComprimentoPasso();
    const qtdPassos = calcularQuantidadePassos(compPasso);
    const passosPSeg = calcularPassosPorSegundo(qtdPassos);
    const ritmoCalculado = calcularRitmoPassos(passosPSeg).toFixed(3);

    setRitmoPassos(parseFloat(ritmoCalculado));

    setShowForm(false);
    setIsCounting(true);
  };

  const voltarAoFormulario = () => {
    setShowForm(true);
    setNumero(false);
    setIsCounting(false);
  };

  // Efeito para alternar passos e tocar os sons
  useEffect(() => {
    if (!ritmoPassos || !isCounting) return;

    let contador = false;
    const interval = setInterval(() => {
      setNumero(contador);
      if (contador) {
        player1.play()
      } else {
        player2.play()
      }
      contador = !contador;
    }, ritmoPassos * 1000); // A cada ritmoPassos convertido para milissegundos

    return () => clearInterval(interval);
  }, [ritmoPassos, isCounting]);

  return (
    <View style={styles.container}>
      {showForm ? (
        <>
          <Text style={styles.label}>Altura (cm):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={altura}
            onChangeText={setAltura}
            placeholder="Ex: 170"
          />

          <Text style={styles.label}>Gênero:</Text>
          <View style={styles.radioGroup}>
            {["masculino", "feminino"].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.radioButton}
                onPress={() => setGenero(option as "masculino" | "feminino")}
              >
                <View style={styles.radioCircle}>
                  {genero === option && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.radioLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Tempo:</Text>
          <View style={styles.timeRow}>
            <TextInput
              style={[styles.input, styles.timeInput]}
              keyboardType="numeric"
              value={minutos}
              onChangeText={setMinutos}
              placeholder="min"
            />
            <TextInput
              style={[styles.input, styles.timeInput]}
              keyboardType="numeric"
              value={segundos}
              onChangeText={setSegundos}
              placeholder="seg"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={calcularResultado}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Ritmo:</Text>
          <Text style={{marginBottom: 30}}>{ritmoPassos} segundos entre os passos</Text>
          <View style={[{ flexDirection: "row" }, {height: 350}]}>
            {numero ? (
              <Image
                source={require("../../assets/images/foot1.png")}
                style={[styles.footImage, { marginRight: 100 }]}
              />
            ) : null}

            {!numero ? (
              <Image
                source={require("../../assets/images/foot2.png")}
                style={[styles.footImage, { marginLeft: 100 }]}
              />
            ) : null}
          </View>
          <TouchableOpacity style={styles.button} onPress={voltarAoFormulario}>
            <Text style={styles.buttonText}>Voltar ao Formulário</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
