import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button/Button';
import { CaptionProfile } from './TextProfile';

export const EditButtonProfile = ({ onClick }) => {
  return (
    <Button
      buttonType="primary"
      buttonThemeName="thirdButton"
      borderRadius="30%/110%"
      width="auto"
      padding="0.8em 1.3em"
      onClick={onClick}>
      Edit Profile
    </Button>
  );
};

export const FollowButtonProfile = ({ count, text, onClick }) => {
  return (
    <Button
      buttonType="link"
      width="auto"
      jc="flex-start"
      textTransform="none"
      textDecoration="underline"
      onClick={onClick}>
      {<CaptionProfile text={count} weight={600} />}
      {<CaptionProfile text={<span>&nbsp;{text}</span>} textThemeName="subText" />}
    </Button>
  );
};

export const NavButtonProfile = ({ text, onClick, isCurrentTab }) => {
  return (
    <Button
      buttonType="link"
      padding="1.2em 0em"
      textTransform="none"
      buttonThemeName="thirdButton"
      hoverType={2}
      pseudoAfter={isCurrentTab ? 1 : 0}
      pseudoAfterWidth="40%"
      hoverPseudoAfterWidth="50%"
      borderRadius="3px"
      onClick={onClick}>
      {text}
    </Button>
  );
};
EditButtonProfile.propTypes = {
  onClick: PropTypes.func
};
FollowButtonProfile.propTypes = {
  count: PropTypes.number,
  text: PropTypes.string,
  onClick: PropTypes.func
};
NavButtonProfile.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  isCurrentTab: PropTypes.bool
};
