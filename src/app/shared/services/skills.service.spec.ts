import { TestBed, inject } from '@angular/core/testing';

import { SkillsService } from './skills.service';

describe('SkillsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkillsService]
    });
  });

  it('should ...', inject([SkillsService], (service: SkillsService) => {
    expect(service).toBeTruthy();
  }));
});
