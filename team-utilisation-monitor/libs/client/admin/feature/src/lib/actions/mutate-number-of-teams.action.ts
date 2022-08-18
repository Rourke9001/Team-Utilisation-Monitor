import { NumberOfTeams } from "../models/admin-number-of-teams";


export class IncreaseNumberOfTeams{
    static readonly type='[Admin Dashboard] Increase teams';

    constructor(public payload:NumberOfTeams){}
}