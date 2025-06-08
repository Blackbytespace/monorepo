declare const _default: {
    setup(): () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    props: {
        id: {
            type: StringConstructor;
            required: boolean;
        };
        component: {
            type: ObjectConstructor;
            required: boolean;
        };
        specs: {
            type: ObjectConstructor;
            required: boolean;
        };
    };
    onMounted(): void;
};
export default _default;
