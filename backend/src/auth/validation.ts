// Auth validation - validates input for auth endpoints
export const validateRegister = (req: any, res: any, next: any) => {
  const { email, password, displayName } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: { message: 'Email and password are required' }
    });
  }

  next();
};

export const validateLogin = (req: any, res: any, next: any) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: { message: 'Email and password are required' }
    });
  }

  next();
};

export default { validateRegister, validateLogin };
