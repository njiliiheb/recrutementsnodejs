// candidates.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private candidatesRepository: Repository<Candidate>,
  ) {}

  create(createCandidateDto: CreateCandidateDto) {
    const candidate = this.candidatesRepository.create(createCandidateDto);
    return this.candidatesRepository.save(candidate);
  }

  findAll() {
    return this.candidatesRepository.find();
  }

  findOne(id: number) {
    return this.candidatesRepository.findOneBy({ id }).then(candidate => {
      if (!candidate) throw new NotFoundException('Candidate not found');
      return candidate;
    });
  }

  update(id: number, updateCandidateDto: UpdateCandidateDto) {
    return this.candidatesRepository.update(id, updateCandidateDto).then(result => {
      if (result.affected === 0) throw new NotFoundException('Candidate not found');
      return this.findOne(id);
    });
  }

  remove(id: number) {
    return this.candidatesRepository.delete(id).then(result => {
      if (result.affected === 0) throw new NotFoundException('Candidate not found');
      return { message: 'Candidate removed successfully' };
    });
  }

  async getStats(year?: number, start?: number, end?: number) {
    let whereClause: any = {};
    
    // Filtrer par année spécifique
    if (year) {
      whereClause.recruitmentYear = year;
    }
  
    // Filtrer par une plage d'années
    if (start && end) {
      whereClause.recruitmentYear = Between(start, end);
    }
  
    // Si des critères sont spécifiés, récupérer les candidats avec leurs informations
    if (Object.keys(whereClause).length > 0) {
      // Récupérer tous les candidats correspondant aux critères
      const candidates = await this.candidatesRepository.find({
        where: whereClause,
        select: ['name', 'recruited', 'recruitmentYear'],
      });
  
      // Compter le total de candidats, recrutés et non recrutés
      const totalCandidates = candidates.length;
      const recruitedCount = candidates.filter(candidate => candidate.recruited).length;
      const notRecruitedCount = totalCandidates - recruitedCount;
  
      return {
        totalCandidates,
        recruitedCount,
        notRecruitedCount,
        candidates,  // Inclure la liste des candidats
      };
    }
  
    // Si aucun critère n'est fourni
    return { message: 'Provide year or range (start and end).' };
  }
  
  
}