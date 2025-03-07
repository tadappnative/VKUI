import React from 'react';
import { classNames, Headline, Title } from '@vkui';
import './Heading.css';

const HeadingRenderer = ({ level, children, className }) => {
  switch (level) {
    case 1:
      return <Title className={classNames('Heading', 'Heading--1', className)} weight="semibold" level="1">{children}</Title>;
    case 2:
      return <Title className={classNames('Heading', 'Heading--2', className)} weight="medium" level="2">{children}</Title>;
    default:
      return <Headline className={classNames('Heading', 'Heading--3', className)} weight="bold" level="1">{children}</Headline>;
  }
};

export default HeadingRenderer;
