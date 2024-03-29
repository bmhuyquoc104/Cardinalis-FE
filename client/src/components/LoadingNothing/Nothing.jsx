import * as React from 'react';
import { FlexContainer } from '@/components/Container/Container.styled';
import Image from '@/components/Image/Image';
import PropTypes from 'prop-types';
import NothingSvg from '@/assets/images/nothing.svg';
import Text from '@/components/Text/Text';

export default function Nothing({ text, subText = 'Nothing to show', hasImage = true, ...props }) {
  return (
    <FlexContainer
      height="auto"
      fd="column"
      jc="flex-start"
      gap="0.7em"
      {...props}
      padding="var(--vertical-nothing-spaces) 0">
      {hasImage && <Image src={NothingSvg} alt="Nothing" width="17.8em" />}
      {text && <Text type="h4" jc="center" textThemeName="paragraphText" text={text} />}
      {subText && <Text type="p2" jc="center" textThemeName="subText" text={subText} width="85%" />}
    </FlexContainer>
  );
}
Nothing.propTypes = {
  text: PropTypes.string,
  subText: PropTypes.string,
  hasImage: PropTypes.bool,
  props: PropTypes.any
};
