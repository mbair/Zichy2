export interface Log {
    id?: number;
    action_type?: string;
    table_name?: string;
    original_data?: string;
    new_data?: string;
    response_data?: string;
    user_fullname?: string;
    status?: number;
    createdAt?: string;
    updatedAt?: string;
    userid?: number;
}
