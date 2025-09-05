interface RoleState{
    role : "siteuser" | "qa" | "admin"
}

interface IGlobalState{
    roleValue:RoleState
}

interface IListingRow{
    id: number;
    title: string;
    // label: string;
    responseCount: string;
    authorName: string;
    descriptionOfSurvey: string;
}

interface IDashboardRow {
    id: number;
    title: string;
    status: string;
}

export type {RoleState, IGlobalState, IListingRow, IDashboardRow};