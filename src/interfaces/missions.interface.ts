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

export { IGetMissionOfFamily, IMissionInfo };
