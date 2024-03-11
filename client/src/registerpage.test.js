import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from './RegisterPage';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Mocking useDispatch and useHistory
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('RegisterPage Component', () => {
  it('renders the registration form', () => {
    const { getByText, getByPlaceholderText } = render(<RegisterPage />);

    expect(getByText('Register')).toBeInTheDocument();
    expect(getByPlaceholderText('name')).toBeInTheDocument();
    expect(getByPlaceholderText('email')).toBeInTheDocument();
    expect(getByPlaceholderText('password')).toBeInTheDocument();
  });

  it('displays validation errors', async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<RegisterPage />);

    const registerButton = getByRole('button', { name: 'Register' });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(getByText('*Required')).toBeInTheDocument();
      expect(getByPlaceholderText('name')).toHaveClass('field-error');
      expect(getByPlaceholderText('email')).toHaveClass('field-error');
      expect(getByPlaceholderText('password')).toHaveClass('field-error');
    });
  });

  it('submits the registration form', async () => {
    mockDispatch.mockResolvedValue({ payload: { data: { registerSuccess: true } } });

    const { getByPlaceholderText, getByRole } = render(<RegisterPage />);

    fireEvent.change(getByPlaceholderText('name'), { target: { value: 'Test User' } });
    fireEvent.change(getByPlaceholderText('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'password123' } });

    const registerButton = getByRole('button', { name: 'Register' });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({/* Register action dispatched with user data */});
      expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('handles registration failure', async () => {
    mockDispatch.mockResolvedValue({ payload: { data: { registerSuccess: false } } });

    const { getByPlaceholderText, getByRole, getByText } = render(<RegisterPage />);

    fireEvent.change(getByPlaceholderText('name'), { target: { value: 'Test User' } });
    fireEvent.change(getByPlaceholderText('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'password123' } });

    const registerButton = getByRole('button', { name: 'Register' });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(getByText('user with this mail id is already registered')).toBeInTheDocument();
    });
  });
});
