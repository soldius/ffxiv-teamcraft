import { Component, OnInit } from '@angular/core';
import { List } from '../../../../modules/list/model/list';
import { ListRow } from '../../../../modules/list/model/list-row';
import { ListsFacade } from '../../../../modules/list/+state/lists.facade';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { InventoryFacade } from '../../../../modules/inventory/+state/inventory.facade';

@Component({
  selector: 'app-relationships',
  templateUrl: './relationships.component.html',
  styleUrls: ['./relationships.component.less']
})
export class RelationshipsComponent implements OnInit {

  public item: ListRow;

  public list$: Observable<List>;

  public requires$: Observable<ListRow[]>;

  public requiredBy$: Observable<ListRow[]>;

  constructor(private listsFacade: ListsFacade, private inventoryService: InventoryFacade) {
    this.list$ = this.listsFacade.selectedList$;
  }

  ngOnInit() {
    this.requires$ = this.list$.pipe(
      switchMap(list => {
        const items$ = (this.item.requires || [])
          .sort((a, b) => a.id < b.id ? -1 : 1)
          .map(req => {
            let item: any = list.getItemById(req.id, true);
            item = { ...item, reqAmount: req.amount, canBeCrafted: list.canBeCrafted(item) };
            return this.inventoryService.inventory$.pipe(
              map(inventory => {
                return inventory.getItem(item.id).map(entry => {
                  return {
                    isRetainer: entry.retainerName !== undefined,
                    containerName: entry.retainerName ? entry.retainerName : this.inventoryService.getContainerName(entry.containerId),
                    amount: entry.quantity,
                    hq: entry.hq
                  };
                }).reduce((res, entry) => {
                  const resEntry = res.find(e => e.containerName === entry.containerName && e.hq === entry.hq);
                  if (resEntry !== undefined) {
                    resEntry.amount += entry.amount;
                  } else {
                    res.push(entry);
                  }
                  return res;
                }, []);
              }),
              map(entries => {
                item.inventoryEntries = entries;
                return item;
              })
            );
          });
        return combineLatest(items$);
      })
    );

    this.requiredBy$ = this.list$.pipe(
      map(list => {
        const requiredBy = [];
        list.forEach(item => {
          if (item.requires !== undefined) {
            item.requires.forEach(req => {
              if (req.id === this.item.id) {
                requiredBy.push({ ...item, canBeCrafted: list.canBeCrafted(item) });
              }
            });
          }
        });
        return requiredBy;
      })
    );
  }

  public trackByInventoryEntry(index: number, entry: { containerName: string, amount: number, hq: boolean }): string {
    return `${entry.containerName}${entry.hq}`;
  }

}
