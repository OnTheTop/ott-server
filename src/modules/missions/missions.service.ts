import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from 'src/entities/family.entity';
import { Member } from 'src/entities/members.entity';
import { Mission } from 'src/entities/missions.entity';
import { Picture } from 'src/entities/pictures.entity';
import { Question } from 'src/entities/questions.entity';
import {
  IAnswerInfo,
  IGetMissionOfFamily,
  IGetPictureMissionOfFamily,
  IGetQuestionMissionOfFamily,
  IMissionInfo,
} from 'src/interfaces/missions.interface';
import { getConnection, Repository } from 'typeorm';
import { CarryOutQuestionMissionDto } from './dto/carry-out-question-mission.dto';

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(Mission)
    private readonly missionRepository: Repository<Mission>,

    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
  ) {}

  async getMission(missionId: number, familyId: number): Promise<Mission> {
    await this.updateMissionDate(missionId);

    await this.saveMission(familyId, missionId);

    return await this.missionRepository.findOne({ where: { id: missionId } });
  }

  async updateMissionDate(missionId: number) {
    await this.missionRepository.update(
      { id: missionId },
      { date: new Date() },
    );
  }

  async saveMission(familyId: number, missionId: number) {
    const family: Family = await this.familyRepository.findOne({
      where: { id: familyId },
    });
    const mission: Mission = await this.missionRepository.findOne({
      where: { id: missionId },
    });

    if (mission.category == '질문') {
      const members: Member[] = await this.memberRepository.find({
        where: { familiy: familyId },
      });

      members.map(async (member) => {
        const question: Question = this.questionRepository.create({
          family: family,
          mission: mission,
          member: member,
        });

        await this.questionRepository.save(question);
      });
    } else {
      const member: Member[] = await getConnection()
        .createQueryBuilder()
        .select()
        .from(Member, 'member')
        .where('member.familiyId = :familiyId and leader = 1', {
          familiyId: familyId,
        })
        .execute();

      const picture: Picture = this.pictureRepository.create({
        family: family,
        mission: mission,
        member: member[0],
      });

      await this.pictureRepository.save(picture);
    }
  }

  async getMissionsOfFamily(familyId: number): Promise<IGetMissionOfFamily> {
    const family: Family = await this.familyRepository.findOne({
      where: { id: familyId },
    });

    const members: Member[] = await this.memberRepository.find({
      where: { familiy: familyId },
    });

    const questionMissionIds: number[] = [];
    const questionMissions = await getConnection()
      .createQueryBuilder()
      .select('missionId')
      .from(Question, 'question')
      .where('question.familyId = :familyId', { familyId: familyId })
      .distinct()
      .execute();
    questionMissions.map((mission) => {
      questionMissionIds.push(mission.missionId);
    });
    const pictureMissionIds: number[] = [];
    const pictureMissions = await getConnection()
      .createQueryBuilder()
      .select('missionId')
      .from(Picture, 'picture')
      .where('picture.familyId = :familyId', { familyId: familyId })
      .distinct()
      .execute();
    pictureMissions.map((mission) => {
      pictureMissionIds.push(mission.missionId);
    });

    const missionInfo = await Promise.all(
      questionMissionIds.map(async (questionMissionId) => {
        return await this._formattingQuestionMission(
          questionMissionId,
          familyId,
          family.memberCount,
        );
      }),
    );
    missionInfo.push(
      ...(await Promise.all(
        pictureMissionIds.map(async (pictureMissionId) => {
          return await this._formattingPictureMission(
            pictureMissionId,
            familyId,
          );
        }),
      )),
    );

    return {
      familyNickName: family.familyNickname,
      memberNickNames: this._formattingMember(members),
      gauge: family.gauge,
      missionInfo: missionInfo,
    };
  }

  _formattingMember(members: Member[]): string[] {
    const memberNickNameList: string[] = [];

    members.map((member) => {
      memberNickNameList.push(member.memberNickname);
    });

    return memberNickNameList;
  }

  async _formattingQuestionMission(
    questionMissionId: number,
    familyId: number,
    memberCount: number,
  ): Promise<IMissionInfo> {
    const completedCount = await getConnection()
      .createQueryBuilder()
      .select()
      .from(Question, 'question')
      .where(
        'question.familyId = :familyId and question.missionId = :questionMissionId and question.answer is not null',
        { familyId: familyId, questionMissionId: questionMissionId },
      )
      .getCount();

    const mission: Mission = await this.missionRepository.findOne({
      where: { id: questionMissionId },
    });

    return {
      missionId: questionMissionId,
      missionCategory: '질문',
      completedMemberCount: completedCount,
      memberCount: memberCount,
      date: this._formattingDate(mission),
    };
  }

  async _formattingPictureMission(
    pictureMissionId: number,
    familyId: number,
  ): Promise<IMissionInfo> {
    const completedCount = await getConnection()
      .createQueryBuilder()
      .select()
      .from(Picture, 'picture')
      .where(
        'picture.familyId = :familyId and picture.missionId = :pictureMissionId and picture.comment is not null',
        { familyId: familyId, pictureMissionId: pictureMissionId },
      )
      .getCount();

    const mission: Mission = await this.missionRepository.findOne({
      where: { id: pictureMissionId },
    });

    return {
      missionId: pictureMissionId,
      missionCategory: '사진',
      completedMemberCount: completedCount,
      memberCount: 1,
      date: this._formattingDate(mission),
    };
  }

  _formattingDate(mission: Mission): string {
    const month = mission.date.getMonth() + 1;
    const date = mission.date.getDate();
    const rMonth = month > 9 ? String(month) : '0' + String(month);
    const rDate = date > 9 ? String(date) : '0' + String(date);

    return rMonth + '.' + rDate;
  }

  async getQuestionMissionOfFamily(
    missionId: number,
    familyId: number,
  ): Promise<IGetQuestionMissionOfFamily> {
    const mission: Mission = await this.missionRepository.findOne({
      where: { id: missionId },
    });

    const questions: Question[] = await getConnection()
      .createQueryBuilder()
      .select()
      .from(Question, 'question')
      .leftJoinAndSelect('question.member', '')
      .where(
        'question.missionId = :missionId and question.familyId = :familyId',
        {
          missionId: missionId,
          familyId: familyId,
        },
      )
      .execute();

    const answerInfos: IAnswerInfo[] = this._formattionAnswerInfo(questions);

    return {
      content: mission.content,
      date: this._formattingDate(mission),
      isTotalAnswerCompleted: this.isEveryoneAnswered(answerInfos),
      answerInfo: answerInfos,
    };
  }

  _formattionAnswerInfo(questions: Question[]): IAnswerInfo[] {
    const answerInfos = [];

    answerInfos.push(
      ...questions.map((question) => {
        const isAnswered: boolean = question.answer ? true : false;
        return {
          nickName: question['member-nickname'],
          answer: question.answer,
          isAnswered: isAnswered,
        };
      }),
    );

    return answerInfos;
  }

  isEveryoneAnswered(answerInfos: IAnswerInfo[]): boolean {
    const noAnswerList: IAnswerInfo[] = answerInfos.filter((answerInfos) => {
      return !answerInfos.isAnswered;
    });

    return noAnswerList.length > 0 ? false : true;
  }

  async getPictureMissionOfFamily(
    missionId: number,
    familyId: number,
  ): Promise<IGetPictureMissionOfFamily> {
    const mission: Mission = await this.missionRepository.findOne({
      where: { id: missionId },
    });

    const picture: Picture = await getConnection()
      .createQueryBuilder()
      .select()
      .from(Picture, 'picture')
      .where(
        'picture.missionId = :missionId and picture.familyId = :familyId',
        {
          missionId: missionId,
          familyId: familyId,
        },
      )
      .execute();

    return {
      content: mission.content,
      date: this._formattingDate(mission),
      pictureDescription: picture[0].comment,
      pastPhoto: picture[0].pastPhoto,
      recentPhoto: picture[0].recentPhoto,
    };
  }

  async carryOutQuestionMission(
    missionId: number,
    familyId: number,
    carryOutQuestionMissionDto: CarryOutQuestionMissionDto,
  ) {
    const { memberId, answer } = carryOutQuestionMissionDto;

    const member: Member = await this.memberRepository.findOne({
      where: { id: memberId },
    });
    const mission: Mission = await this.missionRepository.findOne({
      where: { id: missionId },
    });
    const familiy: Family = await this.familyRepository.findOne({
      where: { id: familyId },
    });

    const question: Question = this.questionRepository.create({
      answer: answer,
      mission: mission,
      family: familiy,
      member: member,
    });

    await this.questionRepository.save(question);
  }
}