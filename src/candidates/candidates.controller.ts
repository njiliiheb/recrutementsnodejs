// candidates.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, Query, Put } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidatesService.create(createCandidateDto);
  }

  @Get()
  findAll() {
    return this.candidatesService.findAll();
  }

  @Get('stats')
  getStats(@Query('year') year: number, @Query('start') start: number, @Query('end') end: number) {
    return this.candidatesService.getStats(year, start, end);
  }
  

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.candidatesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCandidateDto: UpdateCandidateDto) {
    return this.candidatesService.update(id, updateCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.candidatesService.remove(id);
  }
}