import { Request, Response } from 'express';
import { requestId } from '../shared/utils/requestId';

let mockListings: any[] = [
  {
    id: '1',
    title: 'Freelance Web Developer',
    description: 'Experienced React developer available for projects',
    type: 'service',
    location: 'Remote',
    userId: 'user-1',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'iPhone 14 Pro for sale',
    description: 'Excellent condition, 256GB',
    type: 'product',
    location: 'Downtown',
    userId: 'user-2',
    createdAt: new Date().toISOString()
  }
];

export let getListings = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    res.status(200).json({
      success: true,
      data: mockListings,
      error: null,
      request_id: rid
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: null,
      error: { code: 'internal_error', message: 'Internal server error', details: {} },
      request_id: requestId()
    });
    return;
  }
};

export let searchListings = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let { q } = req.query;
    let results = mockListings.filter(l =>
      l.title.toLowerCase().includes((q as string).toLowerCase()) ||
      l.description.toLowerCase().includes((q as string).toLowerCase())
    );
    res.status(200).json({
      success: true,
      data: results,
      error: null,
      request_id: rid
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: null,
      error: { code: 'internal_error', message: 'Internal server error', details: {} },
      request_id: requestId()
    });
    return;
  }
};

export let getListingById = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let listing = mockListings.find(l => l.id === req.params.id);
    if (!listing) {
      res.status(404).json({
        success: false,
        data: null,
        error: { code: 'not_found', message: 'Listing not found', details: {} },
        request_id: rid
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: listing,
      error: null,
      request_id: rid
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: null,
      error: { code: 'internal_error', message: 'Internal server error', details: {} },
      request_id: requestId()
    });
    return;
  }
};

export let createListing = async (req: Request, res: Response): Promise<void> => {
  try {
    let rid = requestId();
    let { title, description, type, location } = req.body;
    let uid = (req as any).user.uid;

    let newListing = {
      id: Date.now().toString(),
      title,
      description,
      type: type || 'service',
      location: location || null,
      userId: uid,
      createdAt: new Date().toISOString()
    };

    mockListings.unshift(newListing);

    res.status(201).json({
      success: true,
      data: newListing,
      error: null,
      request_id: rid
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: null,
      error: { code: 'internal_error', message: 'Internal server error', details: {} },
      request_id: requestId()
    });
    return;
  }
};