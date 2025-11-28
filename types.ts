export interface WordItem {
  word: string;
  emoji: string;
  sentence: string;
}

export enum AppMode {
  HOME = 'HOME',
  LEARN = 'LEARN',
  PRACTICE = 'PRACTICE',
  STORY = 'STORY',
  WORKSHEETS = 'WORKSHEETS'
}

export enum QuestionType {
  WORD_TO_IMAGE = 'WORD_TO_IMAGE',
  IMAGE_TO_WORD = 'IMAGE_TO_WORD',
  AUDIO_TO_IMAGE = 'AUDIO_TO_IMAGE'
}