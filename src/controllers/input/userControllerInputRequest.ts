import{ body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCreateUser = async (req: Request<any, any, any, any, any>, res: Response, next: NextFunction) => {
    const validationChain = [
        body('name').isString(),
        body('age').isNumeric().custom(value => {
            if(value < 0 || value > 130) {
                throw new Error('age cannot be negative or bigger than 130');
            }

            return true;
        }),
        body('role').isString().custom(value => {
            if(value === 'manager' || value === 'user') {
                return true;
            }

            throw new Error('role must be managar or user');
        })
    ];
    await Promise.all(validationChain.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next()
    } else {
        res.status(400).json(errors)
    }
}

export const validateGetUser = async (req: Request<any, any, any, any, any>, res: Response, next: NextFunction) => {
    const validationChain = [
        param('id').isNumeric(),
    ];
    await Promise.all(validationChain.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next()
    } else {
        res.status(400).json(errors)
    }
}