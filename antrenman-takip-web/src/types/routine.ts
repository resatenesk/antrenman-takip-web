// enum yerine bu yapıyı kullanıyoruz.
// 'as const' ifadesi TypeScript'e bu değerlerin değişmeyeceğini söyler.
export const SetType = {
    WorkingSet: 1,
    Warmup: 2,
    DropSet: 3,
    Failure: 4
} as const;

// Nesnenin değerlerinden bir tip oluşturuyoruz.
export type SetType = (typeof SetType)[keyof typeof SetType];

export interface SetDto {
    targetWeight?: number;
    minReps?: number;
    maxReps?: number;
    setType: SetType; // Burası artık yukarıdaki tipi kullanır.
    order: number;
}

export interface ExerciseDto {
    exerciseName: string;
    note?: string;
    restTimeSeconds?: number;
    order: number;
    sets: SetDto[];
}

export interface RoutineExportDto {
    routineName: string;
    description?: string;
    authorName: string;
    exercises: ExerciseDto[];
}