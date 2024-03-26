import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ValidateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (id && !isValidObjectId(id)) {
        throw new BadRequestException('Invalid ID format');
      }

      next();
    } catch (error) {
      if (error instanceof ForbiddenException) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      res.status(error.status || 400).json({ message: error.message });
    }
  }
}
