import * as yup from 'yup';
import moment from 'moment';
import { urlRegex, phoneRegex } from '@/assets/Constant';
export const maxTweetCharacters = 280;
const minPasswordSize = 8;
export const displayErrorMessage = (type, errorType, ...args) => {
  let displayType = 'input';
  switch (type) {
    case 'confirmPassword':
      displayType = 'Confirm Password';
      break;
    case 'newPassword':
      displayType = 'New Password';
      break;
    case 'oldPassword':
      displayType = 'Old Password';
      break;
    case 'website':
      displayType = 'URL';
      break;
    case 'dateOfBirth':
      displayType = 'Date of Birth';
      break;
    default:
      displayType = type;
  }
  switch (errorType) {
    case 'required':
      return `Your ${displayType} is required`;
    case 'email':
      return `Your ${displayType}'s format is not valid`;
    case 'date':
      return `Your ${displayType}'s date format is not valid`;
    case 'positive':
      return `Your ${displayType} can only be positive`;
    case 'integer':
      return `Your ${displayType} should be int only`;
    case 'phone':
      return `Your phone number is invalid`;
    case 'min':
      if (displayType == 'Date of Birth') return `You are too young to join social media`;
      else return `Your ${displayType} must be greater or equal to ${args[0]}`;
    case 'max':
      if (args[1] == 'string')
        return `Your ${displayType} is too long. Its length should be smaller than ${args[0]}`;
      else return `Your ${displayType} must be smaller or equal to ${args[0]}`;
    case 'matches':
      return `Your ${displayType} is invalid`;
    case 'oneOf':
      return `Your ${displayType} doesn't match`;
    default:
      return `Invalid ${displayType}`;
  }
};
const validatingImage = (name) => {
  // yup
  //   .mixed()
  //   .required(displayErrorMessage(name, 'required'))
  //   .test('fileFormat', 'Unsupported file format', (value) => {
  //     if (value) {
  //       return ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type);
  //     }
  //     return true;
  //   })
  //   .test('isLink', 'Invalid URL', (value) => {
  //     if (value && !value.type) {
  //       return yup.string().url().isValidSync(value);
  //     }
  //     return true;
  //   });
  return yup
    .string()
    .required(displayErrorMessage(name, 'required'))
    .matches(urlRegex, {
      message: displayErrorMessage(name, 'matches'),
      excludeEmptyString: true
    });
};

export const chooseInputSchema = (type) => {
  if (type == 'login') {
    return yup.object().shape({
      email: yup.string().required(displayErrorMessage('email', 'required')),
      password: yup
        .string()
        .required(displayErrorMessage('password', 'required'))
        .min(minPasswordSize, displayErrorMessage('password', 'min', minPasswordSize, 'string'))
    });
  } else if (type == 'register') {
    return yup.object().shape({
      email: yup
        .string()
        .email(displayErrorMessage('email', 'email'))
        .required(displayErrorMessage('email', 'required')),
      username: yup.string().required(displayErrorMessage('email', 'required')),
      password: yup
        .string()
        .required(displayErrorMessage('password', 'required'))
        .min(minPasswordSize, displayErrorMessage('password', 'min', minPasswordSize, 'string')),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], displayErrorMessage('confirmPassword', 'oneOf'))
        .required(displayErrorMessage('confirmPassword', 'required'))
    });
  } else if (type == 'updateProfile') {
    return yup.object().shape({
      banner: validatingImage('banner'),
      avatar: validatingImage('avatar'),
      fullName: yup.string().nullable(),
      bio: yup
        .string()
        .min(0)
        .max(160, displayErrorMessage('bio', 'max', 160, 'string'))
        .nullable(),
      gender: yup.string().nullable(),
      location: yup
        .string()
        .min(0)
        .max(30, displayErrorMessage('location', 'max', 30, 'string'))
        .nullable(),
      website: yup
        .string()
        .nullable()
        .min(0)
        .max(100, displayErrorMessage('website', 'max', 100, 'string'))
        .matches(urlRegex, {
          message: displayErrorMessage('website', 'matches'),
          excludeEmptyString: true
        }),
      phone: yup.string().matches(phoneRegex, displayErrorMessage('phone', 'phone')).nullable(),
      dateOfBirth: yup
        .date({
          message: displayErrorMessage('dateOfBirth', displayErrorMessage('dateOfBirth', 'date')),
          excludeEmptyString: true
        })
        .nullable()
        .test('empty-check', displayErrorMessage('dateOfBirth', 'min', 10), (value) => {
          return value == null || moment().diff(moment(value), 'years') >= 10;
        })
        .default(null)
    });
  } else if (type == 'tweet') {
    return yup.object().shape({
      tweet: yup
        .string()
        .max(maxTweetCharacters, displayErrorMessage('tweet', 'max', maxTweetCharacters, 'string'))
    });
  } else if (type == 'changePassword') {
    return yup.object().shape({
      oldPassword: yup
        .string()
        .required(displayErrorMessage('oldPassword', 'required'))
        .min(minPasswordSize, displayErrorMessage('oldPassword', 'min', minPasswordSize, 'string')),
      newPassword: yup
        .string()
        .notOneOf([yup.ref('oldPassword'), null], displayErrorMessage('New Password', 'oneOf'))
        .required(displayErrorMessage('New Password', 'required'))
        .min(
          minPasswordSize,
          displayErrorMessage('New Password', 'min', minPasswordSize, 'string')
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('confirmPassword'), null], displayErrorMessage('confirmPassword', 'oneOf'))
        .required(displayErrorMessage('confirmPassword', 'required'))
        .min(
          minPasswordSize,
          displayErrorMessage('confirmPassword', 'min', minPasswordSize, 'string')
        )
    });
  } else {
    return yup.object().shape({
      search: yup.string().required(displayErrorMessage('search', 'required'))
    });
  }
};
