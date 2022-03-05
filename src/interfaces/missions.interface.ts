interface IGetMissionOfFamily {
  familyNickName: string;
  memberNickNames: string[];
  gauge: number;
  missionInfo: IMissionInfo[];
}

interface IMissionInfo {
  missionId: number;
  missionCategory: string;
  completedMemberCount: number;
  memberCount: number;
  date: string;
}

interface IGetQuestionMissionOfFamily {
  content: string;
  date: string;
  isTotalAnswerCompleted: boolean;
  answerInfo: IAnswerInfo[];
}

interface IAnswerInfo {
  nickName: string;
  answer: string;
  isAnswered: boolean;
}

interface IGetPictureMissionOfFamily {
  content: string;
  date: string;
  pictureDescription: string;
  pastPhoto: string;
  recentPhoto: string;
}

export {
  IGetMissionOfFamily,
  IMissionInfo,
  IGetQuestionMissionOfFamily,
  IAnswerInfo,
  IGetPictureMissionOfFamily,
};
