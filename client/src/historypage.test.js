import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import HisoryPage from './HisoryPage';

// Mocking axios get function
jest.mock('axios');

describe('HisoryPage Component', () => {
  it('renders loading state', () => {
    render(<HisoryPage />);
    const loadingButton = screen.getByRole('button', { name: 'Loading' });
    expect(loadingButton).toBeInTheDocument();
  });

  it('fetches and displays history data', async () => {
    const userData = {
      data: {
        history: [
          {
            id: 1,
            price: 10,
            quantity: 2,
            dateOfPurchase: new Date().toISOString(),
          },
        ],
      },
    };

    useSelector.mockImplementation((selector) => selector({ user: { userData } }));

    axios.get.mockResolvedValue({
      data: {
        success: true,
        history: userData.data.history,
      },
    });

    render(<HisoryPage />);

    // Wait for the loading state to resolve
    await waitFor(() => {
      const historyTitle = screen.getByRole('heading', { name: 'History' });
      const paymentId = screen.getByText('1');
      const price = screen.getByText('10');
      const quantity = screen.getByText('2');
      const dateOfPurchase = screen.getByText(
        new Date(userData.data.history[0].dateOfPurchase).getMonth() +
          '/' +
          new Date(userData.data.history[0].dateOfPurchase).getFullYear()
      );

      expect(historyTitle).toBeInTheDocument();
      expect(paymentId).toBeInTheDocument();
      expect(price).toBeInTheDocument();
      expect(quantity).toBeInTheDocument();
      expect(dateOfPurchase).toBeInTheDocument();
    });
  });

  it('displays an error message on failed data fetching', async () => {
    axios.get.mockResolvedValue({
      data: {
        success: false,
      },
    });

    render(<HisoryPage />);

    // Wait for the loading state to resolve
    await waitFor(() => {
      const errorMessage = screen.getByText('Failed to fetch history');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
