import { View, Text, Pressable, StyleSheet, FlatList, ColorSchemeName } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from "../context/themeContext";
import { Theme } from '@/constants/Colors';
import { Link } from 'expo-router';

type Player = "X" | "O" | "";
type Board = Player[][];

const GameBoard = () => {
  const [currentBoard, setCurrentBoard] = useState<Board>(Array(3).fill("").map(() => Array(3).fill("")));
  const [turn, setTurn] = useState<"X" | "O">('X');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<"X" | "O" | "draw" | "">('');
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonVal = await AsyncStorage.getItem("CurrentGame");
        if (jsonVal) {
          setCurrentBoard(JSON.parse(jsonVal));
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { colorScheme, theme } = themeContext;
  const styles = createStyles(theme, colorScheme);

  const move = (row: number, col: number) => {
    if (currentBoard[row][col] !== "" || gameOver) return; 

    const newBoard = currentBoard.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? turn : cell))
    );

    setCurrentBoard(newBoard);
    const result = checkGameOver(newBoard);

    if (result) {
      setWinner(result);
      setGameOver(true);
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
  };

  function checkGameOver(board: Board): 'X' | 'O' | 'draw' | null {
    const size = board.length;

    for (let i = 0; i < size; i++) {
      if (board[i][0] && board[i].every(cell => cell === board[i][0])) return board[i][0] as 'X' | 'O';
      if (board[0][i] && board.every(row => row[i] === board[0][i])) return board[0][i] as 'X' | 'O';
    }

    if (board[0][0] && board.every((row, idx) => row[idx] === board[0][0])) return board[0][0] as 'X' | 'O';
    if (board[0][size - 1] && board.every((row, idx) => row[size - 1 - idx] === board[0][size - 1])) return board[0][size - 1] as 'X' | 'O';

    if (board.every(row => row.every(cell => cell !== ""))) return 'draw';

    return null;
  }

  const flatBoard = currentBoard.flat().map((cell, index) => ({
    id: index.toString(),
    row: Math.floor(index / 3),
    col: index % 3,
    value: cell,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={flatBoard}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.cell, item.value === "X" ? styles.xCell : item.value === "O" ? styles.oCell : {}]}
            onPress={() => move(item.row, item.col)}
          >
            <Text style={styles.text}>{item.value}</Text>
          </Pressable>
        )}
      />
      <Text style={styles.turnText}>{gameOver ? `Winner: ${winner}` : `Turn: ${turn}`}</Text>
      <Link href="/history" style={{ marginHorizontal: 'auto' }} asChild>
        <Pressable>
          <Text>View Game History</Text>
        </Pressable>
      </Link>
      <StatusBar style={colorScheme === 'dark' ? "light" : "dark"} />
    </SafeAreaView>
  );
};

function createStyles(theme: Theme, colorScheme: ColorSchemeName) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: 20,
    },
    cell: {
      width: 100,
      height: 100,
      borderWidth: 1,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    turnText: {
      fontSize: 20,
      marginVertical: 10,
    },
    xCell: {
      backgroundColor: 'lightblue',
    },
    oCell: {
      backgroundColor: 'lightcoral',
    },
  });
}

export default GameBoard;
