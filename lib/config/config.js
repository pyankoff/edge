// Options
AccountsTemplates.configure({
  defaultLayout: 'layout',
  defaultLayoutRegions: {
  },
  defaultContentRegion: 'content',
  showForgotPasswordLink: true,
  overrideLoginErrors: true,
  enablePasswordChange: true,

  // sendVerificationEmail: true,
  // enforceEmailVerification: true,
  confirmPassword: false,
  //continuousValidation: false,
  //displayFormLabels: true,
  //forbidClientAccountCreation: true,
  //formValidationFeedback: true,
  //homeRoutePath: '/',
  //showAddRemoveServices: false,
  //showPlaceholders: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  // positiveFeedback: true,

  // Privacy Policy and Terms of Use
  //privacyUrl: 'privacy',
  //termsUrl: 'terms-of-use',
});

//Fields
AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    displayName: 'username',
    required: true,
    minLength: 3,
    errStr: 'error.minChar'
});

AccountsTemplates.removeField('email');
AccountsTemplates.addField({
    _id: 'email',
    type: 'email',
    required: true,
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'error.accounts.Invalid email',
});

AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 3,
    errStr: 'error.minChar'
});


// Avatar

Avatar.setOptions({
  fallbackType: "initials",
  emailHashProperty: "email_hash",
  imageSizes: {
    'large': 200,
    'small': 40
  }
});
