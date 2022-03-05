import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { Family } from '../../entities/family.entity';
import { Member } from '../../entities/members.entity';
import { CreateFamilyDto } from './dto/create-family.dto';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(Family)
    private familyRepository: Repository<Family>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  // 회원가입
  async signUp(createFamilyDto: CreateFamilyDto) {
    try {
      const family = await this.saveFamily(createFamilyDto.familyNickname);
      await this.saveMember(createFamilyDto.memberNickname, family.id);
      return {
        familyId: family.id,
        familyCode: family.familyCode,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message, error);
    }
  }

  // 가족 저장
  async saveFamily(familyNickname: string) {
    try {
      const family = new Family();
      const code = this.makeRandomString();
      family.familyNickname = familyNickname;
      family.familyCode = code;
      await this.familyRepository.save(family);

      return family;
    } catch (error) {
      throw new InternalServerErrorException(error.message, error);
    }
  }

  // 멤버 저장 (방장 설정)
  async saveMember(memberNickname: string, familyId: Long) {
    try {
      const family = await this.familyRepository.findOne({ id: familyId });
      family.memberCount = family.memberCount + 1;
      await this.familyRepository.save(family);

      const member = new Member();
      member.family = family;
      member.memberNickname = memberNickname;
      if (family.memberCount == 0) {
        member.isLeader = true;
      }
      await this.memberRepository.save(member);

      return member;
    } catch (error) {
      throw new InternalServerErrorException(error.message, error);
    }
  }

  // 기존에 있는 가족에 멤버 추가
  async addMember(memberNickname: string, familyCode: string) {
    try {
      const familyId = await this.findFamilyIdByCode(familyCode);
      return await this.saveMember(memberNickname, familyId);
    } catch (error) {
      throw new InternalServerErrorException(error.message, error);
    }
  }

  // 가족 아이디 리턴
  async findFamilyIdByCode(familyCode: string) {
    try {
      const family = await this.familyRepository.findOne({
        familyCode: familyCode,
      });
      return family.id;
    } catch (error) {
      throw new InternalServerErrorException(error.message, error);
    }
  }

  // 가족 코드 생성
  makeRandomString(length = 7) {
    let randomString = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < length; i++)
      randomString += possible.charAt(
        Math.floor(Math.random() * possible.length),
      );

    return randomString;
  }
}
