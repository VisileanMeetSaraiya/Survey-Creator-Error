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

export type {RoleState, IGlobalState, IListingRow};