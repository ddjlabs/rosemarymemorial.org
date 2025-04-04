interface Photo {
    filename: string;
    title: string;
    description: string;
    year: string;
    category: 'education' | 'family' | 'adventure';
}

export const photos: Photo[] = [
    {
        filename: 'Mom at Northwest Elem (2004).jpg',
        title: 'Teaching at Northwest Elementary',
        description: 'Rosemary in her classroom at Northwest Elementary School',
        year: '2004',
        category: 'education'
    },
    {
        filename: 'Disney Family Weekend (05-2008) 018.jpg',
        title: 'Disney Family Weekend',
        description: 'Family gathering at Disney World',
        year: '2008',
        category: 'family'
    },
    {
        filename: 'Doug + Mom (Eagle Scout Graduation) 10-1993.jpg',
        title: 'Eagle Scout Graduation',
        description: 'Proud moment at Doug\'s Eagle Scout ceremony',
        year: '1993',
        category: 'family'
    },
    {
        filename: 'DougJenkins-ChildhoodPhotos-baby-14.jpg',
        title: 'Doug as a Baby',
        description: 'Early family memories with baby Doug',
        year: '1975',
        category: 'family'
    },
    {
        filename: 'Florida Gulf Coast Railroad Museum (07-2004) 031.jpg',
        title: 'Railroad Museum Adventure',
        description: 'Visit to the Florida Gulf Coast Railroad Museum',
        year: '2004',
        category: 'adventure'
    },
    {
        filename: 'MARKWEDDING_111503 006.jpg',
        title: 'Mark\'s Wedding',
        description: 'Celebrating at Mark\'s wedding',
        year: '2003',
        category: 'family'
    },
    {
        filename: 'Rosemary DeSotel (1951).jpg',
        title: 'Young Rosemary',
        description: 'Rosemary DeSotel in her younger years',
        year: '1951',
        category: 'family'
    },
    {
        filename: 'SPJC_GRADUATION-011.jpg',
        title: 'College Graduation',
        description: 'Graduation ceremony at St. Petersburg Junior College',
        year: '1970',
        category: 'education'
    },
    {
        filename: 'animal03.jpg',
        title: 'Animal Adventures',
        description: 'Rosemary\'s love for animals and nature',
        year: '2000',
        category: 'adventure'
    },
    {
        filename: 'mom-college.jpg',
        title: 'College Days',
        description: 'Rosemary during her college years',
        year: '1969',
        category: 'education'
    },
    {
        filename: 'mom_wedding_02.jpg',
        title: 'Wedding Day',
        description: 'Rosemary on her wedding day with her sisters Shirley and Kay',
        year: '1972',
        category: 'family'
    },
    {
        filename: 'moms-siblings.jpg',
        title: 'Family Siblings',
        description: 'Rosemary with her siblings',
        year: '1960',
        category: 'family'
    },
    {
        filename: 'printer_20210609_123949_004436.jpg',
        title: 'Recent Memory',
        description: 'A cherished recent photo of Rosemary',
        year: '2021',
        category: 'family'
    }
];
