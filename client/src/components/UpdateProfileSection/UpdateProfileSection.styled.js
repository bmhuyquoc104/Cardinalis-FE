import styled from 'styled-components';
import { motion } from 'framer-motion';

export const UpdateProfileSectionStyled = styled(motion.div)`
  display: flex;
  margin: 0 auto;
  padding: 1em 4em;
  min-height: 100vh;
  gap: 3em;
  & > :first-child {
    flex: 1;
    padding: 0.7em 0;
  }
  & > :nth-child(2) {
    flex: 3;
  }
  & > :last-child {
    flex: 1.5;
  }
  @media (max-width: 1134px) {
    padding: 1em;
    & > :first-child {
      flex: 0.5;
    }
  }
  @media (max-width: 768px) {
    padding: 1em 0.4em;
    gap: 0.5em;
    & > :last-child {
      display: none;
    }
  }
`;
