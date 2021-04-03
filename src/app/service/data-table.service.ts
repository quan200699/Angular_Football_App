import {Injectable} from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor() {
  }

  createDataTable(id: any) {
    $(() => {
      $(`#${id}`).DataTable({
        paging: true,
        lengthChange: false,
        searching: false,
        ordering: true,
        info: true,
        autoWidth: false,
        pageLength: 10
      });
    });
  }
}
