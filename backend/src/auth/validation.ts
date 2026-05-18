// Auth validation - validates input for auth endpoints
export let validateRegister = (req: any, res: any, next: any) => {
  let { email, password, displayName } = req.body;

  if (
    !email || !password || !displayName ||
    displayName.trim().length < 2 ||
    displayName.trim().length > 24 ||
    password.length < 8
  ) {
    return res.status(400).json({
      success: false,
      error: { message: 'Email and password (min 8 characters) and displayName (between 2 and 24 characters) are required' }
    });
  }

  next();
};

export let validateLogin = (req: any, res: any, next: any) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: { message: 'Email and password are required' }
    });
  }

  next();
};

export default { validateRegister, validateLogin };
