const { urlGenerator } = require('../src/fetchRecipes');

describe('Test the urlGenerator function', () => {
  it('is a function', () => {
    expect(typeof urlGenerator).toBe('function');
  });
  it('returns the expected URL', () => {
    const param = ['&diet=${dietType}', '&calories=${caloriesDropdown}'];

    const expected = 'https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=7c7cd4bd&app_key=545204c90ab3de54ab8d84cd5aaba9dc&diet=${dietType}&calories=${caloriesDropdown}&random=true';

    expect(urlGenerator('chicken', param)).toBe(expected);
  });
});