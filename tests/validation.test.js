// Validation Test
// In a real environment, run with jest.
// Usage: npx jest tests/validation.test.js

import { validateProductData } from '../utils/validation';

describe('Product Validation Logic', () => {
  const validData = {
    name: 'Test Product',
    title: 'Short Title',
    description: 'A valid description',
    price: 100000,
    lynkUrl: 'https://lynk.id/test'
  };

  const validFiles = new Array(5).fill({ size: 1024, name: 'test.jpg' });

  test('should validate correct data', () => {
    const result = validateProductData(validData, validFiles);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  test('should fail if name is missing', () => {
    const data = { ...validData, name: '' };
    const result = validateProductData(data, validFiles);
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  test('should fail if price is invalid', () => {
    const data = { ...validData, price: -500 };
    const result = validateProductData(data, validFiles);
    expect(result.isValid).toBe(false);
    expect(result.errors.price).toBeDefined();
  });

  test('should fail if image count is less than 5', () => {
    const files = new Array(4).fill({ size: 1024 });
    const result = validateProductData(validData, files);
    expect(result.isValid).toBe(false);
    expect(result.errors.images).toBeDefined();
  });

  test('should fail if image count is more than 10', () => {
    const files = new Array(11).fill({ size: 1024 });
    const result = validateProductData(validData, files);
    expect(result.isValid).toBe(false);
    expect(result.errors.images).toBeDefined();
  });
});
