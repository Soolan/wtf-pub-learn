import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LessonRoutingModule} from './lesson-routing.module';
import {LessonComponent} from './lesson/lesson.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {StartComponent} from './lesson/slides-renderer/start/start.component';
import {StaticComponent} from './lesson/slides-renderer/static/static.component';
import {FixedFillInComponent} from './lesson/slides-renderer/fixed-fill-in/fixed-fill-in.component';
import {MixedFillInComponent} from './lesson/slides-renderer/mixed-fill-in/mixed-fill-in.component';
import {HintFillInComponent} from './lesson/slides-renderer/hint-fill-in/hint-fill-in.component';
import {SingleChoiceComponent} from './lesson/slides-renderer/single-choice/single-choice.component';
import {SwipeComponent} from './lesson/slides-renderer/swipe/swipe.component';
import {MatchComponent} from './lesson/slides-renderer/match/match.component';
import {EasyReviewComponent} from './lesson/slides-renderer/easy-review/easy-review.component';
import {HardReviewComponent} from './lesson/slides-renderer/hard-review/hard-review.component';
import {SummaryComponent} from './lesson/slides-renderer/summary/summary.component';
import {SlidesRendererComponent} from './lesson/slides-renderer/slides-renderer.component';
import {HeaderComponent} from './lesson/slides-renderer/header/header.component';
import {FooterComponent} from './lesson/slides-renderer/footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../../../shared/shared.module';
import {NotFoundComponent} from './lesson/slides-renderer/not-found/not-found.component';
import {TextImageComponent} from './lesson/slides-renderer/text-image/text-image.component';
import {MultipleChoiceComponent} from './lesson/slides-renderer/multiple-choice/multiple-choice.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {BlankRendererComponent} from './lesson/slides-renderer/hint-fill-in/blank-renderer/blank-renderer.component';
import {MarkdownModule} from 'ngx-markdown';
import {MatDividerModule} from '@angular/material/divider';
import {PollComponent} from './lesson/slides-renderer/poll/poll.component';
import {FinalExamComponent} from '../final-exam/final-exam.component';
import {MatRadioModule} from '@angular/material/radio';
import {CourseModule} from '../../course.module';
import {ExamFooterComponent} from './lesson/slides-renderer/exam-footer/exam-footer.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


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
    SlidesRendererComponent,
    HeaderComponent,
    FooterComponent,
    ExamFooterComponent,
    NotFoundComponent,
    TextImageComponent,
    MultipleChoiceComponent,
    BlankRendererComponent,
    PollComponent,
    FinalExamComponent,
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    ReactiveFormsModule,
    MatChipsModule,
    MarkdownModule,
    MatDividerModule,
    MatRadioModule,
    CourseModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ]
})
export class LessonModule {
}
