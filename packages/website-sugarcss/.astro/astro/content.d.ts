declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"sugarcss": {
"css/declaration/s-color.mdx": {
	id: "css/declaration/s-color.mdx";
  slug: "css/declaration/s-color";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-container.mdx": {
	id: "css/declaration/s-container.mdx";
  slug: "css/declaration/s-container";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-ease.mdx": {
	id: "css/declaration/s-ease.mdx";
  slug: "css/declaration/s-ease";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-font-family.mdx": {
	id: "css/declaration/s-font-family.mdx";
  slug: "css/declaration/s-font-family";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-font.mdx": {
	id: "css/declaration/s-font.mdx";
  slug: "css/declaration/s-font";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-grid.mdx": {
	id: "css/declaration/s-grid.mdx";
  slug: "css/declaration/s-grid";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-media.mdx": {
	id: "css/declaration/s-media.mdx";
  slug: "css/declaration/s-media";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-radius.mdx": {
	id: "css/declaration/s-radius.mdx";
  slug: "css/declaration/s-radius";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-setting.mdx": {
	id: "css/declaration/s-setting.mdx";
  slug: "css/declaration/s-setting";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-shade.mdx": {
	id: "css/declaration/s-shade.mdx";
  slug: "css/declaration/s-shade";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-size.mdx": {
	id: "css/declaration/s-size.mdx";
  slug: "css/declaration/s-size";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-sizes.mdx": {
	id: "css/declaration/s-sizes.mdx";
  slug: "css/declaration/s-sizes";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-space.mdx": {
	id: "css/declaration/s-space.mdx";
  slug: "css/declaration/s-space";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-spaces.mdx": {
	id: "css/declaration/s-spaces.mdx";
  slug: "css/declaration/s-spaces";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-transition.mdx": {
	id: "css/declaration/s-transition.mdx";
  slug: "css/declaration/s-transition";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/declaration/s-typo.mdx": {
	id: "css/declaration/s-typo.mdx";
  slug: "css/declaration/s-typo";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/function/s-color.mdx": {
	id: "css/function/s-color.mdx";
  slug: "css/function/s-color";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/function/s-container.mdx": {
	id: "css/function/s-container.mdx";
  slug: "css/function/s-container";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/function/s-ease.mdx": {
	id: "css/function/s-ease.mdx";
  slug: "css/function/s-ease";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/function/s-font-family.mdx": {
	id: "css/function/s-font-family.mdx";
  slug: "css/function/s-font-family";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/function/s-font.mdx": {
	id: "css/function/s-font.mdx";
  slug: "css/function/s-font";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/function/s-radius.mdx": {
	id: "css/function/s-radius.mdx";
  slug: "css/function/s-radius";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/function/s-size.mdx": {
	id: "css/function/s-size.mdx";
  slug: "css/function/s-size";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/function/s-spaces.mdx": {
	id: "css/function/s-spaces.mdx";
  slug: "css/function/s-spaces";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/function/s-transition.mdx": {
	id: "css/function/s-transition.mdx";
  slug: "css/function/s-transition";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/mixins/s-destyle.mdx": {
	id: "css/mixins/s-destyle.mdx";
  slug: "css/mixins/s-destyle";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/mixins/s-menu.mdx": {
	id: "css/mixins/s-menu.mdx";
  slug: "css/mixins/s-menu";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/mixins/s-reset.mdx": {
	id: "css/mixins/s-reset.mdx";
  slug: "css/mixins/s-reset";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/mixins/s-visually-hidden.mdx": {
	id: "css/mixins/s-visually-hidden.mdx";
  slug: "css/mixins/s-visually-hidden";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/rule/s-container.mdx": {
	id: "css/rule/s-container.mdx";
  slug: "css/rule/s-container";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/rule/s-fit.mdx": {
	id: "css/rule/s-fit.mdx";
  slug: "css/rule/s-fit";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/rule/s-font.mdx": {
	id: "css/rule/s-font.mdx";
  slug: "css/rule/s-font";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/rule/s-grid.mdx": {
	id: "css/rule/s-grid.mdx";
  slug: "css/rule/s-grid";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/rule/s-map-color.mdx": {
	id: "css/rule/s-map-color.mdx";
  slug: "css/rule/s-map-color";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/rule/s-media.mdx": {
	id: "css/rule/s-media.mdx";
  slug: "css/rule/s-media";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/rule/s-radius.mdx": {
	id: "css/rule/s-radius.mdx";
  slug: "css/rule/s-radius";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/rule/s-scale.mdx": {
	id: "css/rule/s-scale.mdx";
  slug: "css/rule/s-scale";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/rule/s-scrollbar.mdx": {
	id: "css/rule/s-scrollbar.mdx";
  slug: "css/rule/s-scrollbar";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/rule/s-transition.mdx": {
	id: "css/rule/s-transition.mdx";
  slug: "css/rule/s-transition";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
"css/rule/s-typo.mdx": {
	id: "css/rule/s-typo.mdx";
  slug: "css/rule/s-typo";
  body: string;
  collection: "sugarcss";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
