import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './lesson/lesson.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StartComponent } from './lesson/slides-renderer/start/start.component';
import { StaticComponent } from './lesson/slides-renderer/static/static.component';
import { FixedFillInComponent } from './lesson/slides-renderer/fixed-fill-in/fixed-fill-in.component';
import { MixedFillInComponent } from './lesson/slides-renderer/mixed-fill-in/mixed-fill-in.component';
import { HintFillInComponent } from './lesson/slides-renderer/hint-fill-in/hint-fill-in.component';
import { SingleChoiceComponent } from './lesson/slides-renderer/single-choice/single-choice.component';
import { SwipeComponent } from './lesson/slides-renderer/swipe/swipe.component';
import { MatchComponent } from './lesson/slides-renderer/match/match.component';
import { EasyReviewComponent } from './lesson/slides-renderer/easy-review/easy-review.component';
import { HardReviewComponent } from './lesson/slides-renderer/hard-review/hard-review.component';
import { SummaryComponent } from './lesson/slides-renderer/summary/summary.component';


@NgModule({
  declarations: [
    LessonComponent,
    StartComponent,
    StaticComponent,
    FixedFillInComponent,
    MixedFillInComponent,
    HintFillInComponent,
    SingleChoiceComponent,
    SwipeComponent,
    MatchComponent,
    EasyReviewComponent,
    HardReviewComponent,
    SummaryComponent,
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ]
})
export class LessonModule {
}
