// https://stackoverflow.com/questions/65255298/how-to-conditionally-disable-the-submit-button-with-react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { chooseInputSchema, maxTweetCharacters } from '@/helpers/ValidatingInput';
import PropTypes from 'prop-types';
import { Input } from '@/components/Input/Input';
import { StyledForm } from '@/components/Form/Form.styled';
import StyledButton from '@/components/Button/Button.styled';
import { useChange } from '@/hooks/useChange';
import { ErrorText } from '@/components/Text/ErrorText';

const TweetInput = ({ ...props }) => {
  const { value: isDisabled, onSetNewValue: toggleDisabled } = useChange(false);
  const schema = chooseInputSchema('tweet');
  const defaultValues = { tweet: '' };
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    getValues,
    setValue
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmitClick = (data) => {
    console.log('Tweet');
    // if (isDirty && isValid) {
    //   console.log(data);
    // } else {
    //   console.log('invalid');
    // }
  };
  return (
    <StyledForm
      height="auto"
      {...props}
      onSubmit={handleSubmit(onSubmitClick)}
      padding={`0 var(--horizontal-spaces)`}
      jc="flex-start">
      <Input
        inputType="textarea"
        inputThemeName="loginInput"
        placeholder="What's happening?"
        onChange={register('tweet').onChange}
        {...register('tweet')}
      />
      
          <ErrorText errors={getValues('tweet').length > maxTweetCharacters &&
          maxTweetCharacters - getValues('tweet').length
          } />
      <StyledButton type="submit" disabled={!isDirty || !isValid} buttonThemeName="primaryButton">
        Tweet
      </StyledButton>
    </StyledForm>
  );
};

TweetInput.propTypes = {};

export default TweetInput;
