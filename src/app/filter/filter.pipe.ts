import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (searchText == undefined) return items;
    var c = searchText.replace(/\W/g, '');

    return items.filter(function (x) {

      return x.title.toLowerCase().indexOf(c.toLowerCase()) > -1;
    }
    )
  }
}


