import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Orders from './Orders';

// Mocking axios get and post functions
jest.mock('axios');

const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Orders Component', () => {
  it('renders loading state', () => {
    render(<Orders />);
    const loadingButton = screen.getByRole('button', { name: 'Loading' });
    expect(loadingButton).toBeInTheDocument();
  });

  it('fetches and displays orders data', async () => {
    const orders = [
      {
        _id: '1',
        user: [{ name: 'User 1' }],
        product: [
          { name: 'Product 1', quantity: 2, price: 10 },
          { name: 'Product 2', quantity: 3, price: 15 },
        ],
      },
      {
        _id: '2',
        user: [{ name: 'User 2' }],
        product: [
          { name: 'Product 3', quantity: 1, price: 20 },
          { name: 'Product 4', quantity: 4, price: 12 },
        ],
      },
    ];

    const userData = {
      data: {
        email: 'admin@gmail.com',
      },
    };

    useSelector.mockImplementation((selector) => selector({ user: { userData } }));

    axios.get.mockResolvedValue({
      data: {
        success: true,
        orders,
      },
    });

    render(<Orders />);

    // Wait for the loading state to resolve
    await waitFor(() => {
      const ordersTitle = screen.getByRole('heading', { name: 'Orders Page' });
      const viewProductsButton = screen.getByText('View Products');
      const deliveredButton = screen.getByText('Delivered/Done');
      const productName1 = screen.getByText('Product 1 - 2 * $10');
      const productName2 = screen.getByText('Product 2 - 3 * $15');
      const productName3 = screen.getByText('Product 3 - 1 * $20');
      const productName4 = screen.getByText('Product 4 - 4 * $12');

      expect(ordersTitle).toBeInTheDocument();
      expect(viewProductsButton).toBeInTheDocument();
      expect(deliveredButton).toBeInTheDocument();
      expect(productName1).toBeInTheDocument();
      expect(productName2).toBeInTheDocument();
      expect(productName3).toBeInTheDocument();
      expect(productName4).toBeInTheDocument();
    });
  });

  it('displays an empty state when there are no orders', async () => {
    axios.get.mockResolvedValue({
      data: {
        success: true,
        orders: [],
      },
    });

    render(<Orders />);

    // Wait for the loading state to resolve
    await waitFor(() => {
      const emptyState = screen.getByText('No orders yet...');
      expect(emptyState).toBeInTheDocument();
    });
  });

  it('handles view products and delivered buttons', async () => {
    const orders = [
      {
        _id: '1',
        user: [{ name: 'User 1' }],
        product: [
          { name: 'Product 1', quantity: 2, price: 10 },
          { name: 'Product 2', quantity: 3, price: 15 },
        ],
      },
    ];

    const userData = {
      data: {
        email: 'admin@gmail.com',
      },
    };

    useSelector.mockImplementation((selector) => selector({ user: { userData } }));

    axios.get.mockResolvedValue({
      data: {
        success: true,
        orders,
      },
    });

    render(<Orders />);

    // Wait for the loading state to resolve
    await waitFor(() => {
      const viewProductsButton = screen.getByText('View Products');
      const deliveredButton = screen.getByText('Delivered/Done');

      // Open the modal with view products button
      fireEvent.click(viewProductsButton);
      const productModal = screen.getByText('Product 1 - 2 * $10');
      expect(productModal).toBeInTheDocument();

      // Close the modal
      fireEvent.click(deliveredButton);
      expect(screen.queryByText('Product 1 - 2 * $10')).toBeNull();
    });
  });

  it('handles failed order deletion', async () => {
    const orders = [
      {
        _id: '1',
        user: [{ name: 'User 1' }],
        product: [{ name: 'Product 1', quantity: 2, price: 10 }],
      },
    ];

    const userData = {
      data: {
        email: 'admin@gmail.com',
      },
    };

    useSelector.mockImplementation((selector) => selector({ user: { userData } }));

    axios.get.mockResolvedValue({
      data: {
        success: true,
        orders,
      },
    });

    axios.post.mockResolvedValue({
      data: {
        success: false,
      },
    });

    render(<Orders />);

    // Wait for the loading state to resolve
    await waitFor(() => {
      const deliveredButton = screen.getByText('Delivered/Done');
      fireEvent.click(deliveredButton);

      const errorMessage = screen.getByText('Failed to delete the order');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('handles successful order deletion and notification', async () => {
    const orders = [
      {
        _id: '1',
        user: [{ name: 'User 1' }],
        product: [{ name: 'Product 1', quantity: 2, price: 10 }],
      },
    ];

    const userData = {
      data: {
        email: 'admin@gmail.com',
      },
    };

    useSelector.mockImplementation((selector) => selector({ user: { userData } }));

    axios.get.mockResolvedValue({
      data: {
        success: true,
        orders,
      },
    });

    axios.post.mockResolvedValue({
      data: {
        success: true,
      },
    });

    render(<Orders />);

    // Wait for the loading state to resolve
    await waitFor(() => {
      const deliveredButton = screen.getByText('Delivered/Done');
      fireEvent.click(deliveredButton);

      // Open the notification
      fireEvent.click(screen.getByText('Notification Clicked!'));
      expect(screen.queryByText('Notification Clicked!')).toBeNull();
    });
  });

  it('redirects non-admin users to the homepage', async () => {
    const userData = {
      data: {
        email: 'user@gmail.com',
      },
    };

    useSelector.mockImplementation((selector) => selector({ user: { userData } }));

    render(<Orders />);

    // Verify that history.push was called to redirect the user
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
