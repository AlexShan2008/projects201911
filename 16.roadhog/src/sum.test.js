let sum = require('./sum');
describe('测试sum', () => {
    it('1+1=2', () => {
        expect(sum(1, 1)).toBe(2);
    });
});