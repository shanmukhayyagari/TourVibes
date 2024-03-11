import React from 'react';
import { render } from '@testing-library/react';
import ImageSlider from './ImageSlider';

describe('ImageSlider Component', () => {
  it('renders without errors', () => {
    render(<ImageSlider images={[['image1.jpg', 'image2.jpg']]} />);
  });

  it('displays images from the props', () => {
    const images = ['image1.jpg', 'image2.jpg'];
    const { getByAltText } = render(<ImageSlider images={[images]}></ImageSlider>);

    images.forEach((image) => {
      const imgElement = getByAltText('productImage');
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src', `http://localhost:6200/${image}`);
    });
  });
});
