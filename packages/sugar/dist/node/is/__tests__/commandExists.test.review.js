var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __isCommandExists from '../isCommandExists';
describe('sugar.node.command.isCommandExists', () => {
    it('Should get the "ls" basic system command correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield __isCommandExists('ls');
        expect(res).toBe(true);
    }));
    it('Should get the return false when target a command that does not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield __isCommandExists('lsfwefwcwefwefw');
        expect(res).toBe(false);
    }));
});
//# sourceMappingURL=commandExists.test.review.js.map