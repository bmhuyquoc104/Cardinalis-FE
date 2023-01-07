import React from 'react';
import PropTypes from 'prop-types';
import { FlexContainer } from '@/components/Container/Container.styled';
import Avatar from '@/components/Image/Avatar';
import TweetInput from './TweetInput';
import { youUser } from '@/assets/data/UserData';

const TweetComposeCard = () => {
  const user = youUser;
  return (
    <FlexContainer padding={`0.7em var(--horizontal-spaces)`}>
      <Avatar alignSelf="flex-start" src={user.avatar} size="3em" />
      <TweetInput />
    </FlexContainer>
  );
};

TweetComposeCard.propTypes = {
  user: PropTypes.object
};

export default TweetComposeCard;
