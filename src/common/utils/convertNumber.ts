export function convertNumber(input: string | number): string {
    // اگر عدد هست، اول به رشته تبدیلش می‌کنیم
    let str = input.toString();

    // جایگزینی اعداد فارسی (۰-۹)
    str = str.replace(/[\u06F0-\u06F9]/g, (c) => String(c.charCodeAt(0) - 0x06F0));

    // جایگزینی اعداد عربی (٠-٩)
    str = str.replace(/[\u0660-\u0669]/g, (c) => String(c.charCodeAt(0) - 0x0660));

    return str;
}
