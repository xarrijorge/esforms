const budgetCodes = {
    'Select Department': ['select option'],
    'After Sales': [
        'select option',
        '3721-Accommodation Costs',
        '3720-Bonus for meeting KPIs',
        '3718-Fuel for Field Officers',
        '3715-Inventory Spare Parts Provision Expense',
        '3716-Logistics for Field Ops',
        '3719-Per diem',
        '3711-Servicing',
    ],
    Agents: [
        'select option',
        '3204-Agent Awards',
        '3205-Agent Commission',
        '3206-Agent Management Personnel',
        '3201-Agent Set Up Costs',
        '3202-Agent Support',
    ],
    BD: ['select option', '4304-Fundraising Costs'],
    CallCenter: [
        'select option',
        '3701-Call and Operational Costs',
        '3702-SMS Fees',
    ],
    Corporate: [
        'select option',
        '3905-BA Commission',
        '3907-Contractor',
        '3910-Field Expenses & Traveling',
        '3902-Operating Expenses',
        '3908-Sales Promotion, Launch & Goodwill',
        '3906-Staff & Consultant',
        '3909-Corporate Team Building & Entertainment',
    ],
    Finance: [
        'select option',
        '3102-Increase in Provision for Bad Debts',
        '3103-Personnel - Repossession Agents',
        '4803-Dues and Subscriptions',
        '4806-Internal Audit and Risk Personnel',
        '4807-Audit fees',
        '4808-Tax Consultant',
        '4809-Legal Consultant',
        '4810-Professional Fees - Others',
        '5304-Tax Liability Expenses',
    ],
    IT: [
        'select option',
        '4202-Consultants',
        '4207-Expenses',
        '4204-Internet',
        '4208-License',
        '4209-PAYGO -Angaza System',
        '4201-SAAS',
        '3717-SMS Costs',
        '3704-Software',
        '4612-Software License',
        '4200-Technology',
    ],
    Marketing: [
        'select option',
        '3601-Branding and Creative',
        '3602-Content',
        '3610-CSR & Sponsorships -Corporate Social Re...',
        '3603-Events',
        '3609-Free on Board',
        '3604-Paid Advertising',
        '3605-Point of Sales',
        '3607-Specials',
        '3608-Market Research',
        '3600-Marketing',
    ],
    'Operations Support': [
        'select option',
        '3409-Sales and Field Support',
        '3309-Shops',
        '3713-Admin',
        '4305-Board Expenses',
        '4205-Business Travel',
        '4301-Business Travel and Logistics',
        '4206-Conference',
        '4302-Conference Fees',
        '4107-Exploratory Products',
        '3501-Fuel Expenses',
        '4109-General & Admin',
        '3505-Insurance',
        '3508-Management',
        '3506-Offloading and Bundling',
        '4104-Rollout',
        '3302-Shop Opening Costs',
        '3305-Shop Rent and Registrations',
        '3306-Shop Repairs and Maintenance',
        '3714-Training',
        '3903-Travel Expenses',
        '3405-Travel Expenses',
        '3504-Vehicle Hiring',
        '3503-Vehicle Maintenance',
        '3406-Vehicle Maintenance Costs...',
        '3502-Vehicle Management Expenses',
        '3511-Warehouse Rent',
        '3700-After Sales',
        '3200-Agents',
        '4300-Business Development',
        '4000-General and Administration Expenses',
        '3800-Large Systems',
        '3500-Logistics',
        '4603-Office Cleaning Supplies',
        '4609-Office Communication',
        '4602-Office Food Supplies',
        '4606-Office Fuel and Travel',
        '4601-Office Maintenance and Repairs',
        '4610-Office Rent',
        '3000-Operating Expenses',
        '4608-Operations Insurance',
        '4614-Operations Training',
        '4607-Operations Vehicle Management',
        '6807-Permit and Registration',
        '4605-Printing & Stationery',
        '4600-Procurement and Operations Expenses',
        '4100-Product Development',
        '4802-Professional Fees',
        '3400-Sales and Field Support',
        '4613-Security Personnel',
        '3300-Shops',
        '4604-Utilities and Bills',
        '5307-Other Expense',
    ],
    'P&C': [
        'select option',
        '4404-Administration',
        '3203-Agent Training',
        '4403-Events',
        '4409-Management Technical Services Agreement',
        '4407-Medical Insurance',
        '3712-After Sales: Personnel ',
        '4303-BD:Personnel',
        '3703-Call Centre: Personnel',
        '3901-Corporate: Personnel',
        '4203-IT: Personnel',
        '3507-Logistics: Personnel',
        '3606-Marketing:Personnel',
        '4611-Operations and Procurement: Personnel',
        '4106-PD: Personnel',
        '3803-Power Solution: Personnel',
        '3407-Sales and Field Support: Personnel',
        '3408-Sales Support: Personnel',
        '4406-TM: Personnel',
        '4405-Professional Development',
        '4401-Recruitment and Onboarding',
        '3307-Shop Personnel',
        '3303-Shop Staff Training',
        '4408-Staff Year End Bonus',
        '3509-Training',
        '3904-Training Expenses',
        '4402-Wellness and Staff Support',
        '4804-Administration Personnel',
        '7500-End of Service Benefit (SOPL)',
        '4805-Finance Personnel',
        '4501-General Management Personnel',
        '4502-Leadership Support',
        '4400-Talent Management',
        '7501-Employer NASSIT',
    ],
    PD: [
        'select option',
        '4108-Commission on new product sales',
        '4103-Pilot',
        '4105-Post Launch',
        '4101-Research and Planning',
        '4102-Testing and Development',
    ],
    'Power Solution': [
        '3802-Additional Equipment',
        '3801-Installation Expenses',
        '3805-Other Operational Expenses',
    ],
    'Sales and Field Support': [
        'select option',
        '3401-Accommodation Costs',
        '3301-Brand Ambassador Commission and Expenses',
        '3404-Commissions and Bonuses',
        '3510-Distribution Costs',
        '3308-PDS Brand Ambassador Commission',
        '3402-Per diem',
        '3304-Shop Operating Expenses',
        '3403-Team Housing',
    ],
};

const departments = Object.keys(budgetCodes);

export default budgetCodes;
export { departments };
