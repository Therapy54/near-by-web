import { Request, Response } from 'express';
import { requestId } from '../shared/utils/requestId';
import {
  createPortfolioItem,
  getPortfolioItems,
  getPortfolioItemById,
  updatePortfolioItem,
  deletePortfolioItem
} from './service';

export let createPortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let uid = (req as any).user.uid;
    let body = req.body;

    let item = await createPortfolioItem(uid, {
      title: body.title,
      description: body.description,
      mediaUrl: body.mediaUrl,
      mediaType: body.mediaType,
      tags: body.tags,
      link: body.link
    });

    res.status(201).json({
      success: true,
      data: item,
      error: null,
      request_id: rid
    });
  }
  catch (error: any) {
    console.error('Create portfolio error:', error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: 'internal_error', message: 'Internal server error', details: {} },
      request_id: requestId()
    });
  }
};

export let listPortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let uid = (req as any).user.uid;

    let items = await getPortfolioItems(uid);

    res.status(200).json({
      success: true,
      data: items,
      error: null,
      request_id: rid
    });
  }
  catch (error: any) {
    console.error('List portfolio error:', error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: 'internal_error', message: 'Internal server error', details: {} },
      request_id: requestId()
    });
  }
};

export let listUserPortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let { userId } = req.params;

    let items = await getPortfolioItems(userId);

    res.status(200).json({
      success: true,
      data: items,
      error: null,
      request_id: rid
    });
  }
  catch (error: any) {
    console.error('List user portfolio error:', error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: 'internal_error', message: 'Internal server error', details: {} },
      request_id: requestId()
    });
  }
};

export let getPortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let { itemId } = req.params;

    let item = await getPortfolioItemById(itemId);

    if (!item) {
      res.status(404).json({
        success: false,
        data: null,
        error: { code: 'not_found', message: 'Portfolio item not found', details: {} },
        request_id: rid
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: item,
      error: null,
      request_id: rid
    });
  }
  catch (error: any) {
    console.error('Get portfolio error:', error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: 'internal_error', message: 'Internal server error', details: {} },
      request_id: requestId()
    });
  }
};

export let updatePortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let uid = (req as any).user.uid;
    let { itemId } = req.params;
    let body = req.body;

    let item = await updatePortfolioItem(itemId, uid, {
      title: body.title,
      description: body.description,
      mediaUrl: body.mediaUrl,
      mediaType: body.mediaType,
      tags: body.tags,
      link: body.link
    });

    if (!item) {
      res.status(404).json({
        success: false,
        data: null,
        error: { code: 'not_found', message: 'Portfolio item not found or access denied', details: {} },
        request_id: rid
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: item,
      error: null,
      request_id: rid
    });
  }
  catch (error: any) {
    console.error('Update portfolio error:', error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: 'internal_error', message: 'Internal server error', details: {} },
      request_id: requestId()
    });
  }
};

export let deletePortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let uid = (req as any).user.uid;
    let { itemId } = req.params;

    let deleted = await deletePortfolioItem(itemId, uid);

    if (!deleted) {
      res.status(404).json({
        success: false,
        data: null,
        error: { code: 'not_found', message: 'Portfolio item not found or access denied', details: {} },
        request_id: rid
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { deleted: true },
      error: null,
      request_id: rid
    });
  }
  catch (error: any) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: 'internal_error', message: 'Internal server error', details: {} },
      request_id: requestId()
    });
  }
};