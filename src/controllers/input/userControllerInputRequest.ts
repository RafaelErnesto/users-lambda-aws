import{ body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCreateUser = async (req: Request<any, any, any, any, any>, res: Response, next: NextFunction) => {
    const roles = ['manager', 'janitor', 'assistant', 'secretary']
    const validationChain = [
        body('name').isString().custom(value => {
            if(value.length === 0) {
                throw new Error('Name cannot be empty');    
            }

            if(!(/^[a-zA-Z\s]+$/.test(value))) {
                throw new Error('Numbers are not allowed on name');
            }

            return true;
        }),
        body('age').isNumeric().custom(value => {
            if(value < 0 || value > 130) {
                throw new Error('age cannot be negative or bigger than 130');
            }

            return true;
        }),
        body('role').isString().custom(value => {
            if(roles.includes(value)) {
                return true;
            }

            throw new Error('Allowed roles are: '+ roles.toString());
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

export const validateUpdateUser = async (req: Request<any, any, any, any, any>, res: Response, next: NextFunction) => {
    const roles = ['manager', 'janitor', 'assistant', 'secretary']
    const validationChain = [
        param('id').isNumeric(),
        body('name').isString().custom(value => {
            if(value.length === 0) {
                throw new Error('Name cannot be empty');    
            }

            if(!(/^[a-zA-Z\s]+$/.test(value))) {
                throw new Error('Numbers are not allowed on name');
            }

            return true;
        }),
        body('age').isNumeric().custom(value => {
            if(value < 0 || value > 130) {
                throw new Error('age cannot be negative or bigger than 130');
            }

            return true;
        }),
        body('role').isString().custom(value => {
            if(roles.includes(value)) {
                return true;
            }

            throw new Error('Allowed roles are: '+ roles.toString());
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

export const validateDeleteUser = async (req: Request<any, any, any, any, any>, res: Response, next: NextFunction) => {
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