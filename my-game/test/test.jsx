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