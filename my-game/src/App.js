import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [minNumber, setMinNumber] = useState(0);
    const [maxNumber, setMaxNumber] = useState(100);
    const [secretNumber, setSecretNumber] = useState(generateRandomNumber(minNumber, maxNumber));
    const [userGuess, setUserGuess] = useState('');
    const [message, setMessage] = useState('');
    const [attemptsLeft, setAttemptsLeft] = useState(5);
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [correctAnswerFound, setCorrectAnswerFound] = useState(false);
    const [difficulty, setDifficulty] = useState('');

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleStartGame = () => {
        if (!difficulty) {
            setMessage('Lütfen bir zorluk seviyesi seçin.');
            return;
        }

        let min, max;
        let difficultyMessage = '';

        switch (difficulty) {
            case 'easy':
                min = 0;
                max = 10;
                difficultyMessage = 'Easy (0-10)';
                break;
            case 'medium':
                min = 0;
                max = 100;
                difficultyMessage = 'Medium (0-100)';
                break;
            case 'hard':
                min = 0;
                max = 1000;
                difficultyMessage = 'Hard (0-1000)';
                break;
            case 'custom':
                min = minNumber;
                max = maxNumber;
                difficultyMessage = `Player (${min}-${max})`;
                break;
            default:
                break;
        }

        setMinNumber(min);
        setMaxNumber(max);
        setSecretNumber(generateRandomNumber(min, max));
        setGameStarted(true);
        setAttemptsLeft(5);
        setMessage(`Zorluk Seviyesi: ${difficultyMessage}`);
        setCorrectAnswerFound(false);
    };

    const handleResetGame = () => {
        setGameStarted(false);
        setUserGuess('');
        setMessage('');
        setScore(0);
        setCorrectAnswerFound(false);
        setDifficulty('');
    };

    const handleGuess = () => {
        const guess = parseInt(userGuess, 10);

        if (isNaN(guess)) {
            setMessage('Geçerli bir sayı giriniz.');
            return;
        }

        if (guess === secretNumber) {
            const currentScore = calculateScore(attemptsLeft);
            setScore((prevScore) => prevScore + currentScore);
            setMessage(`Tebrikler, doğru sayıyı buldunuz! Puanınız: ${currentScore}`);
            setCorrectAnswerFound(true);
        } else {
            const difference = Math.abs(secretNumber - guess);
            setMessage(
                `Yanlış! ${guess > secretNumber ? 'Daha küçük bir' : 'Daha büyük bir'} sayı deneyin. ${
                    difference > 10 ? 'Soğuk' : 'Sıcak'
                }`
            );
            setAttemptsLeft((prevAttempts) => prevAttempts - 1);
            if (attemptsLeft === 1) {
                setMessage(`Üzgünüz, doğru sayıyı bulamadınız. Doğru sayı: ${secretNumber}`);
                setGameStarted(false);
            }
        }
    };

    const calculateScore = (remainingAttempts) => {
        const baseScore = 50;
        const decrement = 10;

        const score = baseScore - (5 - remainingAttempts) * decrement;
        return score >= 0 ? score : 0;
    };

    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
        setGameStarted(false); // Reset game state when difficulty changes
    };

    return (
        <Container className="mt-5 container">
            <Row>
                <Col md={{ span: 6, offset: 3 }} className={"game-container"}>
                    <h1>Sayı Tahmin Oyunu</h1>
                    <Form>
                        <Form.Group controlId="formDifficulty">
                            <Form.Label>Oyun Zorluğu:</Form.Label>
                            <Form.Control as="select" onChange={handleDifficultyChange} value={difficulty}>
                                <option value="">Zorluk Seviyesi Seçin</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                                <option value="custom">Custom</option>
                            </Form.Control>
                        </Form.Group>

                        {difficulty === 'custom' && (
                            <>
                                <Form.Group controlId="formMinNumber">
                                    <Form.Label>Minimum Sayı:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={minNumber}
                                        onChange={(e) => setMinNumber(parseInt(e.target.value, 10))}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formMaxNumber">
                                    <Form.Label>Maksimum Sayı:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={maxNumber}
                                        onChange={(e) => setMaxNumber(parseInt(e.target.value, 10))}
                                    />
                                </Form.Group>
                            </>
                        )}

                        {gameStarted && (
                            <div>
                                <Form.Group controlId="formGuess">
                                    <Form.Label>Sayı Tahmini:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={userGuess}
                                        onChange={(e) => setUserGuess(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="success" onClick={handleGuess} disabled={correctAnswerFound}>
                                    Tahmin Et
                                </Button>

                                <Button variant="danger" onClick={handleResetGame}>
                                    Yeniden Başlat
                                </Button>

                                <p className={"message"}>{message}</p>
                                <p>Kalan Deneme Hakkı: {attemptsLeft}</p>
                                <p>Toplam Puan: {score}</p>
                            </div>
                        )}

                        {!gameStarted && (
                            <Button variant="primary" onClick={handleStartGame} className={"btn"}>
                                Oyunu Başlat
                            </Button>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
