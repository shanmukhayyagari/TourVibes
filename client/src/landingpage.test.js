import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LandingPage from './LandingPage';

// Mocking axios post function
jest.mock('axios');

describe('LandingPage Component', () => {
  it('renders loading state', () => {
    render(<LandingPage />);
    const loadingButton = screen.getByRole('button', { name: 'Loading' });
    expect(loadingButton).toBeInTheDocument();
  });

  it('fetches and displays products data', async () => {
    const products = [
      {
        _id: '1',
        title: 'Product 1',
        price: 10,
        types: 'asia',
        images: ['image1.jpg'],
      },
      {
        _id: '2',
        title: 'Product 2',
        price: 20,
        types: 'europe',
        images: ['image2.jpg'],
      },
    ];

    const userData = {
      data: {
        history: [],
      },
    };

    useSelector.mockImplementation((selector) => selector({ user: { userData } }));

    axios.post.mockResolvedValue({
      data: {
        success: true,
        products,
      },
    });

    render(<LandingPage />);

    // Wait for the loading state to resolve
    await waitFor(() => {
      const productsTitle = screen.getByRole('heading', { name: "Let's Travel Anywhere" });
      const asiaCheckbox = screen.getByText('Asia');
      const europeCheckbox = screen.getByText('Europe');
      const searchInput = screen.getByPlaceholderText('Search');
      const product1 = screen.getByText('Product 1');
      const product2 = screen.getByText('Product 2');

      expect(productsTitle).toBeInTheDocument();
      expect(asiaCheckbox).toBeInTheDocument();
      expect(europeCheckbox).toBeInTheDocument();
      expect(searchInput).toBeInTheDocument();
      expect(product1).toBeInTheDocument();
      expect(product2).toBeInTheDocument();
    });
  });

  it('displays an error message on failed data fetching', async () => {
    axios.post.mockResolvedValue({
      data: {
        success: false,
      },
    });

    render(<LandingPage />);

    // Wait for the loading state to resolve
    await waitFor(() => {
      const errorMessage = screen.getByText('Failed to load Products');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('handles checkbox and search input changes', async () => {
    const products = [
      {
        _id: '1',
        title: 'Product 1',
        price: 10,
        types: 'asia',
        images: ['image1.jpg'],
      },
      {
        _id: '2',
        title: 'Product 2',
        price: 20,
        types: 'europe',
        images: ['image2.jpg'],
      },
    ];

    useSelector.mockImplementation((selector) => selector({ user: { userData: {} } }));

    axios.post.mockResolvedValue({
      data: {
        success: true,
        products,
      },
    });

    render(<LandingPage />);

    // Wait for the loading state to resolve
    await waitFor(() => {
      const asiaCheckbox = screen.getByText('Asia');
      const europeCheckbox = screen.getByText('Europe');
      const searchInput = screen.getByPlaceholderText('Search');
      const product1 = screen.getByText('Product 1');
      const product2 = screen.getByText('Product 2');

      // Uncheck Asia checkbox to filter products
      fireEvent.click(asiaCheckbox);

      expect(product1).not.toBeInTheDocument();
      expect(product2).toBeInTheDocument();

      // Change the search input
      fireEvent.change(searchInput, { target: { value: 'Product 1' } });

      expect(product1).toBeInTheDocument();
      expect(product2).not.toBeInTheDocument();
    });
  });
});
