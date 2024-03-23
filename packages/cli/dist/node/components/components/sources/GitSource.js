import ComponentSource from '../Source.js';
export default class GitSource extends ComponentSource {
    constructor(name, repositoryUrl) {
        super(name);
        this.name = 'Git';
        this._repositoryUrl = repositoryUrl;
    }
    list(args) {
        console.log('List', args);
        return {
            source: this.metas,
            components: {},
        };
    }
}
//# sourceMappingURL=GitSource.js.map