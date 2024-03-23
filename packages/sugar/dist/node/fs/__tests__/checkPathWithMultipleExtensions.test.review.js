var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __check from '../checkPathWithMultipleExtensions.js';
describe('sugar.node.fs.checkPathWithMultipleExtensions', () => {
    it('Should find a file with multiple extensions given', () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = __check(`${__dirname}/data/file.mkv`, [
            'css',
            'js',
            'txt',
        ]);
        expect(filePath).toBe(`${__dirname}/data/file.txt`);
    }));
});
//# sourceMappingURL=checkPathWithMultipleExtensions.test.review.js.map