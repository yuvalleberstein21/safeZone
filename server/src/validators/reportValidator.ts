import { body } from 'express-validator';

export const reportValidator = [
  body('is_safe').isBoolean().withMessage('is_safe must be a boolean'),
  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude'),
  body('reason')
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage('Reason too long'),
  body('image_url').optional().isURL().withMessage('Invalid image URL'),
  body('area').optional().isString(),
  body('shift_id').optional().isInt(),
];
