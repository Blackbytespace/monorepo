var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __folderSize from '../folderSize.js';
describe('sugar.node.fs.folderSize', () => {
    it('Should get a folder size correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const size = yield __folderSize(`${__dirname}/data/hashfolder`);
        expect(size).toBe('190 B');
    }));
    it('Should get a folder size correctly and return it without any formatting', () => __awaiter(void 0, void 0, void 0, function* () {
        const size = yield __folderSize(`${__dirname}/data/hashfolder`, false);
        expect(size).toBe(190);
    }));
});
//# sourceMappingURL=folderSize.test.review.js.map