var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __findUp from '../findUp.js';
describe('sugar.node.fs.findUp', () => {
    it('Should find a simple file upward correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield __findUp('file.jpg', {
            cwd: `${__dirname}/data/subfolder`,
        });
        expect(res[0].path).toBe(`${__dirname}/data/file.jpg`);
    }));
    it('Should find some files upward using glob correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield __findUp('file.*', {
            cwd: `${__dirname}/data/subfolder`,
        });
        expect(res.length).toBe(3);
    }));
});
//# sourceMappingURL=findUp.test.review.js.map