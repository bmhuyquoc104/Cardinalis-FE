import React from 'react';
import PropTypes from 'prop-types';
import HeaderSection from '@/components/HeaderSection/HeaderSection';
import { defaultTweet } from '@/assets/data/Data';
import TweetCard from './TweetCard';
import { TweetContentStyled } from './TweetContent.style';
import TweetComposeCard from '@/components/TweetComposeSection/TweetComposeContent/TweetComposeCard';

const TweetContent = ({ ...props }) => {
  const tweet = defaultTweet;
  return (
    <TweetContentStyled {...props}>
      <HeaderSection content="Tweet" leftType="back" />
      <TweetCard tweet={tweet} isDisableHover={true} />
      <TweetComposeCard />
      {/* Tweet Reply */}
    </TweetContentStyled>
  );
};

TweetContent.propTypes = {
  tweet: PropTypes.object,
  isPinned: PropTypes.bool,
  props: PropTypes.arrayOf(PropTypes.string)
};

export default TweetContent;
