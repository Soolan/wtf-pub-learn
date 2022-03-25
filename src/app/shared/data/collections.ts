import {Collection} from '../models/collection';
import {Lesson} from '../models/lesson';
import {Course} from '../models/course';
import {Slide} from '../models/slide';
import {Position, SlideType} from './enums';

//------------------------------------------------- Course
export const COURSES: Collection = {
  path: 'courses',
  limit: 6,
  where: {field: 'published', operator: '==', value: true}
};

export const COURSE: Course = {
  name: 'new course',
  image: '',
  avatar: '',
  description: 'add description here',
  published: false,
  level: 0,
  tags: 'fun, facts',
  timestamps: {
    created_at: Date.now(),
    updated_at: Date.now(),
    deleted_at: 0
  }
};

//------------------------------------------------- Lesson
export const LESSONS: Collection = {
  path: 'lessons',
  limit: 6,
  where: {field: 'name', operator: '!=', value: ''}
};

export const LESSON: Lesson = {
  name: 'new lesson',
  avatar: '',
  description: 'some description',
  published: false,
  timestamps: {
    created_at: Date.now(),
    updated_at: Date.now(),
    deleted_at: 0
  },
  order: 0
}

//------------------------------------------------- Slide
export const SLIDES: Collection = {
  path: 'slides',
  limit: 25,
  where: {field: 'type', operator: '!=', value: '-1'}
};

export const START_SLIDE: Slide = {
  type: SlideType.Start,
  order: 0,
  content: {
    title: 'start',
    subtitle: 'start desc',
    button_label: 'begin',
    bullet_points: [
      {value: 'b1'},
      {value: 'b2'}
    ],
  }
};

export const STATIC_SLIDE: Slide = {
  type: SlideType.Static,
  order: 0,
  content: {
    text: 'some description',
    image: '',
    position: Position.Top,
  }
};

export const FIXED_FILL_IN_SLIDE: Slide = {
  type: SlideType.FixedFillIn,
  order: 0,
  content: {
    scenario: 'Once upon a time...',
    answer: 1,
    options: [
      {value: 'yaw', response: 'some response'},
      {value: 'braw', response: 'some response'},
    ],
    options_per_set: 2
  }
};

export const MIXED_FILL_IN_SLIDE: Slide = {
  type: SlideType.MixedFillIn,
  order: 0,
  content: {
    scenario: 'Once upon a time...',
    answers: [
      {answer: 'yaw'},
      {answer: 'yup'},
    ],
    options: [
      {value: 'yaw', response: 'some response'},
      {value: 'braw', response: 'some response'},
      {value: 'yup', response: 'some response'},
      {value: 'coolio', response: 'some response'},
    ],
    options_per_set: 2
  }
};

export const HINT_FILL_IN_SLIDE: Slide = {
  type: SlideType.HintFillIn,
  order: 0,
  content: {
    image: '',
    position: Position.Top,
    answer: 'yaw',
    hint: 'it starts with y',
    scenario: 'Once upon a time...',
  }
};

export const SINGLE_CHOICE_SLIDE: Slide = {
  type: SlideType.SingleChoice,
  order: 0,
  content: {
    image: '',
    position: Position.Top,
    question: 'How much wood would a woodchuck chop, if a woodchuck would chop wood? ',
    answer: 'braw',
    options: [
      {value: 'yaw', response: 'some response'},
      {value: 'braw', response: 'some response'},
    ],
    options_per_set: 2,
  }
};

export const MULTIPLE_CHOICE_SLIDE: Slide = {
  type: SlideType.MultipleChoice,
  order: 0,
  content: {
    image: '',
    position: Position.Top,
    question: 'How much wood would a woodchuck chop, if a woodchuck would chop wood? ',
    answers: [
      {answer: 'braw'},
      {answer: 'coolio'},
      ],
    options: [
      {value: 'yaw', response: 'some response'},
      {value: 'braw', response: 'some response'},
      {value: 'fantastic', response: 'some response'},
      {value: 'coolio', response: 'some response'},
    ],
    options_per_set: 2,
  }
};

export const SWIPE_SLIDE: Slide = {
  type: SlideType.Swipe,
  order: 0,
  content: {
    image: '',
    position: Position.Top,
    scenario: 'Three witches watching three watches. Which witch watching which watch?',

    swipe_left: 'Oh Yeah!',
    swipe_right: 'Hell no!',
    cards: [
      {
        question: 'Are the sexy?',
        answer: 'Oh Yeah!',
      },
      {
        question: 'Will you marry them?',
        answer: 'Hell no!',
      },
    ],
  }
};

export const MATCH_SLIDE: Slide = {
  type: SlideType.Match,
  order: 0,
  content: {
    image: '',
    position: Position.Top,
    scenario: 'Ted is red, see red Ted.',
    matches: [
      {
        question: 'Ted is red?',
        answer: 'No he is orange.',
      },
      {
        question: 'See red ted?',
        answer: 'Red velvet please.',
      },
      {
        question: 'Another drink?',
        answer: 'Tequila only!',
      },
      {
        question: 'Buy the fucking dip!',
        answer: 'Huh!',
      },
    ],
  }
};

export const SUMMARY_SLIDE: Slide = {
  type: SlideType.Summary,
  order: 0,
  content: {
    image: '',
    position: Position.Top,
    summary: 'Good job braw.',
    terms: 'relax,you,are,in,safe,hands'
  }
};

export const EASY_REVIEW_SLIDE: Slide = {
  type: SlideType.EasyReview,
  order: 0,
  content: {}
};

export const HARD_REVIEW_SLIDE: Slide = {
  type: SlideType.HardReview,
  order: 0,
  content: {}
};

export const BLANK_SLIDES: Slide[] = [
  START_SLIDE,
  STATIC_SLIDE,
  FIXED_FILL_IN_SLIDE,
  MIXED_FILL_IN_SLIDE,
  HINT_FILL_IN_SLIDE,
  SINGLE_CHOICE_SLIDE,
  MULTIPLE_CHOICE_SLIDE,
  SWIPE_SLIDE,
  MATCH_SLIDE,
  EASY_REVIEW_SLIDE,
  HARD_REVIEW_SLIDE,
  SUMMARY_SLIDE
];
