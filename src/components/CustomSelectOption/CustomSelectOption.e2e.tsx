import CustomSelectOption from './CustomSelectOption';
import { describeScreenshotFuzz } from '../../testing/e2e/utils';
import Avatar from '../Avatar/Avatar';
import { SizeType } from '../../hoc/withAdaptivity';

describe('CustomSelectOption', () => {
  describeScreenshotFuzz(CustomSelectOption, [{
    selected: [true],
    before: [<Avatar size={20} key="avatar" />],
    children: ['Мария Саломея Склодовская-Кюри Мария Саломея Склодовская-Кюри', 'Мария Саломея'],
    after: [undefined, 'Hello'],
  }, {
    children: ['Мария Саломея'],
    hovered: [true],
  }, {
    children: ['Мария Саломея'],
    description: ['город Санкт-Петербург, Ленинградская область, Россия'],
  }, {
    children: ['Мария Саломея'],
    disabled: [true],
    hovered: [true, false],
  }], {
    adaptivity: { sizeY: SizeType.REGULAR },
  });
});
