export default function (api: any): {
    extract: {
        /**
         * @name            glob
         * @type            String
         * @namespace       config.i18n.extract
         * @default         ** /*.+(ts|tsx)
         *
         * Specify a glob relative to the cwd from there to extract __i18n statements in your codebase
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        readonly glob: string;
        /**
         * @name            outDir
         * @type            String
         * @namespace       config.i18n.extract
         * @default         api.config.storage.src.i18nDir;
         *
         * Specify the output directory path where the i18n files will be stored
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        readonly outDir: any;
        /**
         * @name            filename
         * @type            String
         * @namespace       config.i18n.extract
         * @default         extracted.i18n.json
         *
         * Specify the filename for the extracted json
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        fileName: string;
    };
} | undefined;
