export interface ContractingParty {
    id?: number | null;
    legalName?: string;
    taxNumber?: string;
    address?: string;
    enabled?: boolean;
}

export interface OrganizerContractingParty {
    relationId?: number | null;
    userId?: number | null;
    contractingPartyId?: number | null;
    legalName?: string;
    taxNumber?: string;
    address?: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    isDefault?: boolean;
    enabled?: boolean;
    contractingParty?: ContractingParty | null;
}

export interface OrganizerContractingPartyOverview {
    relationId?: number | null;
    userId?: number | null;
    organizerName?: string;
    organizerEmail?: string;
    organizerPhone?: string;
    contractingPartyId?: number | null;
    legalName?: string;
    taxNumber?: string;
    address?: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    isDefault?: boolean;
    enabled?: boolean;
    partyEnabled?: boolean;
}
