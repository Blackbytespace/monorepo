import React from 'react';
import type { TTypo } from './typo.type.js';

export default function Typo(props: TTypo) {
  return (
    <div
      className={`typo typo-format typo-rhythm`}
      id={props.id}
      dangerouslySetInnerHTML={{ __html: props.text }}
    ></div>
  );
}
