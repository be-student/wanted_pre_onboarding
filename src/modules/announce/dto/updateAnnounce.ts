import { PartialType } from '@nestjs/swagger';
import { CreateAnnounce } from './createAnnounce';

export class UpdateAnnounce extends PartialType(CreateAnnounce) {}
