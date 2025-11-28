export interface WordItem {
  word: string;
  emoji: string;
  sentence: string;
  chineseWord: string;
  chineseSentence: string;
}

export enum AppMode {
  HOME = 'HOME',
  LEARN = 'LEARN',
  PRACTICE = 'PRACTICE',
  WORKSHEETS = 'WORKSHEETS'
}

export enum QuestionType {
  WORD_TO_IMAGE = 'WORD_TO_IMAGE',
  IMAGE_TO_WORD = 'IMAGE_TO_WORD',
  AUDIO_TO_IMAGE = 'AUDIO_TO_IMAGE'
}