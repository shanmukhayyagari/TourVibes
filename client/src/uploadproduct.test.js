import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import UploadProduct from './UploadProduct';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Mocking useDispatch, useSelector, and useHistory
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));
const mockUserSelector = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: () => mockUserSelector,
}));
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('UploadProduct Component', () => {
  it('renders the upload product form', () => {
    mockUserSelector.mockReturnValue({ userData: { data: { email: 'admin@gmail.com' } } });

    const { getByText, getByPlaceholderText } = render(<UploadProduct />);

    expect(getByText('Upload Travel Product')).toBeInTheDocument();
    expect(getByPlaceholderText('title')).toBeInTheDocument();
    expect(getByPlaceholderText('description')).toBeInTheDocument();
    expect(getByPlaceholderText('price')).toBeInTheDocument();
  });

  it('displays validation errors', async () => {
    mockUserSelector.mockReturnValue({ userData: { data: { email: 'admin@gmail.com' } } });

    const { getByText, getByPlaceholderText, getByRole } = render(<UploadProduct />);

    const submitButton = getByRole('button', { name: 'Submit' });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Required')).toBeInTheDocument();
      expect(getByPlaceholderText('title')).toHaveClass('field-error');
      expect(getByPlaceholderText('description')).toHaveClass('field-error');
      expect(getByPlaceholderText('price')).toHaveClass('field-error');
    });
  });

  it('submits the upload product form', async () => {
    mockUserSelector.mockReturnValue({ userData: { data: { email: 'admin@gmail.com' } } });

    mockDispatch.mockResolvedValue({ payload: { data: { success: true } } });

    const { getByPlaceholderText, getByRole } = render(<UploadProduct />);

    fireEvent.change(getByPlaceholderText('title'), { target: { value: 'Test Title' } });
    fireEvent.change(getByPlaceholderText('description'), { target: { value: 'Test Description' } });
    fireEvent.change(getByPlaceholderText('price'), { target: { value: 100 } });

    const submitButton = getByRole('button', { name: 'Submit' });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({/* Upload product action dispatched with product data */});
      expect(mockHistoryPush).toHaveBeenCalledWith('/products');
      expect(screen.getByText('Successfully Uploaded.')).toBeInTheDocument();
    });
  });

  it('handles product upload failure', async () => {
    mockUserSelector.mockReturnValue({ userData: { data: { email: 'admin@gmail.com' } } });

    mockDispatch.mockResolvedValue({ payload: { data: { success: false } } });

    const { getByPlaceholderText, getByRole, getByText } = render(<UploadProduct />);

    fireEvent.change(getByPlaceholderText('title'), { target: { value: 'Test Title' } });
    fireEvent.change(getByPlaceholderText('description'), { target: { value: 'Test Description' } });
    fireEvent.change(getByPlaceholderText('price'), { target: { value: 100 } });

    const submitButton = getByRole('button', { name: 'Submit' });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Failed to upload product')).toBeInTheDocument();
    });
  });

  it('redirects non-admin users', () => {
    mockUserSelector.mockReturnValue({ userData: { data: { email: 'user@example.com' } } });

    render(<UploadProduct />);

    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
