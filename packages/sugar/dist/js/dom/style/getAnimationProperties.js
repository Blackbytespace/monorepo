import __convertTime from '../../../shared/datetime/convertTime.js';
import __getStyleProperty from './getStyleProperty.js';
export default function __getAnimationProperties(elm) {
    var _a, _b;
    // get the animation properties
    const name = __getStyleProperty(elm, 'animation-name') || '';
    const duration = __getStyleProperty(elm, 'animation-duration') || '0s';
    const timingFunction = __getStyleProperty(elm, 'animation-timing-function') || 'linear';
    const delay = __getStyleProperty(elm, 'animation-delay') || '0s';
    const iterationCount = __getStyleProperty(elm, 'animation-iteration-count') || 1;
    const direction = __getStyleProperty(elm, 'animation-direction') || 'normal';
    const fillMode = __getStyleProperty(elm, 'animation-fill-mode') || 'none';
    const playState = __getStyleProperty(elm, 'animation-play-state') || 'running';
    // return the animation object
    const props = {
        names: name.split(','),
        durations: duration.split(',').map((value) => __convertTime(value, 'ms')),
        delays: `${delay}`.split(',').map((value) => __convertTime(value, 'ms')),
        timingFunctions: ((_b = (_a = timingFunction.split) === null || _a === void 0 ? void 0 : _a.call(timingFunction, ',')) !== null && _b !== void 0 ? _b : timingFunction.name)
            ? [timingFunction.name]
            : ['linear'],
        iterationCounts: `${iterationCount}`.split(','),
        directions: direction.split(','),
        fillModes: fillMode.split(','),
        playStates: playState.split(','),
    };
    const animations = [];
    const result = {
        totalDuration: 0,
        animations,
    };
    for (let [i, name] of props.names) {
        animations.push({
            name,
            duration: props.durations[i],
            delay: props.delays[i],
            timingFunction: props.timingFunctions[i],
            iterationCount: parseInt(props.iterationCounts[i]),
            direction: props.directions[i],
            fillMode: props.fillModes[i],
            playState: props.playStates[i],
        });
    }
    let totalDuration = 0;
    const i = 0;
    const delays = [0].concat(props.delays);
    [0].concat(props.durations).forEach((val) => {
        if (val + delays[i] > totalDuration) {
            totalDuration = val + delays[i];
        }
    });
    result.totalDuration = totalDuration;
    return result;
}
//# sourceMappingURL=getAnimationProperties.js.map