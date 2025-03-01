import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogTrackerComponent } from './log-tracker/log-tracker.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceGuard } from '../maintenance/maintenance.guard';
import { PipesModule } from '../../pipes/pipes.module';
import { ItemIconModule } from '../../modules/item-icon/item-icon.module';
import { ListPickerModule } from '../../modules/list-picker/list-picker.module';
import { ProgressPopupModule } from '../../modules/progress-popup/progress-popup.module';
import { MapModule } from '../../modules/map/map.module';
import { AlarmsModule } from '../../core/alarms/alarms.module';
import { FishingBaitModule } from '../../modules/fishing-bait/fishing-bait.module';
import { TooltipModule } from '../../modules/tooltip/tooltip.module';
import { FishingLogTrackerComponent } from './fishing-log-tracker/fishing-log-tracker.component';
import { FullpageMessageModule } from '../../modules/fullpage-message/fullpage-message.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'DoH',
    pathMatch: 'full'
  },
  {
    path: ':type',
    component: LogTrackerComponent,
    canActivate: [MaintenanceGuard]
  }
];

@NgModule({
  declarations: [LogTrackerComponent, FishingLogTrackerComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    CoreModule,
    PipesModule,
    ItemIconModule,
    ListPickerModule,
    ProgressPopupModule,
    MapModule,
    AlarmsModule,
    FishingBaitModule,
    RouterModule.forChild(routes),
    TooltipModule,
    FullpageMessageModule,

    NgZorroAntdModule
  ]
})
export class LogTrackerModule {
}
