import { Request, Response } from 'express';
import { requestId } from '../shared/utils/requestId';
import {
  getProfileByUserId,
  upsertProfile,
} from './service';

export let getOwnProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let uid = (req as any).user.uid;

    let profile = await getProfileByUserId(uid);

    res.status(200).json({
      success: true,
      data: profile,
      error: null,
      request_id: rid,
    });
    return;
  }
  catch (error: any) {
    console.error('Get own profile error:', error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: 'internal_error', message: 'Internal server error', details: {} },
      request_id: requestId(),
    });
    return;
  }
};

export let getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let { userId } = req.params;

    let profile = await getProfileByUserId(userId);

    if (!profile) {
      res.status(404).json({
        success: false,
        data: null,
        error: { code: 'profile_not_found', message: 'Profile not found', details: {} },
        request_id: rid,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: profile,
      error: null,
      request_id: rid,
    });
    return;
  }
  catch (error: any) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: 'internal_error', message: 'Internal server error', details: {} },
      request_id: requestId(),
    });
    return;
  }
};

export let updateOwnProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let uid = (req as any).user.uid;
    let body = req.body;

    let payload: any = {};

    if (body.bio !== undefined) payload.bio = body.bio;
    if (body.location !== undefined) payload.location = body.location;
    if (body.avatarUrl !== undefined) payload.avatarUrl = body.avatarUrl;
    if (body.availability !== undefined) payload.availability = body.availability;
    if (body.skills !== undefined) payload.skills = body.skills;
    if (body.socialLinks !== undefined) payload.socialLinks = body.socialLinks;

    let profile = await upsertProfile(uid, payload);

    res.status(200).json({
      success: true,
      data: profile,
      error: null,
      request_id: rid,
    });
    return;
  }
  catch (error: any) {
    console.error('Update own profile error:', error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: 'internal_error', message: 'Internal server error', details: {} },
      request_id: requestId(),
    });
    return;
  }
};
