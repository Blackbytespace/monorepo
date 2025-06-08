import { h } from 'vue';
export default {
    setup() {
        return () => h(this.props.component, {
            carpenter: this.props.id,
        });
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        component: {
            type: Object,
            required: true,
        },
        specs: {
            type: Object,
            required: true,
        },
    },
    onMounted() {
        window._carpenterComponents =
            window._carpenterComponents || {};
        window._carpenterComponents[this.props.id] = Object.assign(Object.assign({}, this.props.specs), { update(newValues) {
                var _a;
                window._carpenterComponents[this.props.id].values = Object.assign(Object.assign({}, window._carpenterComponents[this.props.id].values), newValues);
                values.value = Object.assign(Object.assign({}, values.value), newValues);
                (_a = instance === null || instance === void 0 ? void 0 : instance.proxy) === null || _a === void 0 ? void 0 : _a.$forceUpdate();
            } });
    },
};
//# sourceMappingURL=carpenterVueProxy.js.map