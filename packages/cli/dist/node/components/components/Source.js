export default class ComponentSource {
    constructor(name) {
        this.name = 'Unimplementedsource';
        this.name = name;
    }
    get metas() {
        return {
            name: this.name,
        };
    }
    list(args) {
        return {
            source: {
                name: 'Error',
            },
            components: {},
        };
    }
}
//# sourceMappingURL=Source.js.map