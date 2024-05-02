import { Injectable } from '@nestjs/common';
import { CanvasElement } from '@users/common';

@Injectable()
export class ElementsService {
    update(state: CanvasElement[], update: CanvasElement[]): CanvasElement[] {
        return state
            .filter(el => !update.find(uel => uel.id == el.id))
            .concat(update);
    }
}
