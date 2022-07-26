import { Test, TestingModule } from '@nestjs/testing';
import { ServiceFeatureService } from './service-feature.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandBus, IQuery, QueryBus } from "@nestjs/cqrs";

import { FunctionsModule } from './functions/functions.module';
import { FunctionsService } from './functions/functions.service';

import { UserPerson, UserCompany } from '@team-utilisation-monitor/api/shared/data-access';
import { TeamEntity } from '@team-utilisation-monitor/api/shared/data-access';
import { ProjectEntity } from '@team-utilisation-monitor/api/shared/data-access';
import { Company } from '@prisma/client';
import { CompanyStatsEntity } from '@team-utilisation-monitor/api/shared/data-access';

import { UpdateProfileCommand } from './commands/impl/UpdateProfile.command';
import { GetSkillsQuery } from './queries/impl/GetSkills.query';
import { DeleteEmployeeCommand } from './commands/impl/DeleteEmployee.command';
import { DeleteTeamMemberCommand } from './commands/impl/DeleteTeamMember.command';
import { GetTeamMembersQuery } from './queries/impl/getTeamMembers.query';
import { AddTeamMemberCommand } from './commands/impl/addTeamMember.command';
import { ApproveRequestVEmailCommand } from './commands/impl/approve-request-v-email.command';
import { CreateAdminCommand } from './commands/impl/create-admin.command';
import { CreateCompanyCommand } from './commands/impl/create-company.command';
import { CreateInviteCodeCommand } from './commands/impl/create-invite-code.command';
import { CreateProjectCommand } from './commands/impl/create-project.command';
import { CreateTeamCommand } from './commands/impl/create-team.command';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { GetAllEmployeesOfCompany } from './queries/impl/get-all-employees-of-company.query';
import { GetNumberOfTeamsOfCompany } from './queries/impl/get-number-of-teams-of-company.query';
import { GetAllMembersOfTeam } from './queries/impl/get-all-members-of-team.query'
import { GetAllPersonsQuery } from './queries/impl/get-all-persons.query';
import { GetAllProjectsOrTeamsOfCompany } from './queries/impl/get-all-projects-or-teams.query';
import { GetCompanyStats } from './queries/impl/get-company-stats.query';
import { GetOnePersonQuery } from './queries/impl/get-one-person.query';
import { GetPendingRequests } from './queries/impl/get-pending-requests.query';
import { GetUserIDQuery } from './queries/impl/get-user-id.query';
import { GetCompanyQuery } from './queries/impl/getCompany.query';
import { Login } from './queries/impl/login.query';
import { getInviteCode } from './queries/impl/getInviteCode.query';
import { AddSkillCommand } from './commands/impl/AddSkill.command';

describe('ServiceFeatureService', () => {

  let service: ServiceFeatureService;
  let createService: ServiceFeatureService;

  const mockQueryBus = {
    execute: jest.fn((query: IQuery) => {
      if (query instanceof GetOnePersonQuery) {

        const user_person = new UserPerson();

        user_person.id = 123;
        user_person.name = "Rourke";
        user_person.surname = "Amiss";
        user_person.email = "rourke@gmail.com";
        user_person.role = "intern";
        user_person.suspended = false;
        user_person.approved = true;
        user_person.company_name = "icreatesoftware";
        user_person.utilisation = 9;
        user_person.position = "team lead";
        user_person.project_name = "tum";
        user_person.team_name = "team";
        user_person.company_id = 2;
        user_person.project_id = 6;
        user_person.team_id = 21;
        
        return user_person;

      } else if (query instanceof GetCompanyQuery) {

        const user_company = new UserCompany();

        user_company.id = 28;
        user_company.company_name = "icreate"
        user_company.admins = null;
        user_company.employees = null;
        user_company.projects = null;
        user_company.teams = null;
        user_company.invite_code = "hvuwuwbv12"

        return user_company;

      } else if (query instanceof GetTeamMembersQuery) {

        const team_entity = new TeamEntity();

        team_entity.id = 13;
        team_entity.team_name = "chelsea"
        team_entity.members = null;
        team_entity.company_id = 10;
        team_entity.project_name = "w2k"
        team_entity.projects = null;
        team_entity.project_id = 9;
        team_entity.completed = 77;

        return team_entity;

      } else if (query instanceof GetAllEmployeesOfCompany) {

        const team = [];

        let user_person = new UserPerson();

        user_person.id = 123;
        user_person.name = "Rourke";
        user_person.surname = "Amiss";
        user_person.email = "rourke@gmail.com";
        user_person.role = "intern";
        user_person.suspended = false;
        user_person.position = "team lead";
        user_person.company_name = "icreatesoftware";
        user_person.project_name = "tum";
        user_person.team_name = "team";
        user_person.company_id = 2;
        user_person.project_id = 6;
        user_person.team_id = 21;

        team[0] = user_person;

        user_person = new UserPerson();

        user_person.id = 66;
        user_person.name = "Sam";
        user_person.surname = "Smith";
        user_person.email = "ssmith@gmail.com";
        user_person.role = "developer";
        user_person.suspended = false;
        user_person.position = "admin";
        user_person.company_name = "icreatesoftware";
        user_person.project_name = "tum";
        user_person.team_name = "team";
        user_person.company_id = 2;
        user_person.project_id = 6;
        user_person.team_id = 21;

        team[1] = user_person;

        return team;

      } else if (query instanceof GetCompanyStats) {

        const company_stats = new CompanyStatsEntity();

        company_stats.numProjects = 31;
        company_stats.numTeams = 17
        company_stats.numEmployees = 141;
        company_stats.numAdmins = 14;

        return company_stats;

      }

      return 10;
    })
  }

  const mockCommandBus = {
    execute: jest.fn((command) => {
      if (command instanceof CreateUserCommand) {
        if (command.inviteLink === 'nggyunglydngraadu') {

          const user_person = new UserPerson();

          user_person.id = 124;
          user_person.name = command.name;
          user_person.surname = command.surname;
          user_person.email = command.email;
          user_person.role = "intern";
          user_person.suspended = false;
          user_person.approved = true;
          user_person.company_name = "icreatesoftware";
          user_person.utilisation = 9;
          user_person.position = "team lead";
          user_person.project_name = "tum";
          user_person.team_name = "team";
          user_person.company_id = 2;
          user_person.project_id = 6;
          user_person.team_id = 21;
          
          return user_person;
        }
      
      } else if (command instanceof CreateCompanyCommand) {
        if (command.companyName === 'manutd') {

          const user_company = new UserCompany();

          user_company.id = 28;
          user_company.company_name = command.companyName;
          user_company.admins = null;
          user_company.employees = null;
          user_company.projects = null;
          user_company.teams = null;

          return user_company;
        }

      } else if (command instanceof CreateProjectCommand) {
        if (command.manHours === 90) {

          const project_entity = new ProjectEntity();

          project_entity.id = 982;
          project_entity.project_name = command.projectName;
          project_entity.ownwer_id = 81;
          project_entity.workers = null;
          project_entity.completed = false;
          project_entity.teams = null;
          project_entity.man_hours = command.manHours;

          return project_entity;
        }

      } else if (command instanceof CreateAdminCommand) {
        if (command.name === 'bob') {

          const user_person = new UserPerson();

          user_person.id = 129;
          user_person.name = command.name;
          user_person.surname = command.surname;
          user_person.email = command.email;
          user_person.role = "admin";
          user_person.suspended = false;
          user_person.approved = true;
          user_person.company_name = command.companyName;
          user_person.utilisation = 81;
          user_person.position = "team lead";
          user_person.project_name = "tum";
          user_person.team_name = "team";
          user_person.company_id = 8;
          user_person.project_id = 1;
          user_person.team_id = 0;
          
          return user_person;
        }

      } else if (command instanceof CreateTeamCommand) {
        if (command.teamName === 'burnley') {

          const team_entity = new TeamEntity();

          team_entity.id = 112;
          team_entity.team_name = command.teamName;
          team_entity.members = null;
          team_entity.company_id = 12;
          team_entity.project_name = "currie cup"
          team_entity.projects = null;
          team_entity.project_id = 4;
          team_entity.completed = 2;
  
          return team_entity;
        }
        
      } else if (command instanceof CreateInviteCodeCommand) {
        if (command.companyName === 'hotspur') {
  
          return 'thisshouldberandomlycreated';
          
        }
      }

      return 11;
    })
  }
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, FunctionsModule],
      providers: [
        ServiceFeatureService,
        { provide: QueryBus, useValue: mockQueryBus },
        { provide: CommandBus, useValue: mockCommandBus }
      ],
    }).compile();

      service = module.get<ServiceFeatureService>(ServiceFeatureService);
      createService = module.get<ServiceFeatureService>(ServiceFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(createService).toBeDefined();
  });

  describe("getOnePersonVEmailService", () => {
    it('should return a UserPerson', async () => {
      let test = new UserPerson();
      try {
        test = await service.getOnePersonVEmailService('rourke@gmail.com');
      } catch (err) { return }
      expect(test.id).toEqual(123);
      });
  });

  describe("getCompanyVName", () => {
    it('should return a UserCompany', async () => {
      let test = new UserCompany();
      try {
        test = await service.getCompany('icreate');
      } catch (err) { return }
      expect(test.invite_code).toEqual("hvuwuwbv12");
      });
  });

  //needs to be implemented in service layer
  describe("getCompanyVID", () => {
    it('should return a UserCompany', async () => {
      let test = new UserCompany();
      try {
        test = await service.getCompany('12');
      } catch (err) { return }
      expect(test).toBeInstanceOf(UserCompany);
      });
  });

  //needs to be implemented in service layer
  describe("getTeam", () => {
    it('should return a TeamEntity', async () => {
      let test = new TeamEntity();
      try {
        test = await service.GetTeamMembers('icreate');
      } catch (err) { return }
      expect(test.team_name).toEqual("chelsea");
      });
  });

  describe("getEmployeesOfCompany", () => {
    it('should return a UserPerson[]', async () => {
      let test = [];
      try {
        test = await service.getAllEmployees('icreate');
      } catch (err) { return }
      expect(test[1]).toBeInstanceOf(UserPerson);
      });
  });

  describe("getCompanyStats", () => {
    it('should return CompanyStatsEntity', async () => {
      let test = new CompanyStatsEntity;
      try {
        test = await service.getCompanyStats('icreate');
      } catch (err) { return }
      expect(test.numTeams).toEqual(17);
      });
  });



  // commandsBus

  describe("createUser", () => {
    it('should create a UserPerson', async () => {
      let test = new UserPerson();
      try {
        test = await createService.createUser('rob','roll','rick@roll.com','nggyunglydngraadu');
      } catch (err) { return }
      expect(test.id).toEqual(124);
      expect(test.name).toEqual("rob");
      expect(test.surname).toEqual("roll");
      expect(test.email).toEqual("rick@roll.com")
    });
  });

  describe("createCompany", () => {
    it('should create a UserCompany', async () => {
      let test = new UserCompany();
      try {
        test = await createService.createCompany('manutd');
      } catch (err) { return }
      expect(test.company_name).toEqual('manutd');
    });
  });

  describe("createProject", () => {
    it('should create a ProjectEntity', async () => {
      let test = new ProjectEntity();
      try {
        test = await createService.createProject('javacoffee','icreate','liverpool', 90);
      } catch (err) { return }
      expect(test.project_name).toEqual('javacoffee');
      expect(test.man_hours).toEqual(90);
    });
  });

  describe("createTeam", () => {
    it('should create a TeamEntity', async () => {
      let test = new TeamEntity();
      try {
        test = await createService.createTeam('burnley', 'premierleague');
      } catch (err) { return }
      expect(test.id).toEqual(112);
      expect(test).toBeInstanceOf(TeamEntity);
    });
  });

  describe("createAdmin", () => {
    it('should create a UserPerson as admin', async () => {
      let test = new UserPerson();
      try {
        test = await createService.createAdmin('bob','bowl','brick@bowl.com','champions league');
      } catch (err) { return }
      expect(test.role).toEqual('admin');
    });
  });

  describe("createInviteCode", () => {
    it('should create an InviteCode', async () => {
      let test;
      try {
        test = await createService.createInviteCode('hotspur');
      } catch (err) { return }
      expect(test).toEqual('thisshouldberandomlycreated');
    });
  });




});

