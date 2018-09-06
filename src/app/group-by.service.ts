import { Injectable, Component, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'groupBy'})

@Injectable({
  providedIn: 'root'
})
export class GroupByPipe implements PipeTransform {
    transform(collection: Array<any>, property: string): Array<any> {
        if(!collection) {
            return null;
        }
        const groupedCollection = collection.reduce((previous, current)=> {
          var date = new Date(current[property]).toLocaleDateString()
            if(!previous[date]) {
              previous[date] = [current];
            } else {
                previous[date].push(current);
            }

            return previous;
        }, {});
        return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
    }
}
