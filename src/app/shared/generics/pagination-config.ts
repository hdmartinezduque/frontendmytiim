import { MatPaginatorIntl } from '@angular/material/paginator';


export function getPaginatorTextConfig() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Items por pagina:';
  paginatorIntl.nextPageLabel = 'Volgende pagina';
  paginatorIntl.previousPageLabel = 'Vorige pagina';

  return paginatorIntl;
}