import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
    render(<App />);
    const linkElement = screen.getByText(/Sayı Tahmin Oyunu/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders input elements for min and max numbers', () => {
    render(<App />);
    const minInput = screen.getByLabelText(/Minimum Sayı:/i);
    const maxInput = screen.getByLabelText(/Maksimum Sayı:/i);
    expect(minInput).toBeInTheDocument();
    expect(maxInput).toBeInTheDocument();
});

test('renders difficulty options', () => {
    render(<App />);
    const easyOption = screen.getByText(/Easy/i);
    const mediumOption = screen.getByText(/Medium/i);
    const hardOption = screen.getByText(/Hard/i);
    const customOption = screen.getByText(/Custom/i);

    expect(easyOption).toBeInTheDocument();
    expect(mediumOption).toBeInTheDocument();
    expect(hardOption).toBeInTheDocument();
    expect(customOption).toBeInTheDocument();
});

test('handles difficulty change', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Oyun Zorluğu:/i), { target: { value: 'medium' } });
});

test('starts the game when "Oyunu Başlat" button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Oyunu Başlat/i));
});

test('handles guess input and guess button click', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Sayı Tahmini:/i), { target: { value: '50' } });
    fireEvent.click(screen.getByText(/Tahmin Et/i));

});
