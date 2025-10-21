import { sortEnum } from "src/common/dtos/general.query.dto";

export const sortFunction = (sort: sortEnum) => {

    const sortOption: any = {};

    switch (sort) {
        case sortEnum.Title:
            sortOption.title = 1;
            break;
        case sortEnum.CreatedAt:
            sortOption.createdAt = 1;
            break;
        case sortEnum.UpdatedAt:
            sortOption.updatedAt = 1;
            break;
        case sortEnum.LastName:
            sortOption.lastname = 1;
            break;
        default:
            sortOption.createdAt = -1; // مرتب‌سازی بر اساس تاریخ ایجاد به صورت نزولی
    }

    return sortOption;
}