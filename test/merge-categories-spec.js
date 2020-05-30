const { expect } = require('chai');
const { mergeCategories } = require('../merge-categories');

describe("mergeCategories()", () => {
  context("Using <li> tags", () => {
    const template = `
      <div>
        <ul>
          <!-- Content here -->
        </ul>
      </div>
    `;
    it("should return no LIs for no categories", () => {
      const categories = [];
      const result = mergeCategories(template, categories, 'li');
      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<ul>');
      expect(result).to.contain('</ul>');
      expect(result).to.not.contain('<li>');
      expect(result).to.not.contain('</li>');
    });


    it("should return a single <li> for one category", () => {
      const categories = ['A String!']
      const result = mergeCategories(template, categories, 'li');

      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<ul>');
      expect(result).to.contain('</ul>');

      expect(result).to.contain('<li>A String!</li>');
      expect(result).to.not.contain('<!-- Content here -->');
    });

    it("should return an <li> for each category", () => {
        //arrange
        let categories = ['Cat 1', 'Cat 2', 'Cat 3']
        //act
        let result = mergeCategories(template, categories, 'li');
        //assert
        expect(result).to.contain('<div>');
        expect(result).to.contain('</div>');
        expect(result).to.contain('<ul>');
        expect(result).to.contain('</ul>');
        expect(result).to.contain('<li>Cat 1</li>');
        expect(result).to.contain('<li>Cat 2</li>');
        expect(result).to.contain('<li>Cat 3</li>');
    });
  });

  context("using <option> tags", () => {
    const template = `
      <div>
        <select>
          <!-- Content here -->
        </select>
      </div>
    `;

    it("should return no <option>s for no categories", () => {
      //arrange
      let categories = []
      //act
      let result = mergeCategories(template, categories, 'option');
      //assert
      expect(result).to.not.contain('<option>');
    });

    it("should return a single <option> for one category", () => {
      //arrange
      let categories = ['cat 1']
      //act
      let result = mergeCategories(template, categories, 'option');
      //assert
      expect(result).to.contain('<option>');
    });

    it("should return an <option> for each category", () => {
      //arrange
      let categories = ['cat 1']
      //act
      let result = mergeCategories(template, categories, 'option');
      //assert
      expect(result).to.contain('<option>');
    });
  });
});
