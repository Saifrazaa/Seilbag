import PowerIcon from '@assets/media/power.svg';
import PowerWhiteIcon from '@assets/media/power-white.svg';
import TriangleIcon from '@assets/media/triangle.svg';
import TriangleYellowIcon from '@assets/media/triangle-yellow.svg';
import SquareIcon from '@assets/media/square.svg';
import SquareWhiteIcon from '@assets/media/square-white.svg';
import ThreeTriangleIcon from '@assets/media/three-triangle.svg';
import ThreeTriangleWhiteIcon from '@assets/media/three-triangle-white.svg';
import LeftRightIcon from '@assets/media/left-right-arrow.svg';
import LeftRightWhiteIcon from '@assets/media/left-right-arrow-white.svg';
import LampIcon from '@assets/media/lamp.svg';
import LampWhiteIcon from '@assets/media/lamp-white.svg';
import {ControlType} from '@utils/@types';

export const CONTROLS: Array<ControlType> = [
  {
    id: 0,
    label: 'LED ON/OFF',
    icon: {off: PowerIcon, on: PowerWhiteIcon},
  },
  {
    id: 1,
    label: 'Emergency',
    icon: {off: TriangleIcon, on: TriangleYellowIcon},
  },
  {
    id: 2,
    label: 'Color Change',
    icon: {off: SquareIcon, on: SquareWhiteIcon},
  },
  {
    id: 3,
    label: 'Brightness',
    icon: {off: LampIcon, on: LampWhiteIcon},
  },
  {
    id: 4,
    label: 'Function',
    icon: {off: ThreeTriangleIcon, on: ThreeTriangleWhiteIcon},
  },
  {
    id: 5,
    label: 'Direction',
    icon: {off: LeftRightIcon, on: LeftRightWhiteIcon},
  },
];
