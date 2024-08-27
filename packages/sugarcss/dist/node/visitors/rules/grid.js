import { env } from '../../sugarcss.js';
import __gridAst from './grid/grid.ast.js';
import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-grid
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to apply a grid layout easily.
 * You can either apply a registered grid, or directly
 * pass the grid layout you want to apply.
 *
 * @param       {String}        nameOrLayout            The grid name you want to apply or directly the grid layout like `1 1 2 _ 3 3 3`
 * @param       {Number}        [gap=0]                 The gap you want to apply between each grid cell
 * @return      {Css}                                   The generated css
 *
 * @example         css
 * :root {
 *    --s-grid-default: 1 1 2 _ 3 3 3;
 *    --s-grid-2cols: 1 2;
 * }
 *
 * .my-element {
 *    @s-grid(2cols);
 *
 *   // or with an inline layout
 *   @s-grid('1 1 2 _ 3 3 3', 20px);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function grid(v, settings) {
    // parse args
    const args = Object.assign({}, __parseArgs(v.prelude, ['layout', 'gap'], {
        separator: ['white-space', 'comma'],
    }));
    // grid
    let grid = args.values;
    if (env.grids[args.values.layout]) {
        grid = env.grids[args.values.layout];
    }
    const areas = [], colsCountByArea = {}, rowsCountByArea = {}, areasCountedByLine = {}, areasCountedByCol = {}, colsStartByArea = {}, rowsStartByArea = {}, colsEndByArea = {}, rowsEndByArea = {};
    const rows = grid.layout
        .split(/(\n|_)/gm)
        .map((l) => l.trim())
        .filter((l) => l != '_' && l != '');
    const rowsCount = rows.length;
    let colsCount = 0;
    rows.forEach((row) => {
        const rowCols = row
            .split(' ')
            .map((l) => l.trim())
            .filter((l) => l);
        if (rowCols.length > colsCount)
            colsCount = rowCols.length;
    });
    let currentCol = 0, currentRow = 0;
    rows.forEach((row) => {
        currentRow++;
        currentCol = 0;
        const rowCols = row
            .split(' ')
            .map((l) => l.trim())
            .filter((l) => l);
        rowCols.forEach((areaId) => {
            var _a, _b;
            currentCol++;
            if (areas.indexOf(areaId) === -1) {
                areas.push(areaId);
            }
            if (!areasCountedByCol[`${currentCol}-${areaId}`]) {
                areasCountedByCol[`${currentCol}-${areaId}`] = true;
                colsCountByArea[areaId] = ((_a = colsCountByArea[areaId]) !== null && _a !== void 0 ? _a : 0) + 1;
            }
            if (!areasCountedByLine[`${currentRow}-${areaId}`]) {
                areasCountedByLine[`${currentRow}-${areaId}`] = true;
                rowsCountByArea[areaId] = ((_b = rowsCountByArea[areaId]) !== null && _b !== void 0 ? _b : 0) + 1;
            }
        });
    });
    currentCol = 0;
    currentRow = 0;
    rows.forEach((row) => {
        currentRow++;
        currentCol = 0;
        const rowCols = row
            .split(' ')
            .map((l) => l.trim())
            .filter((l) => l);
        rowCols.forEach((areaId) => {
            currentCol++;
            if (!colsStartByArea[areaId]) {
                colsStartByArea[areaId] = currentCol;
            }
            if (!rowsStartByArea[areaId]) {
                rowsStartByArea[areaId] = currentRow;
            }
            colsEndByArea[areaId] = currentCol;
            rowsEndByArea[areaId] = currentRow;
        });
    });
    const colsStatement = [], rowsStatement = [];
    for (let i = 0; i < colsCount; i++) {
        if (colsCount <= 1) {
            colsStatement.push('100%');
        }
        else {
            colsStatement.push('1fr');
        }
    }
    const gridArgs = {
        cols: colsStatement,
        areas,
        colsStartByArea,
        colsEndByArea,
        rowsStartByArea,
        rowsEndByArea,
        gap: grid.gap,
    };
    return __gridAst(gridArgs);
}
//# sourceMappingURL=grid.js.map