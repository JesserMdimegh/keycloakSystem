import { Injectable } from '@nestjs/common';
import { Cat } from 'src/interfaces/Cat.inteface';

@Injectable()
export class CatsServiceService {
    private cats: Cat[] = [{ name: 'Tom', age: 3, breed: 'Siamese' }];

    addCat(name: Cat): void {
        this.cats.push(name);
    }

    getCats(): Cat[] {
        return this.cats;
    }
}
