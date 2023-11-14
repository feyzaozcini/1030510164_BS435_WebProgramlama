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

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleStartGame = () => {
        setSecretNumber(generateRandomNumber(minNumber, maxNumber));
        setGameStarted(true);
        setAttemptsLeft(5);
        setMessage('');
    };

    const handleGuess = () => {
        const guess = parseInt(userGuess, 10);

        if (isNaN(guess)) {
            setMessage('Geçerli bir sayı giriniz.');
            return;
        }

        if (guess === secretNumber) {
            setMessage('Tebrikler, doğru sayıyı buldunuz!');
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

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>Sayı Tahmin Oyunu</h1>
                    <Form>
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

                        <Button variant="primary" onClick={handleStartGame} disabled={gameStarted}>
                            Oyunu Başlat
                        </Button>

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

                                <Button variant="success" onClick={handleGuess}>
                                    Tahmin Et
                                </Button>

                                <p>{message}</p>
                                <p>Kalan Deneme Hakkı: {attemptsLeft}</p>
                            </div>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default App;

