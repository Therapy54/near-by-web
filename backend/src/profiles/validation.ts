// Profile validation — validates input for profile update endpoint
export let validateUpdateProfile = (req: any, res: any, next: any) => {
  let body = req.body;
  let allowedFields = ['bio', 'location', 'avatarUrl', 'availability', 'skills', 'socialLinks'];

  for (let key of Object.keys(body)) {
    if (!allowedFields.includes(key)) {
      return res.status(400).json({
        success: false,
        error: { message: `Invalid field: ${key}` },
      });
    }
  }

  if (body.bio !== undefined && typeof body.bio !== 'string') {
    return res.status(400).json({
      success: false,
      error: { message: 'bio must be a string' },
    });
  }

  if (body.location !== undefined && typeof body.location !== 'string') {
    return res.status(400).json({
      success: false,
      error: { message: 'location must be a string' },
    });
  }

  if (body.avatarUrl !== undefined && typeof body.avatarUrl !== 'string') {
    return res.status(400).json({
      success: false,
      error: { message: 'avatarUrl must be a string' },
    });
  }

  if (body.availability !== undefined) {
    let valid = ['Available', 'Busy', 'Open to opportunities', 'Offline'];
    if (!valid.includes(body.availability)) {
      return res.status(400).json({
        success: false,
        error: { message: 'availability must be one of: ' + valid.join(', ') },
      });
    }
  }

  if (body.skills !== undefined && !Array.isArray(body.skills)) {
    return res.status(400).json({
      success: false,
      error: { message: 'skills must be an array of strings' },
    });
  }

  if (body.socialLinks !== undefined && typeof body.socialLinks !== 'object') {
    return res.status(400).json({
      success: false,
      error: { message: 'socialLinks must be an object' },
    });
  }

  next();
};

export default { validateUpdateProfile };

