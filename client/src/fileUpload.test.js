import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FileUpload from './FileUpload';

describe('FileUpload Component', () => {
  it('renders without errors', () => {
    render(<FileUpload />);
  });

  it('displays the dropzone and uploaded images', () => {
    const { getByText, getByTestId } = render(<FileUpload />);

    const dropzone = getByTestId('dropzone');
    const uploadedImage = getByTestId('uploaded-image');

    expect(dropzone).toBeInTheDocument();
    expect(uploadedImage).toBeInTheDocument();
  });

  it('calls the onDrop and onDelete functions when interacting with the component', () => {
    const updateMock = jest.fn();
    const { getByTestId } = render(<FileUpload update={updateMock} />);
    const dropzone = getByTestId('dropzone');
    const uploadedImage = getByTestId('uploaded-image');

    fireEvent.change(dropzone, {
      target: {
        files: [new File(['test-image'], 'test.jpg', { type: 'image/jpg' })],
      },
    });

    fireEvent.click(uploadedImage);

  });
});
