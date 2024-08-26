export interface Log {
    id?: number;
    action_type?: string;
    table_name?: string;
    original_data?: string;
    new_data?: string;
    response_data?: string;
    status?: number;
    createdAt?: string;
    updatedAt?: string;
    userid?: number;
    user_fullname?: string;
    user_email?: string;
}
