/**
 * @name            isVideoPlaying
 * @namespace       js.is
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function allows you to know if a video is currently playing or not
 *
 * @param       {HTMLVideoElement}      video       The video element to check
 *
 * @return    {Boolean}    true if the video is playing, false if not
 *
 * @todo      tests
 *
 * @snippet         __isVideoPlaying($1)
 *
 * @example 	js
 * import { __isVideoPlaying } from '@lotsof/sugar/is'
 * if (__isVideoPlaying($myVideo)) {
 *   // do something cool...
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function isVideoPlaying($video: HTMLVideoElement): boolean {
  return !!(
    $video.currentTime > 0 &&
    !$video.paused &&
    !$video.ended &&
    $video.readyState > 2
  );
}
