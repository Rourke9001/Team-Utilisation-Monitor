import { ApproveRequestVEmailHandler } from "./approve-request-v-email.handler";
import { CreateAdminHandler } from "./create-admin.handler";
import { CreateCompanyHandler } from "./create-company.handler";
import { CreateInviteCodeHandler } from "./create-invite-code.handler";
import { CreatePersonHandler } from "./create-person.handler";
import { CreateProjectHandler } from "./create-project.handler";
import { CreateTeamHandler } from "./create-team.handler";
import { CreateUserHandler } from "./create-user.handler";

export const CommandHandlers=[ApproveRequestVEmailHandler,CreateAdminHandler,CreateTeamHandler,CreateProjectHandler,CreateCompanyHandler,CreatePersonHandler,CreateUserHandler,CreateInviteCodeHandler];
